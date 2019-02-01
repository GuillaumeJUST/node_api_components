const logger = require('../utils/logger');

logger.info('Process start with : ' + process.env.NODE_ENV);

require('./appTesting');
require('../components/todos/todosTesting');
