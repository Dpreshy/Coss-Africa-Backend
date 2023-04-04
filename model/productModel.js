const mongoose = require("mongoose");

const productModel = mongoose.Schema({
    name: {
        type: String
    },
    brand: {
        type: String
    },
    condition: {
        type: String
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    description: {
        type: String
    },
    storage: {
        type: String
    },
    ram: {
        type: String
    },
    type: {
        type: String
    },
    gender: {
        type: String
    },
    model: {
        type: String
    },
    avatar: [ {
        url: {
            type: String,
        }
    } ],
    category: {
        type: String,
        enum: [ "phone", "food and groceries", "clothing and fashion", "electronics" ],
        required: [ true, "Please put in a category" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    selerProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

}, { timestamps: true });

module.exports = mongoose.model("products", productModel);