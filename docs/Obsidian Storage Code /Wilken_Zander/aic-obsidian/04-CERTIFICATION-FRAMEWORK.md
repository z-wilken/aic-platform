# Certification Framework
*Cross-references: [[01-PLATFORM-OVERVIEW]] | [[03-ALGORITHMIC-RIGHTS]] | [[05-FUNCTIONS-TO-BUILD]] | [[06-DATABASE-SCHEMA]] | [[00-INDEX]]*

---

## Overview

AIC issues certification at two levels: **Institutional** (the organisation) and **Practitioner** (the individual). Both are living certifications — they require continuous governance to maintain, not just a one-time assessment.

---

## The Three-Tier System

The core of institutional certification is a three-tier framework. The tier is assigned based on the **stakes of the decisions** the AI system makes, not on the quality of the implementation.

### TIER_1 — Human-Approved
**Decision stakes:** Life-altering, irreversible, dignity-critical

| Examples | Parole recommendations, cancer diagnosis, child custody determinations |
|----------|--------|
| **Requirement** | 100% human approval before any decision acts |
| **Human must** | Review the AI output, confirm or override it, sign their name to the final decision |
| **AI role** | Advisory only — the AI cannot act; it can only recommend |
| **POPIA alignment** | Directly implements Section 71 — no automated decision shall produce legal or similarly significant effects without human review |

**Certification requirements for TIER_1:**
- Accountable Person named and documented per system
- Human oversight ratio: 100% (verified by engine `labor-audit`)
- Override mechanism: documented, tested, evidenced
- Decision records: every decision has a human signature
- Correction pipeline: SLA ≤ 5 business days

---

### TIER_2 — Human-Supervised
**Decision stakes:** Significant but correctable, substantial financial or social impact

| Examples | Credit scoring, resume screening, insurance underwriting, benefits eligibility |
|----------|--------|
| **Requirement** | Human supervision with override authority — human can stop or reverse any decision |
| **Human must** | Monitor decision patterns, review flagged decisions, be reachable for escalation |
| **AI role** | Operational — the AI acts, but the human has the authority and tools to intervene |
| **POPIA alignment** | Section 71 human "in the loop" — decision can proceed but must be reviewable |

**Certification requirements for TIER_2:**
- Accountable Person named
- Human oversight ratio: monitored (engine `labor-audit` checks this)
- Escalation protocol: documented for flagged decisions
- Bias testing: disparate impact ≤ 0.2 deviation from four-fifths rule
- Correction pipeline: SLA ≤ 10 business days

---

### TIER_3 — Automated-Permissible
**Decision stakes:** Low-stakes, easily reversible, no significant impact on rights or dignity

| Examples | Product recommendations, spam filtering, content ranking, routing optimisation |
|----------|--------|
| **Requirement** | Periodic monitoring — human checks system performance at regular intervals |
| **Human must** | Review aggregate performance metrics, investigate anomalies |
| **AI role** | Autonomous — operates without per-decision human review |
| **POPIA alignment** | Automated decisions permissible where no "legal or similarly significant effects" |

**Certification requirements for TIER_3:**
- System registered with documented purpose and risk category
- Drift monitoring: active (engine `/drift` endpoint)
- Annual review: documented
- Disclosure: users informed they are interacting with AI

---

## The Certification Journey

```
1. APPLICATION
   apps/web/assessment → Self-assessment quiz
   → Tier suggestion generated
   → Alpha application submitted
   ↓
2. REVIEW
   apps/admin/applications → AIC reviews application
   → Auditor assigned
   → Requirements checklist created (auditRequirements table)
   ↓
3. GOVERNANCE SETUP
   apps/platform/workspace → Organisation sets up governance workspace
   → Registers AI systems (ai_systems table)
   → Uploads initial evidence per requirement
   ↓
4. ENGINE ANALYSIS
   apps/platform → Engine called for bias/fairness/privacy analysis
   → Results stored as audit requirement evidence
   → Flagged items create incidents
   ↓
5. VERIFICATION
   apps/admin/audits → AIC auditor reviews evidence
   → Marks requirements VERIFIED or FLAGGED
   → Score updates in real time
   ↓
6. CERTIFICATION ISSUED
   → Tier assigned to organization record
   → Integrity score published
   → Certificate generated (PDF)
   → Organisation appears on public registry
   ↓
7. CONTINUOUS GOVERNANCE
   apps/platform → Monthly compliance reporting
   → Incident logging
   → Engine re-runs on model updates
   → Annual renewal required
```

---

## Integrity Score

The Integrity Score (0–100) is the numeric representation of an organisation's compliance across all five rights.

### How It's Calculated

```typescript
// packages/db/src/calculateOrganizationIntelligence()

score = (verifiedRequirements / totalRequirements) × 100

// Per-right breakdown (drives RadarChart in platform dashboard)
radarData = [
  { subject: "Human Agency", A: agencyVerified/agencyTotal × 100 },
  { subject: "Explanation",  A: explainVerified/explainTotal × 100 },
  { subject: "Empathy",      A: empathyVerified/empathyTotal × 100 },
  { subject: "Correction",   A: correctionVerified/correctionTotal × 100 },
  { subject: "Truth",        A: truthVerified/truthTotal × 100 }
]
```

### Score Thresholds

| Score | Certification Status | Meaning |
|-------|---------------------|---------|
| 80–100 | **Certified — Active** | Full certification issued |
| 50–79 | **Provisional** | Certification in progress, some requirements pending |
| < 50 | **Not Certified** | Significant gaps; certification not possible yet |

**Important:** These thresholds are currently defined in the quiz scoring logic (`apps/web/lib/scoring.ts`) but are not yet enforced as automated gates in the certification workflow. See [[05-FUNCTIONS-TO-BUILD]] — `assignCertificationTier()`.

---

## Practitioner Certification

Individuals — compliance officers, AI engineers, lawyers, auditors — can earn an AIC Practitioner Certification. This is tracked in `apps/platform/practitioner` and `apps/admin/practitioner`.

**CPD Modules (currently being built):**

| Module | Topic | Status |
|--------|-------|--------|
| `bias-methodology` | Bias detection methodology | In development |
| `legal-71` | POPIA Section 71 deep dive | In development |
| `oversight-hil` | Human-in-the-loop design | In development |
| `tech-bias` | Technical bias mitigation | In development |
| `exams` | Assessment and certification | In development |

**Tracked via:** `apps/hq/training` (curriculum delivery), practitioner pages in platform + admin.

---

## The Certification Claim vs Reality

The certification claim AIC makes is: *"This organisation has implemented human accountability for its AI systems."* The certification does NOT claim:
- The AI is "unbiased" (bias is an ongoing measurement, not a binary state)
- The AI is technically sound
- The AI will never make errors

It claims that when the AI makes errors or causes harm, there is a named human being who is responsible and a functioning process to address it.

---

## Insurance Integration

AIC's certification unlocks an adjacent revenue stream: AI liability insurance underwriting. Insurers can use the Integrity Score and tier as actuarial inputs.

**Current status:** `POST /api/insurance/risk-score` endpoint exists in `apps/platform`. The risk scoring logic is a placeholder. Building the real algorithm is in [[05-FUNCTIONS-TO-BUILD]].

---

*Next: [[05-FUNCTIONS-TO-BUILD]] — the prioritised list of what needs to be built for real data and real insight.*
