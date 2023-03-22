const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../middleware/AppError");
const { tryCatch } = require("../middleware/tryCatch");
require("dotenv").config();

exports.RegisterUser = tryCatch(async (req, res) => {
    const { firstName, lastName, email, phoneNum, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
        firstName,
        lastName,
        email,
        phoneNum,
        password: hashed
    });

    if (user) {
        return res.status(201).json({
            status: "Success",
            data: user
        });
    }

    throw new Error("internal server error");


});

exports.signInUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = await userModel.findOne({ email });
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (comparePassword) {
                const getUser = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRED_DATE });

                res.status(200).json({
                    status: "Success",
                    token: getUser
                });
            } else {
                throw new AppError(400, "Invalid password");
            }
        } else {
            throw new AppError(400, "User not found");
        }
    } else {
        throw new AppError(400, "User eamil and password must be added");
    }
});

exports.getAll = tryCatch(async (req, res) => {
    const user = await userModel.find();

    if (user <= 0) {
        throw new AppError(400, "no recorde found");
    }
    if (user) {
        res.status(200).json({
            status: "Success",
            data: user
        });
    } else {
        throw new Error("internal server error");
    }
});

exports.getSingleUser = tryCatch(async (req, res) => {
    const user = await userModel.findById(req.params.id);

    if (user) {
        res.status(200).json({
            status: "Success",
            data: user
        });
    } else {
        throw new AppError(400, "User does not exist");
    }
});