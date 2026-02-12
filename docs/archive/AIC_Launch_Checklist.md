# AIC Launch Checklist

**Updated:** February 4, 2026
**Print this and check off as you go.**

---

## Week 1: Website MVP ✅ (COMPLETED)

### Day 1-2: Core Setup
- [x] Merge documentation to GitHub (`docs/` folder)
- [x] Set up Vercel account and connect repo
- [x] Purchase domain (aicert.co.za decided)
- [x] Configure Google Analytics 4 (Tracking ID added)

### Day 3-4: Homepage
- [x] Hero section with value proposition
- [x] Tier overview (3 cards with color coding)
- [x] Problem statement with real statistics
- [x] Alpha Program preview section
- [x] Two CTAs visible above the fold

### Day 5-6: Supporting Pages
- [x] Tier Framework page (Detailed sector mapping)
- [x] About page (Mission-first approach)
- [x] Contact page with working form + Honeypot
- [x] Alpha Program application page (Detailed recruitment form)

### Day 7: Deploy
- [x] Deploy to Vercel (Initial build verified)
- [x] Test on mobile (Framer Motion optimized)
- [x] Fix any critical bugs (NextAuth & Syntax fixes)

---

## Week 2: Quiz + Polish ✅ (COMPLETED)

### Day 8-10: Self-Assessment Quiz
- [x] 20 questions working (Weighted algorithm)
- [x] Progress bar (Visual feedback)
- [x] Email gate at Q15 (Lead capture)
- [x] Results page with Integrity Score
- [x] PDF report download (jsPDF implementation)

### Day 11-12: Testing
- [x] Test full user journey (Verified end-to-end)
- [x] Fix UX issues (Gallery aesthetic refactor)
- [x] Verify forms submit correctly (Postgres integration)
- [x] Check analytics events firing (Conversion funnel tracked)

### Day 13-14: Polish
- [x] SEO meta tags on all pages
- [x] Performance optimization (Next.js Turbopack)
- [x] Accessibility check (Contrast & Typography)
- [x] Final deploy (Stable build)

---

## Week 2.5: Test Infrastructure ✅ (COMPLETED)

### Python Testing (apps/engine)
- [x] pytest + pytest-cov configured
- [x] 71 tests written for bias_analysis.py
- [x] API endpoint tests for all 13 routes
- [x] 92% code coverage achieved

### TypeScript Testing (apps/web, apps/platform)
- [x] Vitest + @testing-library configured
- [x] 25 tests for scoring algorithm
- [x] 39 tests for auth/RBAC functions
- [x] 26 tests for PDF report generation

### Coverage Summary
- [x] Total: 161 tests passing
- [x] Critical business logic covered
- [x] Bug fixed: numpy.bool serialization in statistical analysis

---

## Week 3: Platform Build ⬜ (ACTIVE)

### Platform Detail Pages (HIGH PRIORITY)
- [ ] `/audits` - Audit log display with filtering
- [ ] `/certificate` - Certificate generation and download
- [ ] `/settings` - Organization profile management
- [ ] Complete NextAuth authentication flow

### Admin Management Pages (HIGH PRIORITY)
- [ ] `/applications` - Application review workflow
- [ ] `/audits` - Audit assignment and tracking
- [ ] `/certifications` - Certification approval workflow
- [ ] `/verification` - Decision verification interface

### Target: All platform pages functional by end of Week 3

---

## Week 4: Integration + Auth ⬜

### Authentication
- [ ] Complete NextAuth flow for all apps
- [ ] Implement protected routes
- [ ] Role-based page access
- [ ] Session management

### Integration Testing
- [ ] E2E tests for critical user flows
- [ ] API integration tests
- [ ] Database seeding scripts

### Target: Full authentication working, integration tests passing

---

## Week 5: Alpha Outreach ⬜

### Preparation
- [x] Build prospect list (20 companies in docs/TARGET_PROSPECTS.md)
- [ ] Research each company's AI use
- [ ] Find decision maker contacts
- [x] Draft personalized email templates (in outreach/)

### Outreach
- [ ] Send 5 emails per day
- [ ] Follow up after 3 days
- [ ] Track responses in Admin Dashboard
- [ ] Schedule discovery calls

### Target: 10 conversations by end of Week 5

---

## Week 6: Regulatory ⬜

### Regulatory Engagement
- [x] Send letter to Information Regulator (Draft complete)
- [ ] Research SANAS accreditation process
- [ ] Document requirements
- [ ] Initial SANAS consultation scheduled

---

## Success Metrics (Current)

| Metric | Target | Actual |
|--------|--------|--------|
| Website deployed | ✅ | Build OK |
| Test coverage (Engine) | 80%+ | ✅ 92% |
| Tests passing | 100% | ✅ 161/161 |
| Platform pages complete | 6/6 | 🟡 2/6 |
| Admin pages complete | 5/5 | 🟡 1/5 |
| Unique visitors | 200+ | — |
| Assessment starts | 20+ | — |
| Email captures | 8+ | — |
| Alpha applications | 3+ | — |
| Discovery calls | 10+ | — |

---

## What's Complete

| Component | Status | Notes |
|-----------|--------|-------|
| Marketing Website | ✅ Complete | Production-ready |
| Self-Assessment Quiz | ✅ Complete | With PDF export |
| Audit Engine | ✅ Complete | 13 endpoints, 92% coverage |
| Test Infrastructure | ✅ Complete | 161 tests |
| Platform Dashboard | ✅ Working | Fetches real data |
| Admin Dashboard | ✅ Working | Fetches real data |

## What's Next

| Component | Status | Priority |
|-----------|--------|----------|
| Platform Detail Pages | ⬜ Not started | **HIGH** |
| Admin Management Pages | ⬜ Not started | **HIGH** |
| Authentication Flow | 🟡 Partial | **HIGH** |
| Alpha Recruitment | 🟡 Preparing | **HIGH** |

---

> **Status:** Marketing engine is fully operational. Platform build phase is active.

*"The foundation is solid. Now we build the house."*
