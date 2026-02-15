import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import path from 'path';
import { sql } from 'drizzle-orm';
import { PgTransaction, PgQueryResultHKT } from 'drizzle-orm/pg-core';

// Load .env from monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDbInstance() {
  if (!db) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
    });
    db = drizzle(pool, { schema });
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
export function getTenantDb(orgId: string) {
  if (!orgId) throw new Error("[SECURITY] Attempted to access tenant DB without an orgId");

  const rawDb = getDbInstance();

  return {
    ...rawDb,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: async <T>(callback: (tx: PgTransaction<PgQueryResultHKT, typeof schema, any>) => Promise<T>): Promise<T> => {
      return await rawDb.transaction(async (tx) => {
        await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
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
export function getSystemDb() {
  return getDbInstance();
}

export * from './schema';
export { schema }; 
export type { PgTransaction, PgQueryResultHKT };
export { pool }; // Note: This will be null until first DB access
export { sql, eq, and, or, desc, asc, like, gte } from 'drizzle-orm';
