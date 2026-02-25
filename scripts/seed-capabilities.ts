import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../packages/db/src/schema';
import { sql, inArray } from 'drizzle-orm';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function seed() {
  console.log('[SEED] Initializing RBAC Seeding...');

  try {
    // 1. Seed Capabilities
    const caps = [
      { name: 'Approve Certification', slug: 'approve_certification', category: 'Compliance' },
      { name: 'Triage Application', slug: 'triage_application', category: 'Audit' },
      { name: 'View All Organizations', slug: 'view_all_orgs', category: 'Admin' },
      { name: 'Manage Users', slug: 'manage_users', category: 'Admin' },
      { name: 'Upload Bias Report', slug: 'upload_bias_report', category: 'Audit' },
      { name: 'View Revenue Metrics', slug: 'view_revenue', category: 'Intelligence' },
      { name: 'Manage Roles & Permissions', slug: 'manage_roles', category: 'Security' },
      { name: 'Access HQ Module', slug: 'access_hq', category: 'Modules' },
      { name: 'Access Admin Tools', slug: 'access_admin_tools', category: 'Modules' },
      { name: 'Access Internal Tools', slug: 'access_internal_tools', category: 'Modules' },
    ];

    console.log(`[SEED] Seeding ${caps.length} capabilities...`);
    await db.insert(schema.capabilities).values(caps).onConflictDoNothing();
    const seededCaps = await db.select().from(schema.capabilities);

    // 2. Seed Roles
    const roles = [
      { name: 'Super Admin', slug: 'super_admin', description: 'Total system control (God Mode)' },
      { name: 'Auditor', slug: 'auditor', description: 'Authorized to triage and review evidence' },
      { name: 'Compliance Officer', slug: 'compliance_officer', description: 'Manages organization-level AIMS' },
      { name: 'Viewer', slug: 'viewer', description: 'Read-only access to specific dashboards' },
    ];

    console.log(`[SEED] Seeding ${roles.length} roles...`);
    await db.insert(schema.roles).values(roles).onConflictDoNothing();
    const seededRoles = await db.select().from(schema.roles);

    // 3. Link Super Admin to ALL capabilities
    const superAdmin = seededRoles.find(r => r.slug === 'super_admin');
    if (superAdmin) {
      console.log('[SEED] Mapping all capabilities to Super Admin...');
      const links = seededCaps.map(c => ({
        roleId: superAdmin.id,
        capabilityId: c.id
      }));
      await db.insert(schema.roleCapabilities).values(links).onConflictDoNothing();
    }

    // 4. Link Auditor to Triage + View
    const auditor = seededRoles.find(r => r.slug === 'auditor');
    if (auditor) {
      console.log('[SEED] Mapping Auditor capabilities...');
      const auditorCaps = seededCaps.filter(c => 
        ['triage_application', 'view_all_orgs', 'upload_bias_report'].includes(c.slug)
      );
      const links = auditorCaps.map(c => ({
        roleId: auditor.id,
        capabilityId: c.id
      }));
      if (links.length > 0) {
        await db.insert(schema.roleCapabilities).values(links).onConflictDoNothing();
      }
    }

    console.log('[SUCCESS] Seeding complete.');
  } catch (error) {
    console.error('[CRITICAL FAILURE] Seeding failed:', error);
  } finally {
    await pool.end();
  }
}

seed();
