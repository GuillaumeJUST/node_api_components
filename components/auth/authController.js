"use strict";
const Firebase = require('../../datasources/firebase');

const Controller = function (Auth) {

    const Obj = {};

    let saveToken = function(response, next) {
        const newAuth = new Auth(response);
        newAuth.save(function (err, auth) {
            next(err, auth);
        });
    };

    Obj.SignInWithEmail = function (req, res) {
        Firebase.SignInWithEmail(req.body.email, req.body.password, function (err, response) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            saveToken(response, function(err, auth) {
                if (err) return res.boom.badRequest('Something went wrong', {internal: err});
                res.json({status: true, auth: auth});
            });
        });
    };

    Obj.SignUpWithEmail = function (req, res) {
        Firebase.SignUpWithEmail(req.body.email, req.body.password, function (err, response) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            saveToken(response, function(err, auth) {
                if (err) return res.boom.badRequest('Something went wrong', {internal: err});
                res.json({status: true, auth: auth});
            });
        });
    };

    Obj.updatePassword = function (req, res) {
        Firebase.updatePassword(req.body.token, req.body.password, function (err, response) {
            if (err) return res.boom.badRequest('Something went wrong', {internal: err});
            saveToken(response, function(err, auth) {
                if (err) return res.boom.badRequest('Something went wrong', {internal: err});
                res.json({status: true, auth: auth});
            });
        });
    };

    return Obj;
};

module.exports = Controller;
