# Database Schema
*Cross-references: [[02-ARCHITECTURE]] | [[05-FUNCTIONS-TO-BUILD]] | [[07-API-ROUTES]] | [[03-ALGORITHMIC-RIGHTS]] | [[00-INDEX]]*

---

## Overview

The database is PostgreSQL, accessed via Drizzle ORM. All schema is defined in `packages/db/src/schema.ts`. Row-Level Security (RLS) policies are in `packages/db/src/rls_policies.sql`.

**Two access patterns:**
- `getTenantDb(orgId)` — RLS enforced, org sees only their own data (use in client-facing apps)
- `getSystemDb()` — No RLS, sees all data (admin/HQ only — see [[05-FUNCTIONS-TO-BUILD]] P0-1 for bypass bugs)

---

## Entity Relationship Map

```
organizations (multi-tenant root)
    │
    ├── users (RBAC: ADMIN/COMPLIANCE_OFFICER/AUDITOR/VIEWER)
    │
    ├── ai_systems (each system certified separately)
    │       └── models (ML models registered to a system)
    │
    ├── auditRequirements (checklist per org, 5-rights categories)
    │       └── auditLogs (evidence log, hash-chained)
    │
    ├── auditLedger (immutable ledger, hash-chain root)
    │       └── auditSignatures (RS256 multi-sig entries)
    │
    ├── governanceBlocks (workspace blocks: text/file/model-card/human-context)
    │
    ├── incidents (AI decision issues raised)
    │       └── correctionRequests (Right 4: Correction pipeline)
    │
    ├── decisionRecords (AI decision audit trail)
    │
    ├── complianceReports (monthly integrity snapshots)
    │
    ├── scheduledAudits (audit calendar)
    │
    ├── notifications (user alerts)
    │
    ├── apiKeys (service-to-service auth)
    │
    └── billingEvents (Stripe webhook events)

[System-level, no tenant isolation]
    ├── leads (CRM — NOTE: currently no org_id, bug — see P0-1)
    ├── alphaApplications (pilot program applications)
    └── posts (internal CMS)

[NEW — Feb 26 2026 — Autonomous Certification Factory]
    ├── audit_documents (Audit Vault — file upload + SHA-256 checksum + OCR + risk scoring)
    ├── issued_certifications (Certificate ledger — AIC cert numbers, expiry, verification codes)
    ├── hitl_logs (Human-in-the-Loop immutable accountability logs)
    ├── roles (WordPress-style dynamic roles)
    ├── capabilities (granular capability slugs — e.g. 'approve_certification')
    ├── role_capabilities (role → capability mapping)
    ├── user_capabilities (per-user overrides — grant/revoke)
    ├── global_standards (Governance Hub — regulatory frameworks by region)
    ├── personnel_certifications (Professional portal — certification levels)
    ├── exams (Professional portal — upcoming exam schedule)
    └── resources (Public resources — PDFs, templates)
```

---

## Core Tables

### `organizations`
The multi-tenant root. Every piece of data belongs to an org.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | `org_id` used in all RLS policies |
| `name` | text | Display name |
| `tier` | enum | `TIER_1 \| TIER_2 \| TIER_3` — certification tier |
| `integrity_score` | integer | 0–100, calculated by `calculateOrganizationIntelligence()` |
| `status` | enum | `ACTIVE \| SUSPENDED \| PENDING` |
| `certified_at` | timestamp | When certification was first issued |
| `last_audit_at` | timestamp | Last verified audit entry |
| `public_listing` | boolean | Whether org appears on public registry |
| `stripe_customer_id` | varchar | **NEW** — Stripe integration |
| `certification_status` | enum | **NEW** — maps to state machine: `DRAFT → PENDING_REVIEW → APPROVED → CERTIFIED` |
| `public_directory_visible` | boolean | **NEW** — toggled true on cert issuance |
| `created_at` | timestamp | |

