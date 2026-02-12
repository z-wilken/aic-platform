import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const isAlpha = searchParams.get('is_alpha');

    let queryText = `
      SELECT 
        o.*, 
        u.name as auditor_name 
      FROM organizations o
      LEFT JOIN users u ON o.auditor_id = u.id
    `;
    const params: any[] = [];

    if (isAlpha !== null) {
        queryText += ' WHERE o.is_alpha = $1';
        params.push(isAlpha === 'true');
    }

    queryText += ' ORDER BY o.created_at DESC';

    const result = await query(queryText, params);
    return NextResponse.json({ organizations: result.rows });
  } catch (error) {
    console.error('Admin Organizations API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session: any = await getSession();

  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'AUDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { org_id, auditor_id } = body;

    if (!org_id) {
      return NextResponse.json({ error: 'org_id is required' }, { status: 400 });
    }

    await query(
      'UPDATE organizations SET auditor_id = $1 WHERE id = $2',
      [auditor_id === 'none' ? null : auditor_id, org_id]
    );

    return NextResponse.json({ success: true, message: 'Auditor assigned successfully' });
  } catch (error) {
    console.error('Admin Organization Patch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session: any = await getSession();

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, tier, lead_id } = body;

    if (!name || !tier) {
      return NextResponse.json({ error: 'Name and Tier are required' }, { status: 400 });
    }

    // 1. Create the Organization
    const orgResult = await query(
      'INSERT INTO organizations (name, tier, is_alpha) VALUES ($1, $2, TRUE) RETURNING id',
      [name, tier]
    );
    const orgId = orgResult.rows[0].id;

    // 2. If a lead_id is provided, update the lead status
    if (lead_id) {
        await query(
            "UPDATE leads SET status = 'ALPHA_ENROLLED' WHERE id = $1",
            [lead_id]
        );
    }

    // 3. Generate Tier-Specific Audit Requirements
    const reqs: any[] = [
        ['POPIA Section 71 Policy', 'Formal document outlining human intervention procedures.', 'DOCUMENTATION'],
        ['AI System Inventory', 'List of all production models and their business purpose.', 'DOCUMENTATION'],
        ['Human-in-the-Loop Interface', 'Technical proof of manual override capabilities.', 'OVERSIGHT'],
        ['Initial Bias Audit', 'Baseline statistical analysis of primary model datasets.', 'TECHNICAL'],
        ['Data Sovereignty Proof', 'Verification that SPI remains within jurisdiction.', 'TECHNICAL']
    ];

    // Tier 1 & 2 need more rigorous oversight proof
    if (tier === 'TIER_1' || tier === 'TIER_2') {
        reqs.push(['Human Intervention Logs', 'Actual logs of human overrides being triggered.', 'OVERSIGHT']);
        reqs.push(['Impact Assessment (DPIA)', 'Privacy and algorithmic impact assessment reports.', 'REPORTS']);
        reqs.push(['Bias Drift Monitoring', 'Evidence of continuous bias tracking.', 'TECHNICAL']);
    }

    // Tier 1 needs mandatory training and board-level oversight
    if (tier === 'TIER_1') {
        reqs.push(['Board Accountability Charter', 'Formal board-level accountability sign-off.', 'DOCUMENTATION']);
        reqs.push(['Auditor Training Records', 'Proof of certification for human reviewers.', 'OVERSIGHT']);
        reqs.push(['Public Transparency Report', 'Public-facing document explaining AI logic.', 'REPORTS']);
    }

    for (const [title, desc, cat] of reqs) {
        await query(
            'INSERT INTO audit_requirements (org_id, title, description, category, status) VALUES ($1, $2, $3, $4, $5)',
            [orgId, title, desc, cat, 'PENDING']
        );
    }

    // 4. Send Welcome Notification
    await query(
        'INSERT INTO notifications (org_id, title, message, type) VALUES ($1, $2, $3, $4)',
        [orgId, 'Welcome to AIC Alpha', 'Your certification roadmap has been generated. Please review your initial requirements.', 'WELCOME']
    );

    return NextResponse.json({ success: true, orgId });
  } catch (error) {
    console.error('Admin Organization Create Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
