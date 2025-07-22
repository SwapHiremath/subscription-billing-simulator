const express = require('express');
const request = require('supertest');
const subscriptionRoutes = require('../../src/routes/subscriptionRoutes');

describe('subscriptionRoutes', () => {
  let app;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/subscriptions', subscriptionRoutes);
  });

  it('should have POST /subscriptions', async () => {
    const res = await request(app).post('/subscriptions').send({});
    // 400 because controller expects required fields
    expect(res.status).toBe(400);
  });

  it('should have DELETE /subscriptions/:donorId', async () => {
    const res = await request(app).delete('/subscriptions/1');
    // 404 because controller expects not found
    expect([404, 400]).toContain(res.statusCode);
  });
}); 