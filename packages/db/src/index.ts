import { drizzle, NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import path from 'path';
import { sql } from 'drizzle-orm';

// Load .env from monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});

export const db = drizzle(pool, { schema });

export type AICDatabase = typeof db;
export type AICTransaction = any; // Simplified to avoid complex relational/enum type constraints

/**
 * INSTITUTIONAL TENANT ISOLATION
 * 
 * Wraps a database operation in a transaction that sets the Postgres
 * 'app.current_org_id' session variable. This enforces Row Level Security (RLS)
 * at the database level.
 */
export async function withTenant<T>(orgId: string, callback: (tx: AICTransaction) => Promise<T>): Promise<T> {
  return await db.transaction(async (tx) => {
    // Set the session variable for RLS
    // Using .execute instead of .run for node-postgres compatibility
    await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
    return await callback(tx);
  });
}

export * from './schema';
export * from './services/intelligence';
export { pool };
export { sql, eq, and, or, desc, asc, like } from 'drizzle-orm';
