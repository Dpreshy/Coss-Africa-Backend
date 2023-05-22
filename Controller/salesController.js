const cron = require('node-cron');
const Sales = require("../model/SalesModel");
const Order = require("../model/orderModel");
// Schedule function to run at midnight every day
// cron.schedule('0 0 * * *', async () => {
//     // Calculate sales data for yesterday
//     const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
//     const startOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
//     const endOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1);

//     const sales = await Sale.find({
//         date: { $gte: startOfDay, $lt: endOfDay }
//     });

//     const totalSales = sales.length;
//     const totalRevenue = sales.reduce((acc, sale) => acc + sale.amount, 0);

//     // Update sales data for yesterday in database
//     await DailySales.findOneAndUpdate(
//         { date: yesterday },
//         { totalSales, totalRevenue },
//         { upsert: true }
//     );
// });

exports.dailyOrders = (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    Order.aggregate([
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
        res.send(result);
    })
        .catch(err => {
            console.error(err);
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