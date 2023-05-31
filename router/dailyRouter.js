const express = require("express");
const router = express.Router();

const { dailyOrders, dailyProduct } = require("../Controller/salesController");

router.route("/orders").get(dailyOrders);
router.route("/products").get(dailyProduct);

module.exports = router;