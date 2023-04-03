const express = require("express");
const { getAllProduct, createProduct, createCloth, createFood, getSingleProduct, createElectronics } = require("../Controller/productController/productController");
const router = express.Router();

router.route("/").get(getAllProduct);
router.route("/:id/create/phone").post(createProduct);
router.route("/:id/create/cloth").post(createCloth);
router.route("/:id/create/food").post(createFood);
router.route("/:id/create/electronics").post(createElectronics);
router.route("/:id").get(getSingleProduct);

module.exports = router;