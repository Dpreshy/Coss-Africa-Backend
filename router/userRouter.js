const express = require("express");
const { RegisterUser, getAll, getSingleUser, signInUser, updateUser, deleteUser } = require("../Controller/UserCont/userController");
const router = express.Router();

router.route("/").get(getAll);
router.route("/:id").get(getSingleUser);
router.route("/register").post(RegisterUser);
router.route("/login").post(signInUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id/remove").delete(deleteUser);

module.exports = router;