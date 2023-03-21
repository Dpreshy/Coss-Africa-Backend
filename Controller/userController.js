const { asyncHandler } = require("../middleware/asyncHandler");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res) => {
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