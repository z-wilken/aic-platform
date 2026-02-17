import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

export class RateLimiter {
  /**
   * Redis-backed Sliding Window Rate Limiter
   * 
   * @param key Unique identifier (e.g. orgId, IP)
   * @param limit Max requests allowed in the window
   * @param windowMs Window size in milliseconds
   */
  static async check(key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - windowMs;
    const redisKey = `ratelimit:${key}`;

    try {
      // 1. Remove old entries outside the window
      // 2. Count current entries
      // 3. Add current request if under limit
      // 4. Set expiry on the set
      
      const multi = redis.multi();
      multi.zremrangebyscore(redisKey, 0, windowStart);
      multi.zcard(redisKey);
      multi.zadd(redisKey, now, now.toString());
      multi.expire(redisKey, Math.ceil(windowMs / 1000));
      
      const results = await multi.exec();
      if (!results) throw new Error('Redis transaction failed');

      const count = results[1][1] as number;
      const allowed = count < limit;

      if (!allowed) {
          // If not allowed, remove the entry we just added
          await redis.zrem(redisKey, now.toString());
      }

      return {
        allowed,
        remaining: Math.max(0, limit - count - (allowed ? 1 : 0)),
        reset: windowMs // Approximate
      };
    } catch (err) {
      console.error('[SECURITY] Rate Limiter Failure:', err);
      // Fail open to prevent service denial, but log critical error
      return { allowed: true, remaining: 1, reset: 0 };
    }
  }
}
