import express from 'express';
import projectRoutes from "../task-app/project/routes/projectRoutes";
import taskGroupRoutes from "../task-app/task-group/routes/taskGroupRoutes";
import { requiresAuth } from '../../auth-middleware';
import taskItemRoutes from '../task-app/task-item/routes/taskItemRoutes';

const router = express.Router();

router.use('/task', requiresAuth, projectRoutes);
router.use('/task', requiresAuth, taskGroupRoutes);
router.use('/task', requiresAuth, taskItemRoutes);

export default router;