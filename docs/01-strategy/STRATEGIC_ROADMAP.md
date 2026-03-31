# AIC Strategic Roadmap

**Vision Alignment & Execution Plan**

*February 2026 | CONFIDENTIAL*

---

## Executive Summary

This strategic roadmap consolidates AIC's planning documents, validates alignment with the Founder's Vision, and provides a unified execution plan. The review confirms **strong alignment** between the vision and operational planning, with recommendations for strengthening the connection between daily execution and the 30-year mission.

**Strategic framing:** AIC is a global accountability framework. South Africa is the beachhead market — chosen because POPIA Section 71 is the most progressive automated decision-making law in the world, and because South Africa's constitutional history gives this mission authentic moral weight. The 5 Algorithmic Rights are designed to be adopted as an international standard — like ISO but values-led. Phase 0–3 validate the framework in SA. Phase 4+ expand it globally.

### Vision Alignment Assessment

The Founder's Vision establishes a clear moral imperative: **when systems make decisions that affect human dignity, humans must remain accountable.**

| Vision Element | Alignment | Evidence |
|----------------|-----------|----------|
| Human Accountability Focus | ✅ Strong | PRD, Business Plan consistently position AIC as certifying human accountability, not AI technology |
| South Africa-First Positioning | ✅ Strong | POPIA Section 71 as legal foundation; SANAS accreditation pathway; Constitutional values referenced |
| Three-Tier Framework | ✅ Strong | PRD and Tier Framework demonstrate clear, pragmatic tiering matching accountability to decision stakes |
| Long-Term Institution Building | ⚠️ Moderate | Business plan shows 5-year projections; could strengthen 10-30 year institutional milestones |
| Beyond AI to All Automated Systems | ⚠️ Moderate | Vision mentions credit scoring, benefits systems; PRD focuses primarily on AI |

---

## Part 1: Current State Assessment

### Documentation Review

1. **Founder's Vision** — The north star document establishing the 30-year mission, moral foundation, and South African positioning. Exceptionally well-written with genuine conviction.

2. **Product Requirements Document (PRD)** — Comprehensive 80+ page document covering website, platform, frontend/backend architecture. Production-ready specifications.

3. **Evidence-Based Business Plan** — Strong investor memorandum with real market data, unit economics, and 3-year financial projections. All statistics sourced and verified.

4. **Pilot Program Framework** — Pragmatic 6-month validation roadmap with ZAR 470K budget. Designed to prove demand before raising capital.

5. **Competitive & Risk Analysis** — Identifies 4 competitor categories and 5 major risks with specific mitigation strategies.

6. **Tier Framework Visual** — Professional HTML design with editorial newspaper aesthetic, matching the PRD design system specifications.

7. **GitHub Repository (aic-platform)** — Monorepo with 4 planned apps (web, platform, admin, engine). 27 commits, TypeScript/Python stack. Early development stage.

### Technical Platform Status (Updated Feb 17, 2026)

| Application | Technology | Purpose | Status | Grade |
|-------------|------------|---------|--------|-------|
| **apps/web** | Next.js, Tailwind | Marketing & lead generation | ✅ Complete | B |
| **apps/platform** | Next.js, Postgres | Client dashboard | ⚠️ **40%** | D+ |
| **apps/admin** | Next.js | Operations & certification | ⚠️ **35%** | D |
| **apps/engine** | Python, FastAPI | AI bias audit logic | ⚠️ **OOM Risk** | C- |

> **⚠️ CRITICAL (Feb 17 Audit):** Platform and Admin apps have critical security gaps. Engine has performance issues. See [REMEDIATION_ROADMAP.md](./REMEDIATION_ROADMAP.md) for 16-week fix plan.

**Key Issues Identified:**
- Security: No MFA (now fixed), credentials in git, 9 RLS bypasses
- Engine: 40+ sync endpoints, unbounded model cache (TTL now added)
- Architecture: 5 dead packages, no import boundaries

**Assessment:** Technical architecture is sound but implementation has critical gaps requiring 12-16 weeks remediation before Alpha pilots can safely proceed.

---

## Part 2: Unified Strategic Roadmap

### South African Beachhead (Phases 0–3)

*These phases prove the AIC framework in the South African market, using POPIA Section 71 as the regulatory anchor. South Africa is the proving ground — not the destination.*

### PHASE 0: Foundation (Immediate – Week 4)

**Objective:** Complete website MVP and begin Alpha Program recruitment.

- [x] Complete apps/web marketing site — Homepage, Tier Framework, About, Contact pages functional
- [x] Deploy Self-Assessment Quiz — 20 questions, email gate at Q15, Integrity Score calculation
- [x] Create Alpha Program application page — Value proposition, eligibility criteria, application form
- [ ] Finalize Alpha Certification Framework — Audit checklists, Integrity Score methodology for all 3 tiers
- [ ] Build target prospect list — 20 organizations (BFSI, Healthcare, Recruitment) with decision-maker contacts

