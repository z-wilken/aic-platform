import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, organizations, users, auditRequirements, notifications, leads, eq, desc } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getSystemDb();
    const result = await db
      .select({
        id: organizations.id,
        name: organizations.name,
        tier: organizations.tier,
        integrityScore: organizations.integrityScore,
        isAlpha: organizations.isAlpha,
        createdAt: organizations.createdAt,
        auditorName: users.name
      })
      .from(organizations)
      .leftJoin(users, eq(organizations.auditorId, users.id))
      .orderBy(desc(organizations.createdAt));

    return NextResponse.json({ organizations: result });
  } catch (error) {
    console.error('Admin Organizations API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { org_id, auditor_id } = body;

    if (!org_id) {
      return NextResponse.json({ error: 'org_id is required' }, { status: 400 });
    }

    const db = getSystemDb();
    await db.update(organizations)
      .set({ auditorId: auditor_id === 'none' ? null : auditor_id })
      .where(eq(organizations.id, org_id));

    return NextResponse.json({ success: true, message: 'Auditor assigned successfully' });
  } catch (error) {
    console.error('Admin Organization Patch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, tier, lead_id } = body;

    if (!name || !tier) {
      return NextResponse.json({ error: 'Name and Tier are required' }, { status: 400 });
    }

    const db = getSystemDb();

    return await db.transaction(async (tx) => {
      // 1. Create the Organization
      const [newOrg] = await tx.insert(organizations).values({
        name,
        tier,
        isAlpha: true
      }).returning({ id: organizations.id });

      const orgId = newOrg.id;

      // 2. If a lead_id is provided, update the lead status
      if (lead_id) {
          await tx.update(leads)
            .set({ status: 'ALPHA_ENROLLED' })
            .where(eq(leads.id, lead_id));
      }

      // 3. Generate Initial Audit Requirements
      const initialRequirements = [
          { title: 'POPIA Section 71 Policy', description: 'Formal document outlining human intervention procedures.', category: 'DOCUMENTATION' },
          { title: 'AI System Inventory', description: 'List of all production models and their business purpose.', category: 'DOCUMENTATION' },
          { title: 'Human-in-the-Loop Interface', description: 'Technical proof of manual override capabilities.', category: 'OVERSIGHT' },
          { title: 'Initial Bias Audit', description: 'Baseline statistical analysis of primary model datasets.', category: 'TECHNICAL' }
      ];

      for (const req of initialRequirements) {
          await tx.insert(auditRequirements).values({
            orgId,
            title: req.title,
            description: req.description,
            category: req.category,
            status: 'PENDING'
          });
      }

      // 4. Send Welcome Notification
      await tx.insert(notifications).values({
          orgId,
          title: 'Welcome to AIC Alpha',
          message: 'Your certification roadmap has been generated. Please review your initial requirements.',
          type: 'WELCOME'
      });

      return NextResponse.json({ success: true, orgId });
    });
  } catch (error) {
    console.error('Admin Organization Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
