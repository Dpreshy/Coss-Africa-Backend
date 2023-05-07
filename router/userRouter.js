const express = require("express");
const { RegisterUser, getAll, getSingleUser, signInUser, updateUser, deleteUser, RegisterAdmin, verifyUser, verifyUser2, getAllCustomers } = require("../Controller/UserCont/userController");
const router = express.Router();

router.route("/").get(getAll);
router.route("/custormers").get(getAllCustomers);
router.route("/:id").get(getSingleUser);
router.route("/register").post(RegisterUser);
router.route("/registerAdmin").post(RegisterAdmin);
router.route("/login").post(signInUser);
router.route("/:id/verify").patch(verifyUser);
router.route("/:id/verify2").patch(verifyUser2);
router.route("/:id/update").patch(updateUser);
router.route("/:id/remove").delete(deleteUser);

module.exports = router;
