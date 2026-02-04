import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch users with the role of 'AUDITOR' or 'ADMIN' (who can also audit)
    const result = await query(
      "SELECT id, name, email, role FROM users WHERE role IN ('AUDITOR', 'ADMIN') AND is_active = TRUE ORDER BY name ASC"
    );
    return NextResponse.json({ auditors: result.rows });
  } catch (error) {
    console.error('Admin Auditors API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
