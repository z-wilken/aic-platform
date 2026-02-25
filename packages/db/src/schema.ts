import { pgTable, uuid, varchar, integer, boolean, timestamp, jsonb, text, pgEnum, index, type AnyPgColumn } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const tierEnum = pgEnum('tier_enum', ['TIER_1', 'TIER_2', 'TIER_3']);
export const auditStatusEnum = pgEnum('audit_status', ['PENDING', 'VERIFIED', 'FLAGGED']);
export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR', 'VIEWER']);
export const incidentStatusEnum = pgEnum('incident_status', ['OPEN', 'INVESTIGATING', 'RESOLVED', 'DISMISSED', 'CLOSED']);
export const auditScheduledStatusEnum = pgEnum('audit_scheduled_status', ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const correctionStatusEnum = pgEnum('correction_status', ['SUBMITTED', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED']);

// Organizations
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  tier: tierEnum('tier').default('TIER_3'),
  integrityScore: integer('integrity_score').default(0),
  isAlpha: boolean('is_alpha').default(false),
  accreditationStatus: varchar('accreditation_status', { length: 50 }).default('PENDING'),
  iso42001Readiness: integer('iso_42001_readiness_score').default(0),
  contactEmail: varchar('contact_email', { length: 255 }),
  apiKey: varchar('api_key', { length: 255 }),
  auditorId: uuid('auditor_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// AI Systems (The primary governance unit for ISO 42001)
export const aiSystems = pgTable('ai_systems', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  riskTier: integer('risk_tier').notNull().default(1),
  lifecycleStage: varchar('lifecycle_stage', { length: 50 }).default('DEVELOPMENT'),
  isSandbox: boolean('is_sandbox').default(true),
  lastAuditDate: timestamp('last_audit_date', { withTimezone: true }),
  metadata: jsonb('metadata').default({}),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Governance Blocks (Block-Based Workspace)
export const governanceBlocks = pgTable('governance_blocks', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  systemId: uuid('system_id').references(() => aiSystems.id, { onDelete: 'cascade' }),
  orgId: uuid('org_id').references(() => organizations.id),
  type: varchar('type', { length: 50 }).notNull(), // text, file, model-card, human-context
  content: jsonb('json_content').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  sequence: integer('sequence').notNull(),
  impactMagnitude: integer('impact_magnitude').default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    sysSeqIdx: index('gov_blocks_sys_seq_idx').on(table.systemId, table.sequence),
  }
});

// Cryptographic Audit Ledger
export const auditLedger = pgTable('audit_ledger', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  blockId: uuid('block_id').references(() => governanceBlocks.id),
  orgId: uuid('org_id').references(() => organizations.id),
  type: varchar('type', { length: 20 }).default('SANDBOX'), // SANDBOX, FORMAL
  currentHash: varchar('current_hash', { length: 64 }).notNull(),
  previousHash: varchar('previous_hash', { length: 64 }),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
  signature: text('signature'),
});

// Roles (WordPress style)
export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(), // e.g. 'corporate_lead'
  description: text('description'),
  isCustom: boolean('is_custom').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Capabilities (Granular permissions)
export const capabilities = pgTable('capabilities', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(), // e.g. 'upload_bias_report'
  category: varchar('category', { length: 100 }), // e.g. 'Audit', 'User Management'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Role-Capability mapping (Many-to-Many)
export const roleCapabilities = pgTable('role_capabilities', {
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'cascade' }),
  capabilityId: uuid('capability_id').references(() => capabilities.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: index('role_cap_pk').on(table.roleId, table.capabilityId),
}));

// User-Capability overrides (Specific permissions for a user)
export const userCapabilities = pgTable('user_capabilities', {
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  capabilityId: uuid('capability_id').references(() => capabilities.id, { onDelete: 'cascade' }),
  isGranted: boolean('is_granted').default(true), // true = whitelist, false = explicit deny
}, (table) => ({
  pk: index('user_cap_pk').on(table.userId, table.capabilityId),
}));

// Permission Audit Logs
export const permissionAuditLogs = pgTable('permission_audit_logs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  actorId: uuid('actor_id').references(() => users.id), // The Super Admin who made the change
  targetUserId: uuid('target_user_id').references(() => users.id),
  targetRoleId: uuid('target_role_id').references(() => roles.id),
  action: varchar('action', { length: 50 }).notNull(), // 'GRANT', 'REVOKE', 'ROLE_CREATE'
  details: jsonb('details').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  roleId: uuid('role_id').references(() => roles.id),
  role: userRoleEnum('role').default('VIEWER'),
  orgId: uuid('org_id').references((): AnyPgColumn => organizations.id),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  isSuperAdmin: boolean('is_super_admin').default(false),
  permissions: jsonb('permissions').default({}),
  failedLoginAttempts: integer('failed_login_attempts').default(0),
  lockoutUntil: timestamp('lockout_until', { withTimezone: true }),
  twoFactorSecret: text('two_factor_secret'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
  backupCodes: jsonb('backup_codes'),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    orgIdIdx: index('users_org_id_idx').on(table.orgId),
  }
});

