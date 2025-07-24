const userService = require('../../src/services/userService');

describe('UserService Unit Tests', () => {
  beforeEach(() => {
    // Reset users array before each test
    userService.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
  });

  describe('getAllUsers', () => {
    test('should return all users', () => {
      const users = userService.getAllUsers();
      expect(users).toHaveLength(2);
      expect(users[0]).toHaveProperty('name', 'John Doe');
    });
  });

  describe('getUserById', () => {
    test('should return user by id', () => {
      const user = userService.getUserById(1);
      expect(user).toHaveProperty('name', 'John Doe');
      expect(user).toHaveProperty('email', 'john@example.com');
    });

    test('should return undefined for non-existent user', () => {
      const user = userService.getUserById(999);
      expect(user).toBeUndefined();
    });
  });

  describe('createUser', () => {
    test('should create new user', () => {
      const userData = { name: 'Bob Wilson', email: 'bob@example.com' };
      const newUser = userService.createUser(userData);
      
      expect(newUser).toHaveProperty('id', 3);
      expect(newUser).toHaveProperty('name', 'Bob Wilson');
      expect(userService.getAllUsers()).toHaveLength(3);
    });
  });

  describe('updateUser', () => {
    test('should update existing user', () => {
      const updatedUser = userService.updateUser(1, { name: 'John Updated' });
      expect(updatedUser).toHaveProperty('name', 'John Updated');
      expect(updatedUser).toHaveProperty('email', 'john@example.com');
    });

    test('should return null for non-existent user', () => {
      const result = userService.updateUser(999, { name: 'Test' });
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    test('should delete existing user', () => {
      const result = userService.deleteUser(1);
      expect(result).toBe(true);
      expect(userService.getAllUsers()).toHaveLength(1);
    });

    test('should return false for non-existent user', () => {
      const result = userService.deleteUser(999);
      expect(result).toBe(false);
    });
  });
});