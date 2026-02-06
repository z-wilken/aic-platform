import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export async function GET() {
  try {
    const session: any = await getSession();
    
    // For demo/development, fallback to the demo organization ID if no session
    const orgId = session?.user?.orgId || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    const result = await query(
      'SELECT * FROM audit_requirements WHERE org_id = $1 ORDER BY created_at ASC',
      [orgId]
    );

    return NextResponse.json({
        requirements: result.rows,
        orgId
    });
  } catch (error) {
    console.error('Audit Requirements API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, evidence_url } = body;

    if (!id || !evidence_url) {
      return NextResponse.json({ error: 'Requirement ID and Evidence URL are required' }, { status: 400 });
    }

    await query(
      `UPDATE audit_requirements 
       SET status = 'SUBMITTED', evidence_url = $1, updated_at = NOW() 
       WHERE id = $2`,
      [evidence_url, id]
    );

    return NextResponse.json({ success: true, message: 'Evidence submitted successfully' });
  } catch (error) {
    console.error('Audit Requirements Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
