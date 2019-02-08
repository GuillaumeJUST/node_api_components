"use strict";
const Request = require("request");
const config = require('config');
const logger = require('../utils/logger');

const DataSource = function () {

    const ObjectFireBase = {};

    ObjectFireBase.SignInWithEmail = function (user, password, callback) {
        //todo change add function for connection
        var options = { method: 'POST',
            url: config.get('firebase.api_url'),
            qs: {
                key: config.get('firebase.api_key')
            },
            headers: {
                'Postman-Token': '5c7af76e-744d-403a-bc6b-23dd80bd9018',
                'cache-control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                    email: user,
                    password: password,
                    returnSecureToken: true
            }
        };

        Request(options, function (error, response, body) {
            //todo add promise
            if (error) throw new Error(error);

            console.log(body);
        });

    };

    return ObjectFireBase;
};

module.exports = DataSource();
