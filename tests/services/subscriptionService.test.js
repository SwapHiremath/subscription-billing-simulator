const subscriptionService = require('../../src/services/subscriptionService');
const storage = require('../../src/storage/subscriptionStorage');
const llmService = require('../../src/services/llmService');

jest.mock('../../src/storage/subscriptionStorage');
jest.mock('../../src/services/llmService');

describe('subscriptionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have expected exported functions', () => {
    expect(typeof subscriptionService.createSubscription).toBe('function');
    expect(typeof subscriptionService.cancelSubscription).toBe('function');
    expect(typeof subscriptionService.getActiveSubscriptions).toBe('function');
    expect(typeof subscriptionService.getActiveSubscriptionsDetailed).toBe('function');
  });

  it('createSubscription should call llmService and storage, and return subscription', async () => {
    llmService.generateTagsAndSummary.mockResolvedValue({ tags: ['a'], summary: 's' });
    const sub = await subscriptionService.createSubscription({ donorId: '1', amount: 10, currency: 'USD', interval: 'monthly', campaignDescription: 'desc' });
    expect(llmService.generateTagsAndSummary).toHaveBeenCalled();
    expect(storage.addSubscription).toHaveBeenCalledWith(expect.objectContaining({ donorId: '1', tags: ['a'], summary: 's' }));
    expect(sub).toHaveProperty('donorId', '1');
    expect(sub).toHaveProperty('tags', ['a']);
    expect(sub).toHaveProperty('summary', 's');
  });

  it('cancelSubscription should call storage.deactivateSubscription', () => {
    storage.deactivateSubscription.mockReturnValue(true);
    const result = subscriptionService.cancelSubscription('1');
    expect(storage.deactivateSubscription).toHaveBeenCalledWith('1');
    expect(result).toBe(true);
  });

  it('getActiveSubscriptions should call storage.getActiveSubscriptions', () => {
    storage.getActiveSubscriptions.mockReturnValue([{ donorId: '1', active: true }]);
    const result = subscriptionService.getActiveSubscriptions();
    expect(storage.getActiveSubscriptions).toHaveBeenCalled();
    expect(result).toEqual([{ donorId: '1', active: true }]);
  });

  it('getActiveSubscriptionsDetailed should map fields correctly', () => {
    storage.getActiveSubscriptions.mockReturnValue([
      { donorId: '1', amount: 10, currency: 'USD', interval: 'monthly', campaignDescription: 'desc', tags: ['a'], summary: 's' }
    ]);
    const result = subscriptionService.getActiveSubscriptionsDetailed();
    expect(result[0]).toEqual(expect.objectContaining({ donorId: '1', tags: ['a'], summary: 's' }));
  });
}); 