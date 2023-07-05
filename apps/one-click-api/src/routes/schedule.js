import * as express from 'express';
import { cancelSchedule, createSchedule, listSchedule } from '../controllers/schedule';

const router = express.Router();

router.post('/create-schedule', createSchedule);
router.post('/cancel-schedule', cancelSchedule);
router.post('/list-schedule', listSchedule);

export default router;