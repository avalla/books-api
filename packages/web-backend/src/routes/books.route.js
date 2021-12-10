const express = require('express');
const logger = require('@books-api/module-logger');
const services = require('../services');

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    logger.info('NY Times > Requested categories');
    const { results } = await services.nyTimes.getList();
    logger.info('NY Times > Categories, %s items', results.length);
    res.json({
      results,
    });
  } catch (error) {
    logger.error('NY Times > Error during remote request', error.toString());
    res.status(500).send({
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
});
router.get('/books/:list', async (req, res) => {
  const { list } = req.params;

  async function getData(book) {
    const isbn = book?.book_details[0]?.primary_isbn13; // Sorry, gbooks apis returns an array :\
    const { items } = await services.gBooks.getDetails(isbn);
    const [details] = items;
    return {
      ...book,
      previewLink: details?.volumeInfo?.previewLink,
    };
  }

  try {
    logger.info('NY Times > Requested books %s', list);
    const { results } = await services.nyTimes.getBooks(list);
    const result = await Promise.all(results.map(getData));
    logger.info('NY Times > Books, %s items', results.length);
    res.json({
      result,
    });
  } catch (error) {
    logger.error('NY Times > Error during remote request', error.toString());
    res.status(500).send({
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;
