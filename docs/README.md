# AIC Platform Documentation

> **Last Updated:** February 17, 2026
> **Platform Status:** Remediation Phase (Week 1 of 16)

---

## Core Principle

> "We certify that human empathy and accountability remain in the loop — for every consequential automated decision, everywhere."

**The AIC Framework:**
```
Layer 1: The 5 Algorithmic Rights (universal, jurisdiction-agnostic)
            ↓
Layer 2: The 3-Tier Accountability Framework (maps rights to decision stakes)
            ↓
Layer 3: Regulatory Mappings (POPIA Sec 71, EU AI Act, Title VII, LGPD, etc.)
```

---

## Quick Navigation

### "What's the current state of the platform?"
**Read:** [TECHNICAL_AUDIT_2026-02-17.md](./TECHNICAL_AUDIT_2026-02-17.md)

### "How do we fix it?"
**Read:** [REMEDIATION_ROADMAP.md](./REMEDIATION_ROADMAP.md)

### "What do we tell investors?"
**Read:** [STAKEHOLDER_BRIEFING_2026-02-17.md](./STAKEHOLDER_BRIEFING_2026-02-17.md)

### "What happens after remediation?"
**Read:** [POST_REMEDIATION_ROADMAP.md](./POST_REMEDIATION_ROADMAP.md)

### "What do I do TODAY?"
**Read:** [NEXT_STEPS_CHECKLIST.md](./NEXT_STEPS_CHECKLIST.md) - Daily actionable checklist

### "What's the business vision?"
**Read:** [MASTER_PLAN.md](./MASTER_PLAN.md)

---

## Document Hierarchy

### Tier 1: Current State & Fix Plan (Read First)

| Document | Purpose | Updated |
|----------|---------|---------|
| [TECHNICAL_AUDIT_2026-02-17.md](./TECHNICAL_AUDIT_2026-02-17.md) | Honest 360-degree assessment | Feb 17, 2026 |
| [REMEDIATION_ROADMAP.md](./REMEDIATION_ROADMAP.md) | 16-week technical fix plan | Feb 17, 2026 |
| [NEXT_STEPS_CHECKLIST.md](./NEXT_STEPS_CHECKLIST.md) | **Daily actionable checklist** | Feb 17, 2026 |
| [STAKEHOLDER_BRIEFING_2026-02-17.md](./STAKEHOLDER_BRIEFING_2026-02-17.md) | Investor/board communication | Feb 17, 2026 |
| [POST_REMEDIATION_ROADMAP.md](./POST_REMEDIATION_ROADMAP.md) | What comes after Week 16 | Feb 17, 2026 |

### Tier 2: Strategic Vision

| Document | Purpose |
|----------|---------|
| [MASTER_PLAN.md](./MASTER_PLAN.md) | Complete vision, market, and execution strategy |
| [FOUNDERS_VISION.md](./FOUNDERS_VISION.md) | 30-year vision, constitutional values |
| [DECLARATION_OF_RIGHTS.md](./DECLARATION_OF_RIGHTS.md) | The 5 Algorithmic Rights |
| [STRATEGIC_ROADMAP.md](./STRATEGIC_ROADMAP.md) | Business execution phases |
| [OPERATIONAL_ROADMAP.md](./OPERATIONAL_ROADMAP.md) | Team scaling (0→10 employees) |

### Tier 3: Technical Reference

| Document | Purpose |
|----------|---------|
| [AIC_TECHNICAL_SPEC.md](./AIC_TECHNICAL_SPEC.md) | Architecture, APIs, database schema |
| [ENGINE_REQUIREMENTS.md](./ENGINE_REQUIREMENTS.md) | Python audit engine specifications |
| [METHODOLOGY.md](./METHODOLOGY.md) | Integrity Score calculation formula |
| [ROLES.md](./ROLES.md) | User role hierarchy and permissions |
| [WORKFLOW.md](./WORKFLOW.md) | Development workflow |

