const productModel = require("../../model/productModel");
const userModel = require("../../model/userModel");
const mongoose = require("mongoose");
const AppError = require("../../middleware/AppError");

exports.getAllProduct = async (req, res, next) => {
    try {
        const product = await productModel.find();

        if (product < 1) {
            next(new AppError(404, "no product found"));
        }

        return res.status(200).json({
            status: "Success",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const userID = req.user.id;
        const getUser = await userModel.findById(userID);
        const { name, price, brand, category, type, quantity, condition, description } = req.body;

        if (!getUser.isSeler) {
            next(new AppError(404, "You are not allowed to perform this operation"));
        }

        const postProduct = await new productModel({
            name,
            price,
            quantity,
            category
        });

        postProduct.user = getUser;
        postProduct.save();

        getUser.product.push(mongoose.Types.ObjectId(postProduct._id));
        getUser.save();

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};
