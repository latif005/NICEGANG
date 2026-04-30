const db = require("../config/db");

// GET ALL USERS
exports.getUsers = (req, res) => {
  db.query(
    "SELECT id, username, email, role FROM users",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// UPDATE ROLE
exports.updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  db.query(
    "UPDATE users SET role=? WHERE id=?",
    [role, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Role updated" });
    }
  );
};

// DELETE USER
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User deleted" });
    }
  );
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Ambil ID dari token yang udah di-verify
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: "Username wajib terisi!" });
        }

        const sql = "UPDATE users SET username = ? WHERE id = ?";
        // Pake .promise() biar gak kena error 'not a promise' lagi
        await db.promise().query(sql, [username, userId]);

        res.json({ success: true, message: "Username berhasil diganti!", username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Backend-nya lagi kocak, gagal update profil" });
    }
};