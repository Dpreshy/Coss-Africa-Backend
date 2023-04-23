const mongoose = require("mongoose");

const orderModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    order_No: { type: String, required: true },
    country: { type: String, required: true },
    shipping: { type: String },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    payment_method: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("orders", orderModel);