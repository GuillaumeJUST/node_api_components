"use strict";

const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');
let appDb = config.get('app.db');

mongoose.connect(appDb, {useNewUrlParser: true});
mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + appDb);
});

module.exports = mongoose;
