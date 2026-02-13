import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';

let pubClient: Redis | null = null;
let subClient: Redis | null = null;

function getPubClient() {
  if (!pubClient) {
    pubClient = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
    pubClient.on('error', (err) => {
      // Log only once per connection failure to avoid spamming
      if (err.message.includes('ECONNREFUSED')) {
        console.warn('[REDIS] Publisher offline. Real-time events will be queued or skipped.');
      } else {
        console.error('[REDIS] Publisher error:', err.message);
      }
    });
  }
  return pubClient;
}

function getSubClient() {
  if (!subClient) {
    subClient = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
    subClient.on('error', (err) => {
      if (!err.message.includes('ECONNREFUSED')) {
        console.error('[REDIS] Subscriber error:', err.message);
      }
    });
  }
  return subClient;
}

/**
 * INSTITUTIONAL EVENT BUS SERVICE
 * 
 * Handles real-time cross-service communication using Redis Pub/Sub.
 * Enforces tenant-isolated channels to prevent cross-contamination.
 */
export class EventBusService {
  /**
   * Publish an event to a specific tenant's channel
   */
  static async publish(orgId: string, eventType: string, payload: Record<string, unknown>) {
    try {
      const client = getPubClient();
      const channel = `tenant:${orgId}:events`;
      const message = JSON.stringify({
        type: eventType,
        orgId,
        payload,
        timestamp: new Date().toISOString(),
      });
      
      await client.publish(channel, message);
      console.log(`[EVENT_BUS] Published ${eventType} to ${channel}`);
    } catch (err) {
      console.warn('[EVENT_BUS] Failed to publish event (Redis likely offline)');
    }
  }

  /**
   * Subscribe to a tenant's event stream (SSE logic)
   */
  static subscribe(orgId: string, onMessage: (data: string) => void) {
    const channel = `tenant:${orgId}:events`;
    const client = getSubClient();
    
    client.subscribe(channel, (err) => {
      if (err) {
        console.warn(`[EVENT_BUS] Failed to subscribe to ${channel} (Redis likely offline)`);
        return;
      }
      console.log(`[EVENT_BUS] Subscribed to ${channel}`);
    });

    const handler = (chan: string, message: string) => {
      if (chan === channel) {
        onMessage(message);
      }
    };

    client.on('message', handler);

    // Return cleanup function
    return () => {
      client.removeListener('message', handler);
      client.unsubscribe(channel).catch(() => {}); // Ignore errors on unsubscribe
    };
  }
}
