const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/orders", orderController.createOrder);
router.get("/orders/:id", orderController.getOrder);
router.post("/pay/:id", orderController.createPayment);
router.post("/midtrans-notification", orderController.midtransNotification);
router.get("/orders/user/:userId", orderController.getUserOrders);

module.exports = router;