const express = require("express");
const { getAllProduct, createProduct } = require("../Controller/productController/productController");
const router = express.Router();

router.route("/").get(getAllProduct);
router.route("/create").post(createProduct);

module.exports = router;