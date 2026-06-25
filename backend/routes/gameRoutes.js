const express = require("express");
const router = express.Router();

const gameController = require("../controllers/gameController");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Wajib di-import buat cek folder

const uploadPath = path.join(__dirname, '../public/uploads'); 
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// 2. Setting penyimpanan Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Batasi 2MB di server
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Hanya boleh upload gambar (JPG/PNG)!"));
    }
});

router.get("/games", gameController.getGames);
router.post("/games", verifyToken, roleMiddleware, upload.single('image'), gameController.createGame);
router.put("/games/:id", verifyToken, roleMiddleware, upload.single('image'), gameController.updateGame);
router.delete("/games/:id", verifyToken, roleMiddleware, gameController.deleteGame);
module.exports = router;
