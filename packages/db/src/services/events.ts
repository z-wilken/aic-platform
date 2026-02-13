import Redis from 'ioredis';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';

// We use two clients: one for publishing, one for subscribing
const pubClient = new Redis(redisUrl);
const subClient = new Redis(redisUrl);

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
    const channel = `tenant:${orgId}:events`;
    const message = JSON.stringify({
      type: eventType,
      orgId,
      payload,
      timestamp: new Date().toISOString(),
    });
    
    await pubClient.publish(channel, message);
    console.log(`[EVENT_BUS] Published ${eventType} to ${channel}`);
  }

  /**
   * Subscribe to a tenant's event stream (SSE logic)
   */
  static subscribe(orgId: string, onMessage: (data: string) => void) {
    const channel = `tenant:${orgId}:events`;
    
    subClient.subscribe(channel, (err) => {
      if (err) {
        console.error(`[EVENT_BUS] Failed to subscribe to ${channel}:`, err);
        return;
      }
      console.log(`[EVENT_BUS] Subscribed to ${channel}`);
    });

    const handler = (chan: string, message: string) => {
      if (chan === channel) {
        onMessage(message);
      }
    };

    subClient.on('message', handler);

    // Return cleanup function
    return () => {
      subClient.removeListener('message', handler);
      subClient.unsubscribe(channel);
    };
  }
}
