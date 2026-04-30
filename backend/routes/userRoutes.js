const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/users", verifyToken, roleMiddleware, userController.getUsers);
router.put("/users/:id", verifyToken, roleMiddleware, userController.updateUserRole);
router.delete("/users/:id", verifyToken, roleMiddleware, userController.deleteUser);
router.put('/profile', verifyToken, userController.updateProfile);

module.exports = router;