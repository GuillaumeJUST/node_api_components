"use strict";
const Auth = require('./auth');
const Moment = require('moment');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    Auth.findOne({ idToken: token }, function (err, auth) {
        if (err || !auth) {
            return res.boom.unauthorized('Invalid Token', {internal: err});
        }
        if (tokenIsExpired(auth)) {
            return res.boom.unauthorized('Token expired');
        }
        req.body.idToken = auth.idToken;
        next();
    });
};

function tokenIsExpired(auth) {
    let momentCreatedAt = Moment(auth.created_at).add(auth.expiresIn, 'seconds');
    console.log(auth.created_at);
    console.log(auth.expiresIn);
    console.log(momentCreatedAt.toString());
    console.log(Moment().toString());
    return !Moment().isBefore(momentCreatedAt);
}

module.exports.checkToken = checkToken;