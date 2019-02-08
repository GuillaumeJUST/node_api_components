"use strict";
const Firebase = require('../../datasources/firebase');
const logger = require('../../utils/logger');

const Controller = function (Auth) {

    const Obj = {};

    Obj.SignInWithEmail = function (req, res) {
        Firebase.SignInWithEmail(req.body.email, req.body.password);
    };

    return Obj;
};

module.exports = Controller;
