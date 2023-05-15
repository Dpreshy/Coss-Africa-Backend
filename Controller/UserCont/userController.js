const userModel = require("../../model/userModel");
const adminModel = require("../../model/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../middleware/AppError");
const sendMail = require("../../utils/nodemailer");
require("dotenv").config();

const generateOTP = () => {
    let digits = "0123456789";
    let OTPCode = "";
    for (let i = 0; i < 6; i++) {
        OTPCode += digits[ Math.floor(Math.random() * 10) ];

    }
    return OTPCode;
};
exports.RegisterUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNum, password, isAdmin } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const OTP = generateOTP();

        const user = await adminModel.create({
            firstName,
            lastName,
            email,
            phoneNum,
            password: hashed,
            isAdmin,
            otp: OTP
        });
        await sendMail(user.firstName, user.email, OTP).then((info) => {
            console.log("mail sent", info);
        }).catch((err) => {
            console.log(err);
        });

        if (user) {

            return res.status(201).json({
                status: "Success",
                token: "Check Your Email to verify Your Account",
                data: user
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error);
    }
};
exports.signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await adminModel.findOne({ email });
            if (user) {
                const comparePassword = await bcrypt.compare(password, user.password);
                if (comparePassword) {
                    const getUser = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRED_DATE });

                    const { password, ...info } = user._doc;

                    res.status(200).json({
                        status: "Success",
                        data: user
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
        console.log(error);
    }
};

exports.verifyUser = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const { otp } = req.body;

        const getUser = await userModel.findById(userID);
        if (getUser.otp != otp) {
            throw new AppError(400, "Invalid OTP");
        }
        await userModel.findByIdAndUpdate(userID, { otp: "" }, { new: true });

        res.status(200).json({
            status: "Success",
            message: getUser
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error.message);
    }
};
exports.verifyUser2 = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const { otp } = req.body;

        const getUser = await adminModel.findById(userID);
        console.log(getUser.otp);
        if (getUser.otp != otp) {
            throw new AppError(400, "Invalid OTP");
        }
        await userModel.findByIdAndUpdate(userID, { otp: "" }, { new: true });

        res.status(200).json({
            status: "Success",
            message: getUser
        });

    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
        console.log(error.message);
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
exports.getAllCustomers = async (req, res) => {
    try {
        const user = await adminModel.find();

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
        const user = await userModel.findById(req.params.id).populate("product");

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
        // const { firstName, lastName, phoneNum } = req.body;
        const user = await adminModel.findById(userID);

        if (!user) {
            throw new AppError(404, "User does not exist");
        }

        const update = await userModel.findByIdAndUpdate(user._id, req.body, { new: true });
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