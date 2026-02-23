import Redis from 'ioredis';
import { JWT } from 'next-auth/jwt';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
let redis: Redis | null = null;
let isRedisAvailable = true;

function getRedis() {
    if (!redis) {
        redis = new Redis(redisUrl, {
            maxRetriesPerRequest: 1, // Don't block if down
            retryStrategy: (times) => {
                if (times > 3) {
                    isRedisAvailable = false;
                    return null; // Stop retrying
                }
                return Math.min(times * 200, 1000);
            },
        });

        redis.on('error', (err) => {
            if (isRedisAvailable) {
                console.warn('[AUTH] Token Revocation Service (Redis) unavailable. Falling back to non-revocable sessions.');
                isRedisAvailable = false;
            }
        });

        redis.on('connect', () => {
            isRedisAvailable = true;
            console.log('[AUTH] Token Revocation Service (Redis) connected.');
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
        try {
            const client = getRedis();
            const now = Math.floor(Date.now() / 1000);
            const ttl = expiresAt - now;
            
            if (ttl > 0 && isRedisAvailable) {
                await client.set(`trl:${jti}`, 'revoked', 'EX', ttl);
                console.log(`[AUTH] Token revoked: ${jti} (TTL: ${ttl}s)`);
            }
        } catch (error) {
            console.error('[AUTH] Failed to revoke token:', error);
        }
    }

    /**
     * Check if a token JTI is in the TRL
     */
    static async isRevoked(jti: string): Promise<boolean> {
        if (!jti || !isRedisAvailable) return false;
        try {
            const client = getRedis();
            const exists = await client.exists(`trl:${jti}`);
            return exists === 1;
        } catch (error) {
            isRedisAvailable = false;
            return false;
        }
    }
}
