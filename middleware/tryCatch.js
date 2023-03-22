exports.tryCatch = (constroller) => async (req, res, next) => {
    try {
        await constroller(req, res);
    } catch (error) {
        return next(error);
    }
};