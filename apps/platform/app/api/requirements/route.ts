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

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, evidence_url } = body;

    if (!id || !evidence_url) {
      return NextResponse.json({ error: 'Requirement ID and Evidence URL are required' }, { status: 400 });
    }

    // 1. Trigger Automated Technical Verification (Deep Tech Step)
    // We simulate document text extraction for the Alpha - in prod, this would use an OCR/PDF parser
    const simulatedDocText = "This policy ensures human intervention and a manual override for all decisions. Data subjects have a right to appeal and request an explanation of the logic involved.";
    
    let findings = 'Automated scan pending.';
    let autoStatus = 'SUBMITTED';

    try {
        const verifyRes = await fetch(`${ENGINE_URL}/api/v1/audit/verify-document`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: simulatedDocText })
        });

        if (verifyRes.ok) {
            const result = await verifyRes.json();
            findings = `Automated Verification: ${result.verification_score}% compliance. ${result.findings.join(' ')}`;
            if (result.verification_score < 75) {
                autoStatus = 'FLAGGED';
                findings += ` Missing: ${result.missing_elements.join(', ')}`;
            }
        }
    } catch (engineErr) {
        console.error('Engine Verification Failed:', engineErr);
    }

    // 2. Update the requirement with automated findings
    await query(
      `UPDATE audit_requirements 
       SET status = $1, evidence_url = $2, findings = $3, updated_at = NOW() 
       WHERE id = $4`,
      [autoStatus, evidence_url, findings, id]
    );

    return NextResponse.json({ 
        success: true, 
        message: 'Evidence submitted and technically verified.',
        findings 
    });
  } catch (error) {
    console.error('Audit Requirements Update Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
