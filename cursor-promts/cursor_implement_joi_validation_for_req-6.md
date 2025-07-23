# Implement Joi validation for requests
_Exported on 7/23/2025 at 21:54:59 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Update the file to include Joi validation for all request parameters. Ensure that appropriate HTTP status codes and descriptive error messages are returned when validation fails.

---

**Cursor**

```javascript
const Joi = require('joi');
// ... existing code ...
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
    // ... existing code ...
exports.cancelSubscription = (req, res, next) => {
  const schema = Joi.object({
    donorId: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // ... existing code ...
exports.getActiveSubscriptions = (req, res, next) => {
  // No parameters to validate
  try {
    // ... existing code ...
exports.getTransactions = (req, res, next) => {
  // No parameters to validate
  try {
    // ... existing code ...
```

Joi validation has been added for all request parameters in the controller methods:

- `createSubscription` now validates the request body for all required fields and types, returning a 400 status with a descriptive error if validation fails.
- `cancelSubscription` now validates the `donorId` parameter, returning a 400 status with a descriptive error if validation fails.
- `getActiveSubscriptions` and `getTransactions` do not require parameter validation, as they do not take any input parameters.

If you need validation for other endpoints or want to customize the allowed values (e.g., for `interval`), let me know!

