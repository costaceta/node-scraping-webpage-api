const axios = require('axios');

import { scrapeService } from './scrapeService';

// Mock axios
jest.mock('axios');

describe('scrapeService', () => {
  it('should scrape and extract text from a webpage', async () => {
    const mockHtml = `
      <html>
        <body>
          <h1>Hello World</h1>
          <p>This is a test.</p>
          <script>console.log('This should be removed');</script>
        </body>
      </html>
    `;

    axios.get.mockResolvedValue({ data: mockHtml });

    const url = 'http://example.com';
    const result = await scrapeService(url);

    const expectedText = 'Hello World This is a test.';

    expect(result).toBe(expectedText);
    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should handle empty body gracefully', async () => {
    const mockHtml = `<html><body></body></html>`;

    axios.get.mockResolvedValue({ data: mockHtml });

    const url = 'http://example.com';
    const result = await scrapeService(url);

    const expectedText = '';

    expect(result).toBe(expectedText);
  });

  it('should throw an error if the request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    const url = 'http://example.com';

    await expect(scrapeService(url)).rejects.toThrow('Network error');
  });
});
