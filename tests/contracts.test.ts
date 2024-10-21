import request from 'supertest';
import app from '../src/app';
import { createFixtures, destroyFixtures } from './fixtures';

describe('Contracts API', () => {
  beforeAll(async () => {
    await createFixtures()
  });

  afterAll(async () => {
    await destroyFixtures();
  });

  describe('GET /contracts/:id', () => {
    it('should return a contract if it belongs to the profile making the request', async () => {
      const response = await request(app)
        .get('/contracts/1')
        .set('profile_id', '1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
    });

    it('should return 404 if the contract does not belong to the profile', async () => {
      const response = await request(app)
        .get('/contracts/999')
        .set('profile_id', '2');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /contracts', () => {
    it('should return a list of non-terminated contracts for the profile', async () => {
      const response = await request(app)
        .get('/contracts')
        .set('profile_id', '1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
