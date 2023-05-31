const Sales = require("../model/SalesModel");
const orderModel = require("../model/orderModel");

exports.dailyOrders = (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    orderModel.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfDay, $lte: endOfDay }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' }
                },
                totalQty: { $sum: '$totalQty' },
                subtotal: { $sum: '$subtotal' }
            }
        }
    ]).then(result => {
        res.status(200).json({
            status: "Success",
            data: result
        });
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.dailyProduct = (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    Product.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
    }, (err, products) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            res.send(products);
        }
    });
};