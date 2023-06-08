const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    country: {
        type: String
    },
    apartment: {
        type: String
    },
    phone_No: {
        type: Number
    },
    state: {
        type: String
    },
    Localgovt: {
        type: String
    },
    nearestBusStop: {
        type: String
    },
    products: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            sellerID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            price: { type: Number },
            qty: { type: Number }
        }
    ],
    seller: { type: String },
    subtotal: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    order_No: { type: Number, required: true },
    country: { type: String, required: true },
    shippingFee: { type: Number },
    pending_days: { type: Number },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String },
    payment_method: { type: String, required: true },
    address: { type: String },
    notification: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("orders", orderModel);