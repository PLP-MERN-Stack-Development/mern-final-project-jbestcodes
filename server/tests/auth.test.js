const request = require('supertest');
const app = require('../index'); // Assuming index.js exports the app
const mongoose = require('mongoose');

describe('Auth API', () => {
  beforeAll(async () => {
    // Connect to test database if needed
    // For now, assume it's connected
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new student', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test Student',
        email: 'test@student.com',
        username: 'teststudent',
        password: 'password123',
        role: 'student'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@student.com',
        password: 'password123'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@student.com',
        password: 'wrongpassword'
      });
    expect(response.status).toBe(401);
  });
});