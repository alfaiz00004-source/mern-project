process.env.NODE_ENV = 'test';
jest.setTimeout(30000);

const request = require('supertest');
const app = require('../server');
const { connectDB, disconnectDB } = require('../testSetup');
const User = require('../models/userModel');
const Product = require('../models/productModel');

let adminToken;
let adminId;
let adminEmail;
let productId;

beforeAll(async () => {
  await connectDB();

  adminEmail = `adminuser+${Date.now()}@example.com`;
  const registerRes = await request(app)
    .post('/api/user/register')
    .send({
      name: 'Admin User',
      email: adminEmail,
      password: 'password123'
    });

  adminId = registerRes.body._id;
  adminToken = registerRes.body.token;

  if (adminId) {
    await User.findByIdAndUpdate(adminId, { role: 'admin' });
  }
});

afterAll(async () => {
  if (productId) {
    await Product.deleteOne({ _id: productId });
  }
  if (adminId) {
    await User.deleteOne({ _id: adminId });
  } else if (adminEmail) {
    await User.deleteOne({ email: adminEmail });
  }
  await disconnectDB();
});

describe('Product API', () => {
  

  it('POST /api/products should create new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Product',
        price: 100,
        description: 'Sample product',
        category: 'Testing'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    productId = res.body._id;
  });

  it('GET /api/products should return products array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it('GET /api/products/:id should return single product', async () => {
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  it('DELETE /api/products/:id should delete product', async () => {
    const res = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

});
