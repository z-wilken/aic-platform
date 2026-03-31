# Hardcoded Data Audit
*Exact locations of all static/fake data — and what each needs to be replaced with*

*Cross-references: [[05-FUNCTIONS-TO-BUILD]] | [[07-API-ROUTES]] | [[02-ARCHITECTURE]] | [[00-INDEX]]*

---

## How to Read This Document

Each entry shows:
1. **What is hardcoded** — the exact value(s)
2. **Where** — file path + line context
3. **What it should be** — the real data source
4. **Function to build** — the linked item in [[05-FUNCTIONS-TO-BUILD]]

---

> **Feb 26 update:** `apps/hq` has been DELETED. Its pages migrated to `apps/platform/app/(modules)/hq/`. All hardcoded data issues from `apps/hq` now exist at the corresponding `apps/platform` path.

---

## apps/platform — New Hardcoded Data Found (Feb 26 Audit)

### Dashboard VAULT_SLOTS — Hardcoded Upload Status

```tsx
// File: apps/platform/app/dashboard/page.tsx
const VAULT_SLOTS = [
  { label: 'Board Resolution', status: 'verified' },
  { label: 'AI Policy Document', status: 'pending' },
  { label: 'Bias Test Results', status: 'missing' },
  // ... more static entries
]
```

**Should be:** Real vault document records from the `auditDocuments` table for the logged-in org. Every user currently sees the same fake upload status.

---

### Dashboard STEPS — Hardcoded Onboarding Progress

```tsx
// File: apps/platform/app/dashboard/page.tsx
const STEPS = [
  { label: 'Register AI Systems', done: true },
  { label: 'Upload Core Documents', done: true },
  { label: 'Submit for Review', done: false },
  // ... more static entries
]
```

**Should be:** Real progress computed from the org's actual state — ai_systems count, document upload status, application status.

---

## apps/platform (migrated from apps/hq) — HQ Dashboard (`app/(modules)/hq/page.tsx`)

### HQ Top Metrics — All Four Are Hardcoded

```tsx
// File: apps/platform/app/(modules)/hq/page.tsx  [was apps/hq/app/page.tsx — deleted Feb 26]
// The entire stats grid is static:
[
  { l: 'Pipeline Value',    v: 'R 12.4M', trend: '+14%' },
  { l: 'High-Risk Systems', v: '142',     trend: 'Critical' },
  { l: 'Active Auditors',   v: '58',      trend: 'Global' },
  { l: 'Citizen Appeals',   v: '12',      trend: 'Pending' }
]
```

**Should be:** A fetch to `GET /api/hq-stats` returning:
- Pipeline Value → sum of `(lead.score/100) × estimatedDealSize` from `leads` table
- High-Risk Systems → count of `ai_systems` WHERE `risk_tier = 'TIER_1'`
- Active Auditors → count of `users` WHERE `role = 'AUDITOR'`
- Citizen Appeals → count of `correctionRequests` WHERE `status = 'PENDING'`

**Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P1-5** — `getHQStats()`

---

### Revenue Velocity Chart — Hardcoded Bar Values

```tsx
// File: apps/platform/app/(modules)/hq/page.tsx
// 12 static bar height values:
{[40, 60, 45, 90, 65, 80, 85, 100, 95, 92, 110, 120].map((h, i) => (
  <motion.div style={{ height: `${h}%` }} />  // R {h}K on hover
))}
```

**Should be:** Real monthly revenue data from billing events or manual revenue entries. Each bar = a month. Height = revenue amount.

**Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P2-5** — `getRevenueVelocity()`

---

### High-Priority Targets — Three Real Companies Hardcoded

```tsx
// File: apps/platform/app/(modules)/hq/page.tsx
[
  { name: 'Standard Bank',     score: 92, val: 'R 240K' },
  { name: 'Investec Health',   score: 88, val: 'R 180K' },
  { name: 'National Treasury', score: 95, val: 'TENDER' }
]
```

**Should be:** Top 3 leads from `leads` table by score, with calculated potential contract value.

**Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P1-5** — `getHighPriorityLeads(3)`

---

## apps/platform — Platform Dashboard (`app/page.tsx`)

### Ledger Health — Hardcoded Status

```tsx
// File: apps/platform/app/page.tsx
{ l: 'Ledger Health', v: '100% Cryptographic', c: 'text-aic-cyan' }
```

**Should be:** Real hash-chain verification result. Walk the `auditLogs` chain, compare each entry's `previous_hash` to the prior entry's `integrity_hash`, return percentage of valid entries.

**Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P1-3** — `getLedgerHealthStatus(orgId)`

---

### AIMS Readiness — Hardcoded Level

```tsx
// File: apps/platform/app/page.tsx
{ l: 'AIMS Readiness', v: 'Level 3/4', c: 'text-aic-gold' }
```

**Should be:** Calculated from the org's actual compliance state across the 5 rights. Level 1–4 based on evidence submitted and verified.

**Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P1-2** — `calculateAIMSReadinessLevel(orgId)`

---

## apps/platform — Admin Dashboard (migrated from apps/admin)

### Integrity Velocity — Placeholder Calculation

```typescript
// File: apps/platform/app/api/dashboard/route.ts  [was apps/admin — deleted Feb 26]
const velocity = await db.transaction(async (tx) => {
    const reports = await tx.select({ score: complianceReports.integrityScore })
      .from(complianceReports).limit(20);
    if (reports.length < 2) return '+0.0%';
    const avg = reports.reduce((acc, r) => acc + (r.score || 0), 0) / reports.length;
    return `+${(avg / 20).toFixed(1)}%`; // ← Comment in code: "Placeholder for real delta logic"
});
```

**Should be:** True month-over-month delta: (this month average - last month average) / last month average × 100%.

**Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P1-1** — `calculateIntegrityVelocity()`

---

## apps/web — Self-Assessment Quiz (`app/assessment/`)

### Quiz Questions — 20 Questions Hardcoded in Source

```typescript
// File: apps/web/lib/scoring.ts (or similar)
// 20 quiz questions with categories and weights:
const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'human_agency',   // weight: 20%
    question: "Do you have a named human accountable...",
    options: [...]
  },
  // ... 19 more questions
]

// Scoring weights (hardcoded):
const CATEGORY_WEIGHTS = {
  human_agency:  0.20,  // 20%
  explanation:   0.35,  // 35%
  empathy:       0.25,  // 25%
  truth:         0.20   // 20%
}
```

