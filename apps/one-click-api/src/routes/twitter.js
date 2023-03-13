import * as express from 'express';
import { getTwitterPost, getUserId, twitterPost } from '../controllers/twitter';

const router = express.Router();

router.post('/create-post', twitterPost);
router.post('/get-posts', getTwitterPost);
router.post('/get-user', getUserId);

export default router;
