import { NextRequest, NextResponse } from 'next/server';
import { getSystemDb, organizations, issuedCertifications, eq } from '@aic/db';
import { auth } from '@aic/auth';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { orgId } = await req.json();
  const db = getSystemDb();

  // 1. Generate unique Cert Number (Autonomous Factory)
  const certNumber = `AIC-${Math.random().toString(36).substring(2, 10).toUpperCase()}-2026`;

  // 2. Issue Certificate
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 3);

  await db.insert(issuedCertifications).values({
    orgId,
    certNumber,
    issueDate: new Date(),
    expiryDate: expiry,
    status: 'ACTIVE',
    verificationCode: Math.random().toString(36).substring(7).toUpperCase()
  });

  // 3. Update Organization Status & Make Public
  await db.update(organizations)
    .set({ 
      certificationStatus: 'CERTIFIED',
      publicDirectoryVisible: true
    })
    .where(eq(organizations.id, orgId));

  return NextResponse.json({ 
    success: true, 
    certNumber, 
    message: 'Certification issued. Public directory updated.' 
  });
}
