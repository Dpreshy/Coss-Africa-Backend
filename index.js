const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require("./utils/db");
require("dotenv").config();
const userRouter = require("./router/userRouter");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Cross Africa DataBase"
    });
});
app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(port, () => {
    console.log("LIstening to server");
});