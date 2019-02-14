"use strict";

const Request = require("request");
const config = require('config');
const logger = require('../utils/logger');

const DataSource = function () {

    const ObjectFireBase = {};

    let call = function(uri, method, params, callback) {
        const fullUrl = config.get('firebase.api_url') + '/' + uri;
        let options = { method: method,
            url: fullUrl,
            qs: {
                key: config.get('firebase.api_key')
            },
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: params,
            json: true
        };

        Request(options, function (err, res, body) {
            logger.info('request', {method: method, url: fullUrl});
            logger.info('error', {error: err});
            logger.info('statusCode', {code: res && res.statusCode});
            logger.debug('body', body);
            if (res && res.statusCode !== 200) {
                logger.error('google api error', body);
                err = 'Google APi Bad request see log for mor information';
            }
            callback(err, body);
        });
    };

    let callPost = function(uri, params, callback) {
        call(uri, 'POST', params, callback);
    };

    ObjectFireBase.SignInWithEmail = function (email, password, callback) {
        let params = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        callPost('verifyPassword', params, function (err, res) {
            callback(err, res);
        });
    };

    ObjectFireBase.SignUpWithEmail = function (email, password, callback) {
        let params = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        callPost('signupNewUser', params, function (err, res) {
            callback(err, res);
        });
    };


    ObjectFireBase.updatePassword = function (token, password, callback) {
        let params = {
            idToken: token,
            password: password
        };
        callPost('setAccountInfo', params, function (err, res) {
            callback(err, res);
        });
    };

    return ObjectFireBase;
};

module.exports = DataSource();
