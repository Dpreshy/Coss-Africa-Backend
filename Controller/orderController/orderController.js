const AppError = require("../../middleware/AppError");
const orderModel = require("../../model/orderModel");
const userModel = require("../../model/userModel");
const AdminModel = require("../../model/AdminModel");

const generateOTP = () => {
    let digits = "0123456789";
    let OTPCode = "";
    for (let i = 0; i < 6; i++) {
        OTPCode += digits[ Math.floor(Math.random() * 10) ];
    }
    return OTPCode;
};
exports.createOrder = async (req, res) => {
    try {
        const seller = await userModel.find();
        req.body.order_No = generateOTP();
        req.body.notification = 'new';
        const newOrder = new orderModel(req.body);

        const saveOrder = await newOrder.save();

        res.status(201).json({
            status: "Success",
            data: saveOrder
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
        console.log(error);
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const update = await orderModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );

        res.status(200).json({
            status: "Success",
            data: update
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = req.paramas.orderID;

        await orderModel.findByIdAndDelete(order);

        res.status(200).json({ status: "Success", message: "Order has been deleted" });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await orderModel.find().populate("products.productID").sort({ createdAt: "desc" });
        res.status(200).json({
            status: "Success",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

exports.getOneOrder = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.userID).populate("products.productID");
        res.status(200).json({
            status: "Success",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};