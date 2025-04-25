import axios from 'axios';
import * as cheerio from 'cheerio';

// Service to scrape a webpage and extract text
export const scrapeService = async (url) => {
  const response = await axios.get(url);
  const html = response.data;

  // Load the HTML into cheerio
  const $ = cheerio.load(html);

  // Remove unnecessary elements
  $('iframe, script, style, noscript').remove();

  // Ensure spaces between inline elements are preserved
  $('body *').each(function () {
    const element = $(this);
    if (element.text().trim() !== '') {
      element.text(element.text().trim() + ' ');
    }
  });

  // Extract and normalize text
  const text = $('body').text();
  return text.replace(/\s+/g, ' ').trim();
};

