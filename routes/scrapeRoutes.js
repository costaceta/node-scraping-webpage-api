const express = require('express');
const { scrapeController } = require('../controllers/scrapeController');

const router = express.Router();

// POST /scrape
router.post('/', scrapeController);

module.exports = router;
