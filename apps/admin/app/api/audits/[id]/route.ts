import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session: any = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, notes, auditor_id, scheduled_at } = await request.json();

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }
    if (notes !== undefined) {
      updates.push(`notes = $${paramIndex++}`);
      values.push(notes);
    }
    if (auditor_id !== undefined) {
      updates.push(`auditor_id = $${paramIndex++}`);
      values.push(auditor_id);
    }
    if (scheduled_at !== undefined) {
      updates.push(`scheduled_at = $${paramIndex++}`);
      values.push(scheduled_at);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const result = await query(`
      UPDATE scheduled_audits 
      SET ${updates.join(', ')}, updated_at = NOW() 
      WHERE id = $${paramIndex} 
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, audit: result.rows[0] });
  } catch (error) {
    console.error('Scheduled Audit PATCH Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session: any = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await query('DELETE FROM scheduled_audits WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Audit deleted successfully' });
  } catch (error) {
    console.error('Scheduled Audit DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
