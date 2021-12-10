const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Books API up and running');
});

module.exports = router;
