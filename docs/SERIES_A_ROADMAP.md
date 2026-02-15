# AIC PLATFORM ROADMAP
## Series A Investment Readiness

**Document Version:** 1.0
**Date:** 2026-02-15
**Classification:** Internal / Investor Ready

---

## CHANGES REVIEW SUMMARY

### What Has Been Built (Current State)

| Component | Status | Assessment |
|-----------|--------|------------|
| **@aic/db Package** | Excellent | Drizzle ORM, tenant isolation wrapper, 5 institutional services |
| **LedgerService** | Production-ready | SHA-256 chain-linked, DB-persisted, verification method |
| **EncryptionService** | Production-ready | AES-256-GCM with auth tags, production key enforcement |
| **StorageService** | Production-ready | MinIO/S3, tenant isolation, integrity hashing |
| **EventBusService** | Production-ready | Redis pub/sub + PostgreSQL LISTEN/NOTIFY |
| **Intelligence Service** | Production-ready | Weighted scoring with atomic updates |
| **Governance mCP Agent** | Novel | MCP server exposing integrity to AI agents |
| **@aic/auth Package** | Good | Google + Microsoft Entra SSO, domain-based org linking |
| **InternalDashboard** | Functional | Real API integration, RBAC-based UI filtering |

### Critical Gaps Remaining

| Gap | Severity | Impact |
|-----|----------|--------|
| PostgreSQL RLS policies not created | CRITICAL | App-level isolation only |
| 50+ API routes still use legacy `lib/db.ts` | HIGH | Bypass tenant isolation |
| Platform RBAC missing on critical routes | HIGH | Unauthorized incident resolution |
| Frontend SSE never connected | MEDIUM | Polling instead of real-time |
| Email service not implemented | MEDIUM | Notifications DB-only |

---

# 50 MAJOR TASKS

## Category 1: Security & Multi-Tenancy (10 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M1** | Create PostgreSQL RLS policies for all tenant tables | P0 | 8h | `schema.sql` |
| **M2** | Migrate platform API routes from `lib/db.ts` to `@aic/db` | P0 | 16h | 25+ routes in `apps/platform/app/api/` |
| **M3** | Migrate admin API routes to `@aic/db` with `getSystemDb()` | P0 | 8h | 15+ routes in `apps/admin/app/api/` |
| **M4** | Migrate HQ API routes to `@aic/db` | P0 | 4h | 8+ routes in `apps/hq/app/api/` |
| **M5** | Fix password reset token race condition (atomic update) | P0 | 2h | `platform/app/api/auth/reset-password/route.ts` |
| **M6** | Hash dummy password in user invite flow | P0 | 1h | `platform/app/api/users/invite/route.ts` |
| **M7** | Add org_id validation to admin user DELETE | P1 | 2h | `admin/app/api/users/[id]/route.ts` |
| **M8** | Implement CSRF protection for state-changing routes | P1 | 8h | All POST/PATCH/DELETE routes |
| **M9** | Replace fuzzy ILIKE org matching in public incident | P1 | 2h | `platform/app/api/incidents/public/route.ts` |
| **M10** | Add request signing for Engine S2S calls | P2 | 4h | `packages/api-client/`, engine middleware |

## Category 2: Authentication & Authorization (8 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M11** | Add RBAC check to incidents PATCH (require CO+) | P0 | 1h | `platform/app/api/incidents/[id]/route.ts` |
| **M12** | Add RBAC check to corrections PATCH (require CO+) | P0 | 1h | `platform/app/api/corrections/[id]/route.ts` |
| **M13** | Add RBAC check to audit-logs POST/PATCH (require CO+) | P0 | 1h | `platform/app/api/audit-logs/route.ts` |
| **M14** | Add RBAC check to API key management | P1 | 2h | `platform/app/api/keys/route.ts` |
| **M15** | Remove integrity_score from user-editable fields | P1 | 1h | `platform/app/api/organizations/[id]/route.ts` |
| **M16** | Implement session rotation on privilege escalation | P2 | 4h | `packages/auth/src/index.ts` |
| **M17** | Add time-limited super-admin sessions | P2 | 4h | `packages/auth/`, middleware |
| **M18** | Build OIDC/SAML configuration UI for institutions | P2 | 16h | New: `platform/app/settings/sso/` |

## Category 3: Database & Infrastructure (7 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M19** | Configure connection pool (max, timeout, statement_timeout) | P0 | 2h | All `lib/db.ts`, `packages/db/src/db.ts` |
| **M20** | Add missing composite indexes | P1 | 2h | `schema.sql` |
| **M21** | Add foreign key constraint for `organizations.auditor_id` | P1 | 1h | `schema.sql` |
| **M22** | Implement Redis-backed distributed rate limiting | P1 | 8h | New: `packages/middleware/src/rate-limit.ts` |
| **M23** | Add database migration system (Drizzle Kit) | P1 | 4h | `drizzle.config.ts`, migration scripts |
| **M24** | Create PostgreSQL triggers for LISTEN/NOTIFY | P2 | 4h | `schema.sql` |
| **M25** | Implement database connection health checks | P2 | 2h | `packages/db/src/health.ts` |

