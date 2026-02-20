import Redis from 'ioredis';
import { JWT } from 'next-auth/jwt';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
let redis: Redis | null = null;

function getRedis() {
    if (!redis) {
        redis = new Redis(redisUrl, {
            maxRetriesPerRequest: null,
            retryStrategy: (times) => Math.min(times * 50, 2000),
        });
    }
    return redis;
}

/**
 * INSTITUTIONAL TOKEN REVOCATION SERVICE
 * 
 * Implements a high-performance Token Revocation List (TRL) using Redis.
 * Ensures that logged-out or compromised tokens are immediately invalidated
 * across the entire ecosystem.
 */
export class RevocationService {
    /**
     * Revoke a token by adding its JTI to the TRL
     */
    static async revoke(jti: string, expiresAt: number) {
        if (!jti) return;
        const client = getRedis();
        const now = Math.floor(Date.now() / 1000);
        const ttl = expiresAt - now;
        
        if (ttl > 0) {
            await client.set(`trl:${jti}`, 'revoked', 'EX', ttl);
            console.log(`[AUTH] Token revoked: ${jti} (TTL: ${ttl}s)`);
        }
    }

    /**
     * Check if a token JTI is in the TRL
     */
    static async isRevoked(jti: string): Promise<boolean> {
        if (!jti) return false;
        const client = getRedis();
        const exists = await client.exists(`trl:${jti}`);
        return exists === 1;
    }
}
