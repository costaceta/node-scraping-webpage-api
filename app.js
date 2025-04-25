import express from 'express';

import scrapeRoutes from './routes/scrapeRoutes.js';

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/scrape', scrapeRoutes);

export default app;
