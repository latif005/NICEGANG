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