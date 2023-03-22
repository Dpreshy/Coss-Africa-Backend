const express = require("express");
const { RegisterUser, getAll, getSingleUser, signInUser } = require("../Controller/userController");
const router = express.Router();

router.route("/").get(getAll);
router.route("/:id").get(getSingleUser);
router.route("/register").post(RegisterUser);
router.route("/login").post(signInUser);

module.exports = router;