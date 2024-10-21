import request from 'supertest';
import app from '../src/app';
import { createFixtures, destroyFixtures } from './fixtures';

describe('Balances API', () => {
  beforeAll(async () => {
    await createFixtures()
  });

  afterAll(async () => {
    await destroyFixtures();
  });

  describe('POST /balances/deposit/:userId', () => {
    it('should allow a client to deposit money within the allowed limit', async () => {
      const response = await request(app)
        .post('/balances/deposit/1')
        .set('profile_id', '1')
        .send({ amount: 50 });

      expect(response.status).toBe(200);
      expect(response.text).toBe('Deposit successful');
    });

    it('should return 400 if the deposit exceeds the allowed limit', async () => {
      const response = await request(app)
        .post('/balances/deposit/1')
        .set('profile_id', '1')
        .send({ amount: 5000 }); // Example exceeding amount

      expect(response.status).toBe(400);
      expect(response.text).toBe('Deposit exceeds the allowed limit');
    });
  });
});
