
import express from 'express';
import { ContractsController } from '../controllers/contractsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:id', authMiddleware, ContractsController.getContractById);
router.get('/', authMiddleware, ContractsController.getAllNonTerminatedContracts);

export default router;
