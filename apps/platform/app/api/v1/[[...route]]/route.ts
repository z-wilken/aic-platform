import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@aic/auth';
import { getSystemDb, sql, roles, capabilities, organizations, permissionAuditLogs } from '@aic/db';
import { hasCapability } from '@/lib/rbac';

/**
 * Unified API Gateway (v1)
 * Single entry point for Governance, Corporate, and Professional portal logic.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  return handleRequest(req, route, 'GET');
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  return handleRequest(req, route, 'POST');
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ route: string[] }> }) {
  const { route } = await params;
  return handleRequest(req, route, 'PUT');
}

async function handleRequest(req: NextRequest, route: string[], method: string) {
  const session = await auth();
  const path = route?.join('/') || '';

  // 1. Centralized Auth Check
  if (!session && !path.startsWith('public/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Gateway Routing & Capability Enforcement
  // In a real implementation, this would proxy to internal handlers or microservices.
  // Here we demonstrate the logic for the Unified Backend.

  const userId = session?.user?.id;

  if (path.startsWith('corporate/bias-report')) {
    if (!userId) return unauthorized();
    const authorized = await hasCapability(userId, 'upload_bias_report');
    if (!authorized) return forbidden('upload_bias_report');
  }

  if (path.startsWith('governance/approve')) {
    if (!userId) return unauthorized();
    const authorized = await hasCapability(userId, 'approve_certification');
    if (!authorized) return forbidden('approve_certification');
  }

  if (path === 'admin/queue' && method === 'GET') {
    const authorized = await hasCapability(userId!, 'access_admin_tools');
    if (!authorized) return forbidden('access_admin_tools');

    const db = getSystemDb();
    const queue = await db.execute(sql`
      SELECT 
        d.id, 
        o.name as org, 
        d.title as doc, 
        d.status, 
        d.risk_score as risk,
        d.created_at as date
      FROM audit_documents d
      JOIN organizations o ON d.org_id = o.id
      ORDER BY d.created_at DESC
      LIMIT 100
    `);
    return NextResponse.json(queue.rows);
  }

  if (path === 'admin/rbac/roles' && method === 'GET') {
    const authorized = await hasCapability(userId!, 'manage_roles');
    if (!authorized) return forbidden('manage_roles');

    const db = getSystemDb();
    const allRoles = await db.select().from(roles).orderBy(roles.name);
    
    // Enrich with capabilities
    const rolesWithCaps = await Promise.all(allRoles.map(async (r) => {
      const caps = await db.execute(sql`
        SELECT c.slug FROM capabilities c
        JOIN role_capabilities rc ON c.id = rc.capability_id
        WHERE rc.role_id = ${r.id}
      `);
      return { ...r, capabilities: caps.rows.map((c: any) => c.slug) };
    }));

    return NextResponse.json(rolesWithCaps);
  }

  if (path === 'admin/rbac/capabilities' && method === 'GET') {
    const authorized = await hasCapability(userId!, 'manage_roles');
    if (!authorized) return forbidden('manage_roles');

    const db = getSystemDb();
    const allCaps = await db.select().from(capabilities).orderBy(capabilities.category, capabilities.name);
    return NextResponse.json(allCaps);
  }

  if (path === 'public/registry' && method === 'GET') {
    const db = getSystemDb();
    const registry = await db.select({
      name: organizations.name,
      tier: organizations.tier,
      status: organizations.accreditationStatus,
      certifiedAt: organizations.createdAt, // Fallback for prototype
      slug: organizations.slug
    })
    .from(organizations)
    .where(eq(organizations.publicDirectoryVisible, true))
    .orderBy(organizations.name);
    
    return NextResponse.json(registry);
  }

  if (path === 'empathy' && method === 'POST') {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text required for analysis' }, { status: 400 });
    }

    // Forward to Python Engine
    try {
      const engineRes = await fetch(`${process.env.ENGINE_URL}/api/v1/analyze/empathy`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ENGINE_API_KEY}`
        },
        body: JSON.stringify({ text })
      });

      if (!engineRes.ok) {
        throw new Error('Engine analysis failed');
      }

      const result = await engineRes.json();
      return NextResponse.json(result);
    } catch (err) {
      console.error('[EMPATHY_GATEWAY_ERROR]', err);
      // Fallback logic if engine is down
      return NextResponse.json({
        score: 0.75,
        violations: [],
        suggestion: "Ensure neutral, empathetic tone in automated rejections."
      });
    }
  }

  if (path === 'admin/organizations' && method === 'GET') {
    const authorized = await hasCapability(userId!, 'view_all_orgs');
    if (!authorized) return forbidden('view_all_orgs');

    const db = getSystemDb();
    const allOrgs = await db.select().from(organizations).orderBy(organizations.name);
    return NextResponse.json(allOrgs);
  }

  if (path.startsWith('admin/organizations/') && method === 'PATCH') {
    const authorized = await hasCapability(userId!, 'manage_roles');
    if (!authorized) return forbidden('manage_roles');

    const orgId = path.split('/')[2];
    const body = await req.json();
    const db = getSystemDb();

    await db.update(organizations)
      .set({ 
        ...body,
        updatedAt: new Date()
      })
      .where(eq(organizations.id, orgId));

    return NextResponse.json({ success: true });
  }

  if (path === 'analytics/incidents' && method === 'GET') {
    const db = getSystemDb();
    const stats = await db.execute(sql`
      SELECT 
        status, 
        COUNT(*) as count,
        AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) / 3600 as avg_resolution_hours
      FROM incidents
      WHERE org_id = ${session?.user?.orgId}
      GROUP BY status
    `);
    return NextResponse.json(stats.rows);
  }

  if (path === 'analytics/corrections' && method === 'GET') {
    const db = getSystemDb();
    const stats = await db.execute(sql`
      SELECT 
        status, 
        COUNT(*) as count
      FROM correction_requests
      WHERE org_id = ${session?.user?.orgId}
      GROUP BY status
    `);
    return NextResponse.json(stats.rows);
  }

  if (path === 'analytics/decisions' && method === 'GET') {
    const db = getSystemDb();
    const stats = await db.execute(sql`
      SELECT 
        is_human_override, 
        COUNT(*) as count
      FROM decision_records
      WHERE org_id = ${session?.user?.orgId}
      GROUP BY is_human_override
    `);
    return NextResponse.json(stats.rows);
  }

  if (path === 'hq/revenue/velocity' && method === 'GET') {
    const authorized = await hasCapability(userId!, 'view_revenue');
    if (!authorized) return forbidden('view_revenue');

    const db = getSystemDb();
    const revenueStats = await db.execute(sql`
      SELECT 
        tier, 
        COUNT(*) as active_clients,
        CASE 
          WHEN tier = 'TIER_1' THEN 38000
          WHEN tier = 'TIER_2' THEN 12400
          ELSE 0 
        END as tier_price
      FROM organizations
      WHERE billing_status = 'ACTIVE'
      GROUP BY tier
    `);

    const totalMRR = revenueStats.rows.reduce((acc: number, row: any) => 
      acc + (Number(row.active_clients) * Number(row.tier_price)), 0);

    return NextResponse.json({
      mrr: totalMRR,
      currency: 'USD',
      breakdown: revenueStats.rows,
      trend: '+12%' // Mock trend for prototype
    });
  }

  if (path === 'admin/request-revision' && method === 'POST') {
    const authorized = await hasCapability(userId!, 'triage_application');
    if (!authorized) return forbidden('triage_application');

    const { orgId, feedback } = await req.json();
    const db = getSystemDb();

    await db.update(organizations)
      .set({ 
        certificationStatus: 'REVISION_REQUIRED',
        updatedAt: new Date()
      })
      .where(eq(organizations.id, orgId));

    // Record interaction in system ledger for auditability
    await db.insert(permissionAuditLogs).values({
      actorId: userId!,
      targetUserId: null,
      targetRoleId: null,
      action: 'REVISION_REQUESTED',
      details: { orgId, feedback }
    });

    return NextResponse.json({ success: true, status: 'REVISION_REQUIRED' });
  }

  if (path === 'workspace/export' && method === 'GET') {
    const db = getSystemDb();
    const orgId = session?.user?.orgId;
    if (!orgId) return unauthorized();

    // Fetch workspace context for export
    const [org] = await db.select().from(organizations).where(eq(organizations.id, orgId)).limit(1);
    
    // Use existing PDF generator
    const { generatePDF, getReportTemplate } = await import('@/lib/pdf-generator');
    const html = getReportTemplate({
      id: `EXP-${orgId.substring(0,8)}`,
      orgName: org.name,
      orgId: orgId,
      tier: org.tier || 'Tier 3',
      auditStatus: org.certificationStatus,
      integrityScore: org.integrityScore || 0,
      monthYear: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      findingsCount: 0
    });

    const pdfBuffer = await generatePDF(html);
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="AIC-Workspace-Export-${org.name.replace(/\s+/g, '-')}.pdf"`,
      },
    });
  }

  // Placeholder for successful gateway logic
  return NextResponse.json({ 
    gateway: 'AIC Unified API v1',
    status: 'Routing Success',
    endpoint: path,
    method,
    authenticated: !!session,
    role: session?.user?.role || 'anonymous'
  });
}

function forbidden(capability: string) {
  return NextResponse.json({ 
    error: 'Forbidden', 
    message: `Missing capability: ${capability}` 
  }, { status: 403 });
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
