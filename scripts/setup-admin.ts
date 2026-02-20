import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../apps/platform/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function setupAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || password === 'CHANGE_ME_TO_INSTITUTIONAL_GRADE_PASSWORD') {
    console.error('ERROR: ADMIN_EMAIL and a secure ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  console.log(`[INSTITUTIONAL SETUP] Initializing Super Admin: ${email}`);

  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    await db.insert(schema.users).values({
      email,
      passwordHash: hash,
      name: 'System Administrator (Root)',
      role: 'ADMIN',
      isActive: true,
      isSuperAdmin: true,
      permissions: { can_publish: true, can_verify: true, can_manage_users: true },
    }).onConflictDoUpdate({
      target: schema.users.email,
      set: { 
        passwordHash: hash,
        isSuperAdmin: true,
        role: 'ADMIN',
        isActive: true
      }
    });

    console.log('[SUCCESS] Super Admin account secured and updated.');
  } catch (error) {
    console.error('[CRITICAL FAILURE] Failed to setup admin:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupAdmin();
