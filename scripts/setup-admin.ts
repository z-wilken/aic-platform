import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../packages/db/src/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function setupAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('ERROR: ADMIN_EMAIL and a secure ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  console.log(`[INSTITUTIONAL SETUP] Initializing Super Admin: ${email}`);

  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    // Fetch super_admin role ID
    const [saRole] = await db.select().from(schema.roles).where(eq(schema.roles.slug, 'super_admin')).limit(1);
    
    if (!saRole) {
      console.error('ERROR: super_admin role not found. Run seed-capabilities.ts first.');
      process.exit(1);
    }

    await db.insert(schema.users).values({
      email,
      passwordHash: hash,
      name: 'System Administrator (Root)',
      roleId: saRole.id,
      role: 'ADMIN',
      isActive: true,
      isSuperAdmin: true,
      permissions: { can_publish: true, can_verify: true, can_manage_users: true },
    }).onConflictDoUpdate({
      target: schema.users.email,
      set: { 
        passwordHash: hash,
        roleId: saRole.id,
        isSuperAdmin: true,
        role: 'ADMIN',
        isActive: true
      }
    });

    console.log('[SUCCESS] Super Admin account secured and updated with RBAC Role.');
  } catch (error) {
    console.error('[CRITICAL FAILURE] Failed to setup admin:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupAdmin();
