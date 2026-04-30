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
exports.createGame = async (req, res) => {
    try {
        const { name, currency } = req.body;
        
        // 1. Tangkap URL gambarnya dari req.file
        let imageUrl = null;
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/${req.file.filename}`; 
        } else {
            return res.status(400).json({ message: "Gambar wajib diupload!" });
        }

        const sql = "INSERT INTO games (name, image, currency) VALUES (?, ?, ?)";
        await db.promise().query(sql, [name, imageUrl, currency]);

        res.status(201).json({ 
          message: "Game berhasil ditambahkan!" , 
          image: imageUrl});
        
    } catch (error) {
        console.error("Error saat nambah game:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, currency } = req.body;
        let imageUrl = req.body.image; // default pake URL lama kalau gak upload baru

        // Kalau user upload file baru pas edit
        if (req.file) {
            imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const sql = "UPDATE games SET name = ?, image = ?, currency = ? WHERE id = ?";
        await db.promise().query(sql, [name, imageUrl, currency, id]);

        res.json({ message: "Update sukses!", image: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Gagal update database" });
    }
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