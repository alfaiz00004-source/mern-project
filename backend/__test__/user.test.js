process.env.NODE_ENV = 'test';
jest.setTimeout(30000);

const request = require('supertest');
const app = require('../server');
const { connectDB, disconnectDB } = require('../testSetup');
const User = require('../models/userModel');

let createdEmail;

beforeAll(async () => await connectDB());
afterAll(async () => {
  if (createdEmail) {
    await User.deleteOne({ email: createdEmail });
  }
  await disconnectDB();
});

describe('User API', () => {
  it('POST /api/user/login should authenticate registered user', async () => {
    const unique = Date.now();
    createdEmail = `loginuser+${unique}@example.com`;
    const password = 'password123';

    const registerRes = await request(app)
      .post('/api/user/register')
      .send({
        name: 'Login User',
        email: createdEmail,
        password
      });

    expect(registerRes.statusCode).toBe(201);

    const loginRes = await request(app)
      .post('/api/user/login')
      .send({ email: createdEmail, password });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
    expect(loginRes.body).toHaveProperty('email', createdEmail);
  });
});
