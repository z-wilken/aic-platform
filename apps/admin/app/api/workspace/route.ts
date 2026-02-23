import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb, governanceBlocks, auditLedger, HashChainService, eq, asc, and } from '@aic/db';
import { auth } from '@aic/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.orgId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const systemId = searchParams.get('systemId');

  if (!systemId) return NextResponse.json({ error: 'systemId required' }, { status: 400 });

  try {
    const db = getTenantDb(session.user.orgId);
    const blocks = await db.query(async (tx) => {
      return await tx
        .select()
        .from(governanceBlocks)
        .where(and(
          eq(governanceBlocks.orgId, session.user.orgId),
          eq(governanceBlocks.systemId, systemId)
        ))
        .orderBy(asc(governanceBlocks.sequence));
    });

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error('Workspace Load Error:', error);
    return NextResponse.json({ error: 'Failed to load workspace' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.orgId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { blocks, impactMagnitude, systemId } = await request.json();
    const orgId = session.user.orgId;
    const db = getTenantDb(orgId);

    await db.query(async (tx) => {
      // 1. Clear existing blocks for this system
      await tx.delete(governanceBlocks).where(eq(governanceBlocks.systemId, systemId));

      // 2. Insert new block states
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        const [newBlock] = await tx.insert(governanceBlocks).values({
          systemId,
          orgId,
          createdBy: session.user.id,
          type: b.type,
          content: b.content,
          impactMagnitude,
          sequence: i,
        }).returning();

        // 3. SECURE THE LEDGER: Create a hash-chain link for EVERY block
        // (This ensures block-level auditability)
        const [lastLedgerEntry] = await tx
          .select({ currentHash: auditLedger.currentHash })
          .from(auditLedger)
          .where(eq(auditLedger.orgId, orgId))
          .orderBy(desc(auditLedger.timestamp))
          .limit(1);

        const previousHash = lastLedgerEntry?.currentHash || null;
        const currentHash = HashChainService.computeHash(b.content, previousHash);

        await tx.insert(auditLedger).values({
          blockId: newBlock.id,
          orgId,
          currentHash,
          previousHash,
          timestamp: new Date()
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Workspace Save Error:', error);
    return NextResponse.json({ error: 'Failed to secure workspace state' }, { status: 500 });
  }
}
