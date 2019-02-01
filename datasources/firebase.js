"use strict";


const config = require('config');
let firebaseAdmin = null;

if (config.get('firebase') !== false) {
    const firebaseAdmin = require("firebase-admin");
    /** @namespace config.firebase */
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(config.get('firebase.cert')),
        databaseURL: config.get('firebase.databaseURL')
    });
}

module.exports = firebaseAdmin;
