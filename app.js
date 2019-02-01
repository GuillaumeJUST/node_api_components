const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const config = require('config');
const expressValidator = require('express-validator');
const boom = require('express-boom');

const routes = require('./router/router');

const app = express();

app.use(boom());
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

logger.debug("Overriding 'Express' logger");
app.use(morgan('tiny', {stream: logger.stream}));

app.use('/api', routes);
if (config.get('develop')) {
    app.use('/coverage', express.static('coverage'));
}

// catch 404 and forward to error handler
app.use(function (req, res) {
    logger.error(`${req.status || 500} - ${req.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.boom.notFound('route not found');
});

module.exports = app;
