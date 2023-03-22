const AppError = require("./AppError");

const errorHandler = async (error, req, res, next) => {

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message
        });
    }
    console.log(error);
    res.status(error.statusCode || 500).send(error.message || "internal server error");
};

module.exports = errorHandler;