## Category 4: Engine & Analytics (8 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M26** | Fix engine auth bypass when PLATFORM_PUBLIC_KEY unset | P0 | 1h | `engine/app/main.py:70` |
| **M27** | Add max array length validation to engine endpoints | P0 | 2h | `engine/app/api/v1/endpoints/analysis.py` |
| **M28** | Move SHAP/LIME computation to Celery background tasks | P1 | 12h | `engine/app/services/explainability.py` |
| **M29** | Add Redis health check for Celery availability | P1 | 2h | `engine/app/core/celery_app.py` |
| **M30** | Implement model caching for surrogate classifiers | P1 | 4h | `engine/app/services/explainability.py` |
| **M31** | Complete privacy_audit.py with actual data scanning | P2 | 8h | `engine/app/services/privacy_audit.py` |
| **M32** | Complete red_team.py with adversarial testing | P2 | 12h | `engine/app/services/red_team.py` |
| **M33** | Add request timeout enforcement to engine | P2 | 2h | `engine/app/main.py` |

## Category 5: Platform Features (7 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M34** | Connect frontend to SSE notifications stream | P1 | 4h | `platform/app/components/dashboard/` |
| **M35** | Implement email notification service | P1 | 8h | New: `packages/notifications/` |
| **M36** | Complete Stripe webhook to update org tier | P1 | 2h | `platform/app/api/billing/webhook/route.ts:32` |
| **M37** | Calculate all 5 Rights compliance scores (not just 1) | P1 | 8h | `platform/app/api/dashboard/route.ts:53-75` |
| **M38** | Build multi-signature verification gateway UI | P2 | 16h | New: `platform/app/verify/` |
| **M39** | Implement appeal workflow with status transitions | P2 | 8h | `platform/app/appeal/`, API routes |
| **M40** | Add PDF certificate generation for compliance reports | P2 | 8h | `packages/reports/` |

## Category 6: Frontend & UX (5 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M41** | Replace hardcoded certifications page with real data | P1 | 4h | `admin/app/certifications/page.tsx` |
| **M42** | Implement EXECUTE NEW AUDIT button functionality | P1 | 4h | `admin/app/components/AdminShell.tsx` |
| **M43** | Connect contact form to actual submission API | P2 | 2h | `web/app/components/ContactForm.tsx` |
| **M44** | Implement HQ governance permission toggles API | P2 | 4h | `hq/app/governance/page.tsx` |
| **M45** | Replace hardcoded verification feed with real queue | P2 | 4h | `admin/app/page.tsx`, `internal/` |

## Category 7: DevOps & Compliance (5 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **M46** | Add SAST (static analysis) to CI pipeline | P1 | 4h | `.github/workflows/` |
| **M47** | Add dependency vulnerability scanning (Snyk) | P1 | 2h | `.github/workflows/` |
| **M48** | Implement secret detection pre-commit hook | P1 | 2h | `.husky/`, `.github/` |
| **M49** | Create SOC 2 Type II control documentation | P2 | 16h | `docs/compliance/` |
| **M50** | Implement infrastructure-as-code (Terraform/Pulumi) | P2 | 24h | New: `infrastructure/` |

---

# 50 MINOR TASKS

## Category A: Code Cleanup & Consistency (15 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **m1** | Delete legacy `apps/platform/lib/db.ts` after migration | P1 | 15m | Delete file |
| **m2** | Delete legacy `apps/admin/lib/db.ts` after migration | P1 | 15m | Delete file |
| **m3** | Delete legacy `apps/hq/lib/db.ts` after migration | P1 | 15m | Delete file |
| **m4** | Standardize bcrypt cost factor to 12 across codebase | P1 | 1h | All bcrypt.genSalt calls |
| **m5** | Move `ErrorFactory` from platform to `@aic/types` | P2 | 1h | `platform/lib/errors.ts` to `packages/types/` |
| **m6** | Move `logger` from platform to `@aic/utils` package | P2 | 1h | `platform/lib/logger.ts` to `packages/utils/` |
| **m7** | Merge `@aic/events` into `@aic/types` | P3 | 30m | 7 lines to move |
| **m8** | Merge `@aic/sockets` into `@aic/types` | P3 | 30m | 12 lines to move |
| **m9** | Merge `@aic/legal` into `@aic/types` | P3 | 30m | 28 lines to move |
| **m10** | Remove duplicate `ROLE_HIERARCHY` definitions | P2 | 30m | 3 files |
| **m11** | Remove duplicate `SessionUser` interface | P2 | 30m | Use `AICSessionUser` from types |
| **m12** | Standardize API error response format | P2 | 2h | All API routes |
| **m13** | Remove `// eslint-disable` comments where possible | P3 | 2h | Various files |
| **m14** | Add strict TypeScript checks to admin/hq apps | P3 | 2h | `tsconfig.json` |
| **m15** | Clean up unused imports across codebase | P3 | 1h | Various files |

