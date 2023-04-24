const express = require("express");
const { RegisterUser, updateUser, deleteUser, verifyUser, updateUser2 } = require("../Controller/SellerController/selerController");
const upload = require("../utils/multer");

const router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/:id/update").patch(upload.array("avatar"), updateUser);
router.route("/:id/updateuser").patch(updateUser2);
router.route("/:id/delete").delete(deleteUser);

module.exports = router;