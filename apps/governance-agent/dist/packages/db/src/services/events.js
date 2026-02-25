"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const pg_1 = require("pg");
dotenv.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
let pubClient = null;
let subClient = null;
let pgPool = null;
function getPubClient() {
    if (!pubClient) {
        pubClient = new ioredis_1.default(redisUrl, {
            maxRetriesPerRequest: null,
            retryStrategy: (times) => Math.min(times * 50, 2000),
        });
        pubClient.on('error', (err) => {
            if (err.message.includes('ECONNREFUSED')) {
                console.warn('[REDIS] Publisher offline. Real-time events will be queued or skipped.');
            }
            else {
                console.error('[REDIS] Publisher error:', err.message);
            }
        });
    }
    return pubClient;
}
function getSubClient() {
    if (!subClient) {
        subClient = new ioredis_1.default(redisUrl, {
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
function getPgPool() {
    if (!pgPool) {
        pgPool = new pg_1.Pool({ connectionString: dbUrl });
    }
    return pgPool;
}
/**
 * INSTITUTIONAL EVENT BUS SERVICE
 *
 * Handles real-time cross-service communication using Redis Pub/Sub
 * and Postgres LISTEN/NOTIFY for database integrity events.
 */
class EventBusService {
    /**
     * Publish an event to a specific tenant's channel (Redis)
     */
    static async publish(orgId, eventType, payload) {
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
        }
        catch {
            console.warn('[EVENT_BUS] Failed to publish event (Redis likely offline)');
        }
    }
    /**
     * Subscribe to a tenant's event stream (Redis)
     */
    static subscribe(orgId, onMessage) {
        const channel = `tenant:${orgId}:events`;
        const client = getSubClient();
        client.subscribe(channel);
        const handler = (chan, message) => {
            if (chan === channel) {
                onMessage(message);
            }
        };
        client.on('message', handler);
        return () => {
            client.removeListener('message', handler);
            client.unsubscribe(channel).catch(() => { });
        };
    }
    /**
     * Listen for Postgres Database Integrity Events (S1-03)
     */
    static async listenToPostgres(onEvent) {
        try {
            const pool = getPgPool();
            const client = await pool.connect();
            client.on('notification', (msg) => {
                if (msg.payload) {
                    try {
                        const payload = JSON.parse(msg.payload);
                        onEvent(msg.channel, payload);
                    }
                    catch (e) {
                        console.error('[POSTGRES_EVENT] Failed to parse notification payload', e);
                    }
                }
            });
            await client.query('LISTEN audit_log_updates');
            await client.query('LISTEN incident_updates');
            console.log('[POSTGRES_EVENT] Listening for integrity events...');
            return () => {
                client.query('UNLISTEN audit_log_updates').catch(() => { });
                client.query('UNLISTEN incident_updates').catch(() => { });
                client.release();
            };
        }
        catch (err) {
            console.error('[POSTGRES_EVENT] Connection failed', err);
            throw err;
        }
    }
}
exports.EventBusService = EventBusService;