**Related functions:** `calculateOrganizationIntelligence()`, `assignCertificationTier()`

---

### NEW TABLES — Feb 26 2026

### `audit_documents` (Audit Vault)
Evidence documents uploaded by orgs during certification.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK) | Tenant-scoped |
| `title` | varchar | File name |
| `slot_type` | varchar | Evidence category (e.g. 'bias_test', 'human_oversight_policy') |
| `file_url` | text | Storage URL |
| `file_checksum` | varchar(64) | SHA-256 hash — integrity verification |
| `file_size` | varchar | Human-readable |
| `status` | varchar | `UPLOADED → AI_TRIAGE → REVIEWED → ACCEPTED \| REJECTED` |
| `uploaded_by` | UUID (FK) | User |

### `issued_certifications` (Certificate Ledger)
Every certificate AIC has ever issued. Immutable record.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK) | |
| `cert_number` | varchar | Format: `AIC-XXXXXXXX-2026` |
| `issue_date` | timestamp | |
| `expiry_date` | timestamp | 3-year default |
| `status` | varchar | `ACTIVE \| REVOKED \| EXPIRED` |
| `verification_code` | varchar | Used at `/verify/[id]` public endpoint |

### `hitl_logs` (Human-in-the-Loop Logs)
Immutable record every time a human intervenes in an AI decision. Core accountability evidence.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK) | |
| `system_id` | UUID (FK) | Which AI system |
| `document_id` | UUID (FK) | Related audit doc (optional) |
| `reviewer_id` | UUID (FK) | Human who intervened |
| `decision` | text | What the human decided |
| `override_reason` | text | Why the AI output was overridden |
| `created_at` | timestamp | |

### RBAC Tables

**`roles`** — Dynamic role definitions (e.g. 'Auditor', 'Compliance Officer', 'Super Admin')
**`capabilities`** — Granular capability slugs (e.g. `approve_certification`, `upload_bias_report`)
**`role_capabilities`** — Many-to-many: which roles have which capabilities
**`user_capabilities`** — Per-user overrides: grant or revoke individual capabilities regardless of role

**RBAC logic:** `hasCapability(userId, slug)` in `apps/platform/lib/rbac.ts`
- Super admin (`isSuperAdmin: true`) bypasses all checks — God Mode
- User overrides take precedence over role defaults (WordPress-style)

---

### `users`
Organisation members with role-based access.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | RLS key |
| `email` | text (unique) | |
| `password_hash` | text | bcrypt |
| `role` | enum | `ADMIN \| COMPLIANCE_OFFICER \| AUDITOR \| VIEWER` |
| `is_super_admin` | boolean | AIC internal staff |
| `mfa_enabled` | boolean | ⚠️ Column needed, not yet created — see [[05-FUNCTIONS-TO-BUILD]] P0-2 |
| `totp_secret` | text | ⚠️ Not yet created |
| `backup_codes` | text[] | ⚠️ Not yet created |
| `created_at` | timestamp | |

---

### `ai_systems`
Each AI system an organisation has registered for certification.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `name` | text | Human-readable name |
| `description` | text | What the system does |
| `risk_tier` | enum | `TIER_1 \| TIER_2 \| TIER_3` — risk-based tier for this specific system |
| `lifecycle_stage` | enum | `DEVELOPMENT \| TESTING \| PRODUCTION \| DECOMMISSIONED` |
| `accountable_person` | text | Named human accountable for this system |
| `created_at` | timestamp | |

**POPIA significance:** Each registered system is the unit of certification. One org may have multiple systems at different tiers.

---

### `auditRequirements`
The certification checklist. One row per requirement per org. Grouped into the 5 rights categories.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `title` | text | e.g., "Human Override Process Documented" |
| `category` | text | Maps to one of the 5 rights: `Human Agency \| Explanation \| Empathy \| Correction \| Truth` |
| `status` | enum | `PENDING \| SUBMITTED \| VERIFIED \| FLAGGED` |
| `evidence_url` | text | Link to uploaded evidence |
| `verified_by` | UUID (FK → users) | AIC auditor who verified |
| `verified_at` | timestamp | |
| `created_at` | timestamp | |

