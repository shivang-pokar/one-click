import * as express from 'express';
import { createCheckoutSession, createPortalSession, webHook } from '../controllers/payment';

const router = express.Router();

router.post('/checkout', createCheckoutSession);
router.post('/session', createPortalSession);
router.post('/stripe-webhook', webHook);

export default router;