import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generatePDF, getReportTemplate } from '../../../../lib/pdf-generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    // 1. Fetch report details and ensure it belongs to this org
    const result = await query(
      `SELECT r.*, o.name as org_name 
       FROM compliance_reports r 
       JOIN organizations o ON r.org_id = o.id 
       WHERE r.id = $1 AND r.org_id = $2`,
      [id, orgId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const report = result.rows[0];
    const data = {
        id: report.id,
        orgName: report.org_name,
        orgId: report.org_id,
        monthYear: report.month_year,
        integrityScore: report.integrity_score,
        findingsCount: report.findings_count,
        auditStatus: report.audit_status,
        tier: session.user.tier
    };

    // 2. Generate PDF
    const html = getReportTemplate(data);
    const pdfBuffer = await generatePDF(html);

    // 3. Return as PDF download
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="AIC-Report-${report.month_year.replace(' ', '-')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF report' }, { status: 500 });
  }
}
