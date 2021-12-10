const logger = require('@books-api/module-logger');
const fetch = require('../libs/http-client');

/**
 * Retrieve book list from Google Books API
 * @returns {Promise<any>}
 */
async function getDetails(isbn) {
  logger.info('Requesting details from Google Books ISBN %s', isbn);
  if (!isbn) {
    logger.error('ISBN required for Google Books query');
    throw new Error('ISBN is required');
  }
  const url = 'https://www.googleapis.com/books/v1/volumes';
  const result = await fetch(`${url}?q=isbn:${isbn}`);
  return result;
}

module.exports = { getDetails };
