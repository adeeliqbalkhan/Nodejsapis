
const { constants } = require('../middleware/constants')
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "VALIDATION_ERROR", message: err.message })
            break;
        case constants.NOT_FOUND:
            res.json({ title: "NOT_FOUND", message: err.message })
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "UNAUTHORIZED", message: err.message })
            break;
        case constants.FORBIDDEN:
            res.json({ title: "FORBIDDEN", message: err.message })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "SERVER_ERROR", message: err.message })
            break;
        default:
            console.log("No Error, All good!")
            break;
    }


};

module.exports = errorHandler;  