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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lt = exports.gte = exports.like = exports.asc = exports.desc = exports.or = exports.and = exports.eq = exports.sql = exports.pool = exports.schema = void 0;
exports.getTenantDb = getTenantDb;
exports.getSystemDb = getSystemDb;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema = __importStar(require("./schema"));
exports.schema = schema;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const drizzle_orm_1 = require("drizzle-orm");
// Load .env from monorepo root
dotenv.config({ path: path_1.default.resolve(__dirname, '../../../../.env') });
let pool = null;
exports.pool = pool;
let db = null;
function getDbInstance() {
    if (!db) {
        exports.pool = pool = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
            max: 50, // Institutional Capacity
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 30000,
            maxUses: 7500, // Prevent memory leaks in long-running processes
        });
        db = (0, node_postgres_1.drizzle)(pool, { schema });
    }
    return db;
}
/**
 * SOVEREIGN TENANT ISOLATION (ZERO-BYPASS)
 *
 * Returns a database instance scoped to a specific organization.
 * Every query executed through this instance is automatically
 * wrapped in a transaction that sets the 'app.current_org_id' RLS variable.
 */
function getTenantDb(orgId) {
    if (!orgId)
        throw new Error("[SECURITY] Attempted to access tenant DB without an orgId");
    const rawDb = getDbInstance();
    return {
        ...rawDb,
        query: async (callback) => {
            return await rawDb.transaction(async (tx) => {
                await tx.execute((0, drizzle_orm_1.sql) `SELECT set_config('app.current_org_id', ${orgId}, true)`);
                return await callback(tx);
            });
        }
    };
}
/**
 * SYSTEM ACCESS (RESTRICTED)
 *
 * Used for internal administrative tasks (Auth, Organization setup, Global Ledger).
 * Should ONLY be used in /apps/internal or auth callbacks.
 */
function getSystemDb() {
    return getDbInstance();
}
__exportStar(require("./schema"), exports);
var drizzle_orm_2 = require("drizzle-orm");
Object.defineProperty(exports, "sql", { enumerable: true, get: function () { return drizzle_orm_2.sql; } });
Object.defineProperty(exports, "eq", { enumerable: true, get: function () { return drizzle_orm_2.eq; } });
Object.defineProperty(exports, "and", { enumerable: true, get: function () { return drizzle_orm_2.and; } });
Object.defineProperty(exports, "or", { enumerable: true, get: function () { return drizzle_orm_2.or; } });
Object.defineProperty(exports, "desc", { enumerable: true, get: function () { return drizzle_orm_2.desc; } });
Object.defineProperty(exports, "asc", { enumerable: true, get: function () { return drizzle_orm_2.asc; } });
Object.defineProperty(exports, "like", { enumerable: true, get: function () { return drizzle_orm_2.like; } });
Object.defineProperty(exports, "gte", { enumerable: true, get: function () { return drizzle_orm_2.gte; } });
Object.defineProperty(exports, "lt", { enumerable: true, get: function () { return drizzle_orm_2.lt; } });
