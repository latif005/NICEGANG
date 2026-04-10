const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

router.get("/packages/:gameId", packageController.getPackagesByGame);

module.exports = router;