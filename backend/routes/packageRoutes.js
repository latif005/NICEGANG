const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/packages/:gameId", packageController.getPackagesByGame);
router.post("/packages", verifyToken, roleMiddleware, packageController.createPackage);
router.put("/packages/:id", verifyToken, roleMiddleware, packageController.updatePackage);
router.delete("/packages/:id", verifyToken, roleMiddleware, packageController.deletePackage);

module.exports = router;