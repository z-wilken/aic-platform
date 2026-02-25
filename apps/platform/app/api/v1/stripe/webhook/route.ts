import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, organizations, eq } from '@aic/db';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const db = getSystemDb();

  // Unified Backend Logic: Map Stripe events to DB Capabilities
  switch (payload.type) {
    case 'checkout.session.completed': {
      const session = payload.data.object;
      const customerId = session.customer;
      const planId = session.metadata?.planId || 'PRO_CERT';

      await db.update(organizations)
        .set({ 
          billingStatus: 'ACTIVE',
          stripeCustomerId: customerId,
          planId: planId
        })
        .where(eq(organizations.stripeCustomerId, customerId));
      
      console.log(`[STRIPE] JIT Provisioning complete for customer ${customerId}`);
      break;
    }

    case 'invoice.payment_failed': {
      const failedInvoice = payload.data.object;
      await db.update(organizations)
        .set({ billingStatus: 'PAST_DUE' })
        .where(eq(organizations.stripeCustomerId, failedInvoice.customer));
      
      console.log(`[STRIPE] Revoking capabilities for customer ${failedInvoice.customer} due to payment failure`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
