import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM organizations ORDER BY created_at DESC');
    return NextResponse.json({ organizations: result.rows });
  } catch (error) {
    console.error('Admin Organizations API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
