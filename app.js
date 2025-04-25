import express from 'express';

import scrapeRoutes from './routes/scrapeRoutes.js';
import { authenticateApiKey } from './middleware/authenticateApiKey.js';

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Aplica o middleware de autenticação globalmente
app.use(authenticateApiKey);

// Routes
app.use('/scrape', scrapeRoutes);

export default app;
