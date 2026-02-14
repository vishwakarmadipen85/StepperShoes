import { Router } from 'express';
import { createCheckoutSession, stripeWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/auth';
import express from 'express';

const router = Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
// Webhook needs raw body
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

export default router;
