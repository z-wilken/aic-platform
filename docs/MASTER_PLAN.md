# AIC Master Plan
## From Vision to Operational Company

**AI Integrity Certification (AIC)**
*Version 2.0 | February 2026*

---

## Executive Summary

AIC is a third-party certification body that certifies **human accountability** in AI deployment. Founded with a 30-year mission to solve the "accountability gap" in algorithmic decision-making, AIC starts in South Africa with POPIA Section 71 compliance before expanding across Africa and globally.

**Core Principle:** *"When systems make decisions that affect human dignity, humans must remain accountable."*

---

## Part 1: The Vision

### Why AIC Exists

The 21st century faces a critical question: **Who is accountable when systems make decisions about human beings?**

Algorithms now decide who gets hired, who receives loans, who gets medical treatment, and who is released on parole. When these systems fail, there is often no one accountable. AIC exists to change that.

### Why South Africa First

South Africa's history with apartheid provides a powerful lesson: systems that seem neutral can automate injustice at scale. The Constitution enshrines human dignity (Section 10), and POPIA Section 71 explicitly prohibits automated decision-making without human oversight.

AIC makes this principle **auditable, certifiable, and enforceable**.

### The 30-Year Trajectory

| Horizon | Vision Goal | Operational Milestone |
|---------|------------|----------------------|
| **2030** | Recognised SA standard | 500+ certifications; Info Regulator references methodology; court judgments cite framework |
| **2035** | Pan-African leader | 15 SADC countries; 200+ certified auditors; regional tender requirements |
| **2045** | Global influence | ISO standard based on AIC; representation in AI governance bodies |
| **2055** | Universal principle | "Human-Accountable" applies to all automated decision systems |

---

## Part 2: The Product

### Three-Tier Accountability Framework

| Tier | Name | Human Role | Examples | Audit Frequency |
|------|------|------------|----------|-----------------|
| **1** | Human-Approved | AI advises, human decides | Cancer treatment, parole, credit denial appeals | Quarterly |
| **2** | Human-Supervised | AI executes, human oversees | Loan approvals, resume screening, fraud flags | Annual |
| **3** | Automated-Permissible | AI operates, periodic review | Recommendations, email filters, chatbots | Biennial |

### Integrity Score Methodology

**Formula:** `Score = (UC × 0.20) + (HO × 0.35) + (TR × 0.25) + (IN × 0.20)`

| Category | Weight | Focus |
|----------|--------|-------|
| Usage Context (UC) | 20% | Decision criticality, data sensitivity, scale |
| Human Oversight (HO) | 35% | Intervention mechanisms, accountability structures |
| Transparency (TR) | 25% | Explainability, disclosure, recourse |
| Infrastructure (IN) | 20% | Data residency, audit logging, fallback systems |

**Tier Thresholds:**
- Score < 50 → Tier 1 (Critical Risk)
- Score 50-79 → Tier 2 (Elevated Risk)
- Score 80+ → Tier 3 (Standard Risk)

### The 5 Algorithmic Rights

1. **Right to Human Agency** — A human can intervene in any decision affecting dignity
2. **Right to Explanation** — Clear reasons for every automated decision
3. **Right to Empathy** — Communications acknowledge human impact
4. **Right to Correction** — Meaningful recourse when decisions are wrong
5. **Right to Truth** — No deceptive AI (disclosed when AI is involved)

---

## Part 3: Market Validation

### The Problem is Real and Litigated

| Case | Year | Outcome |
|------|------|---------|
| **Mobley v. Workday** | 2025 | Class action certified; AI vendors liable for discrimination |
| **EEOC v. iTutorGroup** | 2024 | USD 365K settlement; AI rejected applicants over age 55 |
| **SafeRent Housing** | 2024 | Court allowed case; tenant screening AI discriminated |
| **Sirius XM Radio** | 2025 | Lawsuit filed; AI hiring tool perpetuated bias |

