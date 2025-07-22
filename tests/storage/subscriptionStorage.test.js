const subscriptionStorage = require('../../src/storage/subscriptionStorage');

describe('subscriptionStorage', () => {
  it('should have expected exported functions', () => {
    expect(typeof subscriptionStorage.addSubscription).toBe('function');
    expect(typeof subscriptionStorage.deactivateSubscription).toBe('function');
    expect(typeof subscriptionStorage.getActiveSubscriptions).toBe('function');
    expect(typeof subscriptionStorage.getAllSubscriptions).toBe('function');
  });
}); 