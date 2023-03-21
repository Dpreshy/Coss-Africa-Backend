const express = require("express");
const cors = require("cors");
require("./utils/db");
require("dotenv").config();


const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Cross Africa DataBase"
    });
});

app.listen(port, () => {
    console.log("LIstening to server");
});