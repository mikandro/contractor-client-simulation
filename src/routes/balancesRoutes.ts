
import express from 'express';
import { BalancesController } from '../controllers/balancesController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/deposit/:userId', authMiddleware, BalancesController.deposit);

export default router;
