const request = require('supertest');
const app = require('../server');

describe('Task Management API Test Suite (Practical 12 - CI/CD Pipeline)', () => {
  // Test 1: Health Check & Cache Metrics Endpoint
  test('GET /api/cache/stats should return HTTP 200 OK and valid cache metrics', async () => {
    const response = await request(app).get('/api/cache/stats');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('hits');
    expect(response.body).toHaveProperty('misses');
    expect(response.body).toHaveProperty('invalidations');
    expect(response.body).toHaveProperty('hitRate');
    expect(Array.isArray(response.body.activeKeys)).toBe(true);
  });

  // Test 2: Undefined Route 404 Not Found Handler
  test('GET /non-existent-endpoint should return HTTP 404 Not Found', async () => {
    const response = await request(app).get('/non-existent-endpoint');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Route Not Found');
    expect(response.body).toHaveProperty('success', false);
  });

  // Test 3: Server-Side Input Validation on Registration
  test('POST /auth/register with empty payload should return HTTP 400 Bad Request', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Validation Error');
    expect(response.body).toHaveProperty('errors');
  });

  // Test 4: Auth Middleware Protection on Task Routes
  test('GET /tasks without Authorization header should return HTTP 401 Unauthorized', async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'Unauthorized');
    expect(response.body.message).toMatch(/No token provided/i);
  });

  // Test 5: Root API Health Check Endpoint
  test('GET / should return HTTP 200 OK with endpoint documentation', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('endpoints');
  });
});
