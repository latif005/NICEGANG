const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/games", gameController.getGames);
router.post("/games", verifyToken, roleMiddleware, gameController.createGame);
router.put("/games/:id", verifyToken, roleMiddleware, gameController.updateGame);
router.delete("/games/:id", verifyToken, roleMiddleware, gameController.deleteGame);
module.exports = router;