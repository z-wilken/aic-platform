import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../packages/db/src/schema';
import { eq, sql } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import * as path from 'path';
import * as crypto from 'crypto';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});

const db = drizzle(pool, { schema });

const DEMO_PASSWORD = 'Demo1234!';
const DEMO_ORG_SLUG = 'acme-financial-group';

function sha256(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

async function seed() {
  console.log('[DEMO SEED] Starting...');

  try {
    // ── 1. Organisation ──────────────────────────────────────────────────────
    console.log('[DEMO SEED] Upserting demo organisation...');
    const [existingOrg] = await db
      .select()
      .from(schema.organizations)
      .where(eq(schema.organizations.slug, DEMO_ORG_SLUG));

    let orgId: string;

    if (existingOrg) {
      orgId = existingOrg.id;
      console.log(`[DEMO SEED] Org already exists: ${orgId}`);
    } else {
      const [org] = await db
        .insert(schema.organizations)
        .values({
          name: 'Acme Financial Group',
          slug: DEMO_ORG_SLUG,
          tier: 'TIER_2',
          integrityScore: 78,
          iso42001Readiness: 62,
          certificationStatus: 'IN_PROGRESS',
          accreditationStatus: 'PENDING',
          billingStatus: 'TRIAL',
          contactEmail: 'compliance@acmefinancial.co.za',
          primaryAiOfficer: 'Jordan Compliance',
          publicDirectoryVisible: true,
        })
        .returning();
      orgId = org.id;
      console.log(`[DEMO SEED] Created org: ${orgId}`);
    }

    // ── 2. Users ─────────────────────────────────────────────────────────────
    console.log('[DEMO SEED] Upserting demo users...');
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

    const demoUsers = [
      { email: 'viewer@demo.aic',     name: 'Alex Viewer',     role: 'VIEWER'              as const },
      { email: 'auditor@demo.aic',    name: 'Sam Auditor',      role: 'AUDITOR'             as const },
      { email: 'compliance@demo.aic', name: 'Jordan Compliance', role: 'COMPLIANCE_OFFICER' as const },
      { email: 'admin@demo.aic',      name: 'Riley Admin',      role: 'ADMIN'               as const, isSuperAdmin: true },
    ];

    const userIds: Record<string, string> = {};

    for (const u of demoUsers) {
      const [existing] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, u.email));

      if (existing) {
        userIds[u.email] = existing.id;
        console.log(`[DEMO SEED] User exists: ${u.email}`);
        continue;
      }

      const [user] = await db
        .insert(schema.users)
        .values({
          email: u.email,
          name: u.name,
          passwordHash,
          role: u.role,
          orgId,
          isActive: true,
          emailVerified: true,
          isSuperAdmin: u.isSuperAdmin ?? false,
        })
        .returning();

      userIds[u.email] = user.id;
      console.log(`[DEMO SEED] Created user: ${u.email} (${u.role})`);
    }

    // ── 3. Invite code for onboarding demo ───────────────────────────────────
    const [existingCode] = await db
      .select()
      .from(schema.inviteCodes)
      .where(eq(schema.inviteCodes.code, 'DEMO2026'));

    if (!existingCode) {
      await db.insert(schema.inviteCodes).values({
        code: 'DEMO2026',
        role: 'COMPLIANCE_OFFICER',
        orgId,
        maxUses: 50,
        uses: 0,
      });
      console.log('[DEMO SEED] Created invite code: DEMO2026');
    }

    // ── 4. Audit Logs ─────────────────────────────────────────────────────────
    console.log('[DEMO SEED] Checking audit logs...');
    const existingLogs = await db
      .select({ id: schema.auditLogs.id })
      .from(schema.auditLogs)
      .where(eq(schema.auditLogs.orgId, orgId));

    if (existingLogs.length === 0) {
      const complianceUserId = userIds['compliance@demo.aic'];
      const auditorUserId    = userIds['auditor@demo.aic'];

      const logEntries = [
        {
          systemName: 'Credit Scoring Model v2.1',
          eventType: 'DECISION_RECORDED',
          status: 'VERIFIED'   as const,
          details: { action: 'Loan application assessed', outcome: 'APPROVED', score: 742, reason: 'Good credit history' },
          sequenceNumber: 1,
        },
        {
          systemName: 'Fraud Detection Engine',
          eventType: 'ANOMALY_DETECTED',
          status: 'IN_PROGRESS' as const,
          details: { action: 'Transaction flagged for review', transactionId: 'TXN-20260112-8847', amount: 'R 48,500', risk: 'MEDIUM' },
          sequenceNumber: 2,
        },
        {
          systemName: 'Credit Scoring Model v2.1',
          eventType: 'HUMAN_OVERRIDE',
          status: 'COMPLETED'  as const,
          details: { action: 'Human reviewer overrode denial', applicantRef: 'APP-2026-0034', overrideReason: 'Edge case — recent divorce impacted score' },
          sequenceNumber: 3,
        },
        {
          systemName: 'KYC Verification Bot',
          eventType: 'BIAS_AUDIT_RUN',
          status: 'FLAGGED'    as const,
          details: { action: 'Bias audit triggered', metric: 'Demographic parity', variance: '0.14', threshold: '0.10', outcome: 'Requires review' },
          sequenceNumber: 4,
        },
        {
          systemName: 'Collections AI',
          eventType: 'DECISION_RECORDED',
          status: 'VERIFIED'   as const,
          details: { action: 'Payment arrangement approved', accountRef: 'ACC-9921', arrangement: '3-month plan', authorisedBy: 'Jordan Compliance' },
          sequenceNumber: 5,
        },
        {
          systemName: 'KYC Verification Bot',
          eventType: 'INTEGRITY_CHECK',
          status: 'COMPLETED'  as const,
          details: { action: 'Hash chain verified', blocksVerified: 5, integrity: 'INTACT', verifiedBy: 'Sam Auditor' },
          sequenceNumber: 6,
        },
      ];

      let previousHash = '0000000000000000000000000000000000000000000000000000000000000000';

      for (const entry of logEntries) {
        const payload = JSON.stringify({ ...entry, previousHash, orgId });
        const integrityHash = sha256(payload);

        await db.insert(schema.auditLogs).values({
          orgId,
          systemName: entry.systemName,
          eventType: entry.eventType,
          status: entry.status,
          details: entry.details,
          metadata: { source: 'DEMO_SEED' },
          integrityHash,
          previousHash,
          sequenceNumber: entry.sequenceNumber,
          resourceUsage: { compute_ms: Math.floor(Math.random() * 300 + 50), memory_mb: Math.floor(Math.random() * 128 + 32), carbon_estimate_g: 0.002 },
        });

        previousHash = integrityHash;
      }

      console.log(`[DEMO SEED] Created ${logEntries.length} audit log entries`);
    } else {
      console.log(`[DEMO SEED] Audit logs already exist (${existingLogs.length}), skipping`);
    }

    // ── 5. Audit Documents (Evidence Vault) ──────────────────────────────────
    console.log('[DEMO SEED] Checking evidence documents...');
    const existingDocs = await db
      .select({ id: schema.auditDocuments.id })
      .from(schema.auditDocuments)
      .where(eq(schema.auditDocuments.orgId, orgId));

    if (existingDocs.length === 0) {
      const complianceUserId = userIds['compliance@demo.aic'];

      const docs = [
        { title: 'AI Policy & Governance Framework',       slotType: 'ai_policy',           status: 'UPLOADED',  riskScore: 0  },
        { title: 'Model Risk Assessment — Credit Scoring', slotType: 'risk_assessment',      status: 'UPLOADED',  riskScore: 12 },
        { title: 'Bias Audit Report Q1 2026',              slotType: 'bias_audit',           status: 'UPLOADED',  riskScore: 8  },
        { title: 'Human Oversight Procedures',             slotType: 'hitl_procedures',      status: 'UPLOADED',  riskScore: 0  },
        { title: 'Data Governance Policy',                 slotType: 'data_governance',      status: 'UPLOADED',  riskScore: 3  },
        { title: 'Incident Response Playbook',             slotType: 'incident_response',    status: 'PENDING',   riskScore: 0  },
        { title: 'Third-Party AI Vendor Assessment',       slotType: 'vendor_assessment',    status: 'PENDING',   riskScore: 0  },
      ];

      for (const doc of docs) {
        await db.insert(schema.auditDocuments).values({
          orgId,
          title: doc.title,
          slotType: doc.slotType,
          fileUrl: `https://demo.aic.internal/vault/${orgId}/${doc.slotType}.pdf`,
          fileSize: `${Math.floor(Math.random() * 800 + 100)} KB`,
          fileChecksum: sha256(doc.title),
          status: doc.status,
          riskScore: doc.riskScore,
          uploadedBy: complianceUserId,
        });
      }

      console.log(`[DEMO SEED] Created ${docs.length} evidence documents`);
    } else {
      console.log(`[DEMO SEED] Evidence documents already exist (${existingDocs.length}), skipping`);
    }

    // ── 6. AI System ──────────────────────────────────────────────────────────
    const existingSystem = await db
      .select({ id: schema.aiSystems.id })
      .from(schema.aiSystems)
      .where(eq(schema.aiSystems.orgId, orgId));

    if (existingSystem.length === 0) {
      await db.insert(schema.aiSystems).values({
        orgId,
        name: 'Credit Scoring Model',
        version: '2.1.0',
        purpose: 'Automated credit risk assessment for personal loan applications',
        division: 2,
        riskTier: 2,
        lifecycleStage: 'PRODUCTION',
        status: 'ACTIVE',
        isSandbox: false,
        isActive: true,
      });
      console.log('[DEMO SEED] Created AI system: Credit Scoring Model');
    }

    console.log('\n[DEMO SEED] ✅ Complete!\n');
    console.log('  Demo Organisation : Acme Financial Group');
    console.log('  Invite Code       : DEMO2026');
    console.log('  Demo Users (password: Demo1234!):');
    console.log('    viewer@demo.aic     → VIEWER');
    console.log('    auditor@demo.aic    → AUDITOR');
    console.log('    compliance@demo.aic → COMPLIANCE_OFFICER');
    console.log('    admin@demo.aic      → ADMIN (Super Admin)');
    console.log('');
  } catch (err) {
    console.error('[DEMO SEED] ❌ Failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