**Academic Evidence:**
- U. Washington (2024): AI favored white names 85.1% in resume screening
- Lehigh University: White applicants 8.5% more likely approved with identical profiles
- UC Berkeley: Black/Latinx borrowers charged 5 basis points extra (USD 450M/year cost)

### South African Regulatory Tailwinds

- **POPIA Section 71** — Prohibits automated decision-making without human oversight
- **National AI Policy Framework** (Oct 2024) — Emphasizes accountability and fairness
- **Information Regulator** — 682 complaints resolved in 2023/24 (76% YoY increase)
- **Expected AI Act** — Formal legislation within 18-24 months

### Market Opportunity

| Metric | Value |
|--------|-------|
| Global ISO certification market | USD 16.14B (2024) → USD 66.25B (2034) |
| CAGR | 15.2% annually |
| SA organizations using AI for decisions | ~5,000 |
| Fortune 500 using AI hiring tools | 492 (only 18% have governance certification) |
| SANAS accredited bodies | 1,960 |

---

## Part 4: Competitive Position

### Landscape Analysis

| Competitor | What They Do | Gap AIC Fills |
|------------|--------------|---------------|
| **ISO 42001** | AI management system standard | Generic; not POPIA-specific; no decision-level accountability |
| **Big 4** | AI ethics consulting | Consulting, not certification; expensive (ZAR 1M+); conflict of interest |
| **Credo AI/Fiddler** | Technical bias monitoring | Tools, not frameworks; no third-party validation; US/EU focus |
| **Bureau Veritas/SGS** | Traditional certification | No AI-specific methodology; generic ISO 42001 only |

### AIC Differentiators

1. **POPIA-Native** — Built specifically for Section 71 compliance
2. **First-Mover** — No SANAS-accredited AI certification body exists
3. **Human Accountability Focus** — Certifies people, not machines
4. **Pragmatic Tiering** — Matches accountability to decision stakes
5. **Regional Positioning** — SADCAS enables SADC expansion

---

## Part 5: Current State Assessment

### Platform Status (February 2026)

| Application | Purpose | Technology | Status |
|-------------|---------|------------|--------|
| **apps/web** | Marketing, lead gen, self-assessment | Next.js 16, Tailwind 4, Framer Motion | ✅ **MVP Complete** |
| **apps/platform** | Client compliance dashboard | Next.js 16, NextAuth, PostgreSQL | 🟡 **50% Complete** |
| **apps/admin** | Certification workflow, auditor assignment | Next.js 16, NextAuth | 🟡 **40% Complete** |
| **apps/engine** | Bias detection, audit algorithms | Python FastAPI, Pandas, SciPy | ✅ **Functional** |

### What's Built

**Marketing Website (Complete):**
- Homepage, About, Tier Framework, Contact pages
- 20-question Self-Assessment Quiz with Integrity Score
- Email capture at Q15, PDF report download
- Alpha Program application page
- PostgreSQL integration for leads

**Audit Engine (Complete):**
- Disparate Impact Analysis (Four-Fifths Rule)
- Equalized Odds testing (TPR/FPR parity)
- Intersectional multi-attribute analysis
- Decision explanation generation
- Sentiment analysis for communications

**Platform & Admin (In Progress):**
- Authentication infrastructure (NextAuth)
- Dashboard UI framework
- API layer for stats, audit logs, incidents
- Basic organization management

### What's Not Built Yet

- [ ] Full certification workflow (application → audit → approval → certificate)
- [ ] Real-time WebSocket monitoring
- [ ] PDF certificate generation with QR verification
- [ ] Batch processing for large datasets
- [ ] Multi-language support (Afrikaans, Zulu, Portuguese)
- [ ] Insurance partnership API integration
- [ ] Lead Auditor training platform

---

### February 15, 2026 Progress Update

#### Platform Status Revised

