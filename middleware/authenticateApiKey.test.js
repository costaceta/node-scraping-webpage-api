const express = require('express');
const request = require('supertest');
const { authenticateApiKey } = require('./authenticateApiKey');

describe('authenticateApiKey middleware', () => {
  const validApiKey = 'valid-api-key';
  let app;

  beforeAll(() => {
    process.env.API_KEY = validApiKey;
  });

  beforeEach(() => {
    app = express();
    app.use(authenticateApiKey);
    app.get('/test', (req, res) => res.status(200).send('Success'));
  });

  it('should return 403 if API key is missing', async () => {
    const response = await request(app).get('/test');

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: 'Acesso negado: chave de API inválida',
    });
  });

  it('should return 403 if API key is invalid', async () => {
    const response = await request(app)
      .get('/test')
      .set('x-api-key', 'invalid-api-key');

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: 'Acesso negado: chave de API inválida',
    });
  });

  it('should call next if API key is valid', async () => {
    const response = await request(app)
      .get('/test')
      .set('x-api-key', validApiKey);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Success');
  });
});
