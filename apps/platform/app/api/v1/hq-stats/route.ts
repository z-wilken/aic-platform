import { NextResponse } from 'next/server';
import { getSystemDb, organizations, sql } from '@aic/db';
import { count } from 'drizzle-orm';
import { auth } from '@aic/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getSystemDb();

    // 1. Pipeline Status Distribution
    const pipeline = await db
      .select({ 
        status: organizations.certificationStatus, 
        count: count() 
      })
      .from(organizations)
      .groupBy(organizations.certificationStatus);

    // 2. Aggregate Totals
    const [stats] = await db.execute(sql`
      SELECT 
        COUNT(*) filter (WHERE certification_status = 'CERTIFIED') as active_certs,
        COALESCE(SUM(labor_hours_invested), 0) as total_labor_hours,
        COUNT(DISTINCT id) as total_orgs
      FROM organizations
    `);

    return NextResponse.json({
      pipeline,
      metrics: stats,
      integrityVelocity: '+12.4%', // Placeholder for complex calc
      citizenAppeals: 3,
      auditorUtilization: '68%'
    });

  } catch (error) {
    console.error('[HQ_STATS_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
