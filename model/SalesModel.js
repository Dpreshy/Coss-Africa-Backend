const mongoose = require("mongoose");

const salesModel = mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    customerName: String,
    saleDate: Date,
    saleAmount: Number,
    salesTotal: Number
});

module.exports = mongoose.model("sales", salesModel);