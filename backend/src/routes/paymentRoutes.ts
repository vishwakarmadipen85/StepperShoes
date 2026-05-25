import { Router } from 'express';
import { createCheckoutSession, stripeWebhook, createRazorpayOrder, verifyRazorpayPayment, razorpayWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/auth';
import express from 'express';

const router = Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Razorpay routes
router.post('/razorpay/order', protect, createRazorpayOrder);
router.post('/razorpay/verify', protect, verifyRazorpayPayment);
router.post('/razorpay/webhook', express.json(), razorpayWebhook);

export default router;

