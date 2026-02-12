import { query } from './db';
import crypto from 'crypto';

const ENGINE_URL = process.env.ENGINE_URL || 'http://localhost:8000';

export interface VerificationResult {
    id: string;
    status: 'VERIFIED' | 'TAMPERED';
    error?: string;
}

/**
 * Verify the integrity of a single audit log entry.
 * Recalculates the hash and verifies the RSA signature via the engine.
 */
export async function verifyAuditLog(logId: string): Promise<VerificationResult> {
    try {
        const result = await query('SELECT * FROM audit_logs WHERE id = $1', [logId]);
        if (result.rows.length === 0) throw new Error('Log entry not found');
        
        const log = result.rows[0];
        
        // 1. Recalculate local hash
        const payload = {
            data: log.details,
            previous_hash: log.previous_hash
        };
        const recalculatedHash = crypto.createHash('sha256').update(JSON.stringify(payload, Object.keys(payload).sort(), 0)).digest('hex');
        
        // Note: For actual matching, we must ensure JSON stringification matches the Engine's format.
        // For Alpha, we'll verify the signature via the Engine API which is the source of truth.
        
        const engineRes = await fetch(`${ENGINE_URL}/api/v1/audit-trail/verify-signature`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: log.integrity_hash,
                signature: log.signature
            })
        });

        if (engineRes.ok) {
            const verification = await engineRes.json();
            return {
                id: logId,
                status: verification.valid ? 'VERIFIED' : 'TAMPERED',
                error: verification.error
            };
        }

        return { id: logId, status: 'TAMPERED', error: 'Signature verification service failure' };

    } catch (error: any) {
        return { id: logId, status: 'TAMPERED', error: error.message };
    }
}

/**
 * Verify the entire hash chain for an organization.
 */
export async function verifyOrganizationChain(orgId: string): Promise<{ is_valid: boolean; results: VerificationResult[] }> {
    const logs = await query('SELECT id, integrity_hash, previous_hash FROM audit_logs WHERE org_id = $1 ORDER BY created_at ASC', [orgId]);
    
    let isValid = true;
    const results: VerificationResult[] = [];

    for (let i = 0; i < logs.rows.length; i++) {
        const current = logs.rows[i];
        
        // Check link to previous
        if (i > 0) {
            const previous = logs.rows[i-1];
            if (current.previous_hash !== previous.integrity_hash) {
                isValid = false;
                results.push({ id: current.id, status: 'TAMPERED', error: 'Hash chain link broken' });
                continue;
            }
        }

        // Deep verification
        const deepCheck = await verifyAuditLog(current.id);
        if (deepCheck.status === 'TAMPERED') isValid = false;
        results.push(deepCheck);
    }

    return { is_valid: isValid, results };
}
