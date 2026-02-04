import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
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