**Success Metrics:** Website deployed to production. 5+ assessment completions. 3+ Alpha applications.

---

### PHASE 1: Demand Validation (Months 1-2)

> **⚠️ PREREQUISITE (Feb 17):** Phase 1 activities assume completion of security remediation (Phase 0 in REMEDIATION_ROADMAP.md). Do not begin Alpha outreach until MFA and RLS fixes are complete (target: Week 4).

**Budget: ZAR 290,000**

**Objective:** Recruit Alpha participants and establish regulatory relationships.

- [ ] Conduct 20 outreach conversations — Target CFOs, CROs, Compliance Officers in organizations using AI for credit/hiring/diagnosis
- [ ] Sign 5-7 Alpha Program participants — At 50% discount (ZAR 60K-120K each)
- [ ] Secure Information Regulator meeting — Discuss POPIA Section 71 alignment, request letter of support
- [ ] Initial SANAS consultation — Understand accreditation requirements, timeline, documentation needs
- [ ] Assemble Alpha team — 1-2 ISO auditors (contract), legal advisor (POPIA), technical AI specialist

**Success Metrics:** 5-7 signed participants. Information Regulator meeting completed. SANAS pathway understood.

---

### PHASE 2: Alpha Execution (Months 3-4)

**Budget: ZAR 100,000 | Revenue: ZAR 420-600K**

**Objective:** Conduct audits and validate methodology.

- [ ] Execute 5-10 Alpha Certifications — Full audit cycle: documentation review, on-site assessment, bias testing, certification decision
- [ ] Document process learnings — Track actual audit days, COGS, methodology gaps, client objections
- [ ] Refine Integrity Score framework — Adjust based on real-world application across industries
- [ ] Collect participant feedback — Value perception, willingness to pay full price, referral likelihood
- [ ] Begin insurance partnership conversations — iTOO, Santam, Old Mutual for premium discount program

**Success Metrics:** 5+ certifications completed. Methodology proven across 3 industries. Positive participant feedback.

---

### PHASE 3: Investment Readiness (Months 5-6)

**Budget: ZAR 80,000**

**Objective:** Build case studies, pipeline, and submit SANAS application.

- [ ] Produce 3-5 case studies — Documented certifications with measurable business value (insurance discounts, tender wins)
- [ ] Collect 15-20 Letters of Intent — ZAR 3-4M pipeline from prospective clients
- [ ] Submit SANAS accreditation application — With Alpha Program evidence of audit competence
- [ ] Finalize insurance partnership — Agreement for premium discounts for certified organizations
- [ ] Update investor materials — Pitch deck with real revenue, customer testimonials, refined unit economics

**Success Metrics:** Case studies completed. 15+ LOIs. SANAS application submitted. Ready to raise ZAR 10M.

---

### PHASE 4: Platform Build (Months 7-12)

**Investment: ZAR 10M**

**Objective:** Scale team, build platform, achieve SANAS accreditation.

- [ ] Hire full team — 2 Lead Auditors (ZAR 1.2M each), Technical Director, Operations Manager, Business Development
- [ ] Build Client Portal (apps/platform) — Authenticated dashboard, evidence upload, certification status tracking
- [ ] Build Admin System (apps/admin) — Certification workflow management, auditor assignment, finding tracking
- [ ] Launch AIC Pulse MVP (apps/engine) — Basic AI system health monitoring, bias drift detection, monthly reports
- [ ] Complete SANAS accreditation — Assessment, witness audits, compliance verification (14-month process from submission)
- [ ] Achieve 90 certifications — Full commercial pricing post-accreditation

**Success Metrics:** SANAS accredited. 90+ certifications. Platform operational. ZAR 19M revenue. Break-even achieved.

---

### PHASE 5: Global Framework Expansion (Year 2-3)

**Objective:** Expand beyond South Africa and establish AIC as the international standard for human accountability in automated decisions. The 5 Algorithmic Rights framework is designed to be adopted as an international standard — values-led, jurisdiction-agnostic, applicable wherever automated systems affect human lives.

- [ ] SADC expansion via SADCAS — Mutual recognition agreement, country-specific regulatory mapping for first-ring expansion
- [ ] EU AI Act regulatory mapping — Position AIC certification as alignment evidence for European organizations
- [ ] Multi-language support — English, Afrikaans, Zulu, Portuguese (Mozambique), French (DRC)
- [ ] Launch Lead Auditor Training Programme — ZAR 35K per trainee, target 50+ certified auditors globally
- [ ] Government tender integration — Work with National Treasury to include AI certification in RFP requirements
- [ ] Full AIC Pulse platform — Real-time monitoring, third-party integrations (Credo AI, Fiddler), enterprise features
- [ ] 210+ cumulative certifications — ZAR 45M revenue, 56% EBITDA margin
- [ ] Submit to ISO for consideration as the basis for a global standard in human accountability for automated decision systems

