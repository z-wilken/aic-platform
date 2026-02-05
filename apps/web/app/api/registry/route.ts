import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const verifyId = searchParams.get('verify_id');

    if (verifyId) {
        // Find organization by full UUID or short ID (first 12 chars)
        const result = await query(
            'SELECT id, name, tier, integrity_score FROM organizations WHERE (id::text LIKE $1 OR id::text = $2) AND integrity_score = 100 LIMIT 1',
            [`${verifyId}%`, verifyId]
        );
        return NextResponse.json({ organization: result.rows[0] || null });
    }

    // Only return organizations that have an integrity score > 0 (meaning they've started/completed certification)
    const result = await query(
      'SELECT id, name, tier, integrity_score FROM organizations WHERE integrity_score > 0 ORDER BY integrity_score DESC'
    );

    return NextResponse.json({ organizations: result.rows });
  } catch (error) {
    console.error('Public Registry API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
