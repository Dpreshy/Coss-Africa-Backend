const express = require("express");
const { RegisterUser, signInUser, getAll, getSingleUser, updateUser, deleteUser, verifyUser } = require("../Controller/SellerController/selerController");
const upload = require("../utils/multer");

const router = express.Router();

router.route("/").get(getAll);
router.route("/register").post(RegisterUser);
router.route("/login").post(signInUser);
router.route("/:id/verify").patch(verifyUser);
router.route("/:id").get(getSingleUser);
router.route("/:id/update").patch(upload.array("avatar"), updateUser);
router.route("/:id/delete").delete(deleteUser);

module.exports = router;