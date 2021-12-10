const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('@books-api/module-logger');

const config = require('../config');

const routes = require('../routes');

const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: '4mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(helmet());


function initialize() {
  logger.info('Start listening on port %d', config.port);
  routes(app);
  const server = app.listen(config.port, 'localhost', () => {
    logger.info(`  Server started on port %d (%s) - http://localhost:${config.port}`, config.port, config.env);
  });
  logger.info('  Process started: %d', process.pid);
  function handleExit(signal) {
    logger.info('    >>> Received %s on pid %s. Closing application. <<<', signal, process.pid);
    server.close();
  }
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception: %s', err.message);
    logger.info('%O', err);
  });
  process.on('SIGINT', handleExit);
  process.on('SIGQUIT', handleExit);
  process.on('SIGTERM', handleExit);
}

module.exports = initialize;
