const express = require('express');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const billingService = require('./services/billingService');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/subscriptions', subscriptionRoutes);

billingService.startBillingJob();

// Use centralized error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Subscription Billing Simulator running on port ${PORT}`);
}); 