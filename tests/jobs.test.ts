import request from 'supertest';
import app from '../src/app';
import { Job } from '../src/models/Job';
import { createFixtures, destroyFixtures } from './fixtures';


describe('Jobs API', () => {
  beforeAll(async () => {
    await createFixtures()
  });

  afterAll(async () => {
    await destroyFixtures();
  });

  describe('GET /jobs/unpaid', () => {
    it('should return unpaid jobs for active contracts of the profile', async () => {
      const response = await request(app)
        .get('/jobs/unpaid')
        .set('profile_id', '1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((job: Job) => {
        expect(job.paid).toBe(false);
      });
    });
  });

  describe('POST /jobs/:job_id/pay', () => {
    it('should successfully pay for a job if the client has enough balance', async () => {
      const response = await request(app)
        .post('/jobs/1/pay')
        .set('profile_id', '1');

      expect(response.status).toBe(200);
      expect(response.text).toBe('Job paid successfully');
    });

    it('should return 400 if the client has insufficient balance', async () => {
      const response = await request(app)
        .post('/jobs/5/pay')
        .set('profile_id', '4');

      expect(response.status).toBe(400);
      expect(response.text).toBe('Insufficient balance');
    });
  });
});
