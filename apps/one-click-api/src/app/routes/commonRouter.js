import express from 'express';
import userRoutes from "../core/users/routes/userRoutes";
import companyRoutes from "../core/company/routes/companyRoutes";
import { requiresAuth } from '../../auth-middleware';

const router = express.Router();

router.use('/common', requiresAuth, userRoutes);
router.use('/common', requiresAuth, companyRoutes);

export default router;