const express = require('express');
const router = express.Router();
import { createUser, getUser, updateUser } from '../controllers/userController';

// Route for updating a user
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);

export default router;