# AIC Platform — Consolidated Vision Plan: The Next 25 Major Updates

**Version:** 1.0
**Date:** February 9, 2026
**Author:** Technical Review (Consolidated from all repository documentation)
**Classification:** CONFIDENTIAL — Internal Strategic Planning

---

## Preamble

This document consolidates every planning document, technical specification, business strategy, risk analysis, and codebase review inside the AIC repository into **one authoritative roadmap**. It defines the next 25 major updates required to take the platform from its current state (~85% engine readiness, ~55% platform readiness, ~40% operational readiness) to a production-grade, SANAS-accreditable, revenue-generating certification body.

Every update is ordered by dependency, business impact, and alignment with Zander Wilken's 30-year institutional mission. Each update includes:
- **Why it matters** — The business, legal, or technical justification
- **What it delivers** — Concrete, measurable outcomes
- **How to get there** — Detailed implementation steps
- **Files affected** — Where the code changes live
- **Definition of Done** — How you know it's finished
- **Estimated complexity** — T-shirt sizing (S/M/L/XL)

### Documents Consolidated

| Document | Key Contribution to This Plan |
|----------|-------------------------------|
| `FOUNDERS_VISION.md` | 30-year mission, 5 Algorithmic Rights, South African positioning |
| `PRD.md` | Product requirements, user personas, three-tier framework |
| `BUSINESS_PLAN.md` | Unit economics, ZAR 10M raise, 3-year financial model |
| `PILOT_PROGRAM.md` | Alpha validation strategy, 6-month timeline, success criteria |
| `STRATEGIC_ROADMAP.md` | 5-phase execution plan, regulatory timeline, SANAS pathway |
| `METHODOLOGY.md` | Integrity Score formula, 4-category weights, tier thresholds |
| `ENGINE_REQUIREMENTS.md` | Engine scorecard (35% → 85%), remaining P2 work |
| `PROFESSIONAL_REVIEW.md` | Technical debt inventory, security assessment, architecture gaps |
| `RISK_ANALYSIS.md` | 5 major risks, competitive positioning, mitigation strategies |
| `COMPETITIVE_ANALYSIS.md` | ISO 42001, Big 4, AI governance startups, SANAS bodies |
| `DECLARATION_OF_RIGHTS.md` | 5 Rights framework (Human Agency, Explanation, Empathy, Correction, Truth) |
| `AIC_ECOSYSTEM_WALKTHROUGH.md` | 5-pillar architecture, certification lifecycle, operational flows |
| `AIC_BUSINESS_STRATEGY.md` | Current technical state, phase focus, next milestones |
| `AUDIT_CHECKLIST.md` | Alpha certification requirements per tier |
| `ROLES.md` | Organizational structure, auditor roles, RBAC model |

### Current State Summary

| Layer | Readiness | Key Gaps |
|-------|-----------|----------|
| **Engine (Python)** | 85% | Economic indices, adversarial testing, counterfactual XAI, trusted timestamping |
| **Platform (Client SaaS)** | 55% | Engine integration incomplete, no real-time notifications, no file uploads |
| **Admin (Auditor Portal)** | 50% | No auditor workflow automation, no evidence review pipeline |
| **HQ (Command Center)** | 45% | CRM is static, CMS has no rich editor, no analytics |
| **Web (Marketing)** | 70% | Assessment works, but no registry API, no insurance content |
| **Infrastructure** | 60% | CI exists, but no staging, no observability, no database migrations |
| **Business Operations** | 30% | No Alpha participants yet, no SANAS application, no insurance partnership |

---

## THE 25 MAJOR UPDATES

---

### UPDATE 1: Engine-to-Platform Live Integration

**Why it matters:** The platform currently displays mock data. The engine runs real bias analysis but the two systems don't talk to each other in production. Without this connection, Alpha participants cannot run real audits. This is the single highest-impact technical gap — it is the difference between a demo and a product.

**What it delivers:**
- Platform dashboard calls engine API for live Integrity Score calculations
- Audit page runs real-time disparate impact analysis on uploaded datasets
- Results persist in PostgreSQL with immutable hash chain records
- Every engine response is signed (RSA-3072) and stored

**How to get there:**

1. **Create a server-side engine client in the platform**
   - File: `apps/platform/lib/engine-client.ts`
   - Use `fetch()` with `ENGINE_URL` from environment
   - Implement typed wrappers for every engine endpoint: `analyzeDisparateImpact()`, `calculateIntegrityScore()`, `runComprehensiveAudit()`, `explainWithSHAP()`, `createAuditRecord()`
   - Add retry logic (3 retries, exponential backoff) and circuit breaker pattern
   - Add response type validation using Zod schemas that mirror Pydantic models

2. **Wire the platform dashboard to live scores**
   - File: `apps/platform/app/page.tsx`
   - Replace hardcoded Integrity Score display with server-side call to `/api/v1/integrity/calculate`
   - Fetch and display the 4-category breakdown (Usage 20%, Oversight 35%, Transparency 25%, Infrastructure 20%)
   - Add loading skeleton and error states

3. **Wire the audit page to live analysis**
   - File: `apps/platform/app/audits/page.tsx`
   - Add dataset upload form (CSV, max 10MB)
   - On submit, POST to engine's `/api/v1/analyze` with parsed data
   - Display disparate impact results: selection rates, Four-Fifths ratio, pass/fail status per group
   - Store results in `audit_logs` table with hash chain linking

4. **Create API routes as proxy layer**
   - File: `apps/platform/app/api/engine/[...path]/route.ts`
   - Proxy authenticated requests to the engine, adding org context
   - Enforce RBAC: only ADMIN and COMPLIANCE_OFFICER can trigger audits
   - Log every engine call to `security_logs` table

5. **Add engine health monitoring to platform**
   - File: `apps/platform/app/api/health/route.ts`
   - Call engine's `/health` endpoint
   - Display engine status on platform dashboard (green/amber/red)
   - Alert if engine is unreachable

**Files affected:** `apps/platform/lib/engine-client.ts` (new), `apps/platform/app/page.tsx`, `apps/platform/app/audits/page.tsx`, `apps/platform/app/api/engine/[...path]/route.ts` (new), `apps/platform/app/api/health/route.ts` (new)

**Definition of Done:** A logged-in platform user can upload a CSV dataset, run a real disparate impact analysis against the engine, see results rendered on screen, and those results are persisted with a chain-linked hash in the `audit_logs` table.

**Complexity:** L

---

### UPDATE 2: Database Migration System

**Why it matters:** The platform uses a raw `schema.sql` file with no versioned migrations. Any schema change risks data loss in production. Alpha participants' data must survive upgrades. Every serious certification body needs auditable schema history — SANAS assessors will ask how you manage database changes.

**What it delivers:**
- Versioned, numbered migration files
- Forward and rollback capability
- Seed data separated from schema
- Migration history tracked in the database itself

**How to get there:**

1. **Install node-pg-migrate**
   - `npm install node-pg-migrate --workspace=apps/platform`
   - Add scripts to `apps/platform/package.json`: `"migrate:up"`, `"migrate:down"`, `"migrate:create"`

2. **Create initial migration from existing schema**
   - File: `apps/platform/migrations/001_initial_schema.sql`
   - Extract all CREATE TABLE, CREATE TYPE, and CREATE INDEX statements from current `schema.sql`
   - This becomes the baseline — all future changes are incremental

3. **Create seed data migration**
   - File: `apps/platform/migrations/002_seed_data.sql`
   - Extract INSERT statements from `schema.sql` into separate file
   - Mark as development-only (do not run in production)

4. **Create migration for upcoming features**
   - `003_add_evidence_uploads.sql` — `evidence_files` table (id, org_id, requirement_id, file_url, file_hash, uploaded_by, uploaded_at)
   - `004_add_engine_results.sql` — `engine_results` table (id, org_id, audit_log_id, endpoint_called, request_hash, response_hash, result_json, created_at)
   - `005_add_notification_preferences.sql` — `notification_preferences` table

5. **Integrate into CI/CD**
   - Add migration check to `platform-ci.yml`: run `migrate up --dry-run` to verify migrations apply cleanly
   - Add migration step to Docker entrypoint

6. **Update the existing `migrate.sh` script**
   - Replace raw psql approach with node-pg-migrate calls
   - Keep `--check` dry-run flag

**Files affected:** `apps/platform/package.json`, `apps/platform/migrations/` (new directory), `apps/platform/db/schema.sql` (frozen as reference), `.github/workflows/platform-ci.yml`

