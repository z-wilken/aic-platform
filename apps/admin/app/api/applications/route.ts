import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await query('SELECT * FROM alpha_applications ORDER BY created_at DESC');
    return NextResponse.json({ applications: result.rows });
  } catch (error) {
    console.error('Admin Applications API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}