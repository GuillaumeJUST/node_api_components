"use strict";

const {check} = require('express-validator/check');
const Validation = require('../../utils/validation');

module.exports.getValidations = getValidations;
module.exports.checkValidationResult = Validation;

function getValidations(type) {
    let validations = [];
    if (type === 'loginWithEmail') {
        validations.push(check('email').isLength({ min: 3 }).withMessage('Email is required'));
        validations.push(check('password').isLength({ min: 3 }).withMessage('Password is required'));
    }

    return validations;
}