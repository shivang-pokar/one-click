import express from 'express';
import userRoutes from "../core/users/routes/userRoutes";
import companyRoutes from "../core/company/routes/companyRoutes";
import { requiresAuth } from '../../auth-middleware';
import routerLabel from '../core/label/routes/labelRoutes';
import routerCommonService from '../core/common/routes/commonRoutes';

const router = express.Router();

router.use('/common', requiresAuth, userRoutes);
router.use('/common', requiresAuth, companyRoutes);
router.use('/common', requiresAuth, routerLabel);
router.use('/common', routerCommonService);

export default router;