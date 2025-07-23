const subscriptionService = require('../services/subscriptionService');
const billingService = require('../services/billingService');
const Joi = require('joi');

exports.createSubscription = async (req, res, next) => {
  const schema = Joi.object({
    donorId: Joi.string().required(),
    amount: Joi.number().positive().required(),
    currency: Joi.string().length(3).required(),
    interval: Joi.string().valid('monthly', 'yearly', 'weekly').required(),
    campaignDescription: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
  const schema = Joi.object({
    donorId: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
  // No parameters to validate
  try {
    const subs = subscriptionService.getActiveSubscriptionsDetailed();
    res.json(subs);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = (req, res, next) => {
  // No parameters to validate
  try {
    const txs = billingService.getTransactions();
    res.json(txs);
  } catch (err) {
    next(err);
  }
}; 