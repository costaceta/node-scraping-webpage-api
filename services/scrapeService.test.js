const axios = require('axios');

import { scrapeService } from './scrapeService';

// Mock axios
jest.mock('axios');

describe('scrapeService', () => {
  it('should scrape and extract text from a webpage', async () => {
    // Mock HTML content
    const mockHtml = `
      <html>
        <body>
          <h1>Hello World</h1>
          <p>This is a test.</p>
          <script>console.log('This should be removed');</script>
        </body>
      </html>
    `;

    // Mock axios response
    axios.get.mockResolvedValue({ data: mockHtml });

    // Call the service
    const url = 'http://example.com';
    const result = await scrapeService(url);

    // Expected text after processing
    const expectedText = 'Hello World This is a test.';

    // Assertions
    expect(result).toBe(expectedText);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should handle empty body gracefully', async () => {
    // Mock empty HTML content
    const mockHtml = `<html><body></body></html>`;

    // Mock axios response
    axios.get.mockResolvedValue({ data: mockHtml });

    // Call the service
    const url = 'http://example.com';
    const result = await scrapeService(url);

    // Expected text after processing
    const expectedText = '';

    expect(result).toBe(expectedText);
  });
});
