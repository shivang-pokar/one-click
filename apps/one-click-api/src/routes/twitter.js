import * as express from 'express';
import { getTwitterPost, twitterPost } from '../controllers/twitter';

const router = express.Router();


router.post('/create-post', twitterPost);
router.post('/get-posts', getTwitterPost);

export default router;