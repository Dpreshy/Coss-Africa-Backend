const AppError = require("../../middleware/AppError");
const orderModel = require("../../model/orderModel");
const userModel = require("../../model/userModel");

exports.createOrder = async (req, res) => {
    try {
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
            req.params.id,
            { $set: req.body }, { new: true }
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
        const admin = req.params.userID;
        const order = req.paramas.orderID;

        const getUser = await userModel.findById(admin);
        if (getUser.isAdmin != true) {
            throw new AppError(404, "You can't parform this operation");
        }

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
        const order = await orderModel.find();
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
        const order = await orderModel.find({ userId: req.params.userID });
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