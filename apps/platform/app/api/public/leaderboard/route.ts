import { NextResponse } from 'next/server';
import { getSystemDb, sql } from '@aic/db';

export async function GET() {
  try {
    const db = getSystemDb();

    const leaderboard = await db.query(async (tx) => {
      return await tx.execute(sql`
        SELECT 
          id, 
          name, 
          tier,
          integrity_score as "baseScore",
          iso_42001_readiness_score as "maturityScore",
          accreditation_status as "status"
        FROM organizations
        ORDER BY iso_42001_readiness_score DESC
        LIMIT 100
      `);
    });

    return NextResponse.json(leaderboard.rows);
  } catch (error) {
    console.error('[PUBLIC_LEADERBOARD_API] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
