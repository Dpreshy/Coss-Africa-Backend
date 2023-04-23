const express = require("express");
const {
    createOrder,
    getOneOrder,
    getOrder,
    updateOrderStatus,
    deleteOrder
} = require("../Controller/orderController/orderController");

const router = express.Router();

router.route("/create").post(createOrder);
router.route("/").get(getOrder);
router.route("/:userID").get(getOneOrder);
router.route("/:id/updatestatus").patch(updateOrderStatus);
router.route("/:userID/orderID").delete(deleteOrder);

module.exports = router;
