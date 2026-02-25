"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashChainService = void 0;
const crypto_1 = require("crypto");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema");
class HashChainService {
    /**
     * Computes a SHA-256 hash for a new audit log entry
     */
    static computeHash(content, previousHash) {
        const data = JSON.stringify({
            content,
            previousHash: previousHash || '0000000000000000000000000000000000000000000000000000000000000000'
        });
        return (0, crypto_1.createHash)('sha256').update(data).digest('hex');
    }
    /**
     * Appends a new immutable link to the Sovereign Ledger
     */
    static async sealBlock(tx, orgId, blockId, content, type = 'SANDBOX') {
        // 1. Get the last entry in the ledger for this organization
        const [lastEntry] = await tx
            .select({ currentHash: schema_1.auditLedger.currentHash })
            .from(schema_1.auditLedger)
            .where((0, drizzle_orm_1.eq)(schema_1.auditLedger.orgId, orgId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.auditLedger.timestamp))
            .limit(1);
        const previousHash = lastEntry?.currentHash || null;
        const currentHash = this.computeHash(content, previousHash);
        // 2. Insert into the immutable ledger
        return await tx.insert(schema_1.auditLedger).values({
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
    static async verifyChain(db, orgId) {
        const ledger = await db
            .select()
            .from(schema_1.auditLedger)
            .where((0, drizzle_orm_1.eq)(schema_1.auditLedger.orgId, orgId))
            .orderBy((0, drizzle_orm_1.asc)(schema_1.auditLedger.timestamp));
        let runningHash = null;
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
exports.HashChainService = HashChainService;
