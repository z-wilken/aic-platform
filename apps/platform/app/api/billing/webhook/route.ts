import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { query } from '../../../lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event;

  try {
    if (!endpointSecret) throw new Error('Webhook secret not configured');
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const orgId = session.metadata?.orgId;
      // Update organization tier/status in database
      if (orgId) {
          console.log(`[BILLING] Subscription completed for Org: ${orgId}`);
          // await query('UPDATE organizations SET ... WHERE id = $1', [orgId]);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
