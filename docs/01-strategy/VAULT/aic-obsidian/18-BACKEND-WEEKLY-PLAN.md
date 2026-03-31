# Backend Completion — Week of Feb 26, 2026
*Cross-references: [[02-ARCHITECTURE]] | [[05-FUNCTIONS-TO-BUILD]] | [[06-DATABASE-SCHEMA]] | [[07-API-ROUTES]] | [[00-INDEX]]*

---

> **Goal:** Ship a functional, connected backend this week so investor conversations can begin. The backend is dual-faced: an **Admin/Internal face** (certification factory, RBAC-gated) and a **Client face** (tenant-isolated SaaS dashboard). Once connected, move to investor outreach.

---

## The Pivot in One Line

**Before:** 5 separate apps (web, platform, admin, hq, internal)
**After:** 2 apps — `apps/web` (public) + `apps/platform` (everything else, RBAC-gated)

---

## What Was Built This Week (Feb 25–26)

| Item | Commit | Status |
|------|--------|--------|
| Unified RBAC system (`roles`, `capabilities`, `role_capabilities`, `user_capabilities`) | `e28a7ef` | ✅ Schema + `hasCapability()` |
| WordPress-style capability middleware | `e28a7ef` | ✅ |
| Unified API Gateway `/api/v1/[[...route]]` | `e28a7ef` | ⚠️ Stub — returns placeholder JSON |
| Admin queue page `/admin/queue` | `90809f3` | ✅ UI exists |
| Certification lifecycle state machine | `90809f3` | ✅ `state-machine.ts` |
| `audit_documents` table (Audit Vault) | `90809f3` | ✅ Schema only |
| `issued_certifications` table | `90809f3` | ✅ Schema only |
| `hitl_logs` table | `90809f3` | ✅ Schema only |
| `POST /api/v1/admin/approve` (cert issuance) | `5b0829f` | ✅ Working |
| `POST /api/v1/admin/triage` | `5b0829f` | ✅ Working |
| `POST /api/v1/vault/upload` (SHA-256) | `5b0829f` | ✅ Working (mock storage URL) |
| `POST /api/v1/stripe/webhook` | `5b0829f` | ✅ Working |
| Full Figma frontend rebuild (apps/web) | `e28a7ef` | ✅ |
| Navy + copper brand across all apps | `4f9115c` | ✅ |

---

## Dual-Face Backend — What Each Side Must Deliver

### ADMIN FACE (Internal — Super Admin + Auditors)

| Capability                             | Status                    | This Week                             |
| -------------------------------------- | ------------------------- | ------------------------------------- |
| View all certification applications    | ✅ `/admin/queue` UI       | Wire to real DB data                  |
| Triage: assign, flag, request revision | ✅ `/api/v1/admin/triage`  | Test + seed capability slugs          |
| Approve: issue certificate, update org | ✅ `/api/v1/admin/approve` | Wire state machine validation         |
| Audit Vault: receive + check documents | ✅ `/api/v1/vault/upload`  | Replace mock URL with real storage    |
| HITL Log: record human interventions   | ✅ Schema                  | Build API route + UI trigger          |
| Real-time RBAC management (God Mode)   | ✅ `/admin/permissions` UI | Wire DB seed for default capabilities |
| Revenue / pipeline metrics (HQ)        | ⚠️ Hardcoded              | Build `GET /api/hq-stats` (P1-5)      |
| CRM: leads pipeline                    | ✅ Partial                 | Add `org_id` column (P0-1)            |

### CLIENT FACE (Tenant-Isolated — Org Users)

| Capability | Status | This Week |
|------------|--------|-----------|
| Dashboard: integrity score, velocity, radar | ✅ Real DB | Fix `calculateIntegrityVelocity()` (P1-1) |
| AI system registry | ✅ Full CRUD | — |
| Governance workspace (Governance Blocks) | ✅ | — |
| Incident log + escalation | ✅ | Fix RLS bypass on public/escalate routes (P0-1) |
| Correction requests | ✅ | Build `GET /api/corrections/analytics` (P2-2) |
| Decision records + SHAP output | ✅ | Make audit ledger mandatory (P0-6) |
| Document vault (upload evidence) | ✅ `/api/v1/vault/upload` | Connect to workspace UI |
| Compliance reports | ✅ | — |
| Leaderboard | ✅ | Add sector filtering (P2-3) |
| Billing (Stripe) | ✅ Webhook | Test full checkout → cert tier flow |
| AIMS readiness level | ⚠️ Hardcoded | Build `calculateAIMSReadinessLevel()` (P1-2) |

---

## This Week's Build Order (5 Days)

### Day 1 — Thu Feb 26 ✅ (Today — Planning + Docs)
- [x] Review all commits, understand new architecture
- [x] Update Obsidian (02, 05, 06, 07, this file)
- [x] Update Notion
- [x] Identify + list redundant files for deletion (see section below)
- [x] Rewrite README.md — committed bb51a5a (push manually: `git push origin main`)
- [x] Build interactive Backend Roadmap Dashboard — [[AIC-Backend-Roadmap.html]] (85 tasks, 10 layers, filterable)