### Tier 4: Business & Sales

| Document | Purpose |
|----------|---------|
| [BUSINESS_PLAN.md](./BUSINESS_PLAN.md) | Investor memorandum, unit economics |
| [ONE_PAGER.md](./ONE_PAGER.md) | Single-page investor summary |
| [PITCH_TEMPLATES.md](./PITCH_TEMPLATES.md) | Sales conversation scripts |
| [TARGET_PROSPECTS.md](./TARGET_PROSPECTS.md) | Alpha program prospect list |
| [RISK_ANALYSIS.md](./RISK_ANALYSIS.md) | Risk mitigation matrix |

### Tier 5: Operational

| Document | Purpose |
|----------|---------|
| [PILOT_PROGRAM.md](./PILOT_PROGRAM.md) | Alpha program structure |
| [ALPHA_AGREEMENT_TEMPLATE.md](./ALPHA_AGREEMENT_TEMPLATE.md) | Legal template for participants |
| [AIC_ONBOARDING_GUIDE.md](./AIC_ONBOARDING_GUIDE.md) | Developer onboarding |
| [AUDIT_CHECKLIST.md](./AUDIT_CHECKLIST.md) | Certification checklist items |
| [AIC_Launch_Checklist.md](./AIC_Launch_Checklist.md) | Pre-launch milestones |

### Archive (Historical Reference)

| Document | Purpose |
|----------|---------|
| [archive/critical-project-review.md](./archive/critical-project-review.md) | Feb 12→17 assessment evolution |
| [archive/CHANGELOG.md](./archive/CHANGELOG.md) | Historical changelog |

---

## Current Status Summary

### Platform Grades (Feb 17, 2026)

| Pillar | Grade | Target |
|--------|-------|--------|
| Security (Auth/MFA) | D+ | A |
| Data Sovereignty (RLS) | D | A |
| Performance/Memory | D | B |
| Architecture | D | B+ |
| Type Safety | C- | B+ |
| Documentation | A | A |

### Remediation Progress

| Phase | Focus | Status | Timeline |
|-------|-------|--------|----------|
| Phase 0 | Emergency Security | **IN PROGRESS** | Week 1 |
| Phase 1 | Security Foundation | Pending | Weeks 2-4 |
| Phase 2 | Stability & Performance | Pending | Weeks 5-8 |
| Phase 3 | Architecture Enforcement | Pending | Weeks 9-12 |
| Phase 4 | Production Hardening | Pending | Weeks 13-16 |

### Key Milestones

| Checkpoint | Date | Gate |
|------------|------|------|
| Security Foundation Complete | Week 4 (Mar 17) | Can discuss with early investors |
| Alpha Pilot Ready | Week 8 (Apr 14) | Supervised org onboarding |
| Series A Due Diligence Ready | Week 16 (Jun 9) | Institutional investor ready |

---

## What's Working

| Component | Status | Tests |
|-----------|--------|-------|
| Marketing Website | Production | 51 |
| Self-Assessment Quiz | Complete | — |
| Audit Engine Core | Functional | 141 |
| Test Infrastructure | Operational | 268 total |
| CI/CD Pipeline | Active | 3 workflows |

---

## Investment Summary

| Metric | Value |
|--------|-------|
| **Current Readiness** | ~40% |
| **Series A Timeline** | Q3 2026 |
| **Remediation Investment** | ZAR 600K-950K |
| **Target Raise** | ZAR 10M for 25% equity |

---

## Document Governance

### Versioning

All documents should include YAML frontmatter:

```yaml
---
version: 1.0
date: 2026-02-17
status: current | superseded | archived
supersedes: [previous version if applicable]
---
```

### Updates

- **Never overwrite** — create new dated versions
- **Archive old versions** — move to `/archive/`
- **Update this README** — when adding/removing documents

---

*AI Integrity Certification | Documentation Index | February 17, 2026*
