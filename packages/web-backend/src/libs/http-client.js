const fetch = require('node-fetch');
const logger = require('@books-api/module-logger');

/**
 * Wrapper to fetch
 */
async function client(url, data) {
  try {
    logger.info('Requesting url %s', url);
    const response = await fetch(url, data);
    if (!response.ok) {
      logger.error('Response faulty: %s %s', response.status, response.statusText);
      return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response.json());
  } catch (error) {
    logger.error('Received error during request from url: %s', error.message);
    return Promise.reject(new Error(error));
  }
}

module.exports = client;
