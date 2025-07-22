const subscriptionController = require('../../src/controllers/subscriptionController');
const subscriptionService = require('../../src/services/subscriptionService');

jest.mock('../../src/services/subscriptionService');

describe('subscriptionController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  describe('createSubscription', () => {
    it('should return 400 if required fields are missing', async () => {
      req.body = {};
      await subscriptionController.createSubscription(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields.' });
    });

    it('should return 201 and subscription on success', async () => {
      req.body = { donorId: '1', amount: 10, currency: 'USD', interval: 'monthly', campaignDescription: 'desc' };
      const mockSub = { id: 'sub1' };
      subscriptionService.createSubscription.mockResolvedValue(mockSub);
      await subscriptionController.createSubscription(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSub);
    });

    it('should call next(err) on error', async () => {
      req.body = { donorId: '1', amount: 10, currency: 'USD', interval: 'monthly', campaignDescription: 'desc' };
      const error = new Error('fail');
      subscriptionService.createSubscription.mockRejectedValue(error);
      await subscriptionController.createSubscription(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('cancelSubscription', () => {
    it('should return 404 if subscription not found', () => {
      req.params = { donorId: '1' };
      subscriptionService.cancelSubscription.mockReturnValue(false);
      subscriptionController.cancelSubscription(req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Subscription not found.' });
    });

    it('should return success message if cancelled', () => {
      req.params = { donorId: '1' };
      subscriptionService.cancelSubscription.mockReturnValue(true);
      subscriptionController.cancelSubscription(req, res, next);
      expect(res.json).toHaveBeenCalledWith({ message: 'Subscription cancelled.' });
    });

    it('should call next(err) on error', () => {
      req.params = { donorId: '1' };
      const error = new Error('fail');
      subscriptionService.cancelSubscription.mockImplementation(() => { throw error; });
      subscriptionController.cancelSubscription(req, res, next);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
}); 