const subscriptionService = require('./subscriptionService');
const { convertToUSD } = require('../utils/currencyUtils');

const transactions = [];

function processBilling() {
  const now = new Date();
  const activeSubs = subscriptionService.getActiveSubscriptions();
  activeSubs.forEach(sub => {
    // For demo, charge all active subs every interval (e.g., every minute for 'monthly')
    // In real app, check sub.lastCharged and sub.interval
    const conversion = convertToUSD(sub.amount, sub.currency);
    transactions.push({
      donorId: sub.donorId,
      amount: sub.amount,
      amountUSD: conversion.usdAmount,
      currency: sub.currency,
      chargedAt: now,
      campaignDescription: sub.campaignDescription,
      tags: sub.tags,
      summary: sub.summary,
    });
    sub.lastCharged = now;
    console.log(`Charged ${sub.donorId} ${sub.amount} ${sub.currency} for ${sub.campaignDescription}`);
  });
}

function startBillingJob() {
  // For demo, run every 60 seconds
  setInterval(processBilling, 60 * 1000);
}

function getTransactions() {
  return transactions.map(tx => ({
    donorId: tx.donorId,
    amount: tx.amount,
    amountUSD: tx.amountUSD,
    currency: tx.currency,
    timestamp: tx.chargedAt,
    campaignSummary: tx.summary,
  }));
}

module.exports = { startBillingJob, getTransactions }; 