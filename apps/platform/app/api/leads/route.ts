import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, leads, eq, sql, desc } from '@aic/db';
import { auth } from '@aic/auth';

// GET /api/leads - List leads (admin use only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    // Task M3: Admin-only global access
    if (!session?.user?.isSuperAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const db = getSystemDb();

    return await db.transaction(async (tx) => {
      let whereClause = undefined;
      if (status && source) {
        whereClause = sql`${leads.status} = ${status} AND ${leads.source} = ${source}`;
      } else if (status) {
        whereClause = eq(leads.status, status);
      } else if (source) {
        whereClause = eq(leads.source, source);
      }

      const result = await tx
        .select()
        .from(leads)
        .where(whereClause)
        .orderBy(desc(leads.createdAt))
        .limit(limit);

      // Get stats
      const [stats] = await tx.select({
        total: sql<number>`count(*)`,
        new_leads: sql<number>`count(*) filter (where status = 'NEW')`,
        contacted: sql<number>`count(*) filter (where status = 'CONTACTED')`,
        qualified: sql<number>`count(*) filter (where status = 'QUALIFIED')`,
        converted: sql<number>`count(*) filter (where status = 'CONVERTED')`,
        from_quiz: sql<number>`count(*) filter (where source = 'QUIZ')`,
        from_alpha: sql<number>`count(*) filter (where source = 'ALPHA_FORM')`
      }).from(leads);

      return NextResponse.json({
        leads: result,
        stats
      });
    });

  } catch (error) {
    console.error('[SECURITY] Leads GET Error:', error);
    return NextResponse.json({
      leads: [],
      stats: { total: 0 }
    });
  }
}

// POST /api/leads - Create new lead (Public route)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      company,
      source = 'WEB',
      score,
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const db = getSystemDb();

    const result = await db.transaction(async (tx) => {
      // 1. Check if lead already exists
      const [existingLead] = await tx
        .select()
        .from(leads)
        .where(eq(leads.email, email.toLowerCase()))
        .limit(1);

      if (existingLead) {
        // Update existing lead
        const [updatedLead] = await tx
          .update(leads)
          .set({
            company: company || existingLead.company,
            source: source === 'ALPHA_FORM' ? 'ALPHA_FORM' : existingLead.source,
            score: score !== undefined ? Math.round(score) : existingLead.score,
            status: source === 'ALPHA_FORM' ? 'QUALIFIED' : existingLead.status
          })
          .where(eq(leads.email, email.toLowerCase()))
          .returning();

        return { lead: updatedLead, is_new: false };
      }

      // 2. Create new lead
      const [newLead] = await tx.insert(leads).values({
        email: email.toLowerCase(),
        company: company || null,
        source,
        score: score !== undefined ? Math.round(score) : null,
        status: source === 'ALPHA_FORM' ? 'QUALIFIED' : 'NEW'
      }).returning();

      return { lead: newLead, is_new: true };
    });

    return NextResponse.json({
      message: result.is_new ? 'Lead created successfully' : 'Lead updated',
      lead: result.lead,
      is_new: result.is_new,
      next_steps: source === 'ALPHA_FORM'
        ? ['You will receive a welcome email within 24 hours', 'Our team will schedule an introductory call']
        : ['Your assessment report will be emailed shortly', 'Consider applying to our Alpha Program']
    }, { status: 201 });

  } catch (error) {
    console.error('[SECURITY] Lead Create Error:', error);
    return NextResponse.json({
      message: 'Thank you for your interest! We will be in touch.',
      mode: 'QUEUED'
    }, { status: 201 });
  }
}
