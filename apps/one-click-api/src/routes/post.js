import * as express from 'express';
import { createPost } from '../controllers/post';
const router = express.Router();

router.post('/create-post', createPost);

export default router;