# AIC Current Gaps & Action Items

**Status Assessment | February 2026**

This document identifies gaps between current state and what's needed for successful Alpha Program execution.

---

## Executive Summary

| Category | Status | Priority |
|----------|--------|----------|
| Documentation | 90% Complete | Low - mostly done |
| Marketing Website | 95% Complete | Low |
| Audit Framework | 70% Complete | **HIGH** |
| Platform/Admin Apps | 35% Complete | Medium |
| Legal/Regulatory | 10% Started | **HIGH** |
| Team Assembly | 0% Started | **HIGH** |

---

## 1. Documentation Gaps

### Completed
- [x] Founder's Vision - Comprehensive
- [x] Business Plan - Evidence-based with real data
- [x] Strategic Roadmap - 5-phase plan consolidated
- [x] Technical Specs - 600+ lines
- [x] Target Prospects - 20 organizations identified
- [x] Competitive Analysis - 4 competitor categories
- [x] Master Plan - Consolidated overview
- [x] Operational Roadmap - Path to 10 employees

### Gaps to Address

| Gap | Priority | Action Required |
|-----|----------|-----------------|
| **Investor Pitch Deck** | High | Create 15-slide deck for ZAR 10M raise |
| **Financial Model Spreadsheet** | High | Excel/Sheets with 3-year projections |
| **Legal Entity Structure** | High | Company registration documentation |
| **SANAS Requirements Document** | Medium | Detailed ISO 17021 requirements mapping |
| **Insurance Partnership Proposal** | Medium | One-pager for iTOO/Santam conversations |

### Inconsistencies Found

1. **Duplicate PRD files**: `docs/PRD.md` and `docs/product/PRD.md` - consolidate to one
2. **Date references**: Some docs say "January 2026", others "February 2026" - standardize
3. **NextAuth versions**: Platform uses beta 5.0.0, Admin uses 4.24.13 - align versions
4. **Pricing inconsistency**: Business Plan shows different tiers than SPECS.md pricing table

---

## 2. Technical Platform Gaps

### apps/web (Marketing) - 95% Complete

| Feature | Status | Gap |
|---------|--------|-----|
| Homepage | Done | - |
| Self-Assessment Quiz | Done | - |
| Alpha Application | Done | - |
| Lead Capture | Done | Email integration not tested |
| Analytics | Done | GA4 tracking needs verification |

**Remaining:**
- [ ] Email notification on lead capture (needs SMTP setup)
- [ ] CRM integration (HubSpot or Pipedrive)

### apps/platform (Client Dashboard) - 40% Complete

| Feature | Status | Gap |
|---------|--------|-----|
| Authentication | Partial | NextAuth configured, needs testing |
| Dashboard UI | Partial | Layout exists, data binding incomplete |
| Audit Log Viewer | Partial | API exists, UI incomplete |
| Certificate Display | Not Started | Needs PDF generation |
| Settings/Profile | Partial | Basic form, no persistence |

**Critical Gaps:**
- [ ] Full authentication flow testing
- [ ] Dashboard data integration with database
- [ ] Real-time WebSocket updates
- [ ] Certificate generation (PDF)
- [ ] API key management UI

### apps/admin (Internal Operations) - 30% Complete

| Feature | Status | Gap |
|---------|--------|-----|
| Admin Authentication | Done | Super admin script exists |
| Dashboard | Partial | Metrics API exists, UI basic |
| Application Queue | Not Started | Core workflow missing |
| Audit Assignment | Not Started | Auditor management missing |
| Organization Management | Partial | CRUD API exists, UI incomplete |

**Critical Gaps:**
- [ ] Complete certification workflow (application → review → audit → approve → certificate)
- [ ] Auditor assignment and scheduling
- [ ] Finding/evidence management
- [ ] Report generation

### apps/engine (Audit Microservice) - 80% Complete

| Feature | Status | Gap |
|---------|--------|-----|
| Disparate Impact Analysis | Done | Four-Fifths Rule implemented |
| Equalized Odds | Done | TPR/FPR parity testing |
| Intersectional Analysis | Done | Multi-attribute support |
| Decision Explanation | Done | Feature importance |
| Batch Processing | Not Started | Large dataset support needed |

**Remaining:**
- [ ] Batch processing for large datasets
- [ ] Report PDF generation
- [ ] Third-party tool integration (Credo AI, Fiddler)

---

## 3. Legal & Regulatory Gaps

### Not Started - HIGH PRIORITY

| Item | Priority | Action |
|------|----------|--------|
| **Company Registration** | Critical | Register (Pty) Ltd with CIPC |
| **POPIA Registration** | Critical | Register as Responsible Party with Info Regulator |
| **SANAS Consultation** | High | Schedule initial meeting |
| **Info Regulator Meeting** | High | Request letter of support |
| **Insurance Liability** | Medium | Professional indemnity coverage |
| **Alpha Agreement Review** | Medium | Legal review of participant contract |

### Documentation Needed

- [ ] Company constitution/MOI
- [ ] Director resolution for bank account
- [ ] POPIA compliance policy (for AIC itself)
- [ ] Terms of Service for platform
- [ ] Privacy Policy for website
- [ ] Alpha Program contract (final legal review)

---

## 4. Team Assembly Gaps

### Current Team: 1 (Founder only)

