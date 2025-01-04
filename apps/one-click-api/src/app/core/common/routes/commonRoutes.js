import { inviteMember, sendEmail } from '../controllers/commonController';

const express = require('express');
const routerCommonService = express.Router();

/* routerCommonService.post('/send-email', sendEmail); */
routerCommonService.post('/invite-member', inviteMember);

export default routerCommonService;