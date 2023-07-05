import * as express from 'express';
import { cancelSubscriptions, createCheckoutSession, createPortalSession, resumeSubscriptions, retrieveAllPlans, validateCoupon, webHook } from '../controllers/payment';

const router = express.Router();

router.post('/checkout', createCheckoutSession);
router.post('/session', createPortalSession);
router.post('/stripe-webhook', webHook);
router.post('/cancel', cancelSubscriptions);
router.post('/resume', resumeSubscriptions);
router.post('/coupon', validateCoupon);
router.post('/plans', retrieveAllPlans);

export default router;