const {check, validationResult} = require('express-validator/check');

module.exports = function checkValidationResult(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.boom.badRequest(result.array()[0].msg);
    } else {
        next();
    }
};