// userRoutes.js
const express = require('express');
const router = express.Router();
import { createGroup, deleteGroup, getGroup, getGroupByProjectId, updateGroup } from '../controllers/taskGroupController';

// Route for updating a user
router.get('/group/:id', getGroup);
router.get('/group/by-project/:project_id', getGroupByProjectId);
router.post('/group', createGroup);
router.put('/group/:id', updateGroup);
router.delete('/group/:id', deleteGroup);

export default router;