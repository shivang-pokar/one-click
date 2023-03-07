import * as express from 'express';
import { faceBookLiveLongToken, genrateTokenLinkedin, genrateTokenTwitter, getInstagramPageId, getTwitterAuthUrl, getUserId, twitterAuth } from '../controllers/auth'

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ message: 'Welcome to one-click-api!' });
});

router.post('/twitter', twitterAuth);
router.get('/twitter-authurl', getTwitterAuthUrl);
router.post('/twitter-genrate-token', genrateTokenTwitter);
router.post('/linkedin-genrate-token', genrateTokenLinkedin);
router.post('/twitter-user', getUserId);
router.post('/fb-life-long-token', faceBookLiveLongToken)
router.post('/insagram-id', getInstagramPageId)

export default router;