import * as express from 'express';
import { writingContent } from '../controllers/content-writing';


const router = express.Router();

router.get('/', (req, res) => {
    res.send({ message: 'Welcome to one-click-api!' });
});

router.post('/writing', writingContent);

export default router;