**How it drives the score:** `calculateOrganizationIntelligence()` counts `VERIFIED` vs total per category → Radar chart.

**Verification queue:** `apps/admin` queries `WHERE status = 'PENDING'` and displays in verification queue. See [[07-API-ROUTES]].

---

### `auditLogs`
Hash-chained event log. Every significant action is recorded here.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `action` | text | e.g., `REQUIREMENT_VERIFIED`, `INCIDENT_RAISED`, `DECISION_RECORDED` |
| `entity_type` | text | What was acted on |
| `entity_id` | UUID | Which entity |
| `actor_id` | UUID | Who did it |
| `status` | enum | `VERIFIED \| PENDING \| FLAGGED` |
| `integrity_hash` | text | SHA-256 of this entry's content |
| `previous_hash` | text | Hash of the previous entry in chain |
| `sequence_number` | integer | Monotonically increasing |
| `created_at` | timestamp | |

**Hash chain verification:** `integrity_hash` = SHA-256(`entity_id + action + actor_id + previous_hash`). Verifying the chain = confirming each entry's `previous_hash` matches the prior entry's `integrity_hash`.

⚠️ **Gap:** Many actions (decision records, model changes, permission changes) do not write to this table. See [[05-FUNCTIONS-TO-BUILD]] P0-6.

---

### `auditLedger`
Root ledger entries. Can be SANDBOX (development) or FORMAL (production certification).

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `type` | enum | `SANDBOX \| FORMAL` |
| `block_hash` | text | Cryptographic commitment to block of entries |
| `created_at` | timestamp | |

---

### `auditSignatures`
RS256 multi-signature entries on the ledger. Provides cryptographic non-repudiation.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `ledger_id` | UUID (FK → auditLedger) | |
| `signer_id` | UUID (FK → users) | Who signed |
| `signature` | text | RSA-3072 signature |
| `algorithm` | text | `RS256` |
| `created_at` | timestamp | |

---

### `incidents`
AI decision accountability issues raised by the organisation, an auditor, or a citizen.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `system_id` | UUID (FK → ai_systems) | Which system caused the incident |
| `title` | text | |
| `description` | text | |
| `severity` | enum | `LOW \| MEDIUM \| HIGH \| CRITICAL` |
| `status` | enum | `OPEN \| IN_PROGRESS \| RESOLVED \| CLOSED` |
| `right_violated` | text | Which of the 5 rights was involved |
| `raised_by` | UUID | |
| `resolved_at` | timestamp | |
| `created_at` | timestamp | |

---

### `correctionRequests`
Right 4 (Correction) in action. Appeals submitted by affected persons.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `decision_id` | UUID (FK → decisionRecords) | The decision being challenged |
| `submitter_email` | text | Person who submitted the appeal |
| `description` | text | Grounds for appeal |
| `status` | enum | `PENDING \| UNDER_REVIEW \| UPHELD \| DENIED` |
| `response` | text | Organisation's response |
| `responded_at` | timestamp | For SLA tracking |
| `created_at` | timestamp | |

**Analytics target:** `avgDaysToResponse`, `uptakeRate` — see [[05-FUNCTIONS-TO-BUILD]] P2-2.

---

### `decisionRecords`
Audit trail of individual AI decisions made.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `system_id` | UUID (FK → ai_systems) | |
| `decision_type` | text | e.g., `CREDIT_DECISION`, `HIRING_SCREEN` |
| `input_hash` | text | Hash of input data (privacy-preserving) |
| `output` | jsonb | Decision output |
| `explanation` | jsonb | SHAP/LIME output if available |
| `human_reviewed` | boolean | Was there human sign-off? |
| `reviewer_id` | UUID (FK → users) | If human reviewed |
| `created_at` | timestamp | |