## Category B: Testing & QA (10 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **m16** | Add integration tests for tenant isolation | P1 | 4h | New: `__tests__/multi-tenancy/` |
| **m17** | Add tests for LedgerService chain verification | P1 | 2h | `packages/db/__tests__/` |
| **m18** | Add tests for EncryptionService encrypt/decrypt | P1 | 1h | `packages/db/__tests__/` |
| **m19** | Add tests for auth SSO domain-linking flow | P2 | 2h | `packages/auth/__tests__/` |
| **m20** | Add load tests for engine with 50k+ rows | P2 | 4h | `engine/tests/load/` |
| **m21** | Add E2E tests for incident lifecycle | P2 | 4h | `apps/platform/__tests__/e2e/` |
| **m22** | Add E2E tests for audit requirement verification | P2 | 4h | `apps/admin/__tests__/e2e/` |
| **m23** | Update engine conftest.py to use JWT auth | P1 | 1h | `engine/tests/conftest.py` |
| **m24** | Add test coverage reporting to CI | P3 | 1h | `.github/workflows/` |
| **m25** | Add visual regression tests for dashboard | P3 | 4h | Playwright/Cypress |

## Category C: Documentation (8 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **m26** | Document @aic/db package API | P2 | 2h | `packages/db/README.md` |
| **m27** | Document @aic/auth SSO configuration | P2 | 2h | `packages/auth/README.md` |
| **m28** | Document governance agent MCP protocol | P2 | 2h | `apps/governance-agent/README.md` |
| **m29** | Create architecture decision records (ADRs) | P2 | 4h | `docs/adr/` |
| **m30** | Document database schema with ER diagram | P2 | 2h | `docs/schema.md` |
| **m31** | Create runbook for incident response | P3 | 4h | `docs/runbooks/` |
| **m32** | Document API authentication flows | P2 | 2h | `docs/api-auth.md` |
| **m33** | Create onboarding guide for new developers | P3 | 4h | `docs/CONTRIBUTING.md` |

## Category D: UI Polish (10 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **m34** | Remove hardcoded "Last Audit: 48h ago" | P2 | 30m | `platform/app/page.tsx:86` |
| **m35** | Remove hardcoded "Next Renewal: Feb 2027" | P2 | 30m | `platform/app/page.tsx:86` |
| **m36** | Replace hardcoded verification queue count | P2 | 30m | `admin/app/page.tsx:86` |
| **m37** | Replace hardcoded integrity velocity percentage | P2 | 30m | `admin/app/page.tsx:87` |
| **m38** | Add loading states to all dashboard cards | P3 | 2h | Dashboard components |
| **m39** | Add error boundaries to dashboard sections | P3 | 2h | Dashboard components |
| **m40** | Implement skeleton loaders for data tables | P3 | 2h | Table components |
| **m41** | Add toast notifications for async operations | P3 | 2h | Using sonner/react-hot-toast |
| **m42** | Improve mobile responsiveness on platform | P3 | 4h | Various components |
| **m43** | Add keyboard navigation to data tables | P3 | 2h | Table components |

## Category E: Error Handling & Logging (7 Tasks)

| # | Task | Priority | LOE | File(s) |
|---|------|----------|-----|---------|
| **m44** | Remove PII from admin/hq query logs | P1 | 30m | `admin/lib/db.ts:17`, `hq/lib/db.ts:19` |
| **m45** | Add correlation IDs to all log entries | P2 | 2h | Logger utility |
| **m46** | Add structured error logging to API routes | P2 | 2h | All API routes |
| **m47** | Implement graceful degradation for Redis offline | P2 | 2h | `packages/db/src/services/events.ts` |
| **m48** | Add Sentry error boundary integration | P2 | 1h | `apps/*/app/layout.tsx` |
| **m49** | Log all cross-tenant access attempts | P1 | 2h | Database middleware |
| **m50** | Add health check endpoints to all apps | P2 | 1h | `apps/*/app/api/health/route.ts` |

---

# PRIORITIZED EXECUTION SCHEDULE

## Sprint 1 (Week 1-2): Security Critical Path
**Focus:** Fix all P0 security issues before any new features

