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

## New Endpoints

### GET /subscriptions
Returns a list of all active subscriptions.

**Response:**
```
[
  {
    "donorId": "string",
    "amount": number,
    "currency": "USD|EUR|INR|GBP",
    "interval": "string",
    "campaignDescription": "string",
    "tags": ["string"],
    "summary": "string"
  },
  ...
]
```

### GET /subscriptions/transactions
Returns the donation transaction history. Each transaction includes the original and normalized (USD) amount.

**Response:**
```
[
  {
    "donorId": "string",
    "amount": number,
    "amountUSD": number,
    "currency": "USD|EUR|INR|GBP",
    "timestamp": "ISO date string",
    "campaignSummary": "string"
  },
  ...
]
```

- Currency normalization uses fixed mock rates (see `src/utils/currencyUtils.js`).
- Only active subscriptions are billed and included in the endpoints above.

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
- `src/server.js` — Entry point
- `src/routes/` — Express route definitions
- `src/controllers/` — Request handlers
- `src/services/` — Business logic, LLM simulation, billing
- `src/storage/` — In-memory data store
- `src/utils/` — Utility functions 