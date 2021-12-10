const logger = require('@books-api/module-logger');
const bootstrap = require('./src/bootstrap');

logger.info('Initializing backend');

// Bootstrap application
(async function initialize() {
  await bootstrap();
})();

logger.info('Backend ready');
