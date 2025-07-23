const billingService = require('../../src/services/billingService');
const subscriptionService = require('../../src/services/subscriptionService');
const currencyUtils = require('../../src/utils/currencyUtils');

jest.mock('../../src/services/subscriptionService');
jest.mock('../../src/utils/currencyUtils');

describe('billingService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('should have expected exported functions', () => {
    expect(typeof billingService.startBillingJob).toBe('function');
    expect(typeof billingService.getTransactions).toBe('function');
  });

  it('getTransactions should return an array of transactions with expected fields', async () => {
    // Mock getActiveSubscriptions to return a subscription that should be charged
    const mockSub = {
      donorId: 'd1',
      amount: 10,
      currency: 'USD',
      interval: 'monthly',
      lastCharged: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // more than a month ago
      campaignDescription: 'desc',
      tags: ['tag1'],
      summary: 'summary',
    };
    subscriptionService.getActiveSubscriptions.mockReturnValue([mockSub]);
    currencyUtils.convertToUSD.mockResolvedValue({ usdAmount: 12 });

    // Re-require billingService to get a fresh transactions array for each test run
    const freshBillingService = require('../../src/services/billingService');
    // Call processBilling directly (not exported, so call via setInterval simulation)
    // We'll simulate by calling startBillingJob and advancing timers, but for simplicity, let's call processBilling via a hack:
    freshBillingService.startBillingJob();
    jest.advanceTimersByTime(60000);
    await Promise.resolve();
    const result = freshBillingService.getTransactions();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual(
      expect.objectContaining({
        donorId: 'd1',
        amount: 10,
        amountUSD: 12,
        currency: 'USD',
        campaignSummary: 'summary',
      })
    );
  });
}); 