// Audit Logs (General activity)
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id),
  systemName: varchar('system_name', { length: 255 }),
  eventType: varchar('event_type', { length: 255 }),
  details: jsonb('details').notNull(),
  status: auditStatusEnum('status').default('PENDING'),
  metadata: jsonb('metadata').default({}),
  resourceUsage: jsonb('resource_usage').default({
    compute_ms: 0,
    memory_mb: 0,
    carbon_estimate_g: 0
  }),
  integrityHash: varchar('integrity_hash', { length: 64 }),
  previousHash: varchar('previous_hash', { length: 64 }),
  sequenceNumber: integer('sequence_number'),
  signature: text('signature'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => {
  return {
    orgCreatedAtIdx: index('audit_logs_org_created_at_idx').on(table.orgId, table.createdAt),
    orgEventTypeIdx: index('audit_logs_org_event_type_idx').on(table.orgId, table.eventType),
  }
});

// Incidents
export const incidents = pgTable('incidents', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  citizenEmail: varchar('citizen_email', { length: 255 }).notNull(),
  systemName: varchar('system_name', { length: 255 }),
  description: text('description').notNull(),
  status: incidentStatusEnum('status').default('OPEN'),
  resolutionDetails: text('resolution_details'),
  humanReviewerId: uuid('human_reviewer_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Scheduled Audits
export const scheduledAudits = pgTable('scheduled_audits', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  auditorId: uuid('auditor_id').references(() => users.id),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }).notNull(),
  status: auditScheduledStatusEnum('status').default('SCHEDULED'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Models
export const models = pgTable('models', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  version: varchar('version', { length: 50 }).default('1.0.0'),
  type: varchar('type', { length: 100 }),
  description: text('description'),
  metadata: jsonb('metadata').default({}),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Audit Requirements
export const auditRequirements = pgTable('audit_requirements', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 50 }),
  status: varchar('status', { length: 50 }).default('PENDING'),
  evidenceUrl: text('evidence_url'),
  findings: text('findings'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }),
  message: text('message'),
  type: varchar('type', { length: 50 }),
  status: varchar('status', { length: 50 }).default('UNREAD'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Compliance Reports
export const complianceReports = pgTable('compliance_reports', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  monthYear: varchar('month_year', { length: 20 }).notNull(),
  integrityScore: integer('integrity_score').notNull(),
  auditStatus: varchar('audit_status', { length: 50 }).default('COMPLIANT'),
  findingsCount: integer('findings_count').default(0),
  reportUrl: text('report_url'),
  isFinalized: boolean('is_finalized').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Audit Signatures (Multi-Sig Ledger)
export const auditSignatures = pgTable('audit_signatures', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  reportId: uuid('report_id').references(() => complianceReports.id, { onDelete: 'cascade' }),
  auditorId: uuid('auditor_id').references(() => users.id),
  signature: text('signature').notNull(), // RS256 signature
  publicKey: text('public_key').notNull(),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Leads
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'set null' }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  company: varchar('company', { length: 255 }),
  source: varchar('source', { length: 50 }).default('WEB'),
  score: integer('score'),
  status: varchar('status', { length: 50 }).default('NEW'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// API Keys
export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  keyPrefix: varchar('key_prefix', { length: 16 }).notNull(),
  keyHash: varchar('key_hash', { length: 255 }).notNull(),
  isActive: boolean('is_active').default(true),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Decision Records
export const decisionRecords = pgTable('decision_records', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  systemName: varchar('system_name', { length: 255 }).notNull(),
  inputParams: jsonb('input_params').notNull(),
  outcome: jsonb('outcome').notNull(),
  explanation: text('explanation'),
  integrityHash: varchar('integrity_hash', { length: 64 }).notNull(),
  isHumanOverride: boolean('is_human_override').default(false),
  overrideReason: text('override_reason'),
  overriddenBy: uuid('overridden_by').references(() => users.id),
  syncStatus: varchar('sync_status', { length: 20 }).default('SYNCED'), // 'LOCAL_ONLY', 'SYNCED'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Correction Requests (Update to include decision reference)
export const correctionRequests = pgTable('correction_requests', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id, { onDelete: 'cascade' }),
  decisionId: uuid('decision_id').references(() => decisionRecords.id),
  citizenEmail: varchar('citizen_email', { length: 255 }).notNull(),
  reason: text('reason').notNull(),
  supportingEvidenceUrl: text('supporting_evidence_url'),
  status: correctionStatusEnum('status').default('SUBMITTED'),
  resolutionDetails: text('resolution_details'),
  humanReviewerId: uuid('human_reviewer_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// System Ledger (Immutable Global Audit Trail)
export const systemLedger = pgTable('system_ledger', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  action: varchar('action', { length: 255 }).notNull(),
  actorId: uuid('actor_id').references(() => users.id),
  details: jsonb('details').notNull(),
  previousHash: varchar('previous_hash', { length: 64 }),
  integrityHash: varchar('integrity_hash', { length: 64 }).notNull(),
  sequenceNumber: integer('sequence_number').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Password Reset Tokens
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).unique().notNull(),
  used: boolean('used').default(false),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Alpha Applications
export const alphaApplications = pgTable('alpha_applications', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  useCase: text('use_case'),
  status: varchar('status', { length: 50 }).default('PENDING'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Posts (Internal CMS)
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  category: varchar('category', { length: 50 }).default('General'),
  status: varchar('status', { length: 50 }).default('DRAFT'),
  authorId: uuid('author_id').references(() => users.id),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// newsletter_subscribers (existing)
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: varchar('email', { length: 255 }).unique().notNull(),
  status: varchar('status', { length: 50 }).default('ACTIVE'),
  subscribedAt: timestamp('subscribed_at', { withTimezone: true }).defaultNow(),
});

// Global Standards (Governance Hub)
export const globalStandards = pgTable('global_standards', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  region: varchar('region', { length: 255 }).notNull(),
  framework: varchar('framework', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // Enacted, Active, Pending
  level: varchar('level', { length: 50 }).notNull(), // High, Moderate, Voluntary
  year: varchar('year', { length: 4 }).notNull(),
  alignment: integer('alignment').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Personnel Certification Levels (Professional Portal)
export const personnelCertifications = pgTable('personnel_certifications', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  level: varchar('level', { length: 255 }).notNull(),
  code: varchar('code', { length: 10 }).notNull(),
  description: text('description').notNull(),
  requirements: jsonb('requirements').notNull(), // Array of strings
  duration: varchar('duration', { length: 100 }),
  examFee: varchar('exam_fee', { length: 50 }),
  color: varchar('color', { length: 50 }),
  badge: varchar('badge', { length: 100 }),
  popular: boolean('popular').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Upcoming Exams (Professional Portal)
export const exams = pgTable('exams', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  date: varchar('date', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  seats: varchar('seats', { length: 100 }),
  certCode: varchar('cert_code', { length: 10 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Public Resources (Professional/Corporate Portal)
export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // PDF, XLSX, etc.
  size: varchar('size', { length: 50 }),
  category: varchar('category', { length: 100 }).notNull(), // Study Guide, Template, etc.
  description: text('description'),
  downloadUrl: text('download_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
