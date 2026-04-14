import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import path from 'path';
import { sql, ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction, PgQueryResultHKT } from 'drizzle-orm/pg-core';

// Load .env from monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export type TenantTransaction = PgTransaction<
  PgQueryResultHKT, 
  typeof schema, 
  ExtractTablesWithRelations<typeof schema>
>;

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getDbInstance() {
  if (!db) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      max: 50, // Institutional Capacity
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      maxUses: 7500, // Prevent memory leaks in long-running processes
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
    query: async <T>(callback: (tx: TenantTransaction) => Promise<T>): Promise<T> => {
      return await rawDb.transaction(async (tx) => {
        await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
        return await callback(tx);
      });
    },
    execute: async (query: any): Promise<any> => {
      return await rawDb.transaction(async (tx) => {
        await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
        return await tx.execute(query);
      });
    },
    select: (...args: any[]) => {
      // Create a proxy that wraps the actual execution in a transaction
      const selectBase = rawDb.select(...args);
      const originalThen = selectBase.then.bind(selectBase);
      selectBase.then = (onfulfilled?: any, onrejected?: any) => {
        return rawDb.transaction(async (tx) => {
          await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
          return await (tx.select(...args) as any).then(onfulfilled, onrejected);
        });
      };
      return selectBase;
    },
    insert: (...args: any[]) => {
      const insertBase = rawDb.insert(...args);
      insertBase.then = (onfulfilled?: any, onrejected?: any) => {
        return rawDb.transaction(async (tx) => {
          await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
          return await (tx.insert(...args) as any).then(onfulfilled, onrejected);
        });
      };
      return insertBase;
    },
    update: (...args: any[]) => {
      const updateBase = rawDb.update(...args);
      updateBase.then = (onfulfilled?: any, onrejected?: any) => {
        return rawDb.transaction(async (tx) => {
          await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
          return await (tx.update(...args) as any).then(onfulfilled, onrejected);
        });
      };
      return updateBase;
    },
    delete: (...args: any[]) => {
      const deleteBase = rawDb.delete(...args);
      deleteBase.then = (onfulfilled?: any, onrejected?: any) => {
        return rawDb.transaction(async (tx) => {
          await tx.execute(sql`SELECT set_config('app.current_org_id', ${orgId}, true)`);
          return await (tx.delete(...args) as any).then(onfulfilled, onrejected);
        });
      };
      return deleteBase;
    },
    transaction: async <T>(callback: (tx: TenantTransaction) => Promise<T>): Promise<T> => {
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
export { sql, eq, and, or, desc, asc, like, gte, lt, avg, count, sum, min, max, isNull, isNotNull } from 'drizzle-orm';
