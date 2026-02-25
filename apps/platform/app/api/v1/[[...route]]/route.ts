import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@aic/auth';
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
