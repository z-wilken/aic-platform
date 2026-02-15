import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, organizations, users, auditRequirements, notifications, leads, eq, desc } from '@aic/db';
import { auth } from '@aic/auth';
import { z } from 'zod';

const OrganizationCreateSchema = z.object({
  name: z.string().min(1),
  tier: z.enum(['TIER_1', 'TIER_2', 'TIER_3']),
  lead_id: z.string().uuid().optional(),
  is_alpha: z.boolean().optional().default(false)
});

const OrganizationPatchSchema = z.object({
  org_id: z.string().uuid(),
  auditor_id: z.string().optional()
});

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const isAlpha = searchParams.get('is_alpha');

    const db = getSystemDb();
    
    const whereClause = isAlpha !== null ? eq(organizations.isAlpha, isAlpha === 'true') : undefined;

    const result = await db
      .select({
        id: organizations.id,
        name: organizations.name,
        tier: organizations.tier,
        integrityScore: organizations.integrityScore,
        isAlpha: organizations.isAlpha,
        auditorId: organizations.auditorId,
        createdAt: organizations.createdAt,
        auditorName: users.name
      })
      .from(organizations)
      .leftJoin(users, eq(organizations.auditorId, users.id))
      .where(whereClause)
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
    const validation = OrganizationPatchSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.format() }, { status: 400 });
    }

    const { org_id, auditor_id } = validation.data;
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
    const validation = OrganizationCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validation failed', details: validation.error.format() }, { status: 400 });
    }

    const { name, tier, lead_id, is_alpha } = validation.data;
    const db = getSystemDb();

    return await db.transaction(async (tx) => {
      // 1. Create the Organization
      const [newOrg] = await tx.insert(organizations).values({
        name,
        tier,
        isAlpha: is_alpha
      }).returning({ id: organizations.id });

      const orgId = newOrg.id;

      // 2. If a lead_id is provided, update the lead status
      if (lead_id) {
          await tx.update(leads)
            .set({ status: 'ALPHA_ENROLLED' })
            .where(eq(leads.id, lead_id));
      }

      // 3. Generate Tier-Specific Audit Requirements
      const reqs = [
          { title: 'POPIA Section 71 Policy', description: 'Formal document outlining human intervention procedures.', category: 'DOCUMENTATION' },
          { title: 'AI System Inventory', description: 'List of all production models and their business purpose.', category: 'DOCUMENTATION' },
          { title: 'Human-in-the-Loop Interface', description: 'Technical proof of manual override capabilities.', category: 'OVERSIGHT' },
          { title: 'Initial Bias Audit', description: 'Baseline statistical analysis of primary model datasets.', category: 'TECHNICAL' },
          { title: 'Data Sovereignty Proof', description: 'Verification that SPI remains within jurisdiction.', category: 'TECHNICAL' }
      ];

      if (tier === 'TIER_1' || tier === 'TIER_2') {
          reqs.push({ title: 'Human Intervention Logs', description: 'Actual logs of human overrides being triggered.', category: 'OVERSIGHT' });
          reqs.push({ title: 'Impact Assessment (DPIA)', description: 'Privacy and algorithmic impact assessment reports.', category: 'REPORTS' });
          reqs.push({ title: 'Bias Drift Monitoring', description: 'Evidence of continuous bias tracking.', category: 'TECHNICAL' });
      }

      if (tier === 'TIER_1') {
          reqs.push({ title: 'Board Accountability Charter', description: 'Formal board-level accountability sign-off.', category: 'DOCUMENTATION' });
          reqs.push({ title: 'Auditor Training Records', description: 'Proof of certification for human reviewers.', category: 'OVERSIGHT' });
          reqs.push({ title: 'Public Transparency Report', description: 'Public-facing document explaining AI logic.', category: 'REPORTS' });
      }

      for (const req of reqs) {
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
