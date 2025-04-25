import { scrapeService } from '../services/scrapeService.js';

// Controller to handle scraping requests
export const scrapeController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ error: 'URL is required in the request body' });
  }

  try {
    const text = await scrapeService(url);
    res.json({ text });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to scrape the webpage', details: error.message });
  }
};
