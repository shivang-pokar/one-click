const express = require('express');
const router = express.Router();

import { createCompany, getCompany, updateCompany } from '../controllers/companyController';

// Route for updating a user
router.get('/company/:id', getCompany);
router.post('/company', createCompany);
router.put('/company/:id', updateCompany);

export default router;