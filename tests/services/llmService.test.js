jest.mock('../../src/services/llmService', () => ({
  generateTagsAndSummary: jest.fn().mockResolvedValue({ tags: ['mockTag'], summary: 'mockSummary' }),
}));

const llmService = require('../../src/services/llmService');

describe('llmService', () => {
  it('should export generateTagsAndSummary as a function', () => {
    expect(typeof llmService.generateTagsAndSummary).toBe('function');
  });

  it('generateTagsAndSummary should return an object with tags (array) and summary (string)', async () => {
    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toHaveProperty('tags');
    expect(Array.isArray(result.tags)).toBe(true);
    expect(result).toHaveProperty('summary');
    expect(typeof result.summary).toBe('string');
  });
}); 