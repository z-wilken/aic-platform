import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSystemDb, organizations, eq } from '@aic/db';
import type { CertificationTier } from '@aic/types';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2025-01-27',
  });

  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) throw new Error('Webhook secret not configured');
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orgId = session.metadata?.orgId;
      const tier = session.metadata?.tier as CertificationTier;

      // Task M36: Institutional Billing - Update organization tier/status
      if (orgId && tier) {
          console.log(`[BILLING] Subscription completed for Org: ${orgId}, Tier: ${tier}`);
          const db = getSystemDb();
          await db
            .update(organizations)
            .set({ tier: tier })
            .where(eq(organizations.id, orgId));
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