**Definition of Done:** `npm run migrate:up` applies all migrations in order. `npm run migrate:down` rolls back the last migration. CI pipeline verifies migrations on every PR. Migration history is queryable from `pgmigrations` table.

**Complexity:** M

---

### UPDATE 3: Evidence Upload & Document Management

**Why it matters:** The certification lifecycle (from `AIC_ECOSYSTEM_WALKTHROUGH.md`, Phase 3) requires organizations to upload evidence — AI policy documents, bias testing results, governance frameworks. Currently the roadmap page only accepts URLs. Alpha participants need to upload actual files for auditor review. Without this, the entire certification workflow is theoretical.

**What it delivers:**
- Secure file upload to S3-compatible storage (local MinIO for dev, S3 for production)
- File integrity verification (SHA-256 hash on upload, re-verified on download)
- Per-requirement evidence attachment (links files to specific audit checklist items)
- Auditor can view, approve, or reject uploaded evidence

**How to get there:**

1. **Add S3-compatible storage**
   - Add MinIO service to `docker-compose.yml` for local development
   - Create `apps/platform/lib/storage.ts` with presigned URL generation
   - Use `@aws-sdk/client-s3` for S3-compatible operations
   - Configure via environment: `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`

2. **Create upload API route**
   - File: `apps/platform/app/api/evidence/upload/route.ts`
   - Accept multipart form data (max 25MB per file)
   - Allowed types: PDF, DOCX, XLSX, CSV, PNG, JPG
   - Compute SHA-256 hash of file content before upload
   - Store metadata in `evidence_files` table (from migration 003)
   - Return presigned download URL

3. **Build upload UI on roadmap page**
   - File: `apps/platform/app/roadmap/page.tsx`
   - Add drag-and-drop upload zone per audit requirement
   - Show upload progress, file name, hash, and timestamp
   - Allow multiple files per requirement
   - Display previously uploaded files with download links

4. **Build evidence review in admin**
   - File: `apps/admin/app/audits/[id]/page.tsx`
   - Show all uploaded evidence per requirement
   - Inline PDF viewer for document review
   - Approve/Reject buttons that update requirement status
   - Rejection requires a written reason (stored in `audit_logs`)

5. **Add virus scanning (ClamAV)**
   - Add ClamAV container to `docker-compose.yml`
   - Scan every upload before accepting
   - Reject files that fail scan with clear error message

**Files affected:** `docker-compose.yml`, `apps/platform/lib/storage.ts` (new), `apps/platform/app/api/evidence/` (new), `apps/platform/app/roadmap/page.tsx`, `apps/admin/app/audits/[id]/page.tsx`, `.env.example`

**Definition of Done:** A platform user can drag-and-drop a PDF onto a specific audit requirement. The file is stored securely, hashed, and visible to the assigned auditor in the admin panel. The auditor can view the PDF inline and click Verify or Reject.

**Complexity:** L

---

### UPDATE 4: Real-Time Notification System

**Why it matters:** The `AIC_BUSINESS_STRATEGY.md` identifies real-time notifications as a next technical milestone. The certification lifecycle involves multiple handoffs between client and auditor. Currently there is no way for an auditor's verification to instantly notify the client. The current 30-second polling approach wastes resources and feels sluggish.

**What it delivers:**
- WebSocket connection between platform and admin apps
- Instant notification when auditor verifies/rejects a requirement
- Instant notification when client uploads new evidence
- Notification bell with unread count in the platform header
- Email notifications for critical events (certification issued, requirement rejected)

**How to get there:**

1. **Set up WebSocket server**
   - Create a lightweight Node.js WebSocket service using `ws` library
   - Add to `docker-compose.yml` on port 3005
   - Authenticate connections using JWT from NextAuth
   - Channel-based subscriptions: `org:{orgId}`, `admin:all`, `auditor:{auditorId}`

2. **Create notification service**
   - File: `apps/platform/lib/notifications.ts`
   - `sendNotification(orgId, type, message, data)` — persists to `notifications` table and broadcasts via WebSocket
   - Types: `REQUIREMENT_VERIFIED`, `REQUIREMENT_REJECTED`, `EVIDENCE_UPLOADED`, `SCORE_UPDATED`, `CERTIFICATION_ISSUED`

3. **Add notification UI component**
   - File: `packages/ui/src/notification-bell.tsx`
   - Shared component used by platform, admin, and HQ
   - Shows unread count badge, dropdown with recent notifications
   - Click marks as read, navigates to relevant page

4. **Add email notifications for critical events**
   - Use Resend or Nodemailer with SMTP
   - Templates for: certification issued, requirement rejected, score changed
   - Configurable per-user notification preferences

5. **Wire into certification lifecycle**
   - Admin: when auditor clicks Verify → notify client org
   - Platform: when client uploads evidence → notify assigned auditor
   - Platform: when score reaches 100% → notify org + publish to registry

**Files affected:** `docker-compose.yml`, `apps/platform/lib/notifications.ts` (new), `packages/ui/src/notification-bell.tsx` (new), `apps/platform/app/api/notifications/` (new), `apps/admin/app/audits/[id]/page.tsx`

**Definition of Done:** When an auditor clicks "Verify" on a requirement in the admin panel, the platform user sees a notification appear within 2 seconds without page refresh. Email is sent for certification issuance.

**Complexity:** L

---

### UPDATE 5: Automated Integrity Score Pipeline

**Why it matters:** The Integrity Score (from `METHODOLOGY.md`) is the core product — it is the number that determines certification tier and drives every business decision. Currently, scores are manually calculated or use hardcoded data. The score must be computed automatically as audit requirements are verified, evidence is reviewed, and engine analysis completes. This is what makes AIC a platform and not a consulting firm.

**What it delivers:**
- Automatic score recalculation when any audit requirement changes status
- Per-category scoring (UC 20%, HO 35%, TR 25%, IN 20%) with real data
- Score history tracking for trend analysis
- Automatic tier determination and tier change notifications
- Score published to public registry when certification threshold reached

**How to get there:**

1. **Create scoring pipeline service**
   - File: `apps/platform/lib/scoring-pipeline.ts`
   - `recalculateScore(orgId)` — queries all audit requirements for the org, maps each to its category (UC/HO/TR/IN), computes weighted average
   - Scoring logic: each requirement has a `category` and `max_points` field; verified requirements earn full points, submitted earn 50%, pending earn 0%
   - Store score snapshot in `compliance_reports` table with timestamp and breakdown

2. **Add category mapping to audit requirements**
   - Migration: `006_add_requirement_categories.sql`
   - Add `category` column (enum: USAGE_CONTEXT, HUMAN_OVERSIGHT, TRANSPARENCY, INFRASTRUCTURE)
   - Add `max_points` column (integer, default 25)
   - Backfill existing requirements based on their description

3. **Trigger recalculation on state changes**
   - When auditor verifies/rejects requirement → recalculate
   - When engine analysis completes → recalculate
   - When evidence is uploaded → recalculate (partial credit)
   - Debounce: max 1 recalculation per 5 seconds per org

4. **Build score trend chart**
   - File: `apps/platform/app/page.tsx` (dashboard enhancement)
   - Use Recharts (already a dependency) to show score over time
   - Display 4-category radar chart for breakdown
   - Show improvement percentage since last period

5. **Automatic tier assignment**
   - When score crosses tier boundary (50, 80), update `organizations.tier`
   - Notify org of tier change
   - If score reaches 100% verified across all requirements → issue certification

**Files affected:** `apps/platform/lib/scoring-pipeline.ts` (new), `apps/platform/db/migrations/006_*`, `apps/platform/app/page.tsx`, `apps/platform/app/api/score/recalculate/route.ts` (new)

**Definition of Done:** When an auditor verifies the last outstanding requirement for an organization, the Integrity Score automatically recalculates to 100%, the tier updates, and the certification workflow triggers — all without any manual intervention.

**Complexity:** L

---

### UPDATE 6: Certificate Generation & Public Registry API

**Why it matters:** The certification lifecycle (Phase 5 from `AIC_ECOSYSTEM_WALKTHROUGH.md`) ends with a downloadable certificate and public registry listing. The `apps/web/registry` page exists but displays static data. The `apps/platform/certificate` page exists but generates a basic PDF. For Alpha participants to display "AIC Certified" status, this must be real, verifiable, and tamper-evident.

