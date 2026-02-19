# AIC Launch Checklist

**Last Updated:** February 12, 2026
**Status:** Platform Stabilization & Alpha Recruitment

---

## Week 1: Website MVP ✅ (COMPLETED)
- [x] Merge documentation to GitHub (`docs/` folder)
- [x] Set up Vercel account and connect repo
- [x] Purchase domain (aicert.co.za)
- [x] Configure Google Analytics 4 (Tracking ID added)
- [x] Homepage with value proposition & Tier overview
- [x] Supporting Pages: About, Tier Framework, Contact
- [x] Alpha Program recruitment form functional

## Week 2: Quiz + Audit Engine ✅ (COMPLETED)
- [x] 20-question weighted algorithm functional
- [x] Progress bar & visual feedback
- [x] Email gate at Q15 (Lead capture)
- [x] Results page with Integrity Score
- [x] PDF report download (jsPDF implementation)
- [x] Python Engine: 13 endpoints for bias analysis
- [x] 92% test coverage on engine logic

## Week 3: Infrastructure Stabilization 🟡 (ACTIVE)
- [x] Set up Vitest/Jest for all apps
- [x] Set up pytest for apps/engine
- [x] Implement CI/CD (GitHub Actions)
- [x] **Critical Review Fixes:**
    - [x] Escape all JSX entities in marketing site
    - [x] Fix impure render functions (Math.random) in HQ
    - [x] Harden TypeScript types in Auth callbacks (removed `any`)
    - [x] Add root `eslint.config.mjs` for monorepo linting
- [ ] Fix remaining `any` types across platform/admin
- [ ] Remove all hardcoded fallback demo data from APIs

## Week 4: Platform & Admin Detail ⬜ (PLANNED)
- [ ] `/audits` - Audit log display with filtering
- [ ] `/certificate` - Institutional certificate generation
- [ ] `/settings` - Organization profile management
- [ ] `/applications` - Admin review workflow
- [ ] Complete NextAuth RBAC implementation
- [ ] Drizzle Migrations system implementation

## Week 5: Alpha Recruitment 🟡 (ACTIVE)
- [x] Build prospect list (20 organizations)
- [x] Draft personalized email templates
- [ ] Begin LinkedIn/Email outreach (5/day)
- [ ] Schedule 10+ discovery calls
- [ ] Secure 5 Alpha Program participants

## Week 6: Regulatory & Accreditation ⬜ (PLANNED)
- [x] Draft letter to Information Regulator
- [ ] Schedule Information Regulator meeting
- [ ] Initial SANAS consultation
- [ ] Document SANAS accreditation requirements

---

## Success Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Website deployed | ✅ | Build OK |
| Test coverage (Engine) | 80%+ | ✅ 92% |
| Critical Review fixes | 100% | 🟡 40% |
| Alpha participants | 5+ | ⬜ 0/5 |
| Information Regulator meeting | ✅ | ⬜ Scheduled |
| SANAS application | ✅ | ⬜ Pending |

---

## Technical Health Status
- **Linting:** 🟡 Partial (Root config added, app errors remaining)
- **Type-Check:** 🔴 Failing (Refactoring `any` types in progress)
- **Testing:** ✅ Passing (161 tests passing)
- **Security:** 🟡 Improving (Hardcoded secrets audit ongoing)

---

> **Note:** The platform has shifted from "Feature Development" to "Stabilization" following the External Critical Review.

*"Build it right, then build it fast."*

---

## ~~February 15, 2026 Progress Update~~ SUPERSEDED

> **⚠️ Feb 17 Audit Correction:** Several items below were marked complete but have critical issues identified in the security audit.

### Sprint 3 Phase 1 (Corrected Status)

- [⚠️] **Real-Time Dashboard**: UI exists but RLS has 9 bypass points
- [⚠️] **Admin Dashboard**: Stats display works, but app is only 35% complete
- [⚠️] **5 Algorithmic Rights Calculation**: Formula exists, data integrity depends on RLS fixes
- [⚠️] **Shared Database Package**: `@aic/db` works but has lint errors
- [x] **Circuit Breaker**: Opossum integration confirmed working
- [⚠️] **Celery Task Queue**: Only 4 of 40+ endpoints use Celery

### Revised Test Counts

| Component | Tests | Status |
|-----------|-------|--------|
| apps/web | 51 | ✅ Passing |
| apps/platform | 76 | ✅ Passing |
| apps/engine | 141 | ✅ Passing (92% coverage) |
| **Total** | **268** | ✅ All passing |

### CI/CD Workflows Active

| Workflow | Trigger | Jobs |
|----------|---------|------|
| foundation-checks.yml | Push/PR to main | hygiene → test → build matrix |
| engine-ci.yml | Push/PR to main | pytest with coverage |
| platform-ci.yml | Push/PR to main | Legacy (merged) |

### Shared Packages (Corrected Feb 17)

| Package | Status | Notes |
|---------|--------|-------|
| @aic/db | ✅ Active | Drizzle, RLS policies defined (but 9 bypasses in code) |
| @aic/auth | ✅ Active | NextAuth + MFA (added Feb 17) |
| @aic/types | ✅ Active | Zod schemas, interfaces |
| @aic/ui | ✅ Active | TrustBadge, AlphaSeal |
| @aic/legal | ✅ Active | Compliance utilities |
| @aic/api-client | ❌ **DELETED** | Was dead code - use platform engine-client |
| @aic/reports | ❌ **DELETED** | Was dead code - never imported |
| @aic/events | ❌ **DELETED** | Was dead code - 7 lines, never used |
| @aic/sockets | ❌ **DELETED** | Was dead code - never imported |
| @aic/middleware | ❌ **DELETED** | Was dead code - duplicate logic in apps |

### Current Blockers

| Issue | Impact | Resolution |
|-------|--------|------------|
| `@aic/db` lint errors | CI fails on lint | Fix 4 `any` types in schema.ts |
| 51 remaining `any` types | Type-check warnings | Gradual hardening |
| pytest not in local PATH | Can't run engine tests locally | Use venv or install globally |

### Revised Success Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Website deployed | ✅ | ✅ Build OK |
| Test coverage (Engine) | 80%+ | ✅ 92% |
| Test coverage (TypeScript) | 70%+ | 🟡 127 tests (no coverage metric yet) |
| Critical Review fixes | 100% | 🟡 70% (up from 40%) |
| Shared packages | 5+ | ✅ 11 packages |
| CI/CD workflows | 1+ | ✅ 3 workflows |
| Alpha participants | 5+ | ⬜ 0/5 |
| Information Regulator meeting | ✅ | ⬜ Pending |

### Revised Technical Health Status

| Area | Previous | Current |
|------|----------|---------|
| Linting | 🟡 Partial | 🟡 @aic/db blocking |
| Type-Check | 🔴 Failing | 🟡 51 `any` remaining |
| Testing | ✅ Passing | ✅ 268 tests passing |
| Security | 🟡 Improving | 🟡 Hardcoded secrets audit ongoing |
| Engine Integration | ⬜ Not started | ✅ Complete |
| Dashboard Data | ⬜ Not started | ✅ Live data |

### Next Immediate Actions

1. **Fix `@aic/db` lint errors** - Unblock CI
2. **Remove remaining `any` types** - Enable strict mode
3. **Configure staging environment** - Vercel preview
4. **Begin Alpha outreach** - 5 participants needed

---

*Updated: February 15, 2026*