### Needed for Alpha (Months 1-2):

| Role | Status | Action |
|------|--------|--------|
| **Contract ISO Auditor** | Not Started | Source via LinkedIn/SAATCA network |
| **POPIA Legal Advisor** | Not Started | Identify firms (ENSafrica, Webber Wentzel) |
| **Technical AI Specialist** | Not Started | Contract for bias testing support |

### Recruitment Actions:

1. **ISO Auditor**:
   - Post on LinkedIn targeting "ISO 27001 Lead Auditor South Africa"
   - Contact SAATCA (SA Association for Testing and Calibration Auditing)
   - Rate: ZAR 8,000/day expected

2. **Legal Advisor**:
   - Contact ENSafrica, Webber Wentzel, Cliffe Dekker for POPIA specialists
   - Request retainer quotes (budget: ZAR 50K)

3. **AI Specialist**:
   - Source from data science community (LinkedIn, Meetups)
   - Rate: ZAR 80K project fee expected

---

## 5. Sales & Marketing Gaps

### Completed
- [x] Target prospect list (20 organizations)
- [x] One-pager pitch document
- [x] Pitch email templates
- [x] Website with lead capture

### Gaps to Address

| Gap | Priority | Action |
|-----|----------|--------|
| **CRM Setup** | High | Set up HubSpot free tier |
| **LinkedIn Outreach Plan** | High | Script + sequence for 20 prospects |
| **Contact Research** | High | Find decision-maker emails/numbers |
| **Conference Calendar** | Medium | Identify speaking opportunities |
| **Partnership Introductions** | Medium | Request intros from network |

### Prospect Contact Research Needed:

| Organization | Role Needed | Status |
|--------------|-------------|--------|
| Investec | CRO | Not researched |
| Capitec | CCO | Not researched |
| Discovery Health | CMO | Not researched |
| Giraffe/Harambee | COO | Not researched |
| Santam | Head of Innovation | Not researched |

---

## 6. Infrastructure Gaps

### Development Environment
- [x] Monorepo structure (Yarn workspaces)
- [x] Docker Compose for database
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Staging environment
- [ ] Production deployment (Vercel)

### Database
- [x] PostgreSQL schema designed
- [ ] Migrations script
- [ ] Seed data for testing
- [ ] Backup strategy

### Security
- [ ] Environment variables management
- [ ] API key rotation policy
- [ ] Penetration testing (pre-launch)
- [ ] SOC 2 preparation (future)

---

## 7. Immediate Action Items (This Week)

### Priority 1: Enable Alpha Outreach

1. **Complete Alpha Certification Framework**
   - Finalize audit checklists for all 3 tiers
   - Review Integrity Score methodology with advisor
   - Create auditor briefing document

2. **Research Prospect Contacts**
   - LinkedIn search for 20 target decision-makers
   - Build contact spreadsheet (name, email, LinkedIn, notes)

3. **Set Up CRM**
   - Create HubSpot free account
   - Import prospect list
   - Create outreach pipeline

### Priority 2: Legal Foundation

4. **Company Registration**
   - File CIPC registration for AIC (Pty) Ltd
   - Open business bank account

5. **Schedule SANAS Call**
   - Email SANAS to request consultation
   - Prepare questions about ISO 17021 pathway

6. **Identify Contract Auditor**
   - LinkedIn outreach to 5 ISO auditors
   - Request availability and day rates

### Priority 3: Technical Cleanup

7. **Consolidate Duplicate Files**
   - Remove `docs/PRD.md` (keep `docs/product/PRD.md`)
   - Align NextAuth versions in platform/admin

8. **Email Integration**
   - Set up transactional email (Resend or Postmark)
   - Test lead capture notifications

---

## 8. Gap Closure Timeline

| Week | Focus | Deliverable |
|------|-------|-------------|
| Week 1 | Company setup | CIPC registration filed |
| Week 1 | Contact research | 20 prospects with details |
| Week 1 | CRM | HubSpot pipeline active |
| Week 2 | Audit framework | Checklists finalized |
| Week 2 | Auditor sourcing | 3 candidates identified |
| Week 2 | SANAS | Consultation scheduled |
| Week 3 | Legal advisor | Retainer agreement |
| Week 3 | Outreach | First 10 prospects contacted |
| Week 4 | Info Regulator | Meeting request sent |
| Week 4 | Insurance | iTOO/Santam intro calls |

---

## Summary: Top 10 Gaps to Close

| # | Gap | Owner | Deadline |
|---|-----|-------|----------|
| 1 | Company Registration (CIPC) | Founder | Week 1 |
| 2 | Prospect Contact Research | Founder | Week 1 |
| 3 | Alpha Audit Checklists Finalized | Founder | Week 2 |
| 4 | Contract ISO Auditor Identified | Founder | Week 2 |
| 5 | SANAS Consultation Scheduled | Founder | Week 2 |
| 6 | CRM Setup (HubSpot) | Founder | Week 1 |
| 7 | Legal Advisor Retained | Founder | Week 3 |
| 8 | First 10 Outreach Conversations | Founder | Week 3 |
| 9 | Info Regulator Meeting Request | Founder | Week 4 |
| 10 | Insurance Partnership Intro | Founder | Week 4 |

---

*AI Integrity Certification | Gap Analysis | February 2026*