⚠️ **Gap:** These records do not write to `auditLogs` — mandatory ledger entry missing. See [[05-FUNCTIONS-TO-BUILD]] P0-6.

---

### `complianceReports`
Monthly snapshots of integrity scores. Powers the Velocity chart in the platform dashboard.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `month_year` | text | e.g., `"2026-01"` |
| `integrity_score` | integer | 0–100 at time of snapshot |
| `per_right_scores` | jsonb | Per-right breakdown |
| `created_at` | timestamp | |

**How it drives the chart:** `/api/stats` queries last 6 months → `velocityData` array → AreaChart in platform dashboard.

---

### `governanceBlocks`
Modular units in the governance workspace. Think Notion-style blocks within AIC.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `system_id` | UUID (FK → ai_systems) | Which AI system this block belongs to |
| `type` | enum | `TEXT \| FILE \| MODEL_CARD \| HUMAN_CONTEXT` |
| `content` | jsonb | Block content (varies by type) |
| `order` | integer | Sort order within workspace |
| `created_at` | timestamp | |

---

### `models`
ML models registered to AI systems.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `org_id` | UUID (FK → organizations) | |
| `system_id` | UUID (FK → ai_systems) | |
| `name` | text | |
| `version` | text | |
| `algorithm` | text | e.g., `RandomForest`, `LogisticRegression` |
| `training_data_description` | text | |
| `last_bias_test_at` | timestamp | |
| `drift_status` | enum | `STABLE \| DRIFTING \| CRITICAL` |
| `created_at` | timestamp | |

---

### `leads`
CRM table. Used by HQ and admin.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `email` | text | |
| `company` | text | |
| `source` | text | e.g., `website`, `referral`, `cold_outreach` |
| `score` | integer | 0–100 qualification score |
| `status` | enum | `active \| converted \| dead` |
| `estimated_tier` | text | Sales team's guess at cert tier |
| `created_at` | timestamp | |

⚠️ **Gap:** No `org_id` column — entire table visible to any auth'd user. See [[05-FUNCTIONS-TO-BUILD]] P0-1.

---

### `alphaApplications`
Pilot program applications from `apps/web`.

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID (PK) | |
| `first_name` | text | |
| `last_name` | text | |
| `company` | text | |
| `email` | text | |
| `role` | text | Applicant's job title |
| `use_case` | text | Described use case |
| `status` | enum | `PENDING \| APPROVED \| REJECTED` |
| `reviewed_by` | UUID | AIC staff reviewer |
| `created_at` | timestamp | |

---

## Tables Needed But Not Yet Created

| Table | Purpose | Linked to |
|-------|---------|-----------|
| `revokedTokens` | JWT revocation | [[05-FUNCTIONS-TO-BUILD]] P0-3 |
| `loginAttempts` | Account lockout | [[05-FUNCTIONS-TO-BUILD]] P0-4 |
| `billingEvents` | Stripe webhook history for revenue velocity | [[05-FUNCTIONS-TO-BUILD]] P2-5 |
| `mfaCodes` / `totpSecrets` | MFA implementation | [[05-FUNCTIONS-TO-BUILD]] P0-2 |
| `sectorBenchmarks` | Sector averages for benchmarking | [[05-FUNCTIONS-TO-BUILD]] P3-3 |

---

## RLS Policy Structure

```sql
-- Example: organizations table
CREATE POLICY org_isolation ON organizations
  USING (id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

-- getTenantDb(orgId) sets the setting:
SET LOCAL app.current_org_id = '<orgId>';
-- Then all queries are automatically scoped to that org
```

**Known bypasses (see [[05-FUNCTIONS-TO-BUILD]] P0-1):** 9 endpoints call `getSystemDb()` where they should call `getTenantDb(orgId)`.

---

*Next: [[07-API-ROUTES]] — complete list of all endpoints across all applications.*
