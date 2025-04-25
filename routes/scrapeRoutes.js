import express from 'express';
import { scrapeController } from '../controllers/scrapeController.js';

const router = express.Router();

// POST /scrape
router.post('/', scrapeController);

export default router;
