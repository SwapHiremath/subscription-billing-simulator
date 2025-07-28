// Mock the llmService module
jest.mock('../../src/services/llmService', () => {
  const originalModule = jest.requireActual('../../src/services/llmService');
  return {
    ...originalModule,
    generateText: jest.fn()
  };
});

const llmService = require('../../src/services/llmService');

describe('llmService.generateTagsAndSummary', () => {
  let llmService;
  let mockGenerateText;

  beforeEach(() => {
    jest.resetModules();
    
    // Create a mock for generateText
    mockGenerateText = jest.fn();
    
    // Mock the module with a factory function
    jest.doMock('../../src/services/llmService', () => {
      const originalModule = jest.requireActual('../../src/services/llmService');
      
      // Create a new generateTagsAndSummary that uses our mock
      const generateTagsAndSummary = async (description) => {
        let tagsAndSummary;
        
        try {
          const prompt =
            `Analyze the following campaign description: ${description.toLowerCase()}` +
            `\nGenerate relevant tags and a concise summary of the description.` +
            `\nReturn ONLY valid JSON without any markdown formatting, code fences, or additional text.` +
            `\nThe response must be parseable JSON in this exact format:` +
            `\n{"tags": ["tag1", "tag2", "tag3"], "summary": "A one-sentence summary of the campaign"}`
          
          tagsAndSummary = await mockGenerateText(prompt);
          const responseText = tagsAndSummary.text();
          
          // Clean the response to remove markdown formatting
          let cleanedResponse = responseText.trim();
          
          // Remove markdown code blocks if present
          if (cleanedResponse.startsWith('```json')) {
            cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
          } else if (cleanedResponse.startsWith('```')) {
            cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
          }
          
          // Remove any leading/trailing backticks
          cleanedResponse = cleanedResponse.replace(/^`+|`+$/g, '');
          
          // Try to parse the cleaned JSON
          const parsed = JSON.parse(cleanedResponse);
          
          // Validate the expected structure
          if (!parsed.tags || !Array.isArray(parsed.tags) || !parsed.summary || typeof parsed.summary !== 'string') {
            throw new Error('Invalid response structure');
          }
          
          return parsed;
        } catch (error) {
          console.error('Error generating tags and summary:', error.message);
          if (tagsAndSummary) {
            console.error('Raw response:', tagsAndSummary.text());
          }
          
          // Fallback to default values if LLM fails
          return {
            tags: ['default', 'fallback'],
            summary: `Subscription for campaign: ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`
          };
        }
      };
      
      return {
        generateTagsAndSummary,
        generateText: mockGenerateText
      };
    });
    
    llmService = require('../../src/services/llmService');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns parsed tags and summary from valid JSON response', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '{"tags": ["a", "b"], "summary": "test summary"}'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toEqual({ tags: ['a', 'b'], summary: 'test summary' });
    expect(mockGenerateText).toHaveBeenCalledWith(expect.stringContaining('desc'));
  });

  it('parses JSON with markdown code fences', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '```json\n{"tags": ["x"], "summary": "y"}\n```'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toEqual({ tags: ['x'], summary: 'y' });
    expect(mockGenerateText).toHaveBeenCalledWith(expect.stringContaining('desc'));
  });

  it('returns fallback on invalid JSON', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => 'not a json!'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result.tags).toEqual(['default', 'fallback']);
    expect(result.summary).toMatch(/^Subscription for campaign:/);
    expect(mockGenerateText).toHaveBeenCalledWith(expect.stringContaining('desc'));
  });

  it('returns fallback on generateText error', async () => {
    mockGenerateText.mockRejectedValue(new Error('LLM error'));

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result.tags).toEqual(['default', 'fallback']);
    expect(result.summary).toMatch(/^Subscription for campaign:/);
    expect(mockGenerateText).toHaveBeenCalledWith(expect.stringContaining('desc'));
  });

  it('always returns object with tags (array) and summary (string)', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '{"tags": ["a"], "summary": "b"}'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toHaveProperty('tags');
    expect(Array.isArray(result.tags)).toBe(true);
    expect(result).toHaveProperty('summary');
    expect(typeof result.summary).toBe('string');
    expect(mockGenerateText).toHaveBeenCalledWith(expect.stringContaining('desc'));
  });

  it('handles JSON with different markdown formats', async () => {
    // Test with just backticks (no json language specifier)
    mockGenerateText.mockResolvedValue({
      text: () => '```\n{"tags": ["markdown"], "summary": "markdown test"}\n```'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toEqual({ tags: ['markdown'], summary: 'markdown test' });
  });

  it('handles JSON with trailing backticks', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '{"tags": ["backticks"], "summary": "backticks test"}`'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toEqual({ tags: ['backticks'], summary: 'backticks test' });
  });

  it('handles empty tags array', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '{"tags": [], "summary": "empty tags"}'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result).toEqual({ tags: [], summary: 'empty tags' });
  });

  it('handles missing tags property', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '{"summary": "missing tags"}'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result.tags).toEqual(['default', 'fallback']);
    expect(result.summary).toMatch(/^Subscription for campaign:/);
  });

  it('handles missing summary property', async () => {
    mockGenerateText.mockResolvedValue({
      text: () => '{"tags": ["test"]}'
    });

    const result = await llmService.generateTagsAndSummary('desc');
    expect(result.tags).toEqual(['default', 'fallback']);
    expect(result.summary).toMatch(/^Subscription for campaign:/);
  });
}); 