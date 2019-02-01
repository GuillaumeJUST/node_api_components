"use strict";
const firebase = require('../../datasources/firebase');
const logger = require('../../utils/logger');

    const UserCtrl = function () {

    const UserObj = {};

    UserObj.GetUsers = function (req, res) {
        firebase.auth().listUsers(1000)
            .then(function (listUsersResult) {
                res.json({status: true, users: listUsersResult.users});
            })
            .catch(function (error) {
                logger.error("Error listing users:", error);
            });
    };

    return UserObj;
};

module.exports = UserCtrl;
