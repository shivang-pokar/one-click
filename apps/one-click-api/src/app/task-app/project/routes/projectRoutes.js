// userRoutes.js
const express = require('express');
const router = express.Router();
import { createProject, deleteProject, getProject, getProjectsByCompanyId, updateProject } from '../controllers/projectController';

// Route for updating a user
router.get('/project/:id', getProject);
router.get('/projects/by-company/:company_id', getProjectsByCompanyId);
router.post('/project', createProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

export default router;