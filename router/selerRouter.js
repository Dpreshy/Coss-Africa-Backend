const express = require("express");
const { RegisterUser, signInUser, getAll, getSingleUser, updateUser, deleteUser, verifyUser } = require("../Controller/SellerController/selerController");

const router = express.Router();

router.route("/").get(getAll);
router.route("/register").post(RegisterUser);
router.route("/login").post(signInUser);
router.route("/verify").post(verifyUser);
router.route("/:id").get(getSingleUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id/delete").delete(deleteUser);

module.exports = router;