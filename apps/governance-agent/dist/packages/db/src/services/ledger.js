"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const db_1 = require("../db");
const crypto_1 = require("crypto");
const db = (0, db_1.getSystemDb)();
/**
 * INSTITUTIONAL LEDGER SERVICE
 *
 * Manages an immutable, cryptographically-linked global audit trail
 * for all administrative and system-level actions.
 */
class LedgerService {
    /**
     * Append a new notarized entry to the global system ledger
     */
    static async append(action, actorId, details) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return await db.transaction(async (tx) => {
            // 1. Fetch the latest entry to get its hash
            const [lastEntry] = await tx
                .select({
                integrityHash: db_1.systemLedger.integrityHash,
                sequenceNumber: db_1.systemLedger.sequenceNumber
            })
                .from(db_1.systemLedger)
                .orderBy((0, db_1.desc)(db_1.systemLedger.sequenceNumber))
                .limit(1);
            const previousHash = lastEntry?.integrityHash || 'GENESIS_BLOCK';
            const sequenceNumber = (lastEntry?.sequenceNumber || 0) + 1;
            // 2. Generate the new integrity hash (Chained to previous)
            const dataToHash = JSON.stringify({
                action,
                actorId,
                details,
                previousHash,
                sequenceNumber,
            });
            const integrityHash = (0, crypto_1.createHash)('sha256').update(dataToHash).digest('hex');
            // 3. Persist notarized record
            await tx.insert(db_1.systemLedger).values({
                action,
                actorId,
                details,
                previousHash,
                integrityHash,
                sequenceNumber,
            });
            console.log(`[LEDGER] Action recorded: ${action} (#${sequenceNumber})`);
            return { sequenceNumber, integrityHash };
        });
    }
    /**
     * Verify the integrity of the entire ledger chain
     */
    static async verifyChain() {
        const entries = await db
            .select()
            .from(db_1.systemLedger)
            .orderBy(db_1.systemLedger.sequenceNumber);
        let expectedPreviousHash = 'GENESIS_BLOCK';
        for (const entry of entries) {
            const dataToHash = JSON.stringify({
                action: entry.action,
                actorId: entry.actorId,
                details: entry.details,
                previousHash: entry.previousHash,
                sequenceNumber: entry.sequenceNumber,
            });
            const calculatedHash = (0, crypto_1.createHash)('sha256').update(dataToHash).digest('hex');
            if (calculatedHash !== entry.integrityHash || entry.previousHash !== expectedPreviousHash) {
                console.error(`[LEDGER] Integrity Breach detected at sequence #${entry.sequenceNumber}`);
                return false;
            }
            expectedPreviousHash = entry.integrityHash;
        }
        return true;
    }
}
exports.LedgerService = LedgerService;
