import * as express from 'express';
import { createSchedule } from '../controllers/schedule';

const router = express.Router();

router.post('/create-schedule', createSchedule);

export default router;