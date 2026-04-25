const express = require("express");
const router = express.Router();

const promoController = require("../controllers/promoController");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// PUBLIC (optional kalau mau)
router.get("/promos", promoController.getPromos);

// ADMIN ONLY
router.post("/promos", verifyToken, roleMiddleware, promoController.createPromo);
router.put("/promos/:id", verifyToken, roleMiddleware, promoController.updatePromo);
router.delete("/promos/:id", verifyToken, roleMiddleware, promoController.deletePromo);

module.exports = router;