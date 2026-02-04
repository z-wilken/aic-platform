import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM leads ORDER BY created_at DESC');
    return NextResponse.json({ leads: result.rows });
  } catch (error) {
    console.error('Admin Leads API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