### Day 2 — Fri Feb 27 (Database + Gateway)
- [ ] **Run DB migrations** for all new tables (audit_documents, issued_certifications, hitl_logs, roles, capabilities, role_capabilities, user_capabilities)
- [ ] **Seed default capabilities** (create `scripts/seed-capabilities.ts`):
  - `approve_certification`, `triage_application`, `view_all_orgs`, `manage_users`, `upload_bias_report`, `view_revenue`, `manage_roles`
- [ ] **Seed default roles** + assign capabilities: SuperAdmin, Auditor, ComplianceOfficer, Viewer
- [ ] **Wire the API gateway** — replace placeholder JSON in `/api/v1/[[...route]]` with real route dispatching
- [ ] **Fix P0-5** — remove credentials from git history (`git filter-branch` / BFG)

### Day 3 — Sat Feb 28 (Security Hardening)
- [ ] **P0-1:** Fix RLS bypass on `/incidents/public`, `/incidents/escalate`, `/billing/webhook`
- [ ] **P0-3:** JTI generation + `revokedTokens` table + `isTokenRevoked()` check
- [ ] **P0-4:** Account lockout — `loginAttempts` table, 5 failures = 15 min lock
- [ ] **P0-6:** Make audit ledger mandatory — wrap `decisionRecords` insert in transaction with ledger entry
- [ ] **P0-2:** MFA stub → real TOTP (`users.totp_secret`, `users.mfa_enabled`, `users.backup_codes`)

### Day 4 — Mon Mar 2 (Admin Backend + Certification Factory)
- [ ] **Wire state machine** to approval route — validate `isValidTransition()` before allowing cert issuance
- [ ] **Build HITL log route** `POST /api/v1/hitl` — triggered when admin intervenes in review
- [ ] **P1-1:** `calculateIntegrityVelocity()` in admin dashboard — real month-over-month delta
- [ ] **P1-5:** `GET /api/hq-stats` — real pipeline value, active auditors, citizen appeals
- [ ] **P1-4:** `assignCertificationTier()` — automated scoring gate tied to cert approval
- [ ] **P1-8:** Public registry filter — only ACTIVE + certified + `public_directory_visible: true`

### Day 5 — Tue Mar 3 (Client Backend + Investor Readiness)
- [ ] **P1-2:** `calculateAIMSReadinessLevel()` — Level 1–4 based on requirements completed
- [ ] **P1-3:** `getLedgerHealthStatus()` — real hash-chain verification
- [ ] **P2-3:** Leaderboard with sector filtering + pagination
- [ ] **Remove deprecated apps** — delete `apps/admin`, `apps/hq`, `apps/internal`, `apps/web-legacy` from Turborepo config (keep files for now, just remove from build)
- [ ] **Update `turbo.json`** to only build `web`, `platform`, `engine`
- [ ] **End-to-end smoke test**: Apply → Triage → Vault upload → Approve → Certificate issued → Public registry updated
- [ ] **Investor demo checkpoint**: HQ dashboard shows real pipeline, cert registry shows real data

---

## Redundant Files to Delete

### App-Level (after platform unification is verified working)
- `apps/admin/` — all routes migrated to `apps/platform/admin/` and `/api/v1/`
- `apps/hq/` — all routes migrated to `apps/platform` HQ sections
- `apps/internal/` — absorbed
- `apps/web-legacy/` — replaced by `apps/web`

### Docs Folder Cleanup (`docs/` has 30+ files, heavy overlap)
Files to consolidate (keep one canonical version):

| Keep | Delete (duplicates) |
|------|---------------------|
| `docs/PRODUCT_SPEC.md` | `docs/AIC_TECHNICAL_SPEC.md` (overlaps) |
| `docs/STRATEGIC_ROADMAP.md` | `docs/ROADMAP.md`, `docs/POST_REMEDIATION_ROADMAP.md`, `docs/REMEDIATION_ROADMAP.md` |
| `docs/BUSINESS_PLAN.md` | `docs/AIC_BUSINESS_STRATEGY.md` (overlaps) |
| `docs/MASTER_PLAN.md` | `docs/NEXT_STEPS_CHECKLIST.md`, `docs/BUSINESS_NEXT_STEPS.md` |
| `docs/WORKFLOW.md` | `docs/OPERATIONAL_TASKS.md` (partial overlap) |
| `docs/VISION_PLAN_25.md` | `docs/FOUNDERS_VISION.md` (overlaps) |
| `docs/archive/` | Already in archive — safe to delete |

**Action:** Move redundant docs to `docs/archive/` before deletion. Do not hard-delete until confirmed.

---

## Investor Readiness Checklist (End of Week)

- [ ] Backend connected end-to-end (apply → certify flow works)
- [ ] Real data in HQ dashboard (no hardcoded values)
- [ ] Public registry shows real certified orgs (or demo org)
- [ ] Leaderboard functional
- [ ] All P0 security issues resolved
- [ ] `apps/web` Vercel deployment live on `aic.co.za`
- [ ] Mock Alpha report PDF ready (B0-1 — see [[05-FUNCTIONS-TO-BUILD]])
- [ ] Begin investor outreach (see [[TARGET_PROSPECTS]] in docs/)

---

*Once the backend is functional and investor conversations begin, the next phase is the Empathy Engine (B0-2) and AI Governance Index (B0-3). See [[05-FUNCTIONS-TO-BUILD]] for full specs.*
