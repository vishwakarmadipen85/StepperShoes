import Stripe from 'stripe';
import { CommissionService } from './commissionService';
import Vendor from '../models/Vendor';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_deployment_123';
const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-01-27' as any,
});

export class PaymentService {
    static async createSplitPaymentSession(userId: string, items: any[], shippingAddress: any) {
        // 1. Calculate splits (this would normally happen per-item)
        // For Stripe Checkout, we take the full payment first, then transfer to vendors via 'transfer_group'

        const lineItems = items.map((item: any) => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name, images: [item.image] },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        // Create a Transfer Group ID to track this order's flow
        const transferGroup = `ORDER_${Date.now()}_${userId}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            payment_intent_data: {
                transfer_group: transferGroup,
            },
            metadata: {
                userId,
                transferGroup,
                shippingAddress: JSON.stringify(shippingAddress)
            },
        });

        return { session, transferGroup };
    }

    static async handlePayouts(orderId: string, items: any[], transferGroup: string) {
        // This is called after payment success (e.g. from Webhook)

        for (const item of items) {
            const vendor = await Vendor.findById(item.vendor);
            if (!vendor || !vendor.userId) continue;

            // In a real Connect app, you'd have the vendor's Stripe Connect Account ID
            // const stripeAccountId = vendor.stripeConnectId; 

            const { vendorPayout } = await CommissionService.calculatePayout(item.price * item.quantity, item.vendor);

            // Execute Transfer
            // await stripe.transfers.create({
            //     amount: Math.round(vendorPayout * 100),
            //     currency: 'usd',
            //     destination: stripeAccountId,
            //     transfer_group: transferGroup,
            // });

            console.log(`[Mock Transfer] Sent $${vendorPayout} to Vendor ${vendor.businessName}`);
        }
    }

    static constructEvent(payload: any, signature: string) {
        return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    }
}
