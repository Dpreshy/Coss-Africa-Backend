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
    companyName: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    bankName: {
        type: String
    },
    accountName: {
        type: String
    },
    accountNumber: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    address2: {
        type: String
    },
    state: {
        type: String
    },
    Localgovt: {
        type: String
    },
    shopName: {
        type: String
    },
    apartment: {
        type: String
    },
    NearestBusStop: {
        type: String
    },
    uploadValidIdCard: {
        type: String
    },
    postalCode: {
        type: String
    },
    IDtype: {
        type: String
    },
    CACNumber: {
        type: Number
    },
    avatar: [
        {
            name: { type: String },
            url: { type: String }
        }
    ],
    gender: {
        type: String
    },
    city: {
        type: String
    },
    DateOfBirth: {
        type: String
    },
    shippingFrom: {
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