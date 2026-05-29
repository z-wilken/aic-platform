# AIC Platform Roadmap

**Updated:** February 4, 2026
**Version:** 1.0

---

## Current Status Overview

| Component | Status | Test Coverage | Priority |
|-----------|--------|---------------|----------|
| Repository structure | ✅ Complete | — | — |
| apps/web (marketing) | ✅ MVP Complete | 51 tests | LOW (Maintenance) |
| apps/platform (dashboard) | 🟡 Dashboard Working | 39 tests | **HIGH** |
| apps/admin (operations) | 🟡 Dashboard Working | — | **HIGH** |
| apps/engine (bias audit) | ✅ Complete | 71 tests (92% coverage) | LOW (Maintenance) |
| Test Infrastructure | ✅ Complete | 161 total tests | — |
| Documentation | ✅ Integrated | — | — |
| Alpha Program | 🟡 Recruiting | — | **HIGH** |

---

## What's Complete

| Component | Status | Notes |
|-----------|--------|-------|
| **Marketing Website** | ✅ Complete | Production-ready with Gallery aesthetic |
| **Self-Assessment Quiz** | ✅ Complete | 20 questions, PDF export, lead capture |
| **Audit Engine** | ✅ Complete | 13 endpoints, 92% test coverage |
| **Test Infrastructure** | ✅ Complete | 161 tests passing |
| **Platform Dashboard** | ✅ Working | Fetches real data from PostgreSQL |
| **Admin Dashboard** | ✅ Working | Fetches real data from PostgreSQL |

---

## Next Priorities

### Priority 1: Platform Detail Pages (HIGH)

The platform dashboard is functional but detail pages need implementation.

| Page | Current State | Work Required | Est. Effort |
|------|---------------|---------------|-------------|
| `/audits` | UI shell only | Full audit log display, filtering, export | 1 day |
| `/certificate` | UI shell only | Certificate generation, download, validation | 1 day |
| `/settings` | UI shell only | Organization settings, user management | 1 day |
| `/login` | Scaffolded | Complete NextAuth flow | 0.5 day |

**Total estimated effort:** 3-4 days

### Priority 2: Admin Management Pages (HIGH)

The admin dashboard works but management pages need CRUD implementations.

| Page | Current State | Work Required | Est. Effort |
|------|---------------|---------------|-------------|
| `/applications` | UI shell only | Application review, status updates, notes | 1 day |
| `/audits` | UI shell only | Audit assignment, findings tracking | 1 day |
| `/certifications` | UI shell only | Certification workflow, approvals | 1 day |
| `/verification` | UI shell only | Decision verification workflows | 1 day |

**Total estimated effort:** 4-5 days

### Priority 3: Authentication Completion (MEDIUM)

| Task | Status | Est. Effort |
|------|--------|-------------|
| NextAuth configuration | 🟡 Setup exists | 0.5 day |
| Role-based access control | ✅ Functions tested | — |
| Session management | 🟡 Needs completion | 0.5 day |
| Protected routes | 🟡 Needs implementation | 1 day |

**Total estimated effort:** 2 days

### Priority 4: Integration Testing (MEDIUM)

| Task | Status | Est. Effort |
|------|--------|-------------|
| End-to-end user flows | ⬜ Not started | 1 day |
| API integration tests | ⬜ Not started | 1 day |
| Database seeding scripts | ⬜ Not started | 0.5 day |

**Total estimated effort:** 2-3 days

---

## Week-by-Week Execution Plan

### Week 3 (Current): Platform Build

| Day | Focus | Deliverables |
|-----|-------|--------------|
| Mon | Platform audit page | Audit log display with filtering |
| Tue | Platform certificate page | PDF certificate generation |
| Wed | Platform settings page | Organization profile management |
| Thu | Admin applications page | Application review workflow |
| Fri | Admin audits page | Audit assignment and tracking |

### Week 4: Admin Completion + Auth

| Day | Focus | Deliverables |
|-----|-------|--------------|
| Mon | Admin certifications | Certification approval workflow |
| Tue | Admin verification | Decision verification interface |
| Wed | NextAuth completion | Full authentication flow |
| Thu | Protected routes | Role-based page protection |
| Fri | Integration testing | E2E test suite for critical paths |

### Week 5: Alpha Outreach Intensification

| Day | Focus | Deliverables |
|-----|-------|--------------|
| Mon-Tue | Platform polish | Bug fixes, UX improvements |
| Wed-Fri | Alpha recruitment | 10 discovery calls scheduled |

### Week 6: Regulatory Engagement

| Day | Focus | Deliverables |
|-----|-------|--------------|
| Mon-Tue | SANAS research | Document accreditation requirements |
| Wed | Info Regulator follow-up | Meeting confirmation |
| Thu-Fri | Case study prep | Template for Alpha participants |

---

## Technical Architecture

### Database Schema (Active)
- `organizations` - Client organizations
- `leads` - Marketing leads from assessment
- `audit_logs` - Compliance audit trail
- `users` - Platform users with roles

### API Structure
- `/api/v1/*` - Engine (Python FastAPI) - Bias analysis
- `/api/*` - Next.js API routes - CRUD operations
- PostgreSQL via `pg` package - Shared database

### Testing Strategy
- **Python:** pytest with pytest-cov (threshold: 80%)
- **TypeScript:** Vitest with @testing-library
- **Coverage:** Critical business logic prioritized

---

## Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test coverage (Engine) | 80%+ | ✅ 92% |
| Test coverage (TypeScript) | 70%+ | 🟡 In progress |
| Platform pages complete | 6/6 | 🟡 2/6 |
| Admin pages complete | 5/5 | 🟡 1/5 |
| Alpha applications | 3+ | Pending |
| Discovery calls | 10+ | Pending |

---

## Technical Debt Backlog

| Item | Priority | Effort |
|------|----------|--------|
| Remove inline function implementations from auth tests | Low | 1 hour |
| Add database seeding scripts | Medium | 4 hours |
| Implement error boundaries in React apps | Medium | 2 hours |
| Add loading states to all data-fetching components | Low | 3 hours |
| Configure CI/CD pipeline with test execution | Medium | 4 hours |

---

## Long-Term Vision (Strategic Roadmap Reference)

| Phase | Timeline | Objective |
|-------|----------|-----------|
| **Phase 0** | Weeks 1-2 ✅ | Website MVP, Quiz, Lead Generation |
| **Phase 1** | Months 1-2 | Alpha Program recruitment (5-7 participants) |
| **Phase 2** | Months 3-4 | Alpha certification execution |
| **Phase 3** | Months 5-6 | Investment readiness, SANAS application |
| **Phase 4** | Months 7-12 | Platform build, team hiring, accreditation |
| **Phase 5** | Year 2-3 | SADC regional expansion |

---

## Quick Reference

### Running Tests
```bash
# Python tests (apps/engine)
cd apps/engine && python -m pytest tests/ -v

# TypeScript tests (all apps)
npm test

# With coverage
npm run test:coverage
```

### Development
```bash
# Start all apps
npm run dev

# Individual apps
npm run dev:web      # Marketing site (port 3000)
npm run dev:platform # Dashboard (port 3001)
npm run dev:admin    # Admin (port 3002)

# Python engine
cd apps/engine && uvicorn app.main:app --reload
```

---

> **Current Focus:** Complete the platform and admin apps to support Alpha Program participants. The public-facing marketing site and audit engine are production-ready.

*"The foundation is solid. Now we build the house."*

---

*AI Integrity Certification | Platform Roadmap | February 2026*