| Application | Previous Status | Current Status |
|-------------|-----------------|----------------|
| **apps/web** | ✅ MVP Complete | ✅ MVP Complete |
| **apps/platform** | 🟡 50% Complete | 🟡 **60% Complete** |
| **apps/admin** | 🟡 40% Complete | 🟡 **50% Complete** |
| **apps/engine** | ✅ Functional | ✅ Functional (13 services, 141 tests) |

#### Sprint 3 Phase 1 Deliverables

| Item | Status |
|------|--------|
| Real-Time Platform Dashboard | ✅ Live data via tenant-isolated queries |
| 5 Algorithmic Rights Calculation | ✅ Human Agency, Explanation, Empathy, Correction, Truth |
| Admin Verification Queue | ✅ Pending items with integrity velocity |
| Shared @aic/db Package | ✅ Drizzle ORM, RLS, encryption |
| Engine Circuit Breaker | ✅ Opossum integration |
| Celery Async Tasks | ✅ Explainability task queue |

#### What's Now Built (Since Last Update)

| Feature | Status |
|---------|--------|
| **268 automated tests** | ✅ 127 TypeScript + 141 Python |
| **CI/CD Pipeline** | ✅ 3 GitHub Actions workflows |
| **11 shared packages** | ✅ @aic/db, auth, types, ui, api-client, etc. |
| **Tenant isolation** | ✅ `getTenantDb(orgId)` with RLS |
| **Field-level encryption** | ✅ AES-256-GCM for PII |
| **Engine integration** | ✅ Circuit breaker, SSE events |
| **Real-time dashboard** | ✅ Live stats + rights compliance |

#### Revised "What's Not Built Yet"

- [x] ~~Automated testing~~ → **268 tests passing**
- [x] ~~CI/CD pipeline~~ → **3 workflows active**
- [x] ~~Engine integration~~ → **Complete with circuit breaker**
- [x] ~~Real-time monitoring~~ → **SSE event bus implemented**
- [ ] Full certification workflow (application → audit → approval → certificate)
- [ ] PDF certificate generation with QR verification
- [ ] Batch processing for large datasets
- [ ] Multi-language support (Afrikaans, Zulu, Portuguese)
- [ ] Insurance partnership API integration
- [ ] Lead Auditor training platform
- [ ] Staging/production environments
- [ ] Sentry error tracking

---

## Part 6: Financial Model

### Unit Economics

| Org Size | Initial Cert | Annual Renewal | Audit Days | COGS | Gross Margin |
|----------|--------------|----------------|------------|------|--------------|
| Small (<50 emp) | ZAR 120K | ZAR 60K | 2-3 | ZAR 44K | 63% |
| Medium (50-500) | ZAR 240K | ZAR 120K | 4-6 | ZAR 80K | 67% |
| Large (>500) | ZAR 360K+ | ZAR 180K+ | 7-10 | ZAR 128K | 64% |

**Blended Gross Margin Target:** 65%

### 3-Year Projections (ZAR Thousands)

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Certification Revenue | 1,000 | 18,000 | 42,000 |
| AIC Pulse SaaS | 0 | 600 | 2,100 |
| Training & Consulting | 0 | 500 | 1,500 |
| **Total Revenue** | **1,000** | **19,100** | **45,600** |
| Total Expenses | 7,100 | 13,300 | 20,000 |
| **EBITDA** | **(6,100)** | **5,800** | **25,600** |
| EBITDA Margin | -610% | 30% | 56% |

**Key Milestones:**
- Year 1: 10 Alpha certifications (50% discount)
- Year 2: 90 full-price certifications (post-SANAS)
- Year 3: 210 cumulative certifications
- **Break-even:** Month 18 (Q2 Year 2)

### Investment Structure

**Ask:** ZAR 10 million for 25% equity (post Alpha Program validation)

