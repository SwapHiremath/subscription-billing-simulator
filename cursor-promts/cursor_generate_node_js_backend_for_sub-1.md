# Generate Node.js backend for subscription billing
_Exported on 7/23/2025 at 20:09:43 GMT+5:30 from Cursor (1.2.4)_

---

**User**

 Generate a Node.js backend project scaffold for a "Subscription Billing Simulator" for nonprofit donations. The project should:

 1. Use Express.js to handle REST API endpoints.
 2. Include these endpoints:

    * `POST /subscriptions` to create a new recurring donation.
    * `DELETE /subscriptions/:donorId` to cancel a subscription.
 3. Support JSON request bodies with fields:

    * `donorId` (string), `amount` (number), `currency` (string), `interval` (e.g., "monthly"), and `campaignDescription` (string).
 4. On subscription creation, simulate a call to an LLM to:

    * Generate tags (e.g., “disaster relief”, “Nepal”) from `campaignDescription`.
    * Generate a 1-sentence summary.
    * Store this along with the subscription.
 5. Simulate a background job using `setInterval` to:

    * Charge active subscriptions based on their interval.
    * Log or store each transaction.
 6. Use in-memory storage (e.g., JavaScript objects or arrays) to simulate a data store.

 Add basic error handling and clear file structure. No database or auth needed. Simulated LLM responses can be hardcoded or mocked with a simple function.

