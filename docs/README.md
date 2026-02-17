# AIC Platform Documentation

## Core Principle
> "When systems make decisions that affect human dignity, humans must remain accountable."

## Core Strategic Documents
| Document | Description |
|----------|-------------|
| [Founder's Vision](./FOUNDERS_VISION.md) | North star: 30-year vision, constitutional values, accountability principles |
| [Declaration of Rights](./DECLARATION_OF_RIGHTS.md) | The 5 Algorithmic Rights that AIC certifies and enforces |
| [Methodology](./METHODOLOGY.md) | Integrity Score calculation formula, scoring matrix, tier thresholds |

## Quick Start Guide

### For Understanding the Vision
Start with **[FOUNDERS_VISION.md](./FOUNDERS_VISION.md)** — the moral foundation and 30-year trajectory.

### For Business Context
1. **[MASTER_PLAN.md](./MASTER_PLAN.md)** — Complete consolidated overview
2. **[BUSINESS_PLAN.md](./BUSINESS_PLAN.md)** — Evidence-based investor memorandum
3. **[STRATEGIC_ROADMAP.md](./STRATEGIC_ROADMAP.md)** — Phased execution plan
4. **[OPERATIONAL_ROADMAP.md](./OPERATIONAL_ROADMAP.md)** — Path to 10-employee company

### For Technical Details
1. **[Technical Specification](./AIC_TECHNICAL_SPEC.md)** — Architecture, APIs, database schema
2. **[Engine Requirements](./ENGINE_REQUIREMENTS.md)** — Detailed functional requirements for the Python audit engine
3. **[Methodology](./METHODOLOGY.md)** — Integrity Score calculation

## Product & Technical
| Document | Description |
|----------|-------------|
| [Product Specification](./SPECS.md) | Authoritative product spec: market, personas, features, architecture, pricing |
| [Technical Specification](./AIC_TECHNICAL_SPEC.md) | System architecture, database schema, API contracts, engine logic |
| [Engine Requirements](./ENGINE_REQUIREMENTS.md) | Detailed functional requirements for the Python audit engine |
| [Roles & Permissions](./ROLES.md) | User role hierarchy and permission definitions |

## Business & Investment
| Document | Description |
|----------|-------------|
| [MASTER_PLAN.md](./MASTER_PLAN.md) | Consolidated overview |
| [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) | Investor memo: market analysis, unit economics, 3-year projections |
| [STRATEGIC_ROADMAP.md](./STRATEGIC_ROADMAP.md) | Phased execution plan (Phase 0-5) with milestones and timelines |
| [OPERATIONAL_ROADMAP.md](./OPERATIONAL_ROADMAP.md) | 21-month path to 10 employees |
| [Risk Analysis](./RISK_ANALYSIS.md) | Competitive landscape and risk mitigation matrix |
| [One Pager](./ONE_PAGER.md) | Single-page investor summary |

## Current Phase: Alpha Program Preparation
**Status:** Foundation complete, preparing for outreach

**Immediate Priorities:**
1. Finalize Alpha Certification Framework
2. Build target prospect list (20 organizations)
3. Begin outreach conversations
4. Schedule Information Regulator meeting
5. Initial SANAS consultation

## Key Milestones
| Timeline | Milestone | Status |
|----------|-----------|--------|
| Feb 2026 | Marketing website MVP | Completed |
| Feb 2026 | Documentation consolidated | Completed |
| Months 1-2 | Alpha Program recruitment | In Progress |
| Months 3-4 | First certifications | Planned |
| Month 6 | SANAS application | Planned |
| Month 7+ | Investment raise (ZAR 10M) | Planned |

## Developer Guides
| Document | Description |
|----------|-------------|
| [Onboarding Guide](./AIC_ONBOARDING_GUIDE.md) | Architecture walkthrough, port mappings, user journeys for developers |
| [Ecosystem Walkthrough](./AIC_ECOSYSTEM_WALKTHROUGH.md) | Operational flow: lead capture, audit pipeline, certification lifecycle |
| [Project Explainer](./project-explainer.md) | High-level overview for non-technical stakeholders |
| [Professional Review](./PROFESSIONAL_REVIEW.md) | Code review findings and architecture assessment |

## Operational
| Document | Description |
|----------|-------------|
| [Audit Checklist](./AUDIT_CHECKLIST.md) | Certification checklist items |
| [Launch Checklist](./AIC_Launch_Checklist.md) | Pre-launch milestone tracking |
| [Operational Tasks](./OPERATIONAL_TASKS.md) | Current operational task tracking |
| [Changelog](./CHANGELOG.md) | Development changelog |
| [Workflow](./WORKFLOW.md) | Development workflow reference |

## Financial Summary
| Year | Revenue | Employees | Status |
|------|---------|-----------|--------|
| Year 1 (Alpha) | ZAR 1.0M | 1 + contractors | Current |
| Year 2 | ZAR 19.1M | 10 | Target |
| Year 3 | ZAR 45.6M | 12 | Projected |

**Investment:** ZAR 10M for 25% equity (post-Alpha validation)

---

## February 17, 2026 Status Update

### Technical Platform Status

| Component | Status | Tests |
|-----------|--------|-------|
| apps/web (Marketing) | ✅ MVP Complete | 51 tests |
| apps/platform (Dashboard) | ✅ Live Data | 76 tests |
| apps/internal (Operations) | ✅ Live Data | — |
| apps/engine (Audit) | ✅ Complete | 141 tests |
| **Total Tests** | — | **268 passing** |

### Architecture

| Metric | Value |
|--------|-------|
| Next.js Apps | 5 (web, platform, internal, admin, hq) |
| Shared Packages | 11 (@aic/ui, auth, db, types, api-client, reports, events, legal, sockets, middleware, notifications) |
| CI/CD Workflows | 3 (foundation-checks, engine-ci, platform-ci) |
| TypeScript Tests | 127 (Vitest) |
| Python Tests | 141 (pytest) |

### Key Technical Achievements

| Achievement | Status |
|-------------|--------|
| Automated Testing | ✅ 268 tests (127 TS + 141 Python) |
| CI/CD Pipeline | ✅ 3 GitHub Actions workflows |
| Shared Packages | ✅ 11 packages (@aic/db, auth, types, etc.) |
| Engine Integration | ✅ Circuit breaker + SSE events |
| Real-Time Dashboard | ✅ Live data + 5 Rights scoring |
| Turborepo Build System | ✅ Unified build, test, lint pipeline |

### Production Readiness: ~40-50%

A comprehensive technical audit (Feb 17) identified critical gaps. See [ENGINEERING_ROADMAP.md](./ENGINEERING_ROADMAP.md) and [TECHNICAL_AUDIT_2026-02-17.md](./TECHNICAL_AUDIT_2026-02-17.md).

**Complete:**
- ✅ Automated testing infrastructure
- ✅ CI/CD enforcement (3 workflows)
- ✅ Engine integration with circuit breaker
- ✅ Real-time dashboard with live data
- ✅ Shared package infrastructure

**Critical Issues (P0):**
- ❌ Credentials committed to git (must purge history)
- ❌ 9 API endpoints bypass row-level security
- ❌ MFA not implemented
- ❌ Token revocation broken (JTI not generated)
- ❌ No account lockout

**In Progress:**
- 🟡 Type hardening (51 `any` types remaining)
- 🟡 Staging environment setup
- 🟡 Error tracking (Sentry)

**Not Started:**
- ⬜ Company registration
- ⬜ SANAS consultation
- ⬜ Alpha participant outreach

### Remediation Timeline

12–16 weeks to Series A readiness. See [ENGINEERING_ROADMAP.md](./ENGINEERING_ROADMAP.md) for full backlog.

| Phase | Weeks | Focus |
|-------|-------|-------|
| P0 Emergency | 1 | Purge credentials, fix incidents endpoint, account lockout |
| P0 Security Foundation | 2–4 | MFA, RLS audit, secrets vault, key rotation |
| P1 Engine Stabilization | 5–8 | Async endpoints, Celery, cache bounds |
| P1 Architecture Cleanup | 9–12 | Dead packages, consolidated auth, ESLint boundaries |
| P2 Production Hardening | 13–16 | Load testing, external security audit, staging |

---

*Updated: February 17, 2026*
