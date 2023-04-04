const productModel = require("../../model/productModel");
const userModel = require("../../model/userModel");
const mongoose = require("mongoose");
const AppError = require("../../middleware/AppError");
const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

exports.getAllProduct = async (req, res, next) => {
    try {
        const product = await productModel.find();

        if (product < 1) {
            throw new AppError(404, "no product found");
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
        const userID = req.params.id;
        const getUser = await userModel.findById(userID);
        const { name, price, brand, category, ram, quantity, condition, description, storage } = req.body;

        if (getUser.isSeller != true) {
            throw new AppError(404, "You are not allowed to perform this operation");
        }

        if (category != "phone") {
            throw new AppError(404, "this category does not exsit");
        }

        const image = async (path) => await cloudinary.uploads(path, "Images");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newPath = await image(path);

            urls.push(newPath);
            fs.unlinkSync(path);
        }

        const postProduct = new productModel({
            name,
            price,
            brand,
            ram,
            storage,
            condition,
            quantity,
            category,
            description,
            avatar: urls,
        });

        postProduct.user = getUser;
        postProduct.save();

        getUser.product.push(new mongoose.Types.ObjectId(postProduct._id));
        getUser.save();

        res.status(201).json({
            status: "Success",
            data: postProduct
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error);
    }
};
exports.createFood = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const getUser = await userModel.findById(userID);
        const { name, price, brand, category, ram, quantity, condition, description, storage } = req.body;

        if (getUser.isSeller != true) {
            throw new AppError(404, "You are not allowed to perform this operation");
        }

        if (category != "food and groceries") {
            throw new AppError(404, "this category does not exsit");
        }

        const image = async (path) => await cloudinary.uploads(path, "Images");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newPath = await image(path);

            urls.push(newPath);
            fs.unlinkSync(path);
        }

        const postProduct = new productModel({
            name,
            price,
            brand,
            description,
            category,
            avatar: urls
        });

        postProduct.user = getUser;
        postProduct.save();

        getUser.product.push(new mongoose.Types.ObjectId(postProduct._id));
        getUser.save();

        res.status(201).json({
            status: "Success",
            data: postProduct
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error);
    }
};
exports.createCloth = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const getUser = await userModel.findById(userID);
        const { name, price, brand, category, gender, type, condition, description } = req.body;

        if (getUser.isSeller != true) {
            throw new AppError(404, "You are not allowed to perform this operation");
        }

        if (category != "clothing and fashion") {
            throw new AppError(404, "this category does not exsit");
        }

        const image = async (path) => await cloudinary.uploads(path, "Images");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newPath = await image(path);

            urls.push(newPath);
            fs.unlinkSync(path);
        }
        const postProduct = new productModel({
            name,
            price,
            brand,
            gender,
            condition,
            type,
            description,
            category,
            avatar: urls
        });

        postProduct.user = getUser;
        postProduct.save();

        getUser.product.push(new mongoose.Types.ObjectId(postProduct._id));
        getUser.save();

        res.status(201).json({
            status: "Success",
            data: postProduct
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error);
    }
};
exports.createElectronics = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const getUser = await userModel.findById(userID);
        const { name, price, brand, category, model, quantity, condition, description } = req.body;

        if (getUser.isSeller != true) {
            throw new AppError(404, "You are not allowed to perform this operation");
        }

        if (category != "electronics") {
            throw new AppError(404, "this category does not exsit");
        }

        const image = async (path) => await cloudinary.uploads(path, "Images");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;
            const newPath = await image(path);

            urls.push(newPath);
            fs.unlinkSync(path);
        }

        const postProduct = new productModel({
            name,
            price,
            brand,
            model,
            condition,
            description,
            category,
            avatar: urls
        });

        postProduct.user = getUser;
        postProduct.save();

        getUser.product.push(new mongoose.Types.ObjectId(postProduct._id));
        getUser.save();

        res.status(201).json({
            status: "Success",
            data: postProduct
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error);
    }
};

exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.productID);

        if (!product) {
            throw new AppError(404, "Product as not been created");
        }

        res.status(200).json({
            status: "Success",
            data: product
        });
    } catch (error) {
        res.status(error).json({
            status: "Fail",
            message: error.message
        });
    }
};