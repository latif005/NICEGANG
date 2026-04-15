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

//buat crud game
exports.createGame = (req, res) => {
  console.log(req.body);

  const { name, image, currency } = req.body;

  const sql = `
    INSERT INTO games (name, image, currency)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, image, currency], (err, result) => {

    if (err) {
    console.log("CREATE GAME ERROR:", err);
    return res.status(500).json(err);
}

    res.json({
      message: "Game created",
      id: result.insertId
    });

  });

};

exports.updateGame = (req, res) => {

  const { id } = req.params;
  const { name, image, currency } = req.body;

  const sql = `
    UPDATE games
    SET name=?, image=?, currency=?
    WHERE id=?
  `;

  db.query(sql, [name, image, currency, id], (err) => {

    if (err) return res.status(500).json(err);

    res.json({ message: "Game updated" });

  });

};

exports.deleteGame = (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM games WHERE id=?",
    [id],
    (err) => {

      if (err) return res.status(500).json(err);

      res.json({ message: "Game deleted" });

    }
  );

};