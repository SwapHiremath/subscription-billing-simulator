const subscriptionService = require('../services/subscriptionService');
const billingService = require('../services/billingService');

exports.createSubscription = async (req, res, next) => {
  try {
    const { donorId, amount, currency, interval, campaignDescription } = req.body;
    if (!donorId || !amount || !currency || !interval || !campaignDescription) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const subscription = await subscriptionService.createSubscription({
      donorId,
      amount,
      currency,
      interval,
      campaignDescription,
    });
    res.status(201).json(subscription);
  } catch (err) {
    next(err);
  }
};

exports.cancelSubscription = (req, res, next) => {
  try {
    const { donorId } = req.params;
    const result = subscriptionService.cancelSubscription(donorId);
    if (!result) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }
    res.json({ message: 'Subscription cancelled.' });
  } catch (err) {
    next(err);
  }
};

exports.getActiveSubscriptions = (req, res, next) => {
  try {
    const subs = subscriptionService.getActiveSubscriptionsDetailed();
    res.json(subs);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = (req, res, next) => {
  try {
    const txs = billingService.getTransactions();
    res.json(txs);
  } catch (err) {
    next(err);
  }
}; 