const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone_No: {
        type: String
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    apartment: {
        type: String
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
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    seller: { type: String },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    price: { type: Number, required: true },
    order_No: { type: String, required: true },
    country: { type: String, required: true },
    shipping: { type: String },
    pending_days: { type: String },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String },
    payment_method: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("orders", orderModel);