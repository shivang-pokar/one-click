// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for updating a user
router.get('/users/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);

export default router;