const productModel = require("../../model/productModel");
const userModel = require("../../model/userModel");
const mongoose = require("mongoose");
const AppError = require("../../middleware/AppError");
const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

exports.getAllProduct = async (req, res, next) => {
    try {
        const product = await productModel.find().sort({ createdAt: "desc" });

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

        if (category != "food") {
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

        if (category != "clothing") {
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
exports.productVariation = async (req, res) => {
    try {
        const id = req.params.productID;
        const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
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

exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.productID);

        if (!product) {
            res.status(404).json({
                message: "Product does not exist"
            });
        }

        res.status(200).json({
            status: "Success",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error.message);
    }
};
exports.getSellerProducts = async (req, res) => {
    try {
        const userId = req.params.userID;

        const product = await productModel.find({ user: userId }).sort({ createdAt: "desc" });
        res.status(200).json({
            status: "Success",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
        console.log(error);
    }
};
exports.searchPost = async (req, res) => {
    const keyWord = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { brand: { $regex: req.query.search, $options: "i" } },
        ]
    } : {};

    const userWord = await productModel.find(keyWord);
    res.status(200).send(userWord);
};
exports.purchaseProduct = async (req, res) => {
    const { ids, quantities } = req.body;

    // Convert quantities array into numbers
    const parsedQuantities = quantities.map(quantity => parseInt(quantity));

    try {
        // Check if any of the quantities are invalid
        if (parsedQuantities.some(quantity => isNaN(quantity) || quantity < 1)) {
            return res.status(400).json({ error: 'Invalid quantity value' });
        }

        // Get the current products
        const currentProducts = await productModel.find({ _id: { $in: ids } });

        // Check if any of the products don't exist
        if (currentProducts.length !== ids.length) {
            return res.status(404).json({ error: 'One or more products not found' });
        }

        // Check if any of the products have insufficient quantity
        const insufficientQuantities = currentProducts.filter((product, index) => product.quantity < parsedQuantities[ index ]);
        if (insufficientQuantities.length > 0) {
            return res.status(400).json({ error: 'Insufficient quantity for one or more products' });
        }

        // Update the products
        const updateResults = await Promise.all(
            ids.map((id, index) =>
                productModel.updateOne({ _id: id }, { $inc: { quantity: -parsedQuantities[ index ] } })
            )
        );

        res.json({ success: true, updateResults });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.removeProduct = async (req, res) => {
    try {
        const productID = req.params.proID;
        const user = await userModel.findById(req.params.userID);
        const product = await productModel.findByIdAndDelete(productID);

        user.product.pull(product);
        user.save();

        res.status(200).json({
            status: "Success",
            message: "Product as been deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error);
    }
};

exports.updateOrderStatus = (req, res) => {
    productModel.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: AppError(err),
                });
            }
            res.json(order);
        }
    );
};