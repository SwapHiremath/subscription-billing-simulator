const llmService = require('../../src/services/llmService');

describe('llmService', () => {
  it('should export generateTagsAndSummary as a function', () => {
    expect(typeof llmService.generateTagsAndSummary).toBe('function');
  });
}); 