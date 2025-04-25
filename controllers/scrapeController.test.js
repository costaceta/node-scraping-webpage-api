const request = require('supertest');
const express = require('express');

import { scrapeController } from './scrapeController';
import { scrapeService } from '../services/scrapeService';

// Mock scrapeService
jest.mock('../services/scrapeService');

const app = express();
app.use(express.json());
app.post('/scrape', scrapeController);

describe('scrapeController', () => {
  it('should return 400 if URL is not provided', async () => {
    const response = await request(app).post('/scrape').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'URL is required in the request body',
    });
  });

  it('should return 200 and the scraped text if successful', async () => {
    const mockText = 'Hello World';
    scrapeService.mockResolvedValue(mockText);

    const response = await request(app)
      .post('/scrape')
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ text: mockText });
    expect(scrapeService).toHaveBeenCalledWith('http://example.com');
  });

  it('should return 500 if scrapeService throws an error', async () => {
    scrapeService.mockRejectedValue(new Error('Scraping failed'));

    const response = await request(app)
      .post('/scrape')
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to scrape the webpage',
      details: 'Scraping failed',
    });
  });
});
