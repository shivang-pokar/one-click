import * as express from 'express';
import { fbPostReport, instagramrPostReport } from '../controllers/report';
const router = express.Router();

router.post('/instagram', instagramrPostReport);
router.post('/facebook', fbPostReport);

export default router;