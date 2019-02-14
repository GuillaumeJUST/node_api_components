"use strict";

const {check} = require('express-validator/check');
const Validation = require('../../utils/validation');

module.exports.getValidations = getValidations;
module.exports.checkValidationResult = Validation;

function getValidations(type) {
    let validations = [];
    let items = getValidationItems(type);
    items.forEach(function(itemName) {
        switch (itemName) {
            case 'idToken' :
                validations.push(check('idToken').isLength({ min: 3 }).withMessage('Token is required'));
                break;
            case 'password' :
                validations.push(check('password').isLength({ min: 3 }).withMessage('Password is required'));
                break;
            case 'email' :
                validations.push(check('email').isLength({ min: 3 }).withMessage('Email is required'));
                break;
        }
    });

    return validations;
}

function getValidationItems(type) {
    let items = [];
    switch (type) {
        case 'loginWithEmail' :
            items = ['password', 'email'];
            break;
        case 'updatePassword' :
            items = ['password', 'idToken'];
            break;
        case 'signOut' :
            items = ['idToken'];
            break;
    }

    return items;
}

