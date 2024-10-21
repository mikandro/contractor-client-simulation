import request from 'supertest';
import app from '../src/app';
import { createFixtures, destroyFixtures } from './fixtures';

describe('Admin API', () => {
  beforeAll(async () => {
    await createFixtures()
  });

  afterAll(async () => {
    await destroyFixtures();
  });

  describe('GET /admin/best-profession', () => {
    it('should return the best profession for the given date range', async () => {
      const response = await request(app)
        .get('/admin/best-profession?start=2020-01-01&end=2021-12-31')
        .set('user_id', '1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('profession');
    });
  });

  describe('GET /admin/best-clients', () => {
    it('should return the clients that paid the most during the given date range', async () => {
      const response = await request(app)
        .get('/admin/best-clients?start=2020-01-01&end=2021-12-31&limit=3')
        .set('user_id', '1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(3);
    });

    it('should return 403 if a non-admin profile attempts to access admin routes', async () => {
      const response = await request(app)
        .get('/admin/best-profession?start=2020-01-01&end=2021-12-31')
        .set('user_id', '2');

      expect(response.status).toBe(403);
      expect(response.text).toBe('{\"message\":\"Unauthorized: Invalid user_id\"}');
    });
  });
});
