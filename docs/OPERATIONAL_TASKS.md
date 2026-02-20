# AIC: 15 Key Tasks to Become Operational

**Date:** February 7, 2026  
**Current Phase:** Alpha Outreach (Week 3)

---

## Executive Summary

Based on comprehensive analysis of the repository documentation, codebase, and strategic roadmap, these 15 tasks represent the critical path to operational status. They are ordered by priority and grouped into logical phases.

---

## 🔴 IMMEDIATE (Next 2 Weeks)

### 1. Complete Alpha Prospect Research & Outreach
**Why:** Revenue validation is the #1 investor question. You have 20 prospects listed but need contact details and personalized outreach.

| Metric | Target |
|--------|--------|
| Outreach emails | 20 |
| Discovery calls scheduled | 10 |
| Signed Alpha participants | 5-7 |

**Actions:**
- [ ] Research AI use cases for each of 20 target companies
- [ ] Find decision-maker LinkedIn profiles and email addresses
- [ ] Send 5 personalized outreach emails per day
- [ ] Track responses in admin dashboard

**Effort:** 2 weeks | **Owner:** Business Development

---

### 2. Secure Information Regulator Meeting
**Why:** A letter of support from the IR is the single most valuable asset for investor conversations and competitive moat.

**Actions:**
- [ ] Finalize introduction letter (draft exists)
- [ ] Prepare one-page POPIA Section 71 alignment summary
- [ ] Submit meeting request via official channels
- [ ] Follow up within 5 business days

**Effort:** 1 week to submit, 4-6 weeks for meeting | **Dependency:** None

---

### 3. Finalize Alpha Certification Framework
**Why:** Cannot conduct paid audits without a complete methodology. Current Integrity Score methodology needs audit checklists and tier-specific requirements.

**Actions:**
- [ ] Complete audit checklists for all 3 tiers
- [ ] Define evidence requirements per control
- [ ] Create auditor training materials
- [ ] Test framework on 1-2 internal scenarios

**Effort:** 2 weeks | **Dependency:** Completes before first Alpha audit

---

## 🟠 SHORT-TERM (Weeks 3-6)

### 4. Recruit Alpha Audit Team
**Why:** Cannot execute certifications without qualified auditors. Budget: ZAR 290K for specialists.

**Team Required:**
- 1-2 ISO auditors (contract, ZAR 8K/day × 20 days = ZAR 160K)
- 1 POPIA legal advisor (ZAR 50K)
- 1 AI/ML technical specialist (ZAR 80K)

**Actions:**
- [ ] Post contract roles on LinkedIn and ISO auditor networks
- [ ] Interview candidates with ISO 27001/9001 experience
- [ ] Negotiate day rates and availability
- [ ] Onboard with AIC methodology

**Effort:** 3 weeks | **Dependency:** After framework finalized

---

### 5. Python Engine: Add Unit Tests
**Why:** The `tests/` directory is empty. Cannot deploy production engine without test coverage for bias calculations.

**Priority Tests:**
- [ ] Disparate Impact calculation (Four-Fifths Rule edge cases)
- [ ] Equalized Odds with empty groups
- [ ] Explanation generation with missing feature weights
- [ ] API endpoint request/response validation

**Effort:** 1 week | **Reference:** [ENGINE_REQUIREMENTS.md](./ENGINE_REQUIREMENTS.md)

---

### 6. Python Engine: Pin Dependencies & Security Scan
**Why:** All dependencies in `requirements.txt` are unpinned, creating supply chain risk. No security scanning configured.

**Actions:**
- [ ] Create `requirements.in` with version pins
- [ ] Generate `requirements.txt` via `pip-tools`
- [ ] Add `bandit` for Python security scanning
- [ ] Add `pip-audit` for vulnerability detection
- [ ] Configure GitHub Actions for CI

**Effort:** 3 days | **Dependency:** Before first production deployment

---

### 7. Build Client Platform Authentication (apps/platform)
**Why:** Alpha participants need a dashboard to upload evidence and track certification status. Auth is the foundation.

**Requirements (from SPECS.md):**
- JWT authentication with refresh tokens
- NextAuth.js integration
- Role-based access (VIEWER, MANAGER, ADMIN)
- MFA for Tier 1 organizations

**Effort:** 2 weeks | **Dependency:** Database schema exists

---

## 🟡 MEDIUM-TERM (Weeks 7-12)

### 8. Build Client Dashboard MVP (apps/platform)
**Why:** Alpha participants need to see their Integrity Score, upload documentation, and track audit progress.

**Core Features:**
- [ ] Real-time Integrity Score display
- [ ] Document upload for audit evidence
- [ ] Certification status tracker
- [ ] Incident logging interface

