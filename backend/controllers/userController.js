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