const express = require("express");
const cors = require("cors");

const port = 3001;
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