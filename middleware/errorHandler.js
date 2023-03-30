const AppError = require("./AppError");

const errorHandler = async (error, req, res, next) => {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    res.status(error.statusCode || 500).send(error.message || "internal server error");
};

module.exports = errorHandler;
