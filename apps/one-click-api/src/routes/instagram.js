import * as express from 'express';
import { instagramrPost } from '../controllers/instagram';

const router = express.Router();


router.post('/create-post', instagramrPost);

export default router;