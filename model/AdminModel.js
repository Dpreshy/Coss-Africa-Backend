const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNum: {
        type: Number
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String
    },
    avatar: { type: String },
    otp: {
        type: Number,
    }

}, { timestamps: true });

module.exports = mongoose.model("admin-user", userModel);