const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../middleware/AppError");
require("dotenv").config();

exports.RegisterUser = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.signInUser = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
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
            throw new AppError(400, "User was not created");
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

exports.getSingleUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (user) {
            res.status(200).json({
                status: "Success",
                data: user
            });
        } else {
            throw new AppError(400, "User does not exist");
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const { firstName, lastName, phoneNum } = req.body;
        const user = await userModel.findById(userID);

        if (!user) {
            throw new AppError(404, "User does not exist");
        }

        const update = await userModel.findByIdAndUpdate(user._id, {
            firstName,
            lastName,
            phoneNum
        }, { new: true });
        if (update) {
            res.status(200).json({
                status: "Success",
                data: update
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }

};
exports.deleteUser = async (req, res) => {
    try {
        const userID = req.params.id;

        const user = await userModel.findById(userID);
        if (!user)
            throw new AppError(404, "user does not exist");

        const remove = await userModel.findByIdAndDelete(user._id);
        if (remove) {
            res.status(200).json({
                status: "Success",
                message: "user deleted successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};