**What it delivers:**
- Professional PDF certificate generation with digital signature
- QR code on certificate linking to verification page
- Public registry API feeding the web app's registry page
- Certificate verification endpoint (anyone can verify a certificate's authenticity)

**How to get there:**

1. **Build certificate generation service**
   - File: `apps/platform/lib/certificate-generator.ts`
   - Use `@react-pdf/renderer` for high-quality PDF generation
   - Include: organization name, tier, score, certification date, expiry date, lead auditor name, unique certificate ID, QR code
   - Embed SHA-256 hash of certificate data into QR code for tamper verification
   - Sign certificate hash using engine's RSA-3072 key pair

2. **Create certificate verification endpoint**
   - File: `apps/web/app/api/verify/[certificateId]/route.ts`
   - Public endpoint (no auth required) — anyone scans QR code and gets verification
   - Returns: organization name, tier, certification date, valid/expired/revoked status
   - Checks hash against stored certificate data

3. **Build public registry API**
   - File: `apps/web/app/api/registry/route.ts`
   - Returns list of currently certified organizations
   - Filterable by tier, industry, certification date
   - Paginated with cursor-based pagination
   - Only includes organizations that consented to public listing

4. **Wire registry page to live data**
   - File: `apps/web/app/registry/page.tsx`
   - Replace static data with API call to registry endpoint
   - Add search and filter UI
   - Show tier badge, certification date, and "Verify" link for each org

5. **Add certificate download to platform**
   - File: `apps/platform/app/certificate/page.tsx`
   - Generate PDF on demand when score = 100%
   - Show certificate preview before download
   - Include "Share" button for LinkedIn/social proof

**Files affected:** `apps/platform/lib/certificate-generator.ts` (new), `apps/web/app/api/verify/` (new), `apps/web/app/api/registry/route.ts` (new), `apps/web/app/registry/page.tsx`, `apps/platform/app/certificate/page.tsx`

**Definition of Done:** A certified organization downloads a PDF certificate with a QR code. Scanning the QR code on any phone opens a public verification page confirming the certification is authentic. The organization appears on the public registry at `web/registry`.

**Complexity:** L

---

### UPDATE 7: Auditor Workflow Engine

**Why it matters:** The admin app (`apps/admin`) is currently a simple CRUD interface. For SANAS accreditation (ISO/IEC 17021), the certification process must follow a documented, repeatable workflow with auditor assignment, conflict-of-interest checks, evidence review stages, finding categorization, and corrective action tracking. Without workflow automation, auditors will make inconsistent decisions and the accreditation assessors will identify non-conformities.

**What it delivers:**
- Structured audit workflow: Assigned → In Review → Findings Issued → Corrective Action → Verified → Certified
- Auditor assignment with conflict-of-interest validation (auditor cannot audit their own org)
- Finding categorization: Major Non-Conformity, Minor Non-Conformity, Observation, Opportunity for Improvement
- Corrective Action Request (CAR) tracking with deadlines
- Audit report generation (PDF) with findings, evidence reviewed, and recommendation

**How to get there:**

1. **Create audit workflow state machine**
   - File: `apps/admin/lib/audit-workflow.ts`
   - States: `ASSIGNED` → `DOCUMENT_REVIEW` → `ON_SITE_ASSESSMENT` → `FINDINGS_ISSUED` → `CORRECTIVE_ACTION` → `VERIFICATION` → `RECOMMENDATION` → `CERTIFIED` / `DENIED`
   - Each transition validates preconditions (e.g., cannot move to CERTIFIED until all Major findings are closed)
   - State changes logged to `audit_logs` with timestamp and actor

2. **Build auditor assignment system**
   - Migration: `007_add_audit_assignments.sql` — `audit_assignments` table (id, org_id, auditor_id, assigned_at, conflict_check_passed, status)
   - Conflict check: auditor cannot have financial or employment relationship with org
   - Multiple auditors per org (lead + technical)

3. **Build findings management**
   - Migration: `008_add_findings.sql` — `audit_findings` table (id, assignment_id, requirement_id, category, description, evidence_reference, corrective_action_deadline, resolution, resolved_at)
   - File: `apps/admin/app/audits/[id]/findings/page.tsx`
   - Create, edit, categorize findings
   - Set corrective action deadlines
   - Track resolution with evidence

4. **Build audit report generator**
   - File: `apps/admin/lib/audit-report.ts`
   - Generate PDF report: Executive Summary, Scope, Methodology, Findings, Corrective Actions, Recommendation
   - Template follows ISO 17021 reporting requirements
   - Include integrity score breakdown and tier recommendation

5. **Add audit dashboard metrics**
   - File: `apps/admin/app/page.tsx`
   - Show: audits in progress, audits completed this month, average days to certification, open findings by category
   - Overdue corrective actions highlighted in red

**Files affected:** `apps/admin/lib/audit-workflow.ts` (new), `apps/admin/lib/audit-report.ts` (new), `apps/admin/app/audits/[id]/findings/page.tsx` (new), `apps/platform/db/migrations/007_*`, `apps/platform/db/migrations/008_*`

**Definition of Done:** An auditor logs into admin, sees their assigned audits, reviews evidence, creates findings with categories and deadlines, tracks corrective actions, and generates a professional PDF audit report that meets ISO 17021 requirements.

**Complexity:** XL

---

### UPDATE 8: AIC Pulse — Continuous Monitoring MVP

**Why it matters:** The `BUSINESS_PLAN.md` identifies AIC Pulse as a SaaS product generating ZAR 5K/month per client (ZAR 2.1M Year 3 revenue). It provides continuous governance monitoring between annual certifications. The `STRATEGIC_ROADMAP.md` lists it as a Phase 4 deliverable. Starting an MVP now creates recurring revenue and differentiates AIC from one-time certification competitors. The engine already has drift monitoring (PSI, Jensen-Shannon, KS test) — this connects it to a scheduled, automated pipeline.

**What it delivers:**
- Scheduled bias drift monitoring (daily/weekly)
- Automated alerts when model fairness degrades
- Dashboard showing drift trends over time
- API for organizations to push model prediction data
- Monthly automated compliance report generation

**How to get there:**

1. **Create data ingestion API**
   - File: `apps/engine/app/api/v1/endpoints/pulse.py`
   - `POST /api/v1/pulse/ingest` — accept model prediction data (predictions, actuals, protected attributes, timestamps)
   - Store in time-partitioned table for efficient querying
   - Validate against expected schema registered during onboarding

2. **Build scheduled analysis pipeline**
   - File: `apps/engine/app/services/pulse_scheduler.py`
   - Use APScheduler or Celery Beat for periodic execution
   - For each registered model: run drift analysis, disparate impact, equalized odds
   - Compare against baseline established during certification
   - Store results with hash chain linking

3. **Build alert system**
   - If PSI > 0.25 (significant drift) → send alert
   - If disparate impact ratio < 0.80 (Four-Fifths violation) → send critical alert
   - If equalized odds gap > threshold → send warning
   - Alerts via email, webhook, and platform notification

4. **Build Pulse dashboard**
   - File: `apps/platform/app/pulse/page.tsx`
   - Time-series charts showing fairness metrics over time
   - Traffic light system: Green (within bounds), Amber (approaching threshold), Red (violation)
   - Drill-down into specific drift events

5. **Build monthly report generator**
   - Automated monthly PDF summarizing: models monitored, drift events, fairness status, recommendations
   - Stored as compliance evidence for next audit cycle

**Files affected:** `apps/engine/app/api/v1/endpoints/pulse.py` (new), `apps/engine/app/services/pulse_scheduler.py` (new), `apps/platform/app/pulse/page.tsx` (new), `apps/platform/db/migrations/009_*`

**Definition of Done:** An organization pushes model prediction data via API. AIC Pulse runs automated drift and fairness analysis daily. When a Four-Fifths Rule violation occurs, the organization receives an alert within 1 hour. A monthly compliance report is generated automatically.

**Complexity:** XL

---

### UPDATE 9: Comprehensive Test Coverage (Target: 80%+)

**Why it matters:** The `PROFESSIONAL_REVIEW.md` identified zero test coverage as the highest-risk gap. We've built engine tests (80+ cases), but the 4 Next.js apps have zero tests. For a platform that certifies others' compliance, having untested certification logic is a credibility problem. SANAS assessors will review your QMS — test evidence is mandatory.

**What it delivers:**
- Unit tests for all platform business logic (scoring, auth, permissions)
- Component tests for critical UI flows (assessment, dashboard, certificate)
- API route tests for all Next.js API endpoints
- End-to-end tests for the complete certification lifecycle
- Coverage reporting in CI pipeline

**How to get there:**

1. **Set up testing infrastructure**
   - Configure Vitest (already in devDependencies) with coverage reporting
   - Add `@testing-library/react` for component tests
   - Add Playwright for E2E tests
   - Add `vitest.config.ts` to each app with proper path aliases

2. **Write platform unit tests**
   - `apps/platform/lib/__tests__/scoring-pipeline.test.ts` — test weighted calculation, tier assignment, edge cases
   - `apps/platform/lib/__tests__/auth.test.ts` — test role checking, permission validation, session handling
   - `apps/platform/lib/__tests__/engine-client.test.ts` — test API calls with mocked engine responses

3. **Write API route tests**
   - Test every `/api/` route in platform, admin, and HQ
   - Verify authentication enforcement (unauthenticated → 401)
   - Verify authorization enforcement (wrong role → 403)
   - Verify input validation (malformed data → 400)

4. **Write E2E certification lifecycle test**
   - `tests/e2e/certification-lifecycle.spec.ts`
   - Complete flow: take assessment → enroll → upload evidence → auditor verifies → score reaches 100% → certificate issued → appears on registry

5. **Add coverage gates to CI**
   - Fail CI if coverage drops below 80% for new code
   - Generate coverage report as CI artifact
   - Add coverage badge to README

**Files affected:** `apps/*/vitest.config.ts` (new), `apps/*/lib/__tests__/` (new), `tests/e2e/` (new), `.github/workflows/platform-ci.yml`

**Definition of Done:** `npm run test` passes 200+ test cases across all apps. Coverage report shows 80%+ for platform business logic. CI pipeline fails if coverage drops below threshold. E2E test completes the full certification lifecycle.

**Complexity:** XL

---

### UPDATE 10: Production Deployment Infrastructure

**Why it matters:** The platform runs only in Docker Compose locally. Alpha participants need a live, accessible URL. The `STRATEGIC_ROADMAP.md` (Phase 0) requires website deployment. Without production infrastructure, the entire Alpha program cannot begin. Every day without deployment is a day without revenue.

**What it delivers:**
- Production deployment to cloud infrastructure
- Staging environment for pre-release testing
- Automated deployment pipeline (push to main → deploy)
- SSL/TLS with automatic certificate renewal
- Database backups with point-in-time recovery
- Uptime monitoring and alerting

**How to get there:**

1. **Choose and configure cloud provider**
   - Recommended: Railway, Render, or DigitalOcean App Platform (cost-effective for early stage)
   - Alternative: AWS ECS/Fargate (for later scale)
   - Configure separate staging and production environments

2. **Set up production database**
   - Managed PostgreSQL (Neon, Supabase, or DigitalOcean Managed Databases)
   - Configure automatic daily backups with 30-day retention
   - Enable point-in-time recovery
   - Set up read replica for analytics queries (Phase 2)

3. **Configure deployment pipeline**
   - File: `.github/workflows/deploy.yml`
   - Trigger: push to `main` → deploy to production
   - Trigger: push to `develop` → deploy to staging
   - Steps: run tests → build Docker images → push to registry → deploy → health check → rollback on failure

4. **Set up TLS and domains**
   - Production: `app.aicertification.co.za` (platform), `admin.aicertification.co.za` (admin), `aicertification.co.za` (web)
   - Let's Encrypt for automatic certificate renewal
   - Force HTTPS on all routes

5. **Configure monitoring**
   - Uptime monitoring (UptimeRobot or Better Stack)
   - Error tracking (Sentry for all 5 apps)
   - Log aggregation (Loki or Papertrail)
   - Alert on: 5xx error rate > 1%, response time > 2s, engine health check failure

6. **Set up secrets management**
   - Environment-specific secrets (staging vs production)
   - Rotate database credentials on deployment
   - Store signing keys in secrets manager (not environment variables in production)

**Files affected:** `.github/workflows/deploy.yml` (new), `docker-compose.prod.yml` (new), `.env.production.example` (new)

**Definition of Done:** Pushing to `main` automatically deploys all 5 apps to production. SSL is active. Database backups run daily. Sentry captures errors. Uptime monitor alerts on downtime. Staging environment mirrors production.

**Complexity:** XL

---

### UPDATE 11: Self-Assessment Quiz → CRM Pipeline Automation

**Why it matters:** The `PILOT_PROGRAM.md` defines the Alpha funnel: website quiz → lead capture → outreach → enrollment. The web app's assessment quiz works and generates leads, but the data doesn't flow into the HQ CRM. Currently, Zander must manually check the `leads` database table. For 20+ outreach conversations, this manual process breaks. The `AIC_BUSINESS_STRATEGY.md` identifies the Growth Pipeline in `apps/hq` as the operational tool.

**What it delivers:**
- Quiz completions automatically appear in HQ CRM with full context
- Lead scoring based on quiz answers (industry, tier, urgency)
- Automated email follow-up after quiz completion
- One-click "Enroll in Alpha" that creates the organization and audit requirements
- CRM pipeline view: Lead → Contacted → Meeting → Enrolled → Active

**How to get there:**

1. **Fix quiz → leads data flow**
   - File: `apps/web/app/api/assessment/route.ts`
   - Ensure quiz results write to `leads` table with: email, score, tier recommendation, all 20 answers (JSONB), industry, company size
   - Add `lead_score` computed field based on answers (high-stakes AI usage = higher score)

2. **Build CRM pipeline view**
   - File: `apps/hq/app/crm/page.tsx`
   - Kanban board with columns: New Lead, Contacted, Meeting Scheduled, Proposal Sent, Enrolled, Active
   - Drag-and-drop to move leads between stages
   - Click lead to see full quiz answers, score, and communication history

3. **Add automated email sequences**
   - Post-quiz email: "Thank you for completing the AIC Self-Assessment. Your score: {score}. Your recommended tier: {tier}."
   - 3-day follow-up: "Here's what organizations like yours are doing about POPIA Section 71 compliance."
   - 7-day follow-up: "Our Alpha Program has {remaining} spots. Here's what {industry peer} learned from certification."

4. **Build enrollment workflow**
   - HQ CRM: "Enroll in Alpha" button on lead card
   - Creates `organization` record with lead's info
   - Auto-creates tier-appropriate audit requirements (from `AUDIT_CHECKLIST.md`)
   - Sends welcome email with platform login credentials
   - Creates `user` record for the organization's primary contact

5. **Add CRM analytics**
   - Conversion funnel: Leads → Contacts → Meetings → Enrollments
   - Lead source tracking
   - Average time from lead to enrollment

**Files affected:** `apps/web/app/api/assessment/route.ts`, `apps/hq/app/crm/page.tsx`, `apps/hq/lib/enrollment.ts` (new), `apps/hq/app/api/enroll/route.ts` (new)

**Definition of Done:** A prospect completes the quiz on the website. Within 30 seconds, the lead appears in the HQ CRM with full quiz context and a lead score. Zander clicks "Enroll in Alpha", and the organization is created with a complete set of audit requirements. The prospect receives an email with login credentials.

**Complexity:** L

---

### UPDATE 12: Insurance Integration API

**Why it matters:** The `BUSINESS_PLAN.md` identifies insurance partnerships (iTOO, Santam, Old Mutual) as a critical forcing function for adoption. Organizations certified by AIC should receive premium discounts. The `STRATEGIC_ROADMAP.md` (Phase 2) places insurance partnerships during Alpha execution. This creates a financial incentive that transforms AIC from "nice to have" to "saves us money."

**What it delivers:**
- REST API for insurance partners to query certification status
- Risk score endpoint (simplified Integrity Score for actuarial use)
- Webhook notifications when certification status changes
- API key management for partner access
- Usage analytics for partnership reporting

**How to get there:**

1. **Design partner API**
   - File: `apps/platform/app/api/partner/v1/` (new directory)
   - `GET /api/partner/v1/verify/{orgId}` — returns certification status, tier, score, expiry
   - `GET /api/partner/v1/risk-score/{orgId}` — returns simplified 0-100 risk score for actuarial models
   - `POST /api/partner/v1/webhooks` — register webhook for status change notifications

2. **Build API key management**
   - File: `apps/admin/app/partners/page.tsx`
   - Create/revoke API keys for insurance partners
   - Per-key rate limits and scope restrictions
   - Usage logging for partnership reporting

3. **Build risk score mapping**
   - Map Integrity Score to actuarial risk categories
   - Tier 3 (80+) → Low Risk → 15-20% premium discount
   - Tier 2 (50-79) → Medium Risk → 5-10% premium discount
   - Tier 1 (<50) → High Risk → No discount / Surcharge

4. **Build webhook delivery system**
   - When certification status changes → POST to all registered webhooks
   - Include: orgId, previous status, new status, timestamp, signature
   - Retry failed deliveries (3 retries, exponential backoff)
   - Webhook event log for debugging

5. **Create partner documentation**
   - OpenAPI/Swagger spec for the partner API
   - Integration guide with code examples
   - Sandbox environment for testing

**Files affected:** `apps/platform/app/api/partner/v1/` (new), `apps/admin/app/partners/page.tsx` (new), `apps/platform/lib/webhooks.ts` (new)

**Definition of Done:** An insurance partner authenticates with an API key, queries an organization's certification status, receives a risk score, and is automatically notified via webhook when certification status changes. The partner API has Swagger documentation and a sandbox.

**Complexity:** L

---

### UPDATE 13: Multi-Tenant Role-Based Access Control Hardening

**Why it matters:** The `PROFESSIONAL_REVIEW.md` rated authorization as "Fair" — RBAC exists but middleware only covers top-level routes. For Alpha with 5-7 organizations, data isolation is critical. Organization A must never see Organization B's audit data, scores, or evidence. POPIA itself requires data access controls. If a compliance officer at one bank can see another bank's bias analysis results, AIC faces its own regulatory liability.

**What it delivers:**
- Row-level security: every database query filtered by `org_id`
- API-level tenant isolation middleware
- Permission matrix enforcement at component level
- Audit log of every data access attempt
- Super-admin override with explicit logging

**How to get there:**

1. **Create tenant isolation middleware**
   - File: `apps/platform/lib/tenant.ts`
   - Extract `orgId` from JWT session
   - Inject `orgId` filter into every database query
   - Reject requests where user's `orgId` doesn't match requested resource

2. **Add row-level security to PostgreSQL**
   - Migration: `010_add_row_level_security.sql`
   - Enable RLS on: `audit_logs`, `audit_requirements`, `compliance_reports`, `evidence_files`, `incidents`, `notifications`
   - Policy: `USING (org_id = current_setting('app.current_org_id'))`
   - Set `app.current_org_id` per-connection in `db.ts`

3. **Enforce at API route level**
   - Every API route that returns org-specific data must validate `session.orgId === requestedOrgId`
   - Create `withTenantGuard()` higher-order function for route handlers
   - Return 403 for cross-tenant access attempts

4. **Add data access logging**
   - Log every database read with: userId, orgId, table, action, timestamp
   - Flag cross-tenant access attempts in security_logs
   - Alert on anomalous access patterns

5. **Harden super-admin access**
   - Super-admin can access any org's data (needed for support)
   - Every super-admin data access creates a security_log entry
   - Super-admin actions require re-authentication for sensitive operations

**Files affected:** `apps/platform/lib/tenant.ts` (new), `apps/platform/lib/db.ts`, `apps/platform/db/migrations/010_*`, `apps/platform/middleware.ts`

**Definition of Done:** Two Alpha organizations exist in the system. User from Org A logs in and sees only Org A's data. Direct API calls with Org A's token attempting to access Org B's resources return 403. Every data access is logged. Super-admin access is logged with reason.

**Complexity:** L

---

### UPDATE 14: OpenAPI Documentation & Developer Portal

**Why it matters:** The `PROFESSIONAL_REVIEW.md` identified missing API documentation as a gap. FastAPI auto-generates OpenAPI specs, but nobody has configured it properly. For insurance integrations (Update 12), Alpha participants' technical teams, and future SANAS assessors, comprehensive API documentation is non-negotiable. It also reduces support burden — every question about "how do I call this endpoint?" costs time.

**What it delivers:**
- Complete OpenAPI 3.1 spec for the engine (auto-generated from FastAPI)
- Swagger UI at `/docs` with try-it-out capability
- Developer portal with authentication guide, rate limits, code examples
- SDK generation for TypeScript clients (from OpenAPI spec)

**How to get there:**

1. **Configure FastAPI OpenAPI properly**
   - File: `apps/engine/app/main.py`
   - Set title, description, version, contact, license in FastAPI constructor
   - Add tags to group endpoints: Fairness Analysis, Explainability, Audit Trail, Integrity Score
   - Add response models to every endpoint (currently most return untyped dicts)
   - Add docstrings with examples to every endpoint

2. **Create Pydantic response models**
   - File: `apps/engine/app/api/v1/schemas/responses.py` (new)
   - Define typed response models for every endpoint
   - Include example values using `schema_extra`
   - This enables auto-generated documentation with realistic examples

3. **Build developer portal page**
   - File: `apps/web/app/developers/page.tsx`
   - Embed Swagger UI (via `swagger-ui-react`)
   - Add authentication guide, rate limit documentation
   - Code examples in Python, TypeScript, and curl

4. **Generate TypeScript SDK**
   - Use `openapi-typescript-codegen` to generate typed client from OpenAPI spec
   - File: `packages/engine-sdk/` (new package in monorepo)
   - Auto-regenerate on engine changes in CI

**Files affected:** `apps/engine/app/main.py`, `apps/engine/app/api/v1/schemas/responses.py` (new), `apps/web/app/developers/page.tsx` (new), `packages/engine-sdk/` (new)

**Definition of Done:** Navigating to `engine:8000/docs` shows a complete, interactive Swagger UI with every endpoint documented, tagged, and showing example requests/responses. A TypeScript SDK can be imported by any Next.js app for type-safe engine calls.

**Complexity:** M

---

### UPDATE 15: Observability Stack (Metrics, Logs, Traces)

**Why it matters:** With 5 apps, a database, and an engine running in production, you need visibility into what's happening. When an Alpha participant reports "the audit page is slow" or "my score didn't update," you need to diagnose in minutes, not hours. The `PROFESSIONAL_REVIEW.md` identified zero monitoring as a gap. Observability is also a SANAS requirement — you must demonstrate your systems are reliable and issues are caught proactively.

**What it delivers:**
- Prometheus metrics from engine and platform
- Grafana dashboards for system health, business metrics, and SLA tracking
- Structured logging with correlation IDs across all services
- Distributed tracing for request flows across platform → engine
- Alert rules for SLA violations

**How to get there:**

1. **Add Prometheus metrics to engine**
   - File: `apps/engine/app/core/metrics.py` (new)
   - Use `prometheus_client` library
   - Metrics: request_count, request_latency_seconds, active_requests, analysis_duration_seconds, error_count
   - Expose at `/metrics` endpoint

2. **Add structured logging across all apps**
   - Extend `apps/platform/lib/logger.ts` to all apps
   - Add correlation ID (X-Request-ID header) propagated across services
   - JSON format in production, human format in development
   - Log levels: DEBUG, INFO, WARN, ERROR

3. **Deploy Grafana + Prometheus**
   - Add to `docker-compose.yml` (dev) and production infrastructure
   - Pre-built dashboards:
     - System: CPU, memory, request rate, error rate, latency percentiles
     - Business: assessments completed, audits in progress, certifications issued, active organizations
     - Engine: analysis types run, average duration, SHAP/LIME usage, drift alerts triggered

4. **Add distributed tracing**
   - Use OpenTelemetry with Jaeger or Tempo
   - Trace: platform request → engine API call → engine processing → response
   - Identify bottlenecks in the certification pipeline

5. **Configure alert rules**
   - Engine health check failure → PagerDuty/Slack alert
   - Error rate > 5% over 5 minutes → alert
   - P95 latency > 5 seconds → alert
   - Database connection pool exhausted → alert
   - Disk usage > 80% → alert

**Files affected:** `apps/engine/app/core/metrics.py` (new), `apps/engine/requirements.txt`, `docker-compose.yml`, `apps/platform/lib/logger.ts`, `.github/workflows/deploy.yml`

**Definition of Done:** A Grafana dashboard shows real-time metrics for all 5 services. When engine latency exceeds 5 seconds, a Slack alert fires within 60 seconds. Every request can be traced from platform to engine and back using a correlation ID.

**Complexity:** L

---

### UPDATE 16: Economic Inequality Metrics (Atkinson Index & Generalized Entropy)

**Why it matters:** The `ENGINE_REQUIREMENTS.md` (Section 1.2) lists these as P2, but they are essential for AIC's credibility with academic reviewers and the Information Regulator. The Gini coefficient alone cannot capture the nuance of how AI systems distribute outcomes across income groups. South Africa's extreme inequality (Gini 0.63) makes these metrics particularly relevant — an AI system that passes Four-Fifths Rule but concentrates harm on the poorest quintile should not pass AIC certification.

**What it delivers:**
- Atkinson Index with configurable inequality aversion (ε parameter)
- Generalized Entropy Index (Theil L, Theil T, Half-Squared CV)
- Between-group and within-group decomposition
- South African economic context (quintile analysis)

**How to get there:**

1. **Create economic indices service**
   - File: `apps/engine/app/services/economic_indices.py`
   - `atkinson_index(outcomes, epsilon)` — Formula: `A(ε) = 1 - (1/n * Σ(y_i/μ)^(1-ε))^(1/(1-ε))`
   - `generalized_entropy(outcomes, alpha)` — GE(α) with special cases: α=0 (mean log deviation), α=1 (Theil L), α=2 (half squared CV)
   - `decompose_inequality(outcomes, groups)` — Between-group and within-group components
   - `south_african_quintile_analysis(outcomes, groups)` — Map outcomes to SA income quintiles

2. **Add API endpoints**
   - `POST /api/v1/analyze/atkinson` — Atkinson Index
   - `POST /api/v1/analyze/entropy` — Generalized Entropy
   - Add to batch analysis endpoint

3. **Write known-answer tests**
   - File: `apps/engine/tests/test_economic_indices.py`
   - Hand-calculated test cases for each formula
   - Edge cases: uniform distribution (index = 0), single group, extreme inequality

**Files affected:** `apps/engine/app/services/economic_indices.py` (new), `apps/engine/app/api/v1/endpoints/analysis.py`, `apps/engine/tests/test_economic_indices.py` (new)

**Definition of Done:** Engine exposes Atkinson Index and Generalized Entropy endpoints. Tests pass with known-answer validation. Batch endpoint supports both new analysis types.

**Complexity:** M

---

### UPDATE 17: HQ Content Management System Enhancement

**Why it matters:** The `AIC_BUSINESS_STRATEGY.md` identifies a rich CMS as a next technical milestone. The HQ app has a basic CMS page, but it cannot create or edit blog posts, publish thought leadership, or manage the website's content. For the Alpha program, AIC needs to publish: case studies, white papers, compliance guides, and regulatory updates. Content marketing is the primary acquisition channel for a certification body.

**What it delivers:**
- Rich Markdown editor with image upload
- Blog post management (draft → review → published)
- Content scheduling (publish at specific date/time)
- Content categories: Case Studies, Compliance Guides, Regulatory Updates, Thought Leadership
- Auto-publish to web app's blog/resources page

**How to get there:**

1. **Build Markdown editor component**
   - File: `packages/ui/src/markdown-editor.tsx`
   - Use `@uiw/react-md-editor` or similar
   - Support: headings, lists, code blocks, images, tables, links
   - Preview mode showing rendered output

2. **Build CMS management pages**
   - File: `apps/hq/app/cms/page.tsx` (enhance existing)
   - List view with status filters (draft/published/scheduled)
   - Create/Edit page with Markdown editor
   - Image upload to S3 storage (reuse from Update 3)
   - Category and tag management
   - SEO metadata fields (title, description, og:image)

3. **Build public-facing content pages**
   - File: `apps/web/app/resources/page.tsx` (new)
   - Blog listing with category filters
   - Individual post pages with proper SEO
   - Related posts sidebar
   - Newsletter subscription CTA

4. **Add content scheduling**
   - Posts can have `scheduled_at` timestamp
   - Cron job publishes posts at scheduled time
   - Preview link for unpublished content

**Files affected:** `packages/ui/src/markdown-editor.tsx` (new), `apps/hq/app/cms/page.tsx`, `apps/web/app/resources/page.tsx` (new), `apps/web/app/resources/[slug]/page.tsx` (new)

**Definition of Done:** A content manager creates a blog post in HQ with the Markdown editor, uploads images, sets a publish date, and the post automatically appears on the web app's resources page at the scheduled time with proper SEO metadata.

**Complexity:** M

---

### UPDATE 18: Adversarial Robustness Testing

**Why it matters:** The `ENGINE_REQUIREMENTS.md` (Section 2.3) lists adversarial testing as P2, but real-world AI attacks are increasing. A Tier 1 system (cancer diagnosis, parole) that can be fooled by small input perturbations is a safety hazard. AIC must test whether certified systems are robust against adversarial manipulation. This differentiates AIC from competitors who only test fairness but not resilience.

**What it delivers:**
- FGSM (Fast Gradient Sign Method) adversarial example generation
- Minimum perturbation distance calculation (L2, L-infinity norms)
- Robustness score: percentage of inputs vulnerable to adversarial flip
- Safe perturbation radius for certified systems
- Integration into comprehensive audit

**How to get there:**

1. **Create adversarial testing service**
   - File: `apps/engine/app/services/adversarial.py`
   - `generate_adversarial_examples(model_fn, data, epsilon_range)` — Generate perturbed inputs that flip predictions
   - `calculate_robustness_score(model_fn, data)` — Percentage of inputs that resist perturbation
   - `minimum_perturbation_distance(model_fn, instance)` — Smallest change to flip prediction (binary search)

2. **Add API endpoint**
   - `POST /api/v1/audit/adversarial` — accepts dataset and prediction function
   - Returns: robustness score, vulnerable instances, minimum perturbation distances
   - Rate limited: 5/minute (computationally expensive)

3. **Integrate into comprehensive audit**
   - Add adversarial robustness as a component of the comprehensive audit
   - Weight in Integrity Score: factor into Infrastructure category (20%)

4. **Write tests**
   - File: `apps/engine/tests/test_adversarial.py`
   - Test with known-vulnerable model (linear classifier) vs known-robust model
   - Verify perturbation distances are mathematically correct

**Files affected:** `apps/engine/app/services/adversarial.py` (new), `apps/engine/app/api/v1/endpoints/analysis.py`, `apps/engine/tests/test_adversarial.py` (new)

**Definition of Done:** Engine exposes adversarial robustness endpoint. A simple linear model returns a low robustness score. A model trained with adversarial training returns a high robustness score. Results integrate into the comprehensive audit.

**Complexity:** M

---

### UPDATE 19: Citizen Rights Portal

**Why it matters:** The `DECLARATION_OF_RIGHTS.md` establishes 5 Algorithmic Rights. The `PRD.md` mentions a citizen pathway on the web app. Currently, citizens (individuals affected by AI decisions) have no way to exercise their rights through the platform. The Right to Correction requires "a clear, accessible, and human-staffed mechanism to correct errors." This portal makes AIC's mission tangible to the public and creates regulatory goodwill.

**What it delivers:**
- Public portal where citizens can file algorithmic complaints
- Complaint routing to certified organizations
- Response tracking with SLA (30 days per POPIA)
- Anonymous complaint option
- Dashboard for organizations to manage citizen complaints

**How to get there:**

1. **Build citizen complaint form**
   - File: `apps/web/app/rights/complaint/page.tsx`
   - Fields: organization name, AI system involved, decision type, description of harm, desired outcome, contact info (optional for anonymous)
   - No account required
   - Generates a tracking reference number

2. **Build complaint management for organizations**
   - File: `apps/platform/app/incidents/page.tsx` (enhance existing)
   - Incoming complaints appear as incidents
   - SLA timer: 30 days to acknowledge, 90 days to resolve
   - Response workflow: Acknowledge → Investigate → Respond → Resolve/Escalate
   - Overdue complaints flag in Integrity Score (already implemented: -5 points per open incident)

3. **Build oversight view for admin**
   - File: `apps/admin/app/incidents/page.tsx`
   - Cross-organization complaint dashboard
   - Escalation to Information Regulator if unresolved after 90 days
   - Statistics: complaints per org, average resolution time, types of AI systems complained about

4. **Build public transparency page**
   - File: `apps/web/app/rights/page.tsx`
   - Explain the 5 Algorithmic Rights in plain language
   - Link to complaint form
   - Show aggregate statistics: complaints filed, average resolution time, organizations responsive rate

**Files affected:** `apps/web/app/rights/complaint/page.tsx` (new), `apps/web/app/rights/page.tsx` (new), `apps/platform/app/incidents/page.tsx`, `apps/admin/app/incidents/page.tsx` (new)

**Definition of Done:** A citizen visits the web app, files a complaint about an AI decision, receives a tracking number, and the certified organization sees the complaint in their platform dashboard with a 30-day SLA timer. If unresolved, the auditor sees it in the admin panel.

**Complexity:** M

---

### UPDATE 20: Internationalization & Multi-Language Support

**Why it matters:** The `STRATEGIC_ROADMAP.md` (Phase 5) targets SADC expansion requiring multi-language support — English, Afrikaans, Zulu, Portuguese, French. South Africa alone has 12 official languages. The `FOUNDERS_VISION.md` envisions continental and then global reach. Starting i18n now prevents the architectural debt of retrofitting it later when every string is hardcoded in English.

**What it delivers:**
- Full i18n framework across all 4 Next.js apps
- Initial languages: English (default), Afrikaans, isiZulu
- Language detection and user preference storage
- Translated assessment quiz (critical for lead generation)
- RTL support architecture (for future Arabic support)

**How to get there:**

1. **Install and configure next-intl**
   - Add `next-intl` to all 4 Next.js apps
   - Create message files: `messages/en.json`, `messages/af.json`, `messages/zu.json`
   - Configure middleware for locale detection (browser preference, URL prefix, cookie)

2. **Extract all hardcoded strings**
   - Audit every page and component for English text
   - Replace with translation keys: `t('dashboard.title')`, `t('assessment.question1')`
   - Prioritize: web app (public-facing), then platform, then admin/HQ

3. **Translate critical paths first**
   - Assessment quiz (20 questions + all options)
   - Certificate and compliance report templates
   - Error messages and form validation
   - Rights portal and complaint form

4. **Build language selector component**
   - File: `packages/ui/src/language-selector.tsx`
   - Show in header of all apps
   - Persist preference in cookie and user profile

5. **Hire professional translators for Afrikaans and isiZulu**
   - Machine translation as first pass
   - Professional review for legal/compliance terminology
   - Ongoing translation workflow for new content

**Files affected:** All `apps/*/app/` pages (string extraction), `packages/ui/src/language-selector.tsx` (new), `apps/*/messages/` (new directories)

**Definition of Done:** A user visits the web app, selects isiZulu, completes the self-assessment quiz in isiZulu, and receives their Integrity Report in isiZulu. The platform dashboard displays in the user's chosen language.

**Complexity:** XL

---

### UPDATE 21: Trusted Timestamping (RFC 3161)

**Why it matters:** The `ENGINE_REQUIREMENTS.md` (AT-1.4) identifies trusted timestamping as P1. The hash chain proves records weren't tampered with, but it doesn't prove *when* they were created. A malicious actor could generate an entire fake chain after the fact. Third-party timestamps from a Timestamp Authority (TSA) provide legally admissible proof of when an audit record existed. For court proceedings (like Mobley v. Workday), this is critical evidence.

**What it delivers:**
- RFC 3161 timestamp requests to certified TSA
- Timestamp token stored alongside audit records
- Verification endpoint that checks timestamp validity
- Fallback to local trusted timestamps if TSA is unreachable

**How to get there:**

1. **Create timestamping service**
   - File: `apps/engine/app/core/timestamping.py`
   - Build RFC 3161 timestamp request (hash → TSA → signed timestamp token)
   - Use free TSA initially (FreeTSA.org or DigiCert)
   - Store TSA response as base64 alongside audit record

2. **Integrate into hash chain**
   - Modify `HashChain.create_audit_record()` to request timestamp after hash computation
   - Add `timestamp_token` field to audit records
   - Non-blocking: if TSA is unreachable, record is created without external timestamp (logged as warning)

3. **Add verification endpoint**
   - `POST /api/v1/audit-trail/verify-timestamp` — verify a timestamp token against the TSA's certificate
   - Returns: timestamp, TSA identity, verification status

4. **Write tests**
   - Mock TSA responses for unit tests
   - Integration test against real TSA (FreeTSA.org) in CI

**Files affected:** `apps/engine/app/core/timestamping.py` (new), `apps/engine/app/services/hash_chain.py`, `apps/engine/app/api/v1/endpoints/analysis.py`

**Definition of Done:** Every audit record includes a third-party timestamp token. The token can be independently verified to prove the record existed at a specific time, without trusting AIC's own systems.

**Complexity:** M

---

### UPDATE 22: Lead Auditor Training Platform

**Why it matters:** The `BUSINESS_PLAN.md` projects ZAR 1.5M Year 3 revenue from training and consulting. The `STRATEGIC_ROADMAP.md` (Phase 5) targets 50+ trained auditors. The `PILOT_PROGRAM.md` identifies auditor shortage as a talent risk. Building a training platform converts a risk into a revenue stream. Trained auditors become ambassadors who sell AIC certifications. This is the "picks and shovels" strategy — if competitors enter, AIC still earns from training their auditors.

**What it delivers:**
- Online training modules for Lead Auditor certification
- Course content: AIC methodology, POPIA Section 71, bias analysis, audit techniques
- Progress tracking and assessment
- Certification exam (online, proctored)
- Continuing professional development (CPD) tracking

**How to get there:**

1. **Build training module framework**
   - File: `apps/hq/app/training/page.tsx` (enhance existing)
   - Module structure: Introduction → Tier Framework → Integrity Score → Bias Analysis → Audit Process → Ethics → Exam
   - Each module: video/text content, interactive exercises, quiz, completion tracking
   - Use Markdown content (from CMS, Update 17) for course material

2. **Build assessment system**
   - Multiple choice + scenario-based questions
   - Pass mark: 80%
   - Time-limited exam (2 hours)
   - Question bank randomization to prevent cheating
   - Certificate of completion (PDF generation, reuse from Update 6)

3. **Build progress tracking**
   - Dashboard showing enrolled trainees, progress per module, exam results
   - CPD credit tracking (annual renewal requirement)
   - Export for SANAS competence records

4. **Payment integration**
   - Stripe or PayFast (SA-specific) for ZAR 35K course fee
   - Corporate billing for organizations sending multiple trainees
   - Alpha discount: 50% for first cohort

**Files affected:** `apps/hq/app/training/page.tsx`, `apps/hq/app/training/[moduleId]/page.tsx` (new), `apps/hq/lib/training.ts` (new), `apps/platform/db/migrations/011_*`

**Definition of Done:** An auditor candidate enrolls in the training program, completes all modules, passes the exam with 80%+, and receives a "Certified AIC Lead Auditor" certificate. Their completion is tracked for SANAS competence records.

**Complexity:** XL

---

### UPDATE 23: Counterfactual Explanation Engine

**Why it matters:** The `ENGINE_REQUIREMENTS.md` (FR-3.4) lists counterfactual explanations as P2. SHAP and LIME explain *why* a decision was made. Counterfactuals explain *what would need to change* for a different outcome. For a loan denial: "If your income were ZAR 5,000 higher, you would have been approved." This is the most actionable form of explanation for citizens exercising their Right to Correction — it tells them exactly what to change.

**What it delivers:**
- Nearest counterfactual computation (minimum changes for outcome flip)
- Actionable vs. non-actionable feature distinction (age can't be changed; income can)
- Multiple diverse counterfactuals (not just one path)
- Human-readable explanation generation
- Integration into the platform's explanation display

**How to get there:**

1. **Create counterfactual service**
   - File: `apps/engine/app/services/counterfactual.py`
   - Use DiCE (Diverse Counterfactual Explanations) library
   - `generate_counterfactuals(model_fn, instance, data, num_counterfactuals=3, features_to_vary=None)`
   - Respect feature constraints: immutable (race, gender), non-decreasing (age), range-bounded (income)
   - Return: list of counterfactual instances with minimal changes highlighted

2. **Build human-readable explanation**
   - "Your loan application was denied. To be approved, the smallest changes would be:
     - Increase monthly income from ZAR 15,000 to ZAR 20,000, OR
     - Reduce outstanding debt from ZAR 85,000 to ZAR 60,000"

3. **Add API endpoint**
   - `POST /api/v1/explain/counterfactual`
   - Rate limited: 10/minute (computationally moderate)
   - Integrate into comprehensive audit

4. **Add `dice-ml` to requirements**
   - `dice-ml>=0.11` in `requirements.txt`

5. **Write tests**
   - File: `apps/engine/tests/test_counterfactual.py`
   - Test with simple model: verify counterfactuals actually flip prediction
   - Test feature immutability constraints
   - Test diversity (multiple distinct counterfactuals)

**Files affected:** `apps/engine/app/services/counterfactual.py` (new), `apps/engine/app/api/v1/endpoints/analysis.py`, `apps/engine/requirements.txt`, `apps/engine/tests/test_counterfactual.py` (new)

**Definition of Done:** A denied loan applicant's data is submitted. The engine returns 3 diverse counterfactual explanations showing the minimum changes needed for approval, respecting that race and gender cannot be changed. Explanations are in plain English.

**Complexity:** M

---

### UPDATE 24: SANAS Accreditation Documentation System

**Why it matters:** SANAS accreditation to ISO/IEC 17021 is the single most important business milestone. Without it, AIC cannot offer "accredited" certification. The `STRATEGIC_ROADMAP.md` targets SANAS application by Month 6 and accreditation by Month 14. The application requires a comprehensive Quality Management System (QMS) with documented procedures for every aspect of the certification process. Building this into the platform itself means the QMS is always up-to-date and auditable.

**What it delivers:**
- Digital Quality Management System built into HQ
- Document-controlled procedures for: audit planning, audit execution, finding management, certification decision, surveillance, appeals
- Version-controlled policy documents with approval workflows
- Internal audit scheduling and tracking
- Management review records
- Competence records for all auditors

**How to get there:**

1. **Build QMS document management**
   - File: `apps/hq/app/governance/page.tsx` (enhance existing)
   - Document hierarchy: Quality Manual → Procedures → Work Instructions → Forms/Records
   - Version control: each document has version number, author, approver, effective date
   - Change control: edits create new version, require approval, old versions archived

2. **Create ISO 17021 procedure templates**
   - QP-001: Certification Application and Review
   - QP-002: Audit Planning and Scheduling
   - QP-003: On-Site Assessment Procedure
   - QP-004: Finding Classification and Corrective Action
   - QP-005: Certification Decision Process
   - QP-006: Surveillance and Recertification
   - QP-007: Appeals and Complaints
   - QP-008: Impartiality and Conflict of Interest
   - QP-009: Competence Management
   - QP-010: Internal Audit Procedure

3. **Build internal audit module**
   - Schedule internal audits of AIC's own processes
   - Record findings, corrective actions, and close-out
   - Generate internal audit report

4. **Build management review module**
   - Quarterly review meetings documented in platform
   - Inputs: audit results, customer feedback, complaints, process performance
   - Outputs: decisions, actions, resource needs

5. **Build competence records**
   - Track auditor qualifications, training, experience
   - Link to training platform (Update 22)
   - Competence matrix showing which auditors can audit which tiers/industries

**Files affected:** `apps/hq/app/governance/page.tsx`, `apps/hq/app/governance/documents/` (new), `apps/hq/app/governance/internal-audits/` (new), `apps/platform/db/migrations/012_*`

**Definition of Done:** When SANAS assessors visit, AIC can demonstrate a digital QMS with controlled documents, procedure records, internal audit evidence, management review minutes, and competence records — all within the HQ platform, all version-controlled, all immediately accessible.

**Complexity:** XL

---

### UPDATE 25: Analytics & Business Intelligence Dashboard

**Why it matters:** The `BUSINESS_PLAN.md` projects 90 certifications in Year 2 and 210 in Year 3. Managing a growing certification body without analytics is flying blind. Zander needs to know: which industries certify fastest, where auditors spend the most time, which audit requirements cause the most failures, what the revenue pipeline looks like, and whether the methodology is working as designed. This data also feeds into investor reporting and SANAS surveillance evidence.

**What it delivers:**
- Executive dashboard in HQ with real-time business metrics
- Revenue tracking: MRR, ARR, pipeline value, conversion rates
- Operational metrics: average days to certification, audit requirement failure rates, auditor utilization
- Methodology analytics: score distributions, tier migration patterns, most common findings
- Export capability for investor reports and SANAS surveillance

**How to get there:**

1. **Build analytics data layer**
   - File: `apps/hq/lib/analytics.ts`
   - Aggregation queries across: organizations, audits, leads, compliance reports, incidents
   - Materialized views for common queries (refresh hourly)
   - Date range filtering (last 30 days, quarter, year, custom)

2. **Build executive dashboard**
   - File: `apps/hq/app/analytics/page.tsx` (new)
   - KPI cards: Active Orgs, Certifications This Month, Revenue MTD, Pipeline Value
   - Charts: Certification trend (bar), Industry breakdown (pie), Score distribution (histogram), Funnel (lead → enrollment → certification)
   - Auditor utilization table: audits assigned, completed, average days

3. **Build methodology analytics**
   - Score distribution across all orgs (are we calibrated correctly?)
   - Most-failed requirements (where do organizations struggle?)
   - Tier migration: how many orgs improved from Tier 1 → Tier 2 → Tier 3?
   - Correlation analysis: which categories predict overall score best?

4. **Build export functionality**
   - PDF export of any dashboard view
   - CSV export of raw data tables
   - Scheduled monthly report emails to stakeholders

5. **Build investor reporting view**
   - Simplified view showing: revenue, certifications, pipeline, customer retention
   - Designed for board meetings and investor updates
   - Includes key metrics from `BUSINESS_PLAN.md` financial projections vs actuals

**Files affected:** `apps/hq/lib/analytics.ts` (new), `apps/hq/app/analytics/page.tsx` (new), `apps/platform/db/migrations/013_*`

**Definition of Done:** Zander opens HQ analytics and sees: 7 Alpha participants enrolled, 3 certifications completed, ZAR 540K revenue collected, average 45 days to certification, Human Oversight category has the lowest average score (indicating where orgs need the most help). He exports a PDF for his next investor meeting.

**Complexity:** L

---

## Implementation Priority Matrix

| Priority | Updates | Rationale |
|----------|---------|-----------|
| **Sprint 4 (Now)** | 1, 2, 10 | Cannot run Alpha without live engine integration, migrations, and deployment |
| **Sprint 5 (Week 2-3)** | 3, 5, 11 | Evidence upload, scoring pipeline, and CRM automation enable the certification lifecycle |
| **Sprint 6 (Week 4-5)** | 4, 6, 9 | Notifications, certificates, and test coverage make the platform production-worthy |
| **Sprint 7 (Month 2)** | 7, 13, 14 | Auditor workflows, tenant isolation, and API docs for Alpha execution |
| **Sprint 8 (Month 3)** | 12, 15, 19 | Insurance API, observability, and citizen portal for market differentiation |
| **Sprint 9 (Month 4)** | 8, 16, 17 | Pulse MVP, economic indices, and CMS for revenue expansion |
| **Sprint 10 (Month 5)** | 18, 21, 23 | Adversarial testing, timestamping, counterfactuals for technical depth |
| **Sprint 11 (Month 6)** | 20, 22, 24, 25 | i18n, training, SANAS docs, analytics for institutional scale |

---

## Revenue Impact Mapping

| Update | Revenue Impact | Timeline |
|--------|---------------|----------|
| **1, 2, 3, 10** (Infrastructure) | Enables Alpha revenue: ZAR 420-600K | Month 1-2 |
| **5, 6, 7** (Certification Pipeline) | Enables full-price certifications: ZAR 120-360K each | Month 2-3 |
| **8** (AIC Pulse) | Recurring SaaS: ZAR 5K/month per client | Month 4+ |
| **11** (CRM Pipeline) | Reduces CAC, increases conversion: 20+ leads → 5-7 enrollments | Month 1 |
| **12** (Insurance API) | Partnership revenue + client incentive | Month 3+ |
| **22** (Training) | New revenue stream: ZAR 35K per trainee | Month 6+ |
| **25** (Analytics) | Investor confidence → ZAR 10M raise | Month 5-6 |

---

## Alignment with Founder's 30-Year Vision

| Vision Milestone | Updates That Advance It |
|-----------------|------------------------|
| **2030: SA Standard** | 7 (SANAS workflow), 12 (insurance forcing function), 24 (accreditation docs), 19 (citizen portal) |
| **2035: Africa-Wide** | 20 (multi-language), 22 (auditor training at scale), 8 (Pulse for continuous monitoring) |
| **2045: International Governance** | 14 (OpenAPI for global integrations), 21 (RFC 3161 legal timestamps), 16 (economic indices for academic credibility) |
| **2055: All Automated Systems** | 18 (adversarial robustness beyond AI), 23 (counterfactual explanations for any decision), 9 (test coverage proving methodology) |

---

*Document Version: 1.0 | February 9, 2026 | Consolidated from 15+ repository documents*
*Next Review: After Sprint 4 completion — reassess priorities based on Alpha participant feedback*
