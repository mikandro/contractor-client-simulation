
import express from 'express';
import { AdminController } from '../controllers/adminController';
import { adminAuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Applying additional admin check for all admin routes
router.use(adminAuthMiddleware, AdminController.authorizeAdmin);

router.get('/best-profession', AdminController.getBestProfession);
router.get('/best-clients', AdminController.getBestClients);

export default router;
