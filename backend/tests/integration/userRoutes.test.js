const request = require('supertest');
const app = require('../../src/server');

describe('User Routes Integration Tests', () => {
  describe('GET /api/users', () => {
    test('should return all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by id', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
    });

    test('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/999')
        .expect(404);
    });
  });

  describe('POST /api/users', () => {
    test('should create new user', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('name', 'Test User');
      expect(response.body).toHaveProperty('email', 'test@example.com');
      expect(response.body).toHaveProperty('id');
    });

    test('should return 400 for missing required fields', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'Test User' })
        .expect(400);
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update existing user', async () => {
      const updateData = { name: 'Updated Name' };
      
      const response = await request(app)
        .put('/api/users/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('name', 'Updated Name');
    });

    test('should return 404 for non-existent user', async () => {
      await request(app)
        .put('/api/users/999')
        .send({ name: 'Test' })
        .expect(404);
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('should delete existing user', async () => {
      await request(app)
        .delete('/api/users/1')
        .expect(204);
    });

    test('should return 404 for non-existent user', async () => {
      await request(app)
        .delete('/api/users/999')
        .expect(404);
    });
  });
});