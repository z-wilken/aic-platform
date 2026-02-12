import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session: any = await getSession();
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const org_id = searchParams.get('org_id');

    let sql = `
      SELECT al.*, o.name as organization_name 
      FROM audit_logs al
      JOIN organizations o ON al.org_id = o.id
    `;
    const params = [];

    if (org_id) {
      sql += ` WHERE al.org_id = $1`;
      params.push(org_id);
    }

    sql += ` ORDER BY al.created_at DESC LIMIT 100`;

    const result = await query(sql, params);

    return NextResponse.json({ logs: result.rows });
  } catch (error) {
    console.error('Admin Audit Logs API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
