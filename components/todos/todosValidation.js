"use strict";

const {check} = require('express-validator/check');
const Validation = require('../../utils/validation');

module.exports.getValidations = getValidations;
module.exports.checkValidationResult = Validation;

function getValidations(type) {
    let validations = [];
    if (type === 'create' || type === 'update') {
        validations.push(check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'));
        validations.push(check('completed').optional().isBoolean().withMessage('Completed must be a boolean'));
    }

    if (type === 'findById' || type === 'update') {
        validations.push(check('todo_id').exists().withMessage('Id is required'));
    }

    return validations;
}