const request = require('supertest');
const express = require('express');

import { scrapeController } from './scrapeController';
import { scrapeService } from '../services/scrapeService';
import { authenticateApiKey } from '../middleware/authenticateApiKey';

// Mock scrapeService
jest.mock('../services/scrapeService');

const app = express();
app.use(express.json());
app.use(authenticateApiKey);
app.post('/scrape', scrapeController);

describe('scrapeController', () => {
  const validApiKey = 'valid-api-key';

  beforeAll(() => {
    process.env.API_KEY = validApiKey;
  });

  it('should return 400 if URL is not provided', async () => {
    const response = await request(app)
      .post('/scrape')
      .set('x-api-key', validApiKey)
      .send({});

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
      .set('x-api-key', validApiKey)
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ text: mockText });
    expect(scrapeService).toHaveBeenCalledWith('http://example.com');
  });

  it('should return 500 if scrapeService throws an error', async () => {
    scrapeService.mockRejectedValue(new Error('Scraping failed'));

    const response = await request(app)
      .post('/scrape')
      .set('x-api-key', validApiKey)
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to scrape the webpage',
      details: 'Scraping failed',
    });
  });

  it('should return 403 if API key is missing', async () => {
    const response = await request(app)
      .post('/scrape')
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: 'Acesso negado: chave de API inválida',
    });
  });

  it('should return 403 if API key is invalid', async () => {
    const response = await request(app)
      .post('/scrape')
      .set('x-api-key', 'invalid-api-key')
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: 'Acesso negado: chave de API inválida',
    });
  });
});
