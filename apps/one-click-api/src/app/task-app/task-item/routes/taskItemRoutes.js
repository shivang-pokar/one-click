import { createTask, deleteTask, getTask, getTaskByGroup, updateTask } from '../controllers/taskItemController';

// userRoutes.js
const express = require('express');
const router = express.Router();

// Route for updating a user
router.get('/task-item/:id', getTask);
router.post('/task-item', createTask);
router.get('/task-item/by-group/:group_id', getTaskByGroup);
router.put('/task-item/:id', updateTask);
router.delete('/task-item/:id', deleteTask);

export default router;