**Use of Funds:**
| Category | Amount | Purpose |
|----------|--------|---------|
| Personnel | ZAR 4.0M | 2 Lead Auditors, Tech Director, Ops Manager, BD |
| Technology | ZAR 2.5M | AIC Pulse platform, client portal, admin system |
| Market Development | ZAR 2.0M | Alpha partnerships, regulatory advocacy |
| SANAS Accreditation | ZAR 0.5M | Application, assessments, witness audits |
| Working Capital | ZAR 1.0M | 6-month runway buffer |

---

## Part 7: Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Low Market Demand** | Medium | High | Alpha Program validates willingness-to-pay first |
| **Regulatory Delay** | Medium | Medium | POPIA Section 71 already provides legal foundation |
| **Competitive Entry** | Low | Medium | 14-month SANAS lead time; purpose-built methodology |
| **SANAS Delay** | Medium | Medium | Alpha revenue during waiting period |
| **Auditor Shortage** | Medium | Medium | Lead Auditor training program creates supply |

---

## Part 8: Target Customers

### Alpha Program Targets (20 Organizations)

**Banking & FinTech (7):**
- Investec, Capitec, Standard Bank, Nedbank, TymeBank, Lulalend, Peach Payments

**Healthcare (5):**
- Discovery Health, Life Healthcare, Mediclinic, Netcare, NHLS

**Recruitment & HR Tech (5):**
- Giraffe/Harambee, OfferZen, Pnet/CareerJunction, Adcorp Group, Hire Resolve

**Insurance (3):**
- Santam, Old Mutual, Liberty Group

### Value Propositions by Sector

| Sector | Primary Value | Secondary Value |
|--------|--------------|-----------------|
| **Banking** | POPIA Section 71 compliance | Insurance premium reduction |
| **Healthcare** | Patient safety certification | Medical malpractice protection |
| **Recruitment** | Litigation risk mitigation | Corporate client trust |
| **Insurance** | "Insurable AI" standard-setting | Partnership revenue share |

---

## Part 9: Key Partnerships

### Critical Relationships to Build

| Partner | Purpose | Status | Priority |
|---------|---------|--------|----------|
| **Information Regulator** | Letter of support; Section 71 alignment | Planned | Critical |
| **SANAS** | Accreditation (14-month process) | Research phase | Critical |
| **Insurers (iTOO/Santam)** | Premium discount program | Planned | High |
| **Law Firms (ENSafrica)** | POPIA expertise; referrals | Planned | Medium |
| **SAICA** | Industry events; CFO access | Planned | Medium |

---

## Part 10: Success Metrics

### Alpha Program Success Criteria

- [ ] 5+ organizations paid ZAR 60K-120K for Alpha Certification
- [ ] Methodology proven across 3 industries (BFSI, Healthcare, Recruitment)
- [ ] 15-20 Letters of Intent (ZAR 3-4M pipeline)
- [ ] Information Regulator letter of support obtained
- [ ] SANAS application submitted with competence evidence
- [ ] 3-5 case studies with measurable business value
- [ ] 2+ Alpha participants willing to be public references
- [ ] 1+ insurance partnership agreement signed

### Long-Term KPIs

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Certifications | 10 | 90 | 210 |
| Revenue | ZAR 1M | ZAR 19.1M | ZAR 45.6M |
| Employees | 4 | 8 | 12 |
| Renewal Rate | N/A | 90%+ | 90%+ |
| Industries Covered | 3 | 5 | 7 |

---

## Document Index

