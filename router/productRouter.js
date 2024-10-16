const express = require("express");
const { getAllProduct, createProduct, createCloth, createFood, getSingleProduct, createElectronics, searchPost, removeProduct, productVariation, purchaseProduct, getSellerProducts, updateOrderStatus } = require("../Controller/productController/productController");
const router = express.Router();
const upload = require("../utils/multer");

router.route("/").get(getAllProduct);
router.route("/").get(searchPost);
router.route("/:id/create/phone").post(upload.array("avatar"), createProduct);
router.route("/:id/create/cloth").post(upload.array("avatar"), createCloth);
router.route("/create/food").post(upload.array("avatar"), createFood);
router.route("/:id/create/electronics").post(upload.array("avatar"), createElectronics);
router.route("/:userID/:proID/remove").delete(removeProduct);
router.route("/:productID").get(getSingleProduct);
router.route("/:userID/seller").get(getSellerProducts);
router.route("/:productID/update").patch(productVariation);
router.route("/order").patch(purchaseProduct);
// router.route("/:id/status").patch(updateOrderStatus);

module.exports = router;
