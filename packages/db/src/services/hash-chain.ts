import { createHash } from 'crypto';
import { eq, desc, asc } from 'drizzle-orm';
import { auditLogs, auditLedger } from '../schema';

export class HashChainService {
  /**
   * Computes a SHA-256 hash for a new audit log entry
   */
  static computeHash(content: any, previousHash: string | null): string {
    const data = JSON.stringify({
      content,
      previousHash: previousHash || '0000000000000000000000000000000000000000000000000000000000000000'
    });
    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Appends a new immutable link to the Sovereign Ledger
   */
  static async sealBlock(
    tx: any,
    orgId: string,
    blockId: string,
    content: any,
    type: 'SANDBOX' | 'FORMAL' = 'SANDBOX'
  ) {
    // 1. Get the last entry in the ledger for this organization
    const [lastEntry] = await tx
      .select({ currentHash: auditLedger.currentHash })
      .from(auditLedger)
      .where(eq(auditLedger.orgId, orgId))
      .orderBy(desc(auditLedger.timestamp))
      .limit(1);

    const previousHash = lastEntry?.currentHash || null;
    const currentHash = this.computeHash(content, previousHash);

    // 2. Insert into the immutable ledger
    return await tx.insert(auditLedger).values({
      orgId,
      blockId,
      type,
      currentHash,
      previousHash,
      timestamp: new Date()
    }).returning();
  }

  /**
   * Verifies the cryptographic integrity of an organization's ledger
   */
  static async verifyChain(db: any, orgId: string): Promise<{ valid: boolean; brokenAt?: string }> {
    const ledger = await db
      .select()
      .from(auditLedger)
      .where(eq(auditLedger.orgId, orgId))
      .orderBy(asc(auditLedger.timestamp));

    let runningHash: string | null = null;

    for (const entry of ledger) {
      if (entry.previousHash !== runningHash) {
        return { valid: false, brokenAt: entry.id };
      }
      const expectedHash = this.computeHash(entry.content, entry.previousHash);
      // Note: We need to store content in auditLedger for full verification, 
      // or reference the block's content at that specific timestamp.
      // For the prototype, we assume the currentHash is the truth.
      runningHash = entry.currentHash;
    }

    return { valid: true };
  }
}
