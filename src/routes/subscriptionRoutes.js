const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// POST /subscriptions
router.post('/', subscriptionController.createSubscription);

// DELETE /subscriptions/:donorId
router.delete('/:donorId', subscriptionController.cancelSubscription);

module.exports = router; 