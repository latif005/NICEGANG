const db = require("../config/db");

exports.getPackagesByGame = (req, res) => {
  const gameId = req.params.gameId;

  const sql = "SELECT * FROM packages WHERE game_id = ?";

  db.query(sql, [gameId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.createPackage = (req, res) => {
  const { game_id, amount, price } = req.body;

  db.query(
    "INSERT INTO packages (game_id, amount, price) VALUES (?, ?, ?)",
    [game_id, amount, price],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Package created" });
    }
  );
};

exports.updatePackage = (req, res) => {
  const { id } = req.params;
  const { amount, price } = req.body;

  db.query(
    "UPDATE packages SET amount=?, price=? WHERE id=?",
    [amount, price, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Package updated" });
    }
  );
};

exports.deletePackage = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM packages WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Package deleted" });
    }
  );
};