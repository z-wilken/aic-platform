import { pgTable, uuid, varchar, integer, boolean, timestamp, jsonb, text, pgEnum, decimal } from 'drizzle-orm/pg-core';
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
  contactEmail: varchar('contact_email', { length: 255 }),
  apiKey: varchar('api_key', { length: 255 }),
  auditorId: uuid('auditor_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('VIEWER'),
  orgId: uuid('org_id').references(() => organizations.id),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  isSuperAdmin: boolean('is_super_admin').default(false),
  permissions: jsonb('permissions').default({}),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  orgId: uuid('org_id').references(() => organizations.id),
  systemName: varchar('system_name', { length: 255 }),
  eventType: varchar('event_type', { length: 255 }),
  details: jsonb('details').notNull(),
  status: auditStatusEnum('status').default('PENDING'),
  metadata: jsonb('metadata').default({}),
  integrityHash: varchar('integrity_hash', { length: 64 }),
  previousHash: varchar('previous_hash', { length: 64 }),
  sequenceNumber: integer('sequence_number'),
  signature: text('signature'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Leads
export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: varchar('email', { length: 255 }).unique().notNull(),
  company: varchar('company', { length: 255 }),
  source: varchar('source', { length: 50 }).default('WEB'),
  score: integer('score'),
  status: varchar('status', { length: 50 }).default('NEW'),
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
