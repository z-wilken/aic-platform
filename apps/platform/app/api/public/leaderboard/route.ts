import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, sql } from '@aic/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sector = searchParams.get('sector');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const db = getSystemDb();

    let query = sql`
      SELECT 
        id, 
        name, 
        tier,
        integrity_score as "baseScore",
        iso_42001_readiness_score as "maturityScore",
        accreditation_status as "status"
      FROM organizations
      WHERE public_directory_visible = true
    `;

    if (sector && sector !== 'all') {
      query = sql`${query} AND tier = ${sector}`; // Using tier as proxy for sector in prototype
    }

    query = sql`${query} ORDER BY iso_42001_readiness_score DESC LIMIT ${limit} OFFSET ${offset}`;

    const leaderboard = await db.execute(query);

    return NextResponse.json(leaderboard.rows);
  } catch (error) {
    console.error('[PUBLIC_LEADERBOARD_API] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
