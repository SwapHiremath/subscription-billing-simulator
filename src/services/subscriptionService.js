const storage = require('../storage/subscriptionStorage');
const llmService = require('./llmService');

async function createSubscription({ donorId, amount, currency, interval, campaignDescription }) {
  // Simulate LLM
  const tagsandsummary = await llmService.generateTagsAndSummary(campaignDescription);
  const subscription = {
    donorId,
    amount,
    currency,
    interval,
    campaignDescription,
    tags: tagsandsummary?.tags || [],
    summary: tagsandsummary?.summary || "",
    active: true,
    createdAt: new Date(),
    lastCharged: null,
  };
  storage.addSubscription(subscription);
  return subscription;
}

function cancelSubscription(donorId) {
  return storage.deactivateSubscription(donorId);
}

function getActiveSubscriptions() {
  return storage.getActiveSubscriptions();
}

function getActiveSubscriptionsDetailed() {
  return storage.getActiveSubscriptions().map(sub => ({
    donorId: sub.donorId,
    amount: sub.amount,
    currency: sub.currency,
    interval: sub.interval,
    campaignDescription: sub.campaignDescription,
    tags: sub.tags,
    summary: sub.summary,
  }));
}

module.exports = {
  createSubscription,
  cancelSubscription,
  getActiveSubscriptions,
  getActiveSubscriptionsDetailed,
}; 