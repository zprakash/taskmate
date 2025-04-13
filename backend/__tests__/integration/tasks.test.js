const request = require('supertest');
const app = require('../../app');
const { User, Task } = require('../../models');
const jwt = require('jsonwebtoken');

describe('Tasks Integration Tests', () => {
  let testUser;
  let authToken;

  beforeAll(async () => {
    testUser = await User.create({
      name: 'Task Tester',
      username: 'taskuser',
      password: 'password123'
    });
    authToken = jwt.sign({ id: testUser.id }, process.env.JWT_SECRET);
  });

  beforeEach(async () => {
    await Task.destroy({ where: {} });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          priority: 'medium'
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Test Task');
    });
  });

  describe('GET /api/tasks', () => {
    it('should retrieve user tasks', async () => {
      await Task.create({
        title: 'Task 1',
        userId: testUser.id
      });

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });
});
