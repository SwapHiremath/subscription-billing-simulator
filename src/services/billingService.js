const subscriptionService = require("./subscriptionService");
const { convertToUSD } = require("../utils/currencyUtils");

const transactions = [];

// Allow for some delay tolerance (e.g. 1 minutes)
const tolerance = 60 * 1000;

function processBilling() {
  const now = new Date();
  const activeSubs = subscriptionService.getActiveSubscriptions() || [];
  activeSubs.forEach(async (sub) => {
    if (isSubChargable(sub)) {
      // For demo, charge all active subs every interval (e.g., every minute for 'monthly')
      // In real app, check sub.lastCharged and sub.interval
      const conversion = await convertToUSD(sub.amount, sub.currency);
      transactions.push({
        transactionsId: transactions.length + 1,
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
      console.log(
        `Charged ${sub.donorId} ${sub.amount} ${sub.currency} for ${sub.campaignDescription}`
      );
    }
  });
}

function isSubChargable(sub) {
  if (!sub.lastCharged) return true;

  const now = new Date();
  const lastCharged = new Date(sub.lastCharged);
  let nextChargeDate = new Date(lastCharged);

  switch (sub.interval) {
    case "daily":
      nextChargeDate.setDate(nextChargeDate.getDate() + 1);
      break;
    case "weekly":
      nextChargeDate.setDate(nextChargeDate.getDate() + 7);
      break;
    case "monthly":
      nextChargeDate.setMonth(nextChargeDate.getMonth() + 1);
      break;
    case "yearly":
      nextChargeDate.setFullYear(nextChargeDate.getFullYear() + 1);
      break;
    default:
      return false;
  }

  return Math.abs(now.getTime() - nextChargeDate.getTime()) <= tolerance;
}

function startBillingJob() {
  // For demo, run every 60 seconds
  setInterval(processBilling, tolerance);
}

function getTransactions() {
  return transactions.map((tx) => ({
    donorId: tx.donorId,
    amount: tx.amount,
    amountUSD: tx.amountUSD,
    currency: tx.currency,
    timestamp: tx.chargedAt,
    campaignSummary: tx.summary,
  }));
}

module.exports = { startBillingJob, getTransactions };
