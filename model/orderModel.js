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
            qty: { type: Number }
        }
    ],
    seller: { type: String },
    subtotal: { type: Number, required: true },
    totalQty: { type: Number, required: true },
    order_No: { type: Number, required: true },
    country: { type: String, required: true },
    shipping: { type: String },
    pending_days: { type: String },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String },
    payment_method: { type: String, required: true },
    address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("orders", orderModel);