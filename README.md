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