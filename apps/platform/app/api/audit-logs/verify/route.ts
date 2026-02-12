import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { verifyOrganizationChain } from '@/lib/immutability';

export async function POST(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (!session || !session.user?.orgId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.user.orgId;

    const result = await verifyOrganizationChain(orgId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Verification API Error:', error);
    return NextResponse.json({ error: 'Failed to verify institutional integrity' }, { status: 500 });
  }
}
