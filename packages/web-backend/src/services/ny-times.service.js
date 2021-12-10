const logger = require('@books-api/module-logger');
const fetch = require('../libs/http-client');
const config = require('../config');

/**
 * Retrieve categories list from NY Times API
 * @returns {Promise<any>}
 */
async function getList() {
  logger.info('Requesting list from NY Times');
  const url = 'https://api.nytimes.com/svc/books/v3/lists/names.json';
  const results = await fetch(`${url}?api-key=${config.nyTimesKey}`);
  return results;
}

/**
 * Retrieve books from list
 * @param list
 * @returns {Promise<*>}
 */
async function getBooks(list) {
  const url = 'https://api.nytimes.com/svc/books/v3/lists.json';
  logger.info('Requesting category %s from NY Times', list);
  if (!list) {
    logger.error('List required for NY Times book query');
    throw new Error('List is required');
  }
  const results = await fetch(`${url}?api-key=${config.nyTimesKey}&list=${list}`);
  return results;
}

module.exports = { getList, getBooks };