**Effort:** 4 weeks | **Dependency:** After authentication (#7)

---

### 9. Build Admin Certification Workflow (apps/admin)
**Why:** AIC staff need to manage Alpha participants, schedule audits, and issue certifications.

**Core Features:**
- [ ] Application review queue
- [ ] Auditor assignment
- [ ] Finding tracker
- [ ] Certificate generation (PDF)

**Effort:** 3 weeks | **Dependency:** After client platform (#8)

---

### 10. Integrate SHAP/LIME for XAI Compliance
**Why:** POPIA Section 71(3) requires disclosure of underlying logic. Current explanation endpoint is manual input only.

**Actions:**
- [ ] Add `shap` and `lime` to requirements
- [ ] Create `/api/v1/analyze/shap` endpoint
- [ ] Integrate with existing explain flow
- [ ] Document for audit reports

**Effort:** 2 weeks | **Reference:** Mathematical Architectures Framework

---

### 11. Implement Immutable Hash-Chain Audit Trail
**Why:** Audit trail must use linked hashing: `h_i = Hash(h_{i-1} || Entry_i)`. Current implementation hashes individual records only.

**Actions:**
- [ ] Add `previous_hash` column to audit_logs table
- [ ] Implement chain linking in bias_analysis.py
- [ ] Create verification endpoint `/api/v1/audit-trail/verify`
- [ ] Add cryptographic signing (RSA-3072)

**Effort:** 2 weeks | **Priority:** P0 for regulatory compliance

---

## 🟢 INVESTMENT READINESS (Months 5-6)

### 12. Execute First 5 Alpha Certifications
**Why:** Proof of delivery. Revenue (ZAR 300-600K) and case studies for investors.

**Per Audit:**
- Pre-audit documentation review (1 day)
- On-site assessment (2-3 days)
- Technical bias testing (1 day)
- Report delivery and certification decision

**Effort:** 4-5 days per audit × 5 = 5 weeks | **Dependency:** Teams (#4) + Framework (#3)

---

### 13. Secure Insurance Partnership Agreement
**Why:** Premium discounts for certified organizations is a key value driver mentioned in business plan.

**Targets:**
- iTOO (cyber insurance)
- Santam (general liability)
- Old Mutual (professional indemnity)

**Actions:**
- [ ] Draft partnership proposal with value proposition
- [ ] Schedule meetings with risk underwriting teams
- [ ] Negotiate discount percentages (target: 10-20%)
- [ ] Sign at least 1 LOI

**Effort:** 6 weeks | **Dependency:** After first 2-3 certifications complete

---

### 14. Produce 3-5 Case Studies with Measurable Outcomes
**Why:** Investors need proof of value, not just delivery.

**Template:**
- Organization profile & AI use case
- Audit process & findings
- Corrective actions implemented
- **Measurable business value** (insurance savings, tender wins, risk reduction)

**Effort:** 1 week per case study | **Dependency:** After audits (#12)

---

### 15. Submit SANAS Accreditation Application
**Why:** SANAS accreditation takes 14 months from submission. Starting now means accreditation by Q2 2027.

**Evidence Required:**
- Demonstrated auditor competence (Alpha certifications)
- Quality management system documentation
- Trained audit team with CVs
- Methodology and procedures

**Fee:** ZAR 9,300

**Effort:** 2 weeks to prepare, then ongoing | **Dependency:** After 5+ certifications (#12)

---

## Summary Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| 🔴 Immediate | #1-3 | Weeks 1-2 |
| 🟠 Short-Term | #4-7 | Weeks 3-6 |
| 🟡 Medium-Term | #8-11 | Weeks 7-12 |
| 🟢 Investment Ready | #12-15 | Months 5-6 |

---

## Key Dependencies

| Task | Blocked By |
|------|------------|
| Alpha Audits (#12) | Framework (#3) + Team (#4) |
| Client Dashboard (#8) | Authentication (#7) |
| Admin Workflow (#9) | Client Dashboard (#8) |
| Case Studies (#14) | Completed Audits (#12) |
| SANAS Application (#15) | Completed Audits (#12) |
| Insurance Partnership (#13) | 2-3 Completed Audits |

---

## Success Metrics for "Operational"

By Month 6, AIC is operational if:
- ✅ 5+ Alpha certifications completed
- ✅ ZAR 300-600K revenue collected
- ✅ 15+ Letters of Intent (ZAR 3-4M pipeline)
- ✅ 1 insurance partnership agreement
- ✅ SANAS application submitted
- ✅ Information Regulator acknowledgment received
- ✅ Platform (apps/platform) live with client logins
- ✅ Python engine with tests and security scanning

---

*Document Version: 1.0 | February 2026*
