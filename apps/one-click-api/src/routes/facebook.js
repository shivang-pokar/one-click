import * as express from 'express';
import { facebookPost } from '../controllers/facebook';

const router = express.Router();


router.post('/create-post', facebookPost);

export default router;