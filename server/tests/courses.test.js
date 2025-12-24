const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

describe('Courses API', () => {
  let token;

  beforeAll(async () => {
    // Register and login to get token
    await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test Instructor',
        email: 'test@instructor.com',
        username: 'testinstructor',
        password: 'password123',
        role: 'teacher'
      });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@instructor.com',
        password: 'password123'
      });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get all courses', async () => {
    const response = await request(app).get('/api/courses');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a course', async () => {
    const response = await request(app)
      .post('/api/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Course',
        description: 'A test course',
        lessons: [{ title: 'Lesson 1', content: 'Content' }]
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test Course');
  });
});