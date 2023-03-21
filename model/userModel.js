const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNum: {
        type: number
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    companyName: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    location: {
        type: String
    },
    product: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    } ],
    isAdmin: {
        type: Boolean,
    },
    isSeller: {
        type: Boolean
    },
    otp: {
        type: Number
    }

}, { timestamps: true });

module.exports = mongoose.model("users", userModel);