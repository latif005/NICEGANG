const db = require("../config/db");
const snap = require("../config/midtrans");

exports.createOrder = (req, res) => {

    const { user_id, package_id, account_game_id, promo_code } = req.body;

    const getPackage = "SELECT price FROM packages WHERE id = ?";

    db.query(getPackage, [package_id], (err, packageResult) => {

        if (err) return res.status(500).json(err);

        if (packageResult.length === 0) {
            return res.status(404).json({ message: "Package not found" });
        }

        let price = packageResult[0].price;
        let promoId = null;

        if (!promo_code) {
            return createOrder(price, promoId);
        }

        const checkPromo = "SELECT id, discount_amount FROM promos WHERE promo_code = ?";

        db.query(checkPromo, [promo_code], (err, promoResult) => {

            if (err) return res.status(500).json(err);

            if (promoResult.length > 0) {

                const promo = promoResult[0];

                promoId = promo.id;

                price = price - promo.discount_amount;

                if (price < 0) {
                    price = 0;
                }

            }

            createOrder(price, promoId);

        });

    });

    function createOrder(totalPrice, promoId) {

        const insertOrder = `
      INSERT INTO orders (user_id, package_id, promo_id, account_game_id, total_price, status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `;

        db.query(
            insertOrder,
            [user_id, package_id, promoId, account_game_id, totalPrice],
            (err, orderResult) => {

                if (err) return res.status(500).json(err);

                res.json({
                    message: "Order created",
                    orderId: orderResult.insertId,
                    total_price: totalPrice
                });

            }
        );

    }

};

exports.getOrder = (req, res) => {

    const orderId = req.params.id;

    const sql = `
    SELECT orders.*, packages.amount
    FROM orders
    JOIN packages ON packages.id = orders.package_id
    WHERE orders.id = ?
  `;

    db.query(sql, [orderId], (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result[0]);

    });

};

exports.createPayment = (req, res) => {

    const orderId = req.params.id;

    const sql = "SELECT * FROM orders WHERE id = ?";

    db.query(sql, [orderId], async (err, result) => {

        if (err) return res.status(500).json(err);

        const order = result[0];

        const parameter = {
            transaction_details: {
                order_id: order.id,
                gross_amount: order.total_price
            }
        };

        try {
            const transaction = await snap.createTransaction(parameter);

            res.json({
                token: transaction.token
            });

        } catch (error) {
            console.error("Midtrans Error:", error);

            res.status(500).json({
                message: error.message
            });
        }

    });

};

exports.midtransNotification = (req, res) => {

    const { order_id, transaction_status } = req.body;

    let status = "pending";

    if (transaction_status === "settlement" || transaction_status === "capture") {
        status = "success";
    }

    if (
        transaction_status === "deny" ||
        transaction_status === "cancel" ||
        transaction_status === "expire"
    ) {
        status = "failed";
    }

    const sql = "UPDATE orders SET status = ? WHERE id = ?";

    db.query(sql, [status, order_id], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Order status updated" });

    });

};

exports.getUserOrders = (req, res) => {

    const userId = req.params.userId;

    const sql = `
    SELECT orders.*, packages.amount, games.name AS game_name
    FROM orders
    JOIN packages ON packages.id = orders.package_id
    JOIN games ON games.id = packages.game_id
    WHERE orders.user_id = ?
    ORDER BY orders.created_at DESC
  `;

    db.query(sql, [userId], (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

};

exports.getDashboardStats = (req, res) => {

    const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM orders) AS total_orders,
      (SELECT IFNULL(SUM(total_price),0) FROM orders WHERE status='success') AS total_revenue
  `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result[0]);

    });

};

exports.getAllOrders = (req, res) => {

  const sql = `
    SELECT 
      orders.*,
      users.username,
      games.name AS game_name,
      packages.amount
    FROM orders
    JOIN users ON users.id = orders.user_id
    JOIN packages ON packages.id = orders.package_id
    JOIN games ON games.id = packages.game_id
    ORDER BY orders.created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) return res.status(500).json(err);

    res.json(result);

  });

};