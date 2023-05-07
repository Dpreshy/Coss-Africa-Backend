const mongoose = require("mongoose");

const adminModel = mongoose.Schema({
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
    isAdmin: { type: Boolean, default: false },
    otp: {
        type: Number,
    },
    product: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    } ],


}, { timestamps: true });

module.exports = mongoose.model("admin-user", adminModel);