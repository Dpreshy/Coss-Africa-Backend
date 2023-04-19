const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MAIN_DATABASE).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});