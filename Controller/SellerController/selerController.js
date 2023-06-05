const userModel = require("../../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../../middleware/AppError");
require("dotenv").config();
const { sendMail } = require("../../utils/nodemailer");
const cloudinary = require("../../utils/cloudinary");
const fs = require("fs");

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
        const { firstName, lastName, email, companyName, phoneNum, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const OTP = generateOTP();

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            companyName,
            phoneNum,
            password: hashed,
            isSeller: true,
            status: "pending",
            otp: OTP
        });

        await sendMail(user.firstName, user.email, OTP).then((info) => {
            console.log("mail sent", info);
        }).catch((err) => {
            console.log(err);
        });
        // 
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
            message: error
        });
        console.log(error);
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
    }
};

exports.updateUser2 = async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await userModel.findById(userID);

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
        // console.log(error);
    }

};
exports.updateUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const {
            firstName,
            lastName,
            phoneNum,
            CACNumber,
            companyName,
            country,
            IDtype,
            address2,
            address,
            gender,
            city,
            DateOfBirth,
            shippingFrom
        } = req.body;
        const user = await userModel.findById(userID);

        if (!user) {
            throw new AppError(404, "User does not exist");
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

        const update = await userModel.findByIdAndUpdate(user._id, {
            firstName,
            lastName,
            phoneNum,
            CACNumber,
            companyName,
            country,
            IDtype,
            address2,
            address,
            gender,
            city,
            DateOfBirth,
            shippingFrom,
            avatar: urls
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
        console.log(error);
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
