const db = require("../config/db");

// GET ALL
exports.getPromos = (req, res) => {
  db.query("SELECT * FROM promos", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// CREATE
exports.createPromo = (req, res) => {
  const { promo_name, promo_code, discount_amount } = req.body;

  db.query(
    "INSERT INTO promos (promo_name, promo_code, discount_amount) VALUES (?, ?, ?)",
    [promo_name, promo_code, discount_amount],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Promo created" });
    }
  );
};

// UPDATE
exports.updatePromo = (req, res) => {
  const { id } = req.params;
  const { promo_name, promo_code, discount_amount } = req.body;

  db.query(
    "UPDATE promos SET promo_name=?, promo_code=?, discount_amount=? WHERE id=?",
    [promo_name, promo_code, discount_amount, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Promo updated" });
    }
  );
};

// DELETE
exports.deletePromo = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM promos WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Promo deleted" });
    }
  );
};