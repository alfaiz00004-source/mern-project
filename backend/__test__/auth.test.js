process.env.NODE_ENV = 'test';
jest.setTimeout(30000);

const request = require('supertest');
const app = require('../server');
const { connectDB, disconnectDB } = require('../testSetup');
const User = require('../models/userModel');

let token;
let userId;
let testEmail;

beforeAll(async () => await connectDB());
afterAll(async () => {
  if (userId) {
    await User.deleteOne({ _id: userId });
  } else if (testEmail) {
    await User.deleteOne({ email: testEmail });
  }
  await disconnectDB();
});

describe('Auth API', () => {

  it('POST /api/user/register should create new user', async () => {
    testEmail = `testuser+${Date.now()}@example.com`;
    const res = await request(app)
      .post('/api/user/register')
      .send({
        name: 'Test User',
        email: testEmail,
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token'); // JWT token returned
    expect(res.body).toHaveProperty('email', testEmail);
    userId = res.body._id;
    token = res.body.token;
  });

  it('GET /api/user/profile without token should return 401', async () => {
    const res = await request(app).get('/api/user/profile');
    expect(res.statusCode).toBe(401);
  });

  it('GET /api/user/profile with valid token should return user profile', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testEmail);
  });

});
