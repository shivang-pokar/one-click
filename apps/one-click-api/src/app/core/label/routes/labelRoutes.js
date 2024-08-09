const express = require('express');
const routerLabel = express.Router();


import { createLabel, createLabelList } from '../controllers/labelController';

// Route for updating a user
routerLabel.post('/label', createLabel);
routerLabel.post('/label-list', createLabelList);

export default routerLabel;