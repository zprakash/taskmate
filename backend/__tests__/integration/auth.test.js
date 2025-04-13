const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');

describe('Auth Integration Tests', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          username: 'testuser',
          password: 'password123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.username).toBe('testuser');
    });

    it('should reject duplicate username', async () => {
      await User.create({
        name: 'Existing User',
        username: 'testuser',
        password: 'password123'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          username: 'testuser',
          password: 'password123'
        });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login existing user', async () => {
      await User.create({
        name: 'Test User',
        username: 'testuser',
        password: '$2a$10$N9qo8uLOickgx2ZMRZoMy.MH/rH8L.6H.CTHB9Qo1Q6XZ.RhrBq7C' // bcrypt hash for 'password123'
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistent',
          password: 'wrongpass'
        });

      expect(response.statusCode).toBe(400);
    });
  });
});
