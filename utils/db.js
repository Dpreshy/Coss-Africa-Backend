const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.LOCAL_URL).then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});