| Task | Description | Owner |
|------|-------------|-------|
| M1 | PostgreSQL RLS policies | Backend |
| M5 | Password reset race condition | Backend |
| M6 | Hash invite password | Backend |
| M11-13 | RBAC on critical routes | Backend |
| M19 | Connection pool config | Backend |
| M26 | Engine auth bypass | Engine |
| m4 | Bcrypt cost factor | Backend |
| m44 | Remove PII from logs | Backend |

**Sprint 1 Deliverables:**
- [ ] All P0 security vulnerabilities resolved
- [ ] Database connection pools configured
- [ ] Engine authentication hardened

## Sprint 2 (Week 3-4): Database Migration
**Focus:** Complete migration from legacy db to @aic/db

| Task | Description | Owner |
|------|-------------|-------|
| M2 | Migrate platform routes | Backend |
| M3 | Migrate admin routes | Backend |
| M4 | Migrate HQ routes | Backend |
| m1-3 | Delete legacy db files | Backend |
| m16-18 | Add integration tests | QA |

**Sprint 2 Deliverables:**
- [ ] All API routes using @aic/db
- [ ] Legacy lib/db.ts files removed
- [ ] Integration tests for tenant isolation passing

## Sprint 3 (Week 5-6): Feature Completion
**Focus:** Connect SSE, complete Stripe, calculate real scores

| Task | Description | Owner |
|------|-------------|-------|
| M34 | Connect SSE frontend | Frontend |
| M36 | Complete Stripe webhook | Backend |
| M37 | Calculate all 5 rights | Backend |
| M41-42 | Admin UI functionality | Frontend |
| m34-37 | Remove hardcoded values | Frontend |

**Sprint 3 Deliverables:**
- [ ] Real-time notifications working
- [ ] Stripe subscriptions updating org tiers
- [ ] All 5 Rights compliance scores calculated
- [ ] No hardcoded mock data in dashboards

## Sprint 4 (Week 7-8): Engine & Scale
**Focus:** Background processing, caching, performance

| Task | Description | Owner |
|------|-------------|-------|
| M27-30 | Engine hardening | Engine |
| M22 | Redis rate limiting | Backend |
| M20-21 | Database indexes/FKs | Backend |
| m20 | Load tests | QA |

**Sprint 4 Deliverables:**
- [ ] SHAP/LIME running in background tasks
- [ ] Distributed rate limiting operational
- [ ] Load tests passing for 50+ concurrent orgs

## Sprint 5 (Week 9-10): DevOps & Documentation
**Focus:** CI/CD, compliance, documentation

| Task | Description | Owner |
|------|-------------|-------|
| M46-48 | CI security gates | DevOps |
| M35 | Email service | Backend |
| m26-33 | Documentation | All |
| m24-25 | Test coverage | QA |

**Sprint 5 Deliverables:**
- [ ] SAST and dependency scanning in CI
- [ ] Email notifications operational
- [ ] All packages documented
- [ ] 80%+ test coverage

---

# SUMMARY METRICS

| Category | Major | Minor | Total Hours |
|----------|-------|-------|-------------|
| Security & Multi-Tenancy | 10 | 4 | ~60h |
| Auth & RBAC | 8 | 2 | ~35h |
| Database & Infra | 7 | 3 | ~30h |
| Engine & Analytics | 8 | 2 | ~50h |
| Platform Features | 7 | 0 | ~55h |
| Frontend & UX | 5 | 10 | ~40h |
| DevOps & Compliance | 5 | 2 | ~50h |
| Code Cleanup | 0 | 15 | ~15h |
| Testing | 0 | 10 | ~30h |
| Documentation | 0 | 8 | ~25h |
| **TOTAL** | **50** | **50** | **~390h** |

---

# INVESTMENT READINESS CHECKLIST

## Technical Due Diligence Requirements

### Security (Must Have for Series A)
- [ ] PostgreSQL Row-Level Security enforced
- [ ] Zero cross-tenant data leakage paths
- [ ] All authentication flows hardened
- [ ] RBAC consistently applied
- [ ] Audit trail immutable and verifiable

### Scalability (Must Have for Series A)
- [ ] Connection pools configured
- [ ] Background job processing operational
- [ ] Distributed rate limiting in place
- [ ] Load tested for 50+ concurrent organizations

### Code Quality (Should Have)
- [ ] No duplicate code across apps
- [ ] Shared packages properly utilized
- [ ] Test coverage >80%
- [ ] Documentation complete

### Compliance (Should Have)
- [ ] SOC 2 Type II controls documented
- [ ] ISO/IEC 42001 alignment verified
- [ ] POPIA Section 71 compliance demonstrated

---

**Estimated Timeline:** 10-12 weeks with 2 engineers
**Estimated Cost:** ~390 engineering hours
**Risk Level After Completion:** LOW (Series A Ready)
