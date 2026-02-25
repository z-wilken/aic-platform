"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resources = exports.exams = exports.personnelCertifications = exports.globalStandards = exports.newsletterSubscribers = exports.posts = exports.alphaApplications = exports.passwordResetTokens = exports.systemLedger = exports.correctionRequests = exports.decisionRecords = exports.apiKeys = exports.leads = exports.auditSignatures = exports.complianceReports = exports.notifications = exports.auditRequirements = exports.models = exports.scheduledAudits = exports.incidents = exports.auditLogs = exports.users = exports.loginAttempts = exports.revokedTokens = exports.permissionAuditLogs = exports.userCapabilities = exports.roleCapabilities = exports.capabilities = exports.roles = exports.auditLedger = exports.governanceBlocks = exports.aiSystems = exports.documentComments = exports.hitlLogs = exports.issuedCertifications = exports.auditDocuments = exports.organizations = exports.correctionStatusEnum = exports.auditScheduledStatusEnum = exports.incidentStatusEnum = exports.userRoleEnum = exports.auditStatusEnum = exports.tierEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enums
exports.tierEnum = (0, pg_core_1.pgEnum)('tier_enum', ['TIER_1', 'TIER_2', 'TIER_3']);
exports.auditStatusEnum = (0, pg_core_1.pgEnum)('audit_status', ['PENDING', 'VERIFIED', 'FLAGGED']);
exports.userRoleEnum = (0, pg_core_1.pgEnum)('user_role', ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR', 'VIEWER']);
exports.incidentStatusEnum = (0, pg_core_1.pgEnum)('incident_status', ['OPEN', 'INVESTIGATING', 'RESOLVED', 'DISMISSED', 'CLOSED']);
exports.auditScheduledStatusEnum = (0, pg_core_1.pgEnum)('audit_scheduled_status', ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
exports.correctionStatusEnum = (0, pg_core_1.pgEnum)('correction_status', ['SUBMITTED', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED']);
// Organizations (The Tenant)
exports.organizations = (0, pg_core_1.pgTable)('organizations', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)('slug', { length: 100 }).unique(), // for public directory URL
    logoUrl: (0, pg_core_1.text)('logo_url'),
    tier: (0, exports.tierEnum)('tier').default('TIER_3'),
    integrityScore: (0, pg_core_1.integer)('integrity_score').default(0),
    isAlpha: (0, pg_core_1.boolean)('is_alpha').default(false),
    accreditationStatus: (0, pg_core_1.varchar)('accreditation_status', { length: 50 }).default('PENDING'),
    iso42001Readiness: (0, pg_core_1.integer)('iso_42001_readiness_score').default(0),
    certificationStatus: (0, pg_core_1.varchar)('certification_status', { length: 50 }).default('DRAFT'),
    // Billing & JIT Provisioning
    stripeCustomerId: (0, pg_core_1.varchar)('stripe_customer_id', { length: 255 }),
    billingStatus: (0, pg_core_1.varchar)('billing_status', { length: 50 }).default('TRIAL'), // ACTIVE, PAST_DUE, CANCELLED
    planId: (0, pg_core_1.varchar)('plan_id', { length: 50 }),
    // Contact & Metadata
    contactEmail: (0, pg_core_1.varchar)('contact_email', { length: 255 }),
    address: (0, pg_core_1.text)('address'),
    primaryAiOfficer: (0, pg_core_1.varchar)('primary_ai_officer', { length: 255 }),
    // Settings
    publicDirectoryVisible: (0, pg_core_1.boolean)('public_directory_visible').default(false),
    onPremProxyEnabled: (0, pg_core_1.boolean)('on_prem_proxy_enabled').default(false),
    // Ops Tracking
    renewalDate: (0, pg_core_1.timestamp)('renewal_date', { withTimezone: true }),
    laborHoursInvested: (0, pg_core_1.integer)('labor_hours_invested').default(0), // For Unit Economics
    apiKey: (0, pg_core_1.varchar)('api_key', { length: 255 }),
    auditorId: (0, pg_core_1.uuid)('auditor_id').references(() => exports.users.id, { onDelete: 'set null' }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Audit Documents (The Vault)
exports.auditDocuments = (0, pg_core_1.pgTable)('audit_documents', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    slotType: (0, pg_core_1.varchar)('slot_type', { length: 50 }).notNull(),
    fileUrl: (0, pg_core_1.text)('file_url').notNull(),
    fileSize: (0, pg_core_1.varchar)('file_size', { length: 50 }),
    fileChecksum: (0, pg_core_1.varchar)('file_checksum', { length: 64 }), // SHA-256 for integrity
    version: (0, pg_core_1.integer)('version').default(1),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('UPLOADED'),
    // AI Factory Logic
    aiTriageNotes: (0, pg_core_1.text)('ai_triage_notes'),
    ocrExtractedData: (0, pg_core_1.jsonb)('ocr_extracted_data').default({}), // Extracted model names, dates, etc.
    riskScore: (0, pg_core_1.integer)('risk_score').default(0),
    requiredCapability: (0, pg_core_1.varchar)('required_capability', { length: 100 }).default('view_audit_vault'),
    uploadedBy: (0, pg_core_1.uuid)('uploaded_by').references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Issued Certifications (Auto-Cert Generation)
exports.issuedCertifications = (0, pg_core_1.pgTable)('issued_certifications', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    certNumber: (0, pg_core_1.varchar)('cert_number', { length: 100 }).unique().notNull(),
    standard: (0, pg_core_1.varchar)('standard', { length: 100 }).default('ISO/IEC 42001:2023'),
    issueDate: (0, pg_core_1.timestamp)('issue_date', { withTimezone: true }).defaultNow(),
    expiryDate: (0, pg_core_1.timestamp)('expiry_date', { withTimezone: true }).notNull(),
    pdfUrl: (0, pg_core_1.text)('pdf_url'), // Link to the watermarked PDF
    verificationCode: (0, pg_core_1.varchar)('verification_code', { length: 50 }).unique(), // For public directory check
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('ACTIVE'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Human-in-the-Loop (HITL) Logs (Immutable Accountability)
exports.hitlLogs = (0, pg_core_1.pgTable)('hitl_logs', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    actorId: (0, pg_core_1.uuid)('actor_id').references(() => exports.users.id),
    targetType: (0, pg_core_1.varchar)('target_type', { length: 50 }), // 'DOCUMENT', 'RISK_SCORE', 'CERT_STATUS'
    targetId: (0, pg_core_1.uuid)('target_id'),
    previousValue: (0, pg_core_1.jsonb)('previous_value'),
    newValue: (0, pg_core_1.jsonb)('new_value'),
    overrideReason: (0, pg_core_1.text)('override_reason').notNull(),
    integrityHash: (0, pg_core_1.varchar)('integrity_hash', { length: 64 }), // Linked to Sovereign Ledger
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Document Comment Threads
exports.documentComments = (0, pg_core_1.pgTable)('document_comments', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    documentId: (0, pg_core_1.uuid)('document_id').references(() => exports.auditDocuments.id, { onDelete: 'cascade' }),
    userId: (0, pg_core_1.uuid)('user_id').references(() => exports.users.id),
    content: (0, pg_core_1.text)('content').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// AI Systems (The primary governance unit for ISO 42001)
exports.aiSystems = (0, pg_core_1.pgTable)('ai_systems', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    riskTier: (0, pg_core_1.integer)('risk_tier').notNull().default(1),
    lifecycleStage: (0, pg_core_1.varchar)('lifecycle_stage', { length: 50 }).default('DEVELOPMENT'),
    isSandbox: (0, pg_core_1.boolean)('is_sandbox').default(true),
    lastAuditDate: (0, pg_core_1.timestamp)('last_audit_date', { withTimezone: true }),
    metadata: (0, pg_core_1.jsonb)('metadata').default({}),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// Governance Blocks (Block-Based Workspace)
exports.governanceBlocks = (0, pg_core_1.pgTable)('governance_blocks', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    systemId: (0, pg_core_1.uuid)('system_id').references(() => exports.aiSystems.id, { onDelete: 'cascade' }),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).notNull(), // text, file, model-card, human-context
    content: (0, pg_core_1.jsonb)('json_content').notNull(),
    createdBy: (0, pg_core_1.uuid)('created_by').references(() => exports.users.id),
    sequence: (0, pg_core_1.integer)('sequence').notNull(),
    impactMagnitude: (0, pg_core_1.integer)('impact_magnitude').default(1),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        sysSeqIdx: (0, pg_core_1.index)('gov_blocks_sys_seq_idx').on(table.systemId, table.sequence),
    };
});
// Cryptographic Audit Ledger
exports.auditLedger = (0, pg_core_1.pgTable)('audit_ledger', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    blockId: (0, pg_core_1.uuid)('block_id').references(() => exports.governanceBlocks.id),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id),
    type: (0, pg_core_1.varchar)('type', { length: 20 }).default('SANDBOX'), // SANDBOX, FORMAL
    currentHash: (0, pg_core_1.varchar)('current_hash', { length: 64 }).notNull(),
    previousHash: (0, pg_core_1.varchar)('previous_hash', { length: 64 }),
    timestamp: (0, pg_core_1.timestamp)('timestamp', { withTimezone: true }).defaultNow(),
    signature: (0, pg_core_1.text)('signature'),
});
// Roles (WordPress style)
exports.roles = (0, pg_core_1.pgTable)('roles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)('slug', { length: 100 }).unique().notNull(), // e.g. 'corporate_lead'
    description: (0, pg_core_1.text)('description'),
    isCustom: (0, pg_core_1.boolean)('is_custom').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Capabilities (Granular permissions)
exports.capabilities = (0, pg_core_1.pgTable)('capabilities', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)('slug', { length: 100 }).unique().notNull(), // e.g. 'upload_bias_report'
    category: (0, pg_core_1.varchar)('category', { length: 100 }), // e.g. 'Audit', 'User Management'
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Role-Capability mapping (Many-to-Many)
exports.roleCapabilities = (0, pg_core_1.pgTable)('role_capabilities', {
    roleId: (0, pg_core_1.uuid)('role_id').references(() => exports.roles.id, { onDelete: 'cascade' }),
    capabilityId: (0, pg_core_1.uuid)('capability_id').references(() => exports.capabilities.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: (0, pg_core_1.index)('role_cap_pk').on(table.roleId, table.capabilityId),
}));
// User-Capability overrides (Specific permissions for a user)
exports.userCapabilities = (0, pg_core_1.pgTable)('user_capabilities', {
    userId: (0, pg_core_1.uuid)('user_id').references(() => exports.users.id, { onDelete: 'cascade' }),
    capabilityId: (0, pg_core_1.uuid)('capability_id').references(() => exports.capabilities.id, { onDelete: 'cascade' }),
    isGranted: (0, pg_core_1.boolean)('is_granted').default(true), // true = whitelist, false = explicit deny
}, (table) => ({
    pk: (0, pg_core_1.index)('user_cap_pk').on(table.userId, table.capabilityId),
}));
// Permission Audit Logs
exports.permissionAuditLogs = (0, pg_core_1.pgTable)('permission_audit_logs', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    actorId: (0, pg_core_1.uuid)('actor_id').references(() => exports.users.id), // The Super Admin who made the change
    targetUserId: (0, pg_core_1.uuid)('target_user_id').references(() => exports.users.id),
    targetRoleId: (0, pg_core_1.uuid)('target_role_id').references(() => exports.roles.id),
    action: (0, pg_core_1.varchar)('action', { length: 50 }).notNull(), // 'GRANT', 'REVOKE', 'ROLE_CREATE'
    details: (0, pg_core_1.jsonb)('details').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Revoked JWT Tokens (for logout/JTI check)
exports.revokedTokens = (0, pg_core_1.pgTable)('revoked_tokens', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    jti: (0, pg_core_1.varchar)('jti', { length: 255 }).unique().notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at', { withTimezone: true }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Login Attempts (for account lockout)
exports.loginAttempts = (0, pg_core_1.pgTable)('login_attempts', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull(),
    ipAddress: (0, pg_core_1.varchar)('ip_address', { length: 45 }),
    success: (0, pg_core_1.boolean)('success').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        emailIdx: (0, pg_core_1.index)('login_attempts_email_idx').on(table.email),
    };
});
// Users (Updated for TOTP MFA)
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    passwordHash: (0, pg_core_1.varchar)('password_hash', { length: 255 }).notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    roleId: (0, pg_core_1.uuid)('role_id').references(() => exports.roles.id),
    role: (0, exports.userRoleEnum)('role').default('VIEWER'),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    emailVerified: (0, pg_core_1.boolean)('email_verified').default(false),
    isSuperAdmin: (0, pg_core_1.boolean)('is_super_admin').default(false),
    permissions: (0, pg_core_1.jsonb)('permissions').default({}),
    // Security Hardening
    mfaEnabled: (0, pg_core_1.boolean)('mfa_enabled').default(false),
    totpSecret: (0, pg_core_1.text)('totp_secret'),
    backupCodes: (0, pg_core_1.jsonb)('backup_codes').default([]),
    failedLoginAttempts: (0, pg_core_1.integer)('failed_login_attempts').default(0),
    lockoutUntil: (0, pg_core_1.timestamp)('lockout_until', { withTimezone: true }),
    twoFactorSecret: (0, pg_core_1.text)('two_factor_secret'),
    twoFactorEnabled: (0, pg_core_1.boolean)('two_factor_enabled').default(false),
    lastLogin: (0, pg_core_1.timestamp)('last_login', { withTimezone: true }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        orgIdIdx: (0, pg_core_1.index)('users_org_id_idx').on(table.orgId),
    };
});
// Audit Logs (General activity)
exports.auditLogs = (0, pg_core_1.pgTable)('audit_logs', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id),
    systemName: (0, pg_core_1.varchar)('system_name', { length: 255 }),
    eventType: (0, pg_core_1.varchar)('event_type', { length: 255 }),
    details: (0, pg_core_1.jsonb)('details').notNull(),
    status: (0, exports.auditStatusEnum)('status').default('PENDING'),
    metadata: (0, pg_core_1.jsonb)('metadata').default({}),
    resourceUsage: (0, pg_core_1.jsonb)('resource_usage').default({
        compute_ms: 0,
        memory_mb: 0,
        carbon_estimate_g: 0
    }),
    integrityHash: (0, pg_core_1.varchar)('integrity_hash', { length: 64 }),
    previousHash: (0, pg_core_1.varchar)('previous_hash', { length: 64 }),
    sequenceNumber: (0, pg_core_1.integer)('sequence_number'),
    signature: (0, pg_core_1.text)('signature'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
}, (table) => {
    return {
        orgCreatedAtIdx: (0, pg_core_1.index)('audit_logs_org_created_at_idx').on(table.orgId, table.createdAt),
        orgEventTypeIdx: (0, pg_core_1.index)('audit_logs_org_event_type_idx').on(table.orgId, table.eventType),
    };
});
// Incidents
exports.incidents = (0, pg_core_1.pgTable)('incidents', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    citizenEmail: (0, pg_core_1.varchar)('citizen_email', { length: 255 }).notNull(),
    systemName: (0, pg_core_1.varchar)('system_name', { length: 255 }),
    description: (0, pg_core_1.text)('description').notNull(),
    status: (0, exports.incidentStatusEnum)('status').default('OPEN'),
    resolutionDetails: (0, pg_core_1.text)('resolution_details'),
    humanReviewerId: (0, pg_core_1.uuid)('human_reviewer_id').references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// Scheduled Audits
exports.scheduledAudits = (0, pg_core_1.pgTable)('scheduled_audits', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    auditorId: (0, pg_core_1.uuid)('auditor_id').references(() => exports.users.id),
    scheduledAt: (0, pg_core_1.timestamp)('scheduled_at', { withTimezone: true }).notNull(),
    status: (0, exports.auditScheduledStatusEnum)('status').default('SCHEDULED'),
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// Models
exports.models = (0, pg_core_1.pgTable)('models', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    version: (0, pg_core_1.varchar)('version', { length: 50 }).default('1.0.0'),
    type: (0, pg_core_1.varchar)('type', { length: 100 }),
    description: (0, pg_core_1.text)('description'),
    metadata: (0, pg_core_1.jsonb)('metadata').default({}),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// Audit Requirements
exports.auditRequirements = (0, pg_core_1.pgTable)('audit_requirements', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    category: (0, pg_core_1.varchar)('category', { length: 50 }),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('PENDING'),
    evidenceUrl: (0, pg_core_1.text)('evidence_url'),
    findings: (0, pg_core_1.text)('findings'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// Notifications
exports.notifications = (0, pg_core_1.pgTable)('notifications', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    title: (0, pg_core_1.varchar)('title', { length: 255 }),
    message: (0, pg_core_1.text)('message'),
    type: (0, pg_core_1.varchar)('type', { length: 50 }),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('UNREAD'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Compliance Reports
exports.complianceReports = (0, pg_core_1.pgTable)('compliance_reports', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    monthYear: (0, pg_core_1.varchar)('month_year', { length: 20 }).notNull(),
    integrityScore: (0, pg_core_1.integer)('integrity_score').notNull(),
    auditStatus: (0, pg_core_1.varchar)('audit_status', { length: 50 }).default('COMPLIANT'),
    findingsCount: (0, pg_core_1.integer)('findings_count').default(0),
    reportUrl: (0, pg_core_1.text)('report_url'),
    isFinalized: (0, pg_core_1.boolean)('is_finalized').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Audit Signatures (Multi-Sig Ledger)
exports.auditSignatures = (0, pg_core_1.pgTable)('audit_signatures', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    reportId: (0, pg_core_1.uuid)('report_id').references(() => exports.complianceReports.id, { onDelete: 'cascade' }),
    auditorId: (0, pg_core_1.uuid)('auditor_id').references(() => exports.users.id),
    signature: (0, pg_core_1.text)('signature').notNull(), // RS256 signature
    publicKey: (0, pg_core_1.text)('public_key').notNull(),
    metadata: (0, pg_core_1.jsonb)('metadata').default({}),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Leads
exports.leads = (0, pg_core_1.pgTable)('leads', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'set null' }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    company: (0, pg_core_1.varchar)('company', { length: 255 }),
    source: (0, pg_core_1.varchar)('source', { length: 50 }).default('WEB'),
    score: (0, pg_core_1.integer)('score'),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('NEW'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// API Keys
exports.apiKeys = (0, pg_core_1.pgTable)('api_keys', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    keyPrefix: (0, pg_core_1.varchar)('key_prefix', { length: 16 }).notNull(),
    keyHash: (0, pg_core_1.varchar)('key_hash', { length: 255 }).notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    lastUsedAt: (0, pg_core_1.timestamp)('last_used_at', { withTimezone: true }),
    expiresAt: (0, pg_core_1.timestamp)('expires_at', { withTimezone: true }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Decision Records
exports.decisionRecords = (0, pg_core_1.pgTable)('decision_records', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    systemName: (0, pg_core_1.varchar)('system_name', { length: 255 }).notNull(),
    inputParams: (0, pg_core_1.jsonb)('input_params').notNull(),
    outcome: (0, pg_core_1.jsonb)('outcome').notNull(),
    explanation: (0, pg_core_1.text)('explanation'),
    integrityHash: (0, pg_core_1.varchar)('integrity_hash', { length: 64 }).notNull(),
    isHumanOverride: (0, pg_core_1.boolean)('is_human_override').default(false),
    overrideReason: (0, pg_core_1.text)('override_reason'),
    overriddenBy: (0, pg_core_1.uuid)('overridden_by').references(() => exports.users.id),
    syncStatus: (0, pg_core_1.varchar)('sync_status', { length: 20 }).default('SYNCED'), // 'LOCAL_ONLY', 'SYNCED'
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Correction Requests (Update to include decision reference)
exports.correctionRequests = (0, pg_core_1.pgTable)('correction_requests', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    orgId: (0, pg_core_1.uuid)('org_id').references(() => exports.organizations.id, { onDelete: 'cascade' }),
    decisionId: (0, pg_core_1.uuid)('decision_id').references(() => exports.decisionRecords.id),
    citizenEmail: (0, pg_core_1.varchar)('citizen_email', { length: 255 }).notNull(),
    reason: (0, pg_core_1.text)('reason').notNull(),
    supportingEvidenceUrl: (0, pg_core_1.text)('supporting_evidence_url'),
    status: (0, exports.correctionStatusEnum)('status').default('SUBMITTED'),
    resolutionDetails: (0, pg_core_1.text)('resolution_details'),
    humanReviewerId: (0, pg_core_1.uuid)('human_reviewer_id').references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// System Ledger (Immutable Global Audit Trail)
exports.systemLedger = (0, pg_core_1.pgTable)('system_ledger', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    action: (0, pg_core_1.varchar)('action', { length: 255 }).notNull(),
    actorId: (0, pg_core_1.uuid)('actor_id').references(() => exports.users.id),
    details: (0, pg_core_1.jsonb)('details').notNull(),
    previousHash: (0, pg_core_1.varchar)('previous_hash', { length: 64 }),
    integrityHash: (0, pg_core_1.varchar)('integrity_hash', { length: 64 }).notNull(),
    sequenceNumber: (0, pg_core_1.integer)('sequence_number').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Password Reset Tokens
exports.passwordResetTokens = (0, pg_core_1.pgTable)('password_reset_tokens', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    userId: (0, pg_core_1.uuid)('user_id').references(() => exports.users.id, { onDelete: 'cascade' }),
    token: (0, pg_core_1.varchar)('token', { length: 255 }).unique().notNull(),
    used: (0, pg_core_1.boolean)('used').default(false),
    expiresAt: (0, pg_core_1.timestamp)('expires_at', { withTimezone: true }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Alpha Applications
exports.alphaApplications = (0, pg_core_1.pgTable)('alpha_applications', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull(),
    company: (0, pg_core_1.varchar)('company', { length: 255 }),
    useCase: (0, pg_core_1.text)('use_case'),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('PENDING'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Posts (Internal CMS)
exports.posts = (0, pg_core_1.pgTable)('posts', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    slug: (0, pg_core_1.varchar)('slug', { length: 255 }).unique().notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    excerpt: (0, pg_core_1.text)('excerpt'),
    category: (0, pg_core_1.varchar)('category', { length: 50 }).default('General'),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('DRAFT'),
    authorId: (0, pg_core_1.uuid)('author_id').references(() => exports.users.id),
    publishedAt: (0, pg_core_1.timestamp)('published_at', { withTimezone: true }),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
});
// newsletter_subscribers (existing)
exports.newsletterSubscribers = (0, pg_core_1.pgTable)('newsletter_subscribers', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique().notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).default('ACTIVE'),
    subscribedAt: (0, pg_core_1.timestamp)('subscribed_at', { withTimezone: true }).defaultNow(),
});
// Global Standards (Governance Hub)
exports.globalStandards = (0, pg_core_1.pgTable)('global_standards', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    region: (0, pg_core_1.varchar)('region', { length: 255 }).notNull(),
    framework: (0, pg_core_1.varchar)('framework', { length: 255 }).notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 50 }).notNull(), // Enacted, Active, Pending
    level: (0, pg_core_1.varchar)('level', { length: 50 }).notNull(), // High, Moderate, Voluntary
    year: (0, pg_core_1.varchar)('year', { length: 4 }).notNull(),
    alignment: (0, pg_core_1.integer)('alignment').default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Personnel Certification Levels (Professional Portal)
exports.personnelCertifications = (0, pg_core_1.pgTable)('personnel_certifications', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    level: (0, pg_core_1.varchar)('level', { length: 255 }).notNull(),
    code: (0, pg_core_1.varchar)('code', { length: 10 }).notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    requirements: (0, pg_core_1.jsonb)('requirements').notNull(), // Array of strings
    duration: (0, pg_core_1.varchar)('duration', { length: 100 }),
    examFee: (0, pg_core_1.varchar)('exam_fee', { length: 50 }),
    color: (0, pg_core_1.varchar)('color', { length: 50 }),
    badge: (0, pg_core_1.varchar)('badge', { length: 100 }),
    popular: (0, pg_core_1.boolean)('popular').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Upcoming Exams (Professional Portal)
exports.exams = (0, pg_core_1.pgTable)('exams', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    date: (0, pg_core_1.varchar)('date', { length: 100 }).notNull(),
    location: (0, pg_core_1.varchar)('location', { length: 255 }).notNull(),
    seats: (0, pg_core_1.varchar)('seats', { length: 100 }),
    certCode: (0, pg_core_1.varchar)('cert_code', { length: 10 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
// Public Resources (Professional/Corporate Portal)
exports.resources = (0, pg_core_1.pgTable)('resources', {
    id: (0, pg_core_1.uuid)('id').primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).notNull(), // PDF, XLSX, etc.
    size: (0, pg_core_1.varchar)('size', { length: 50 }),
    category: (0, pg_core_1.varchar)('category', { length: 100 }).notNull(), // Study Guide, Template, etc.
    description: (0, pg_core_1.text)('description'),
    downloadUrl: (0, pg_core_1.text)('download_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
