const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const db = require("./utils/db");
require("dotenv").config();
const userRouter = require("./router/userRouter");
const selerRouter = require("./router/selerRouter");
const productRouter = require("./router/productRouter");
const orderRouter = require("./router/orderRouter");

const port = process.env.PORT || 3000;
const app = express();
db;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Cross Africa DataBase"
    });
});
app.use("/api/user", userRouter);
app.use("/api/seler", selerRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log("LIstening to server");
});