**Success Metrics:** Operating in 3+ countries (including non-SA). EU AI Act mapping published. First government tender requirement. Training programme launched internationally.

---

## Part 3: Long-Term Vision Alignment

The Founder's Vision establishes a 30-year trajectory:

| Horizon | Founder's Vision Goal | Operational Milestone |
|---------|----------------------|----------------------|
| **2030** | Recognised standard for algorithmic accountability in South Africa | 500+ active certifications; Information Regulator references AIC methodology; First court judgment cites framework |
| **2035** | Global framework expansion — jurisdiction-agnostic and internationally recognised | Recognition in 15+ countries (SADC and beyond); 200+ certified lead auditors; AIC-certified requirement in major international tenders; EU AI Act mapping published |
| **2045** | Principle embedded in international governance frameworks as a universal standard | Global ISO standard based on AIC methodology; Representation in AI governance bodies worldwide; The 5 Algorithmic Rights recognised as the international framework for human accountability in automated systems |
| **2055** | Universal principle — "Human-Accountable" is the global baseline | "Human-Accountable" certification applicable to any consequential automated decision system globally — credit scoring, benefits eligibility, predictive policing, medical triage, and any technology yet to emerge |

### Recommendations for Strengthening Vision Alignment

1. **Add "Vision Checkpoint" to Quarterly Reviews** — Beyond financial metrics, assess: Are we certifying human accountability or just AI governance? Are we building an institution or just a business?

2. **Develop "Beyond AI" Expansion Plan** — Document how the three-tier framework applies to non-AI automated systems (credit scoring algorithms, benefits eligibility, tenant screening).

3. **Create Institutional Legacy Document** — Define what AIC should look like if the founder is no longer involved. Governance structure, values preservation, succession principles.

4. **Establish Advisory Board Early** — Include voices who connect to the constitutional values referenced in the vision: legal scholars, ethics professors, civil society leaders.

5. **Document South African Origin Story** — The vision's connection to apartheid history and Section 10 of the Constitution is powerful. Make this explicit in marketing materials.

---

## Part 4: Key Decisions Required

### Decision 1: Alpha Program Launch Date

**Options:** (a) Begin immediately with current website state, or (b) Wait 4 weeks for website MVP completion.

**Recommendation:** Option (a) — Start outreach conversations now. Website can be shared as "preview" during recruitment. Momentum matters more than polish.

### Decision 2: Alpha Pricing Structure

**Options:** (a) Fixed 50% discount (ZAR 60K-120K), or (b) Sliding scale based on organization size, or (c) Free for first 3 participants.

**Recommendation:** Option (a) — Fixed discount validates willingness-to-pay. Free certifications don't prove anything. Keep it simple.

### Decision 3: Technology Priority

**Options:** (a) Complete apps/web only, or (b) Also build apps/engine for bias testing, or (c) Use third-party tools for bias testing initially.

**Recommendation:** Option (c) — Focus engineering on apps/web (marketing/lead generation). Use existing tools (Credo AI, manual testing) for Alpha audits. Build apps/engine with investment capital.

### Decision 4: Auditor Sourcing

**Options:** (a) Contract auditors for Alpha (ZAR 8K/day), or (b) Hire full-time auditor early, or (c) Train founder to conduct initial audits.

**Recommendation:** Option (a) — Contract auditors reduce fixed costs. They bring credibility and can mentor founder. Full-time hires come with investment.

---

## Appendix: Quick Reference

### Budget Summary

| Item | Cost | Revenue |
|------|------|---------|
| Alpha Program (6 months) | ZAR 470K | ZAR 420-600K |
| Investment Round | 25% equity | ZAR 10M |
| Year 2 Target Revenue | — | ZAR 19.1M |
| Year 3 Target Revenue | — | ZAR 45.6M |

### Critical Success Factors

- [ ] 5+ paid Alpha participants before Month 3
- [ ] Information Regulator letter of support
- [ ] SANAS application submitted by Month 6
- [ ] 15+ Letters of Intent before investment raise
- [ ] At least 1 insurance partnership agreement
- [ ] Case studies with measurable business value

---

> *"Imagination shouldn't be used to escape reality — it should be used to create it."*
> 
> — Zander Wilken, Founder

---

*AI Integrity Certification | Strategic Roadmap | February 2026 | CONFIDENTIAL*
