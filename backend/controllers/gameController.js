const db = require("../config/db");

exports.getGames = (req, res) => {
  const sql = "SELECT * FROM games";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};