const express = require('express');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/scrape', scrapeRoutes);

module.exports = app;
