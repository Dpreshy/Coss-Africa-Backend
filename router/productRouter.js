const express = require("express");
import { getAllProduct, createProduct } from "../Controller/productController/productController";
const router = express.Router();

router.route("/").get(getAllProduct);
router.route("/create").post(createProduct);

module.exports = router;