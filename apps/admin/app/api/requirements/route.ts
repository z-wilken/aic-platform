import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, auditRequirements, notifications, eq, asc, calculateOrganizationIntelligence, LedgerService } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.isSuperAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get('org_id');

    if (!orgId) {
        return NextResponse.json({ error: 'org_id is required' }, { status: 400 });
    }

    const db = getSystemDb();
    const result = await db
      .select()
      .from(auditRequirements)
      .where(eq(auditRequirements.orgId, orgId))
      .orderBy(asc(auditRequirements.createdAt));

    return NextResponse.json({
        requirements: result
    });
  } catch (error) {
    console.error('Admin Requirements API Error:', error);
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
    const { id, status, findings, org_id } = body;

    if (!id || !status || !org_id) {
      return NextResponse.json({ error: 'ID, status, and org_id are required' }, { status: 400 });
    }

    const db = getSystemDb();

    return await db.transaction(async (tx) => {
      // 1. Update the requirement status
      const [req] = await tx
        .update(auditRequirements)
        .set({ 
          status, 
          findings: findings || '', 
          updatedAt: new Date() 
        })
        .where(eq(auditRequirements.id, id))
        .returning({ title: auditRequirements.title });

      if (!req) {
        return NextResponse.json({ error: 'Requirement not found' }, { status: 404 });
      }

      // 1.5 Send Automated Notification to Client
      await tx
          .insert(notifications)
          .values({
              orgId: org_id,
              title: status === 'VERIFIED' ? 'Requirement Verified' : 'Action Required',
              message: status === 'VERIFIED' 
                  ? `Your submission for "${req.title}" has been verified by an auditor.` 
                  : `Your submission for "${req.title}" requires further action. Findings: ${findings}`,
              type: 'AUDIT_UPDATE'
          });

      // 2. Recalculate Org Integrity Score using the Intelligence Service
      // This ensures business logic consistency across the platform
      const intel = await calculateOrganizationIntelligence(org_id);

      // 3. Log the administrative action for accountability in the Institutional Ledger
      await LedgerService.append(
          status === 'VERIFIED' ? 'VERIFIED_REQUIREMENT' : 'REJECTED_REQUIREMENT',
          session.user.id,
          { org_id, requirement_id: id, new_score: intel.score, findings: findings || 'None' }
      );

      return NextResponse.json({ success: true, newScore: intel.score });
    });
  } catch (error) {
    console.error('Admin Requirements Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}