### Vision & Strategy
- [Founder's Vision](vision/FOUNDERS_VISION.md) — The 30-year mission
- [Strategic Roadmap](strategy/STRATEGIC_ROADMAP.md) — Unified execution plan
- [Action Plan](strategy/ACTION_PLAN.md) — Investment package summary

### Business Planning
- [Business Plan](business/BUSINESS_PLAN.md) — Evidence-based investor memorandum
- [Pilot Program](business/PILOT_PROGRAM.md) — Alpha validation framework
- [Risk Analysis](business/RISK_ANALYSIS.md) — Competitive and risk assessment
- [Target Prospects](TARGET_PROSPECTS.md) — Alpha recruitment list

### Product & Technical
- [Product Specs](SPECS.md) — Comprehensive technical specifications
- [PRD](PRD.md) — Product requirements document
- [Methodology](framework/METHODOLOGY.md) — Integrity Score calculation
- [Audit Checklist](framework/AUDIT_CHECKLIST.md) — Alpha verification procedures

### Outreach
- [One Pager](outreach/ONE_PAGER.md) — Pitch summary
- [Pitch Templates](outreach/PITCH_TEMPLATES.md) — Outreach emails
- [Alpha Agreement](outreach/ALPHA_AGREEMENT_TEMPLATE.md) — Participant contract
- [Info Regulator Letter](outreach/INFO_REGULATOR_LETTER.md) — Draft support request

---

*AI Integrity Certification | Master Plan v2.0 | February 2026 | CONFIDENTIAL*

---

## February 15, 2026 Appendix: Technical Progress Summary

### Codebase Metrics

| Metric | Value |
|--------|-------|
| TypeScript Files | 1,556 |
| Shared Packages | 11 |
| TypeScript Tests | 127 passing |
| Python Tests | 141 passing (92% coverage) |
| CI/CD Workflows | 3 active |
| API Routes (Platform) | 34+ endpoints |
| Engine Services | 13 services |

### Architecture Achievements

| Achievement | Description |
|-------------|-------------|
| **Sovereign Multi-Tenancy** | `getTenantDb(orgId)` with Postgres RLS |
| **Field-Level Encryption** | AES-256-GCM for PII data |
| **Resilient S2S Communication** | Opossum circuit breaker for Engine calls |
| **Real-Time Events** | SSE event bus for dashboard updates |
| **Granular RBAC** | Role hierarchy with scope-based permissions |
| **5 Rights Calculation** | Dynamic scoring from audit data |

### Shared Package Inventory

| Package | Purpose |
|---------|---------|
| `@aic/db` | Drizzle ORM, tenant isolation, encryption |
| `@aic/auth` | Shared NextAuth configuration |
| `@aic/types` | Zod schemas, TypeScript interfaces |
| `@aic/ui` | TrustBadge, AlphaSeal components |
| `@aic/api-client` | Engine client with circuit breaker |
| `@aic/reports` | PDF generation utilities |
| `@aic/events` | Event system |
| `@aic/sockets` | WebSocket utilities |
| `@aic/legal` | Legal/compliance utilities |
| `@aic/middleware` | Shared middleware (new) |
| `@aic/notifications` | Alert system (new) |

### Engineering Roadmap Progress

| Original Issue | Original Status | Current Status |
|----------------|-----------------|----------------|
| No automated testing | Critical | ✅ **Resolved** (268 tests) |
| Hardcoded secrets | Critical | 🟡 In progress |
| Fallback demo data | High | ✅ **Resolved** |
| Engine not integrated | High | ✅ **Resolved** |
| Database migrations | High | 🟡 Drizzle WIP |
| TypeScript type safety | Medium | 🟡 51 `any` remaining |
| API validation | Medium | 🟡 Zod schemas in types |
| Auth hardening | High | ✅ **Resolved** |
| Monitoring | Medium | ⬜ Not started |

### Current Blockers

| Blocker | Impact | Resolution |
|---------|--------|------------|
| `@aic/db` lint errors | CI fails | Fix 4 `any` types in schema.ts |
| 51 remaining `any` types | Type-check warnings | Gradual removal |

### Production Readiness: 70-80%

The platform has progressed from MVP to near-production readiness. Primary gaps are:
1. Type hardening (lint/type-check passing)
2. Staging environment deployment
3. Error tracking (Sentry)
4. Legal/regulatory foundation
5. Alpha participant recruitment

---

*Updated: February 15, 2026*
