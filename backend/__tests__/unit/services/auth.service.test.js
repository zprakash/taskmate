const { authenticateUser, createUser } = require('../../../services/authService');
const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../../models');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({
        id: 1,
        username: 'testuser'
      });

      const result = await createUser({
        name: 'Test User',
        username: 'testuser',
        password: 'password123'
      });

      expect(result).toHaveProperty('id', 1);
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate valid user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'hashedPassword'
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockToken');

      const result = await authenticateUser('testuser', 'password123');

      expect(result).toHaveProperty('token', 'mockToken');
    });
  });
});
