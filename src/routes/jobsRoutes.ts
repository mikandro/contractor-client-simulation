
import express from 'express';
import { JobsController } from '../controllers/jobsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/unpaid', authMiddleware, JobsController.getUnpaidJobs);
router.post('/:job_id/pay', authMiddleware, JobsController.payForJob);

export default router;
