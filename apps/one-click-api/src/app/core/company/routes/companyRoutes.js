// userRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Route for updating a user
router.get('/company/:id', companyController.getCompany);
router.post('/company', companyController.createCompany);
router.put('/company/:id', companyController.updateCompany);

export default router;