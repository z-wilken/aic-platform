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
