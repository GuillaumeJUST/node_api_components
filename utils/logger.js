const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, prettyPrint} = format;
const packageJson = require('../package.json');

const options = {
    file: {
        level: 'info',
        filename: `./logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: format.simple()
    },
};

const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    format: combine(
        label({label: packageJson.name}),
        timestamp(),
        prettyPrint()
    ),
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function (message) {
        logger.info(message);
    },
};

module.exports = logger;
