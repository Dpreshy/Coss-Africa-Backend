const express = require("express");
const { getAllProduct, createProduct, createCloth, createFood, getSingleProduct, createElectronics, searchPost, removeProduct, productVariation, purchaseProduct } = require("../Controller/productController/productController");
const router = express.Router();
const upload = require("../utils/multer");

router.route("/").get(getAllProduct);
router.route("/").get(searchPost);
router.route("/:id/create/phone").post(upload.array("avatar"), createProduct);
router.route("/:id/create/cloth").post(upload.array("avatar"), createCloth);
router.route("/:id/create/food").post(upload.array("avatar"), createFood);
router.route("/:id/create/electronics").post(upload.array("avatar"), createElectronics);
router.route("/:userID/:proID/remove").delete(removeProduct);
router.route("/:id").get(getSingleProduct);
router.route("/:productID/update").patch(productVariation);
router.route("/:productID/order").patch(purchaseProduct);
router.route("/:productID/status").patch(updateOrderStatus);

module.exports = router;