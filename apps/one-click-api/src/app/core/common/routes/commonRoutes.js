import { sendEmail } from '../controllers/commonController';

const express = require('express');
const routerCommonService = express.Router();

routerCommonService.post('/send-email', sendEmail);

export default routerCommonService;