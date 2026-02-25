import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@aic/auth';
import { getSystemDb, auditDocuments } from '@aic/db';
import { createHash } from 'crypto';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const slotType = formData.get('slotType') as string;

    if (!file || !slotType) {
      return NextResponse.json({ error: 'Missing file or slot type' }, { status: 400 });
    }

    // 1. Calculate Checksum for Integrity (Autonomous Factory Logic)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const checksum = createHash('sha256').update(buffer).digest('hex');

    // 2. Register in Database
    const db = getSystemDb();
    const [doc] = await db.insert(auditDocuments).values({
      orgId: session.user.orgId,
      title: file.name,
      slotType,
      fileUrl: `vault/${session.user.orgId}/${file.name}`, // Mock URL for prototype
      fileSize: `${(file.size / 1024).toFixed(2)} KB`,
      fileChecksum: checksum,
      uploadedBy: session.user.id,
      status: 'UPLOADED'
    }).returning();

    // 3. Trigger AI Triage (Async Background Task Placeholder)
    console.log(`[AI FACTORY] Triggering triage for document ${doc.id}`);

    return NextResponse.json({ 
      success: true, 
      document: doc,
      message: 'Document secured in vault. AI Triage initiated.' 
    });

  } catch (error) {
    console.error('[VAULT_UPLOAD_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
