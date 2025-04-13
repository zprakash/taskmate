const { Task, User } = require('../../../models');
const { sequelize } = require('../../../config/database');

describe('Task Model', () => {
  let testUser;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    testUser = await User.create({
      name: 'Task Owner',
      username: 'taskowner',
      password: 'password123'
    });
  });

  it('should create a task with valid fields', async () => {
    const task = await Task.create({
      title: 'Test Task',
      userId: testUser.id
    });

    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test Task');
    expect(task.status).toBe('pending');
  });

  it('should enforce required fields', async () => {
    await expect(
      Task.create({ userId: testUser.id })
    ).rejects.toThrow();
  });
});
