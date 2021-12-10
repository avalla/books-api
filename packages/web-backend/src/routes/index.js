const logger = require('@books-api/module-logger');
const index = require('./index.route');
const nyTimes = require('./books.route');

function initialize(app) {
  logger.info('Initializing routes');
  app.use('/', index);
  app.use('/api/v1/books', nyTimes);
  logger.info('Routes ready');
}

module.exports = initialize;
