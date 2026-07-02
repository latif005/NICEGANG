const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "topup_game"
});

db.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = db;