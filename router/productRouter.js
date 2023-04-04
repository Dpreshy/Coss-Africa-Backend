const express = require("express");
const { getAllProduct, createProduct, createCloth, createFood, getSingleProduct, createElectronics } = require("../Controller/productController/productController");
const router = express.Router();
const upload = require("../utils/multer");

router.route("/").get(getAllProduct);
router.route("/:id/create/phone").post(upload.array("avatar"), createProduct);
router.route("/:id/create/cloth").post(upload.any(), createCloth);
router.route("/:id/create/food").post(upload.any(), createFood);
router.route("/:id/create/electronics").post(upload.any(), createElectronics);
router.route("/:id").get(getSingleProduct);

module.exports = router;