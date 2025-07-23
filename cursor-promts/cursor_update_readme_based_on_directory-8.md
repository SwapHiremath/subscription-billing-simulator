# Update README based on directory analysis
_Exported on 7/23/2025 at 21:57:33 GMT+5:30 from Cursor (1.2.4)_

---

**User**

Analyze directory - "D:\Projects\PSL Assessments\subscription-billing-simulator\" and update file - "D:\Projects\PSL Assessments\subscription-billing-simulator\README.md" accordingly

---

**Cursor**

```markdown
# Subscription Billing Simulator

A Node.js backend project to simulate recurring nonprofit donations with LLM-powered campaign tagging and summaries.

## Features
- Create and cancel recurring donation subscriptions
- Simulate LLM for campaign tags and summaries
- Background job to process recurring charges
- In-memory storage (no database required)

## Endpoints
- `POST /subscriptions` — Create a new recurring donation
- `DELETE /subscriptions/:donorId` — Cancel a subscription
- `GET /subscriptions` — Returns a list of all active subscriptions.
- `GET /subscriptions/transactions` — Returns the donation transaction history. Each transaction includes the original and normalized (USD) amount.


## Setup
```bash
npm install
```

## Development
```bash
npm start
```

## Production
```bash
npm start
```

## Project Structure
- `src/server.js` — Entry point, sets up Express app and background jobs
- `src/routes/`
  - `subscriptionRoutes.js` — Defines API endpoints for subscriptions
- `src/controllers/`
  - `subscriptionController.js` — Handles incoming requests and responses for subscription APIs
- `src/services/`
  - `billingService.js` — Handles recurring billing logic and transaction processing
  - `subscriptionService.js` — Manages subscription business logic
  - `llmService.js` — Simulates LLM-powered campaign tagging and summaries
- `src/storage/`
  - `subscriptionStorage.js` — In-memory storage and management of subscription data
- `src/utils/`
  - `currencyUtils.js` — Utility for currency conversion (using easy-currencies)
- `src/middleware/`
  - `errorHandler.js` — Centralized error handling middleware

## Test Coverage
Automated tests are provided for all major components using Jest:
- `tests/controllers/subscriptionController.test.js` — Tests for controller logic
- `tests/routes/subscriptionRoutes.test.js` — Tests for API routes
- `tests/services/billingService.test.js` — Tests for billing logic
- `tests/services/subscriptionService.test.js` — Tests for subscription business logic
- `tests/services/llmService.test.js` — Tests for LLM simulation logic
- `tests/storage/subscriptionStorage.test.js` — Tests for in-memory storage
- `tests/utils/currencyUtils.test.js` — Tests for currency conversion utility
- `tests/middleware/errorHandler.test.js` — Tests for error handling middleware

## Notes
- All data is stored in-memory; restarting the server will reset all subscriptions and transactions.
- LLM functionality is simulated and does not call any external AI services.

```

The README has been updated to provide a more detailed and accurate overview of the `subscription-billing-simulator` directory. The "Project Structure" section now lists the specific files in each directory, and a new "Test Coverage" section summarizes the automated tests for each major component. This should make the project easier to understand and navigate for new contributors or users. If you need further customization or additional sections, let me know!

