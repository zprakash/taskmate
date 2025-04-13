const { User } = require('../../../models');
const { sequelize } = require('../../../config/database');

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a user', async () => {
    const user = await User.create({
      name: 'Test User',
      username: 'testuser',
      password: 'password123'
    });

    expect(user.id).toBeDefined();
    expect(user.username).toBe('testuser');
  });

  it('should not allow duplicate usernames', async () => {
    await User.create({
      name: 'Test User',
      username: 'testuser',
      password: 'password123'
    });

    await expect(
      User.create({
        name: 'Test User 2',
        username: 'testuser',
        password: 'password123'
      })
    ).rejects.toThrow();
  });
});
