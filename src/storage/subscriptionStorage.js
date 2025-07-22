const subscriptions = [];

function addSubscription(sub) {
  subscriptions.push(sub);
}

function deactivateSubscription(donorId) {
  const sub = subscriptions.find(s => s.donorId === donorId && s.active);
  if (sub) {
    sub.active = false;
    return true;
  }
  return false;
}

function getActiveSubscriptions() {
  return subscriptions.filter(s => s.active);
}

function getAllSubscriptions() {
  return subscriptions;
}

module.exports = {
  addSubscription,
  deactivateSubscription,
  getActiveSubscriptions,
  getAllSubscriptions,
}; 