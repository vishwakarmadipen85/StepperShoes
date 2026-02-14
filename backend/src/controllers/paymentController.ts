import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';
import Order from '../models/Order';

export const createCheckoutSession = async (req: any, res: Response, next: any) => {
    try {
        const { items, shippingAddress } = req.body;
        const { session } = await PaymentService.createSplitPaymentSession(req.user.id, items, shippingAddress);
        res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (error) {
        next(error);
    }
};

export const stripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    let event;

    try {
        event = PaymentService.constructEvent(req.body, sig);
    } catch (err: any) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        // In a real app, retrieve line items from Stripe or metadata 
        // to reconstruct the order items properly.
        // For this demo, we'll assume successful payment processing.

        console.log(`Payment succeeded for session: ${session.id}`);

        // Trigger Payouts (Async)
        // const items = ... retrieve items from DB or metadata
        // await PaymentService.handlePayouts(orderId, items, session.payment_intent.transfer_group);
    }

    res.json({ received: true });
};
