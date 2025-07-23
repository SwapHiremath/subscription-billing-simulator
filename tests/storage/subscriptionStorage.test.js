const subscriptionStorage = require('../../src/storage/subscriptionStorage');

describe('subscriptionStorage', () => {
  beforeEach(() => {
    // Reset the internal subscriptions array
    while (subscriptionStorage.getAllSubscriptions().length) {
      subscriptionStorage.getAllSubscriptions().pop();
    }
  });

  it('should have expected exported functions', () => {
    expect(typeof subscriptionStorage.addSubscription).toBe('function');
    expect(typeof subscriptionStorage.deactivateSubscription).toBe('function');
    expect(typeof subscriptionStorage.getActiveSubscriptions).toBe('function');
    expect(typeof subscriptionStorage.getAllSubscriptions).toBe('function');
  });

  it('addSubscription and getAllSubscriptions should work', () => {
    const sub = { donorId: '1', active: true };
    subscriptionStorage.addSubscription(sub);
    expect(subscriptionStorage.getAllSubscriptions()).toContain(sub);
  });

  it('deactivateSubscription should deactivate an active subscription', () => {
    const sub = { donorId: '1', active: true };
    subscriptionStorage.addSubscription(sub);
    const result = subscriptionStorage.deactivateSubscription('1');
    expect(result).toBe(true);
    expect(sub.active).toBe(false);
  });

  it('deactivateSubscription should return false if not found', () => {
    const result = subscriptionStorage.deactivateSubscription('notfound');
    expect(result).toBe(false);
  });

  it('getActiveSubscriptions should return only active subs', () => {
    const sub1 = { donorId: '1', active: true };
    const sub2 = { donorId: '2', active: false };
    subscriptionStorage.addSubscription(sub1);
    subscriptionStorage.addSubscription(sub2);
    const result = subscriptionStorage.getActiveSubscriptions();
    expect(result).toEqual([sub1]);
  });
}); 