**Current state:** This is intentionally coded logic (quiz questions don't need DB), but the scoring thresholds for tier assignment are hardcoded:
- `< 50` → TIER_3 suggested
- `50–80` → TIER_2 suggested
- `> 80` → TIER_1 suggested

**These thresholds should be configurable** and should match the actual certification thresholds. Currently the quiz suggestions and the real certification scores may differ.

---

### Assessment Report Page — Mock Structure

```tsx
// File: apps/web/app/report/page.tsx
// Report generation partially implemented but uses mock data for
// improvement recommendations and case studies
```

**Should be:** Real improvement plan generated from the quiz score breakdown, linked to actual certification requirements.

---

## apps/web — Public Registry (`app/registry/page.tsx`)

### Registry Search — Missing Filter for Published Orgs Only

```typescript
// File: apps/web/app/registry/page.tsx (or api/registry/route.ts)
// Currently shows orgs without filtering for:
// - certified_at IS NOT NULL (actually certified)
// - public_listing = true (consented to public listing)
// - status = 'ACTIVE' (not suspended)
```

**Should be:** Query with all three filters. **Function to build:** [[05-FUNCTIONS-TO-BUILD]] **P1-8**

---

## apps/hq — Revenue Page (`app/growth/revenue/page.tsx`)

### Revenue Metrics — All Hardcoded

```tsx
// File: apps/hq/app/growth/revenue/page.tsx
// Hardcoded revenue data found in this file
// Monthly targets, actual revenue, and pipeline numbers are all static
```

**Should be:** Real billing data from Stripe webhook events stored in `billingEvents` table (which also needs to be created — see [[06-DATABASE-SCHEMA]]).

---

## apps/hq — CMS Page (`app/cms/page.tsx`)

### Content Metrics — Partially Hardcoded

```tsx
// File: apps/hq/app/cms/page.tsx
// TODO comments and mock article metrics
// Article view counts and engagement metrics are static
```

**Should be:** Real data from analytics integration or posts table metrics.

---

## Python Engine — Analysis Thresholds (Configurable but Hardcoded)

```python
# File: apps/engine/app/api/v1/endpoints/analysis.py
# Four-fifths rule threshold:
DISPARATE_IMPACT_THRESHOLD = 0.8  # hardcoded constant

# SHAP significance threshold:
FEATURE_IMPORTANCE_THRESHOLD = 0.05  # hardcoded constant

# Privacy PII patterns:
PII_PATTERNS = [...]  # hardcoded regex patterns
```

**Current state:** These are reasonable defaults, but they should be configurable per-org (some jurisdictions use different thresholds). **Not a critical blocker** but a P3 enhancement.

---

## Summary Table

| Location | Hardcoded Value | Real Data Source | Priority |
|----------|----------------|------------------|----------|
| `apps/platform/app/(modules)/hq/page.tsx` | Pipeline Value `R 12.4M` | `leads` table weighted sum | P1 |
| `apps/platform/app/(modules)/hq/page.tsx` | High-Risk Systems `142` | `ai_systems WHERE tier=TIER_1` count | P1 |
| `apps/platform/app/(modules)/hq/page.tsx` | Active Auditors `58` | `users WHERE role=AUDITOR` count | P1 |
| `apps/platform/app/(modules)/hq/page.tsx` | Citizen Appeals `12` | `correctionRequests WHERE status=PENDING` count | P1 |
| `apps/platform/app/(modules)/hq/page.tsx` | Revenue velocity bars `[40,60,45...]` | `billingEvents` monthly sum | P2 |
| `apps/platform/app/(modules)/hq/page.tsx` | High-priority targets (Standard Bank etc.) | Top 3 `leads` by score | P1 |
| `apps/platform/app/page.tsx` | Ledger Health `100% Cryptographic` | Hash-chain verification | P1 |
| `apps/platform/app/page.tsx` | AIMS Readiness `Level 3/4` | `calculateAIMSReadinessLevel()` | P1 |
| `apps/platform/app/dashboard/page.tsx` | `VAULT_SLOTS` array — fake doc upload status | `auditDocuments` table for org | P1 |
| `apps/platform/app/dashboard/page.tsx` | `STEPS` array — fake onboarding progress | Real org state (ai_systems, docs, status) | P1 |
| `apps/platform/app/api/dashboard/route.ts` | Integrity Velocity `+X%` placeholder | Month-over-month delta calc | P1 |
| `apps/web/lib/scoring.ts` | Quiz weights and tier thresholds | Config or DB table | P3 |
| `apps/platform/app/(modules)/hq/growth/revenue/page.tsx` | Revenue metrics | Stripe / billing events | P2 |

---

## What Is NOT Hardcoded (Working with Real Data)

For clarity, here are the parts that correctly query real database data:

- `apps/platform/api/stats/route.ts` — integrity score, velocity data, radar data (all real DB)
- `apps/admin/api/dashboard/route.ts` — pending applications, certifications count, queue items (real DB, except velocity)
- `apps/platform/api/incidents/route.ts` — real incident data
- `apps/platform/api/audit-logs/route.ts` — real hash-chain audit logs
- `apps/admin/api/organizations/route.ts` — real org data
- `apps/hq/app/page.tsx` lead count — queries `/api/leads` for real count (but the 4 metric cards are hardcoded)

---

*See [[05-FUNCTIONS-TO-BUILD]] for detailed implementation specs for each item above.*
*See [[07-API-ROUTES]] for the existing endpoints that these functions will serve.*
