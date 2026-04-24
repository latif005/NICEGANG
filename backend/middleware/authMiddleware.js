const jwt = require("jsonwebtoken");
const SECRET = "secret123";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Akses ditolak! Anda belum login (Token tidak ditemukan)" 
    });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: "Token tidak valid atau sudah kedaluwarsa!" 
      });
    }
    req.user = decoded; 
    next();
  });
};

module.exports = { verifyToken };