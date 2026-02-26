# Functions to Build
*Business priorities first — platform hardening second*

*Cross-references: [[10-STRATEGY]] | [[12-EVIDENCE-COLLECTION]] | [[08-HARDCODED-DATA]] | [[02-ARCHITECTURE]] | [[03-ALGORITHMIC-RIGHTS]] | [[04-CERTIFICATION-FRAMEWORK]] | [[06-DATABASE-SCHEMA]] | [[07-API-ROUTES]] | [[00-INDEX]]*

---

> **Read [[10-STRATEGY]] first.** The build order here reflects the Year 1 priority of *becoming the authority*, not just shipping platform features. The Empathy Engine and Mock Alpha report are higher business priority than fixing the HQ dashboard charts — even though the dashboard fix is technically simpler.

> **Feb 26 2026 — Architecture Pivot:** The 5-app structure is consolidating into 2 apps (web + platform). A new Unified Backend with RBAC is partially built. See [[18-BACKEND-WEEKLY-PLAN]] for the full completion plan. Items marked ✅ below have been implemented in the current commits.

---

## Priority Legend

| Priority | Label | When to tackle |
|----------|-------|----------------|
| 🟣 B0 | **Business Critical** | Build before first investor demo / first Alpha client |
| 🔴 P0 | **Security Critical** | Before any real client data touches the platform |
| 🟠 P1 | **Core Platform** | Before demo to paying clients using the SaaS |
| 🟡 P2 | **Real Insight** | Replaces hardcoded data with live data |
| 🟢 P3 | **Growth & Enhancement** | After core is stable |

---

## 🟣 B0 — Business Critical (Build Before Investor Demo)

These are not platform features. They are the *business* — the things that prove AIC is a real product with real methodology.

---

### B0-1: Mock Alpha Deliverable — 20-Page Integrity Score Report
**Priority: CRITICAL | Time: 3–5 days | Access needed: NONE**

**The most important thing to build.** Cannot sell the Alpha programme without showing prospects what they receive at the end.

**Deliverable:** A fully designed 20-page PDF report for a fictional company "Acme Financial Services."

**Contents:**
- Executive summary with Integrity Score (e.g., 62/100)
- Per-right breakdown (5 radar chart visualisation)
- Empathy assessment of 3 sample communications with annotations
- Bias testing summary (using fictional output data)
- POPIA Section 71 compliance mapping
- Gap analysis with specific recommendations
- Certification decision: Provisional (Score 50–79) with path to full certification
- Methodology appendix

**Build this before anything else.** It also doubles as the methodology stress-test — building it reveals gaps in the certification framework before a real client does.

**Where it lives:** PDF file (see [[pdf]] skill) + linked from `apps/web/alpha-apply` success page.

---

### B0-2: Empathy Analysis Engine
**Priority: HIGHEST | Time: 2–3 weeks | Access needed: NONE**

The single best investor demo piece. Also the most unique methodological IP AIC has.

**Phase 1 — Structured Rubric (build now):**
```typescript
interface EmpathyAnalysis {
  input: string  // paste rejection letter text
  score: number  // 0-100
  dimensions: {
    tone: { score: number; notes: string }               // 20%
    humanRecourse: { score: number; notes: string }      // 20%
    impactAcknowledgment: { score: number; notes: string } // 15%
    explanationClarity: { score: number; notes: string } // 15%
    readingLevel: { score: number; grade: number }       // 10%
    nextSteps: { score: number; notes: string }          // 10%
    responseTime: { score: number; notes: string }       // 10%
  }
  annotations: Array<{ quote: string; issue: string; suggestion: string }>
  improvedVersion: string  // "Here's what 85/100 looks like"
}
```

**Phase 2 — NLP analysis (build later):** TextBlob/SpaCy for tone, Flesch-Kincaid for reading level.

**Phase 3 — Automated scoring (when funded):** Production API endpoint.

**Demo flow:** Paste rejection letter → Score: 34/100 → Breakdown → Annotated original → Improved version.

**Build location:** New endpoint `POST /api/v1/empathy` in `apps/engine`. Frontend demo at `apps/web/empathy-demo` (public, no auth).

Note - these engines will need to be fine tuned every 6 weeks - this will be one of the major recurring tasks moving forward. 

---

### B0-3: AI Governance Index Dashboard
**Priority: HIGH | Time: 2–3 weeks | Access needed: NONE (public data)**

Interactive public dashboard scoring JSE Top 40 on AI governance. Creates market pressure, media content, and investor proof of methodology scale.

**Data sources (all public):** Annual reports, published AI policies, governance disclosures, press releases, job postings with AI-related roles.

**Scoring methodology per company:**
```typescript
interface GovernanceIndexEntry {
  company: string
  sector: string
  overallScore: number      // 0-100
  dimensions: {
    policyDocumentation: number    // Do they publish AI governance policies?
    humanOversight: number         // Evidence of human-in-the-loop processes
    transparencyDisclosures: number // AI use disclosed in annual reports
    incidentResponse: number       // Public evidence of accountability when things go wrong
    regulatoryEngagement: number   // Participation in regulatory processes
  }
  lastUpdated: string
  sources: string[]         // links to evidence used
}
```

**Scoring methodology — 5 KPIs (all measurable from public data):**

| KPI | What It Measures | Data Source |
|-----|-----------------|-------------|
| **Inventory & Classification** | % of AI applications with a formal risk rating | Annual reports, AI governance policies |
| **Policy Hit Rates** | Proportion of AI decisions subject to automated policy checks (bias monitoring) | Governance disclosures, technical papers |
| **Human Override Rate** | Frequency of high-risk automated decisions actually reviewed/overturned by humans | Public incident reports, policy docs |
| **Audit Readiness** | Proportion of AI models with current documentation and version control | ESG reports, developer relations content |
| **Board Oversight** | Formal integration of AI governance into corporate committee charters | Board charters, governance reports, proxy statements |

These 5 KPIs are also directly aligned with ISO/IEC 42001 (AI Management System standard): Inventory = clause 6.1 risk assessment, Policy Hit Rates = clause 8.4 operational controls, Human Override = clause 8.5 human oversight, Audit Readiness = clause 9.1 monitoring/measurement, Board Oversight = clause 5.1 leadership. This alignment means AIC's Index methodology maps directly to an emerging international standard — powerful for regulatory and enterprise conversations.

**Build location:** New page at `apps/web/governance-index`. Static data initially (update quarterly). Interactive filters by sector/score.

**Why this matters:** Companies near the bottom of the Index are the warmest sales leads. "Your competitor scores 71; you score 34" is a better sales opener than any cold email.

---

### B0-4: Enhanced Self-Assessment (Paid Tier)
**Priority: HIGH | Time: 1–2 weeks**

Upgrade the existing 20-question self-assessment to support the paid SME product.

**Free tier (current):** Score + tier suggestion + high-level gaps.

**Paid tier (ZAR 5K–15K — to build):**
- Evidence upload for each question (screenshots, docs, sample communications)
- Empathy quick-scan (upload 3 rejection letters → scored)
- Detailed gap analysis with specific recommendations per right
- PDF report (board-ready, AIC-branded)
- "AIC Assessed" badge with verification URL
- Stripe checkout integration

**Build location:** `apps/web/assessment` upgrade + `apps/web/api/assessment/paid` + PDF report generation.

**Note:** Expand from 20 to 40 questions to cover all 5 rights thoroughly. See [[11-REVENUE-MODEL]] for the SME product detail.

---

## What NOT to Build Yet

> From the strategic planning session — don't let platform complexity distract from business momentum.

- Full client SaaS portal — after 5 paying clients exist
- Admin dashboard enhancements — after first auditor is hired
- Automated real-time bias engine — needs real client data to calibrate
- Mobile app — nobody runs AI governance audits on phones
- Blockchain — no
- WebSocket real-time updates — premature optimisation

---

---

## 🔴 P0 — Security Critical (Before Any Deployment)

These are not feature gaps. They are security vulnerabilities identified in the February 2026 technical audit that invalidate the platform's core claims.

---

### P0-1: Fix RLS Bypass Endpoints
**Problem:** 9 API endpoints call `getSystemDb()` instead of `getTenantDb(orgId)`, breaking multi-tenant isolation. An org could read another org's data.

**Affected files:**
- `apps/platform/app/api/incidents/public/route.ts` — accepts `orgId` from request body (critical)
- `apps/platform/app/api/incidents/escalate/route.ts` — reads ALL incidents
- `apps/platform/app/api/billing/webhook/route.ts` — updates tier without validating `orgId`
- `apps/hq/app/api/leads/route.ts` — `leads` table has no `org_id` column at all

**What to build:**
```typescript
// Every route must follow this pattern:
const session = await auth()
if (!session?.user?.orgId) return unauthorized()
const db = getTenantDb(session.user.orgId) // NOT getSystemDb()
```

**Related:** Add `org_id` column to `leads` table via migration.

---

### P0-2: ✅ DONE — Multi-Factor Authentication (MFA)
**Implemented:** Feb 26, 2026 — `packages/auth/src/services/mfa.ts`

Real TOTP RFC 6238 — zero npm dependencies. Custom base32 encode/decode, HMAC-SHA1, 30-second windows, ±1 window clock drift tolerance.

```typescript
// packages/auth/src/services/mfa.ts — REAL IMPLEMENTATION
generateSecret()     // Returns base32 TOTP secret
verifyToken(secret, token)  // ±1 window drift tolerance
getOTPAuthURI(secret, email, issuer)  // QR code URI for authenticator apps
```

⚠️ **Still needed:** Wire the MFA service into `apps/platform/api/auth/mfa/setup/route.ts` (stub still exists). The service is built but not yet connected to the auth flow.

---

### P0-3: ✅ DONE — JTI (JWT Token ID) Generation and Revocation
**Implemented:** Feb 26, 2026 — `packages/auth/src/services/revocation.ts`

```typescript
// RevocationService — dual-store (Redis fast path + PostgreSQL fallback)
RevocationService.revoke(jti, expiresAt)  // writes to Redis + DB
RevocationService.isRevoked(jti)           // Redis check → DB fallback
```

⚠️ **Known gap:** Redis client setup in `revocation.ts` has a `// ... (rest of redis setup)` placeholder comment — Redis client initialization is incomplete. The DB fallback works, but the Redis fast path is non-functional until this is finished.

---

### P0-4: ✅ DONE — Account Lockout
**Implemented:** Feb 26, 2026 — `apps/platform/lib/security.ts`

```typescript
// 5 failures / 15 min lockout — DB-backed
recordLoginAttempt(email, ip, success)  // stores attempt, checks threshold
isTokenRevoked(jti)                      // DB query against revokedTokens
```

---

### P0-5: Remove Credentials from Git History
**Problem:** `.env` files containing `POSTGRES_PASSWORD` committed to git history.

**What to do:** `git filter-branch` or BFG repo cleaner to purge secrets. Rotate all exposed credentials. Move to environment-level secrets management (e.g., Doppler, AWS Secrets Manager, or Vercel env vars).

---

### P0-6: Make Audit Ledger Mandatory
**Problem:** The hash-chained audit ledger is optional — decision records and model updates bypass it entirely. The "immutable audit trail" claim is currently marketing, not architecture.

**What to build:**
```typescript
// packages/db — enforce ledger entry on every decision record
async function recordDecision(decisionData: DecisionInput): Promise<Decision> {
  return db.transaction(async (tx) => {
    const decision = await tx.insert(decisionRecords).values(decisionData)
    await LedgerService.appendEntry(tx, {  // MANDATORY — cannot skip
      entityType: 'decision',
      entityId: decision.id,
      action: 'CREATED',
      orgId: decisionData.orgId
    })
    return decision
  })
}
// Same pattern needed for: model registration, permission changes, tier changes
```

---

---

### P0-7: Fix 8 Missing API Routes (Frontend Button Audit — Feb 26, 2026)
**Problem:** Frontend audit found 8 routes called by UI buttons that do not exist as API route files. These cause 404 errors on button clicks.

**Missing routes (all need to be created):**

| Route | Called From | Fix |
|-------|-------------|-----|
| `/api/applications` | `/admin/queue`, `/admin/applications` pages | Create platform admin route |
| `/api/auditors` | Several admin pages | Create `/api/auditors/route.ts` |
| `/api/v1/admin/users` | Admin user management | Wire to `apps/platform/app/api/v1/` |
| `/api/v1/admin/organizations` | Admin org management | Wire to `apps/platform/app/api/v1/` |
| `/api/posts` | CMS page (migrated from HQ) | Create `/api/posts/route.ts` |
| `/api/subscribers` | Newsletter signup | Create `/api/subscribers/route.ts` |
| `/api/users` | User management pages | Confirm or create route |
| `/api/auth/onboard` | Onboarding flow | Create onboarding route |

**Also fix:**
- Nav link `/intelligence/engine` → should be `/hq/intelligence/engine`
- Nav link `/crm` → should be `/hq/crm`
- Dead page: `support/page.tsx` exists with no functionality — either wire it or remove it

**Full audit is documented in:** `AIC-Backend-Roadmap.html` (red notice section at bottom)

---

### P0-8: Fix Redis Client Initialization in RevocationService
**Problem:** `packages/auth/src/services/revocation.ts` has `// ... (rest of redis setup)` placeholder — Redis client never initializes. Token revocation falls back to DB only (slower, defeats the purpose).

**Fix:** Complete the Redis client setup with proper connection handling and error fallback.

---

## 🟠 P1 — Core Functionality (Before Client Demo)

These functions are needed for the platform to be a real product rather than a prototype.

---

### P1-1: `calculateIntegrityVelocity()` — Admin Dashboard
**Location:** `apps/admin/app/api/dashboard/route.ts`

**Current state:**
```typescript
// Placeholder: divides avg score by 20 — meaningless
return `+${(avg / 20).toFixed(1)}%`
```

**What to build:**
```typescript
async function calculateIntegrityVelocity(orgIds?: string[]): Promise<string> {
  // 1. Get this month's average score across all orgs (or target org)
  // 2. Get last month's average score
  // 3. Calculate delta as percentage
  // 4. Return formatted string: "+14.2%" or "-3.1%"

  const thisMonth = await getAverageScoreForMonth(currentMonthYear)
  const lastMonth = await getAverageScoreForMonth(previousMonthYear)
  const delta = ((thisMonth - lastMonth) / lastMonth) * 100
  return delta >= 0 ? `+${delta.toFixed(1)}%` : `${delta.toFixed(1)}%`
}
```

---

### P1-2: `calculateAIMSReadinessLevel()` — Platform Dashboard
**Location:** `apps/platform/app/page.tsx`

**Current state:** Hardcoded to `'Level 3/4'`

**What to build:**
```typescript
async function calculateAIMSReadinessLevel(orgId: string): Promise<string> {
  // Level 1: org exists and has at least one system registered
  // Level 2: all 5 rights have at least one requirement created
  // Level 3: all requirements have evidence submitted (PENDING or VERIFIED)
  // Level 4: all requirements VERIFIED + active incident response process

  const level = await determineAIMSLevel(orgId)
  return `Level ${level}/4`
}
```

---

### P1-3: `getLedgerHealthStatus()` — Platform Dashboard
**Location:** `apps/platform/app/page.tsx`

**Current state:** Hardcoded to `'100% Cryptographic'`

**What to build:**
```typescript
async function getLedgerHealthStatus(orgId: string): Promise<string> {
  // 1. Get total audit log entries for org
  // 2. Verify hash chain integrity (each entry's previousHash matches prior entry's integrityHash)
  // 3. Return percentage of valid chain entries + status label

  const { total, valid } = await verifyHashChain(orgId)
  const pct = Math.round((valid / total) * 100)
  return `${pct}% Verified` // or "Chain Integrity Failure" if broken
}
```

---

### P1-4: `assignCertificationTier()` — Automated Gate
**Location:** New function in `packages/db`

**Current state:** Tier is manually assigned by admin — no automated scoring gate.

**What to build:**
```typescript
async function assignCertificationTier(orgId: string): Promise<CertificationTier> {
  const score = await calculateOrganizationIntelligence(orgId)

  if (score.score >= 80) return 'TIER_1'     // Full certification
  if (score.score >= 50) return 'TIER_2'     // Provisional certification
  return 'TIER_3'                             // In progress

  // Also: check that all TIER_1 requirements are met before assigning TIER_1
  // regardless of score (e.g., human-approval process must be evidenced)
}
```

---

### P1-5: Real-Time HQ Pipeline Metrics
**Location:** `apps/hq/app/page.tsx`

**Current state:** All hardcoded:
- Pipeline Value: `'R 12.4M'`
- High-Risk Systems: `'142'`
- Active Auditors: `'58'`
- Citizen Appeals: `'12'`
- Revenue velocity chart: 12 static bar values `[40, 60, 45, 90, ...]`
- High-Priority Targets: Standard Bank, Investec, National Treasury (all hardcoded)

**What to build:**
```typescript
// New API: apps/hq/app/api/hq-stats/route.ts
async function getHQStats(): Promise<HQStatsResponse> {
  return {
    pipelineValue: await calculatePipelineValue(),        // sum of lead scores × deal size
    highRiskSystems: await countHighRiskSystems(),        // ai_systems where tier = TIER_1
    activeAuditors: await countActiveAuditors(),           // users where role = AUDITOR
    citizenAppeals: await countPendingAppeals(),           // correctionRequests where status = PENDING
    revenueVelocity: await getMonthlyRevenueData(),        // 12 months from billing records
    highPriorityTargets: await getHighPriorityLeads(3)     // top 3 leads by score from CRM
  }
}
```

---

### P1-6: Engine Async Migration — Critical 40+ Endpoints
**Location:** `apps/engine/app/`

**Current state:** 40+ endpoints defined as synchronous `def` functions. 4 workers × blocking = OOM under load.

**What to build:** Convert all CPU-intensive endpoints to `async def` and use Celery for SHAP/LIME operations:

```python
# BEFORE (blocks worker):
@router.post("/api/v1/explain")
def explain_decision(request: ExplainRequest):
    result = run_shap_analysis(request.data)  # 30-120 seconds, blocks
    return result

# AFTER (non-blocking):
@router.post("/api/v1/explain")
async def explain_decision(request: ExplainRequest):
    task = celery_app.send_task("tasks.run_shap_analysis", args=[request.data])
    return {"task_id": task.id, "status": "queued"}

# GET /tasks/{task_id} — poll for result
```

Priority endpoints for immediate conversion: `/explain`, `/analyze/intersectional`, `/analyze/equalized-odds`

---

### P1-7: Engine Model Cache LRU with TTL
**Location:** `apps/engine/app/services/explainability.py`

**Current state:** Cache evicts only when count > 20. No TTL. 4 workers × 50MB per model = OOM in hours.

**What to build:**
```python
from functools import lru_cache
import time

class ModelCache:
    def __init__(self, max_size=10, ttl_seconds=3600):
        self._cache = {}
        self._max_size = max_size
        self._ttl = ttl_seconds

    def get(self, key):
        if key in self._cache:
            model, timestamp = self._cache[key]
            if time.time() - timestamp < self._ttl:
                return model
            del self._cache[key]
        return None

    def set(self, key, model):
        if len(self._cache) >= self._max_size:
            oldest = min(self._cache.items(), key=lambda x: x[1][1])
            del self._cache[oldest[0]]
        self._cache[key] = (model, time.time())
```

---

### P1-8: Public Organisation Registry (Real Data)
**Location:** `apps/web/app/registry/page.tsx`

**Current state:** Queries DB but shows empty/mock state without real certified orgs.

**What to build:**
```typescript
// apps/web/app/api/registry/route.ts
async function getPublicRegistry(params: RegistrySearchParams): Promise<RegistryEntry[]> {
  // Only return organisations where:
  // - status = 'ACTIVE' (not suspended)
  // - tier is not null (actually certified)
  // - consent_to_publish = true (org has opted into public listing)

  return db.select({
    name: organizations.name,
    tier: organizations.tier,
    integrityScore: organizations.integrityScore,
    certifiedSince: organizations.certifiedAt,
    aiSystemCount: sql<number>`count(distinct ai_systems.id)`
  })
  .from(organizations)
  .where(and(
    eq(organizations.status, 'ACTIVE'),
    isNotNull(organizations.certifiedAt),
    eq(organizations.publicListing, true)
  ))
  .orderBy(desc(organizations.integrityScore))
}
```

---

## 🟡 P2 — Real Insight (Replace Hardcoded Data)

These functions replace static props with live data, giving the platform genuine analytical value.

---

### P2-1: Incident Trend Analytics
**Location:** New endpoint + platform/incidents

**What to build:**
```typescript
// GET /api/incidents/analytics
interface IncidentAnalytics {
  totalOpen: number
  totalThisMonth: number
  avgTimeToResolution: number // days
  byRight: Record<AlgorithmicRight, number>  // which right is failing most
  bySystem: Array<{ systemName: string; count: number }>
  trendData: Array<{ month: string; opened: number; resolved: number }>
}
```

---

### P2-2: Correction Request Analytics (Right 4 — Correction)
**Location:** New endpoint

**What to build:**
```typescript
// GET /api/corrections/analytics
interface CorrectionAnalytics {
  totalSubmitted: number
  totalResolved: number
  avgDaysToResponse: number      // SLA compliance
  uptakeRate: number             // % upheld vs denied
  overdueCount: number           // past SLA threshold
  slaComplianceRate: number      // % resolved within SLA
}
```

---

### P2-3: Leaderboard — Real Integrity Ranking
**Location:** `apps/platform/app/leaderboard` + `apps/admin/app/leaderboard`

**Current state:** May return real data but has no filtering, pagination, or sector benchmarking.

**What to build:**
```typescript
// GET /api/leaderboard?sector=financial&limit=50&page=1
interface LeaderboardEntry {
  rank: number
  orgName: string
  sector: string
  tier: CertificationTier
  integrityScore: number
  deltaLastMonth: number       // +/- change from last month
  certifiedSince: string
  aiSystemCount: number
  openIncidents: number
}
```

---

### P2-4: Decision Record Analytics (Right 2 — Explanation)
**Location:** New endpoint for `/explain` page context

**What to build:**
```typescript
// GET /api/decisions/analytics
interface DecisionAnalytics {
  totalDecisions: number
  withExplanations: number      // decisions that have SHAP output
  explanationCoverageRate: number // %
  topFeaturesByImpact: Array<{ feature: string; avgImpact: number }>
  potentialProxyFeatures: string[] // features with negative SHAP values on protected groups
}
```

---

### P2-5: HQ Revenue Velocity — Real Data
**Location:** `apps/hq/app/growth/revenue`

**Current state:** Static bar chart with hardcoded values `[40, 60, 45, 90, 65, ...]`

**What to build:**
```typescript
// GET /api/hq/revenue/velocity
async function getRevenueVelocity(months: number = 12): Promise<VelocityData[]> {
  // Pull from Stripe webhook data (billingEvents table)
  // Or from manual revenue entries if Stripe not integrated
  return db.select({
    month: billingEvents.month,
    revenue: sum(billingEvents.amount)
  })
  .from(billingEvents)
  .groupBy(billingEvents.month)
  .orderBy(billingEvents.month)
  .limit(months)
}
```

---

### P2-6: HQ Pipeline Value Calculation
**Location:** `apps/hq/app/page.tsx` + `apps/hq/app/api/hq-stats`

**Current state:** Hardcoded `'R 12.4M'`

**What to build:**
```typescript
async function calculatePipelineValue(): Promise<string> {
  // Sum of (lead.score × estimated deal size) for all active leads
  // Lead score 0-100 used as probability weight
  const leads = await db.select().from(leadsTable).where(
    eq(leadsTable.status, 'active')
  )

  const total = leads.reduce((sum, lead) => {
    const probability = (lead.score || 0) / 100
    const estimatedDealSize = getDealSizeByTier(lead.estimatedTier)
    return sum + (probability × estimatedDealSize)
  }, 0)

  return formatCurrency(total, 'ZAR') // "R 14.2M"
}
```

---

### P2-7: Insurance Risk Score Algorithm
**Location:** `apps/platform/app/api/insurance/risk-score`

**Current state:** Endpoint exists, scoring logic is placeholder.

**What to build:**
```typescript
// POST /api/insurance/risk-score
async function calculateInsuranceRiskScore(orgId: string): Promise<RiskScore> {
  const intel = await calculateOrganizationIntelligence(orgId)

  // Actuarial inputs:
  const factors = {
    integrityScore: intel.score,                    // higher = lower risk
    openIncidents: intel.openIncidents,             // higher = higher risk
    tier: orgTierToRiskMultiplier(org.tier),        // TIER_1 = highest risk
    correctionResponseRate: await getCorrectionRate(orgId),
    lastAuditAge: daysSinceLastAudit(org.lastAuditAt),
    biasTestingCoverage: await getBiasTestCoverage(orgId)
  }

  const riskScore = calculateActuarialScore(factors)
  const premium = riskScoreToPremium(riskScore)

  return { riskScore, premium, factors, recommendation }
}
```

---

### P2-8: `calculateOrganizationIntelligence()` Extended Metrics
**Location:** `packages/db/src/`

**Current state:** Returns score, openIncidents, verifiedRequirements, totalRequirements. Enough for dashboard, but missing the full picture for compliance reports.

**Extend to include:**
```typescript
interface ExtendedOrgIntelligence {
  score: number
  openIncidents: number
  verifiedRequirements: number
  totalRequirements: number
  // NEW:
  perRightScores: Record<AlgorithmicRight, number>
  correctionResponseRate: number
  biasTestingLastRun: string | null
  driftAlertsLastMonth: number
  aimsReadinessLevel: 1 | 2 | 3 | 4
  nextRequirementsDue: AuditRequirement[]
  criticalGaps: string[]   // rights with score < 30
}
```

---

## 🟢 P3 — Growth & Enhancement

### P3-1: Real-Time WebSocket Score Updates
Currently: Dashboard polls on page load. Build WebSocket/SSE connection so integrity score updates in real-time when auditor verifies a requirement.

### P3-2: Automated Drift Alert System
When engine detects model drift above threshold, automatically create an incident record and notify the platform user.

```python
# apps/engine — POST /api/v1/drift with callback
if drift_score > threshold:
    await notify_platform(orgId, systemId, drift_score)
    # platform creates incident automatically
```

### P3-3: Sector Benchmarking
Show how an organisation's score compares to their sector average.
```typescript
// GET /api/benchmarks?sector=financial_services
interface SectorBenchmark {
  sector: string
  avgScore: number
  top10pctScore: number
  orgRank: number
  orgPercentile: number
}
```

### P3-4: Automated Monthly Compliance Report Generation
Trigger monthly PDF report generation for each org on the 1st of the month.

### P3-5: Citizen Appeal Portal — Live Submission
`apps/web/citizens/appeal` currently has a form that submits to a static endpoint. Connect it to `correctionRequests` table and implement email notification to the responsible organisation.

### P3-6: Consolidate EngineClient
Two competing EngineClient implementations exist:
- `apps/platform/lib/engine-client.ts` (391 lines, authoritative)
- `packages/api-client/src/index.ts` (66 lines, stub, never imported)

Delete the stub, make the authoritative one the shared package.

### P3-7: Email Enumeration Prevention
Auth routes `forgot-password` and `reset-password` reveal whether an email exists in the system. Fix to always return generic response regardless of whether email is found.

---

## Summary by Area

| Area | P0 | P1 | P2 | P3 | Notes |
|------|----|----|----|----|-------|
| Security | 5 (3 ✅ done) | — | — | 1 | MFA, JTI, Lockout done |
| Frontend Wiring | 2 (new) | — | — | — | 8 missing routes, 2 broken nav links |
| HQ Dashboard | — | 1 | 2 | — | HQ now in platform/(modules)/hq |
| Platform Dashboard | — | 2 | 1 | 1 | VAULT_SLOTS + STEPS still hardcoded |
| Engine | — | 2 | — | 1 | |
| Database / Core | 1 | 2 | 2 | 1 | |
| Public Registry | — | 1 | — | — | |
| Analytics | — | — | 4 | 2 | |
| Insurance | — | — | 1 | — | |

**Security progress as of Feb 26:** P0-2 ✅ P0-3 ✅ (Redis gap) P0-4 ✅ | P0-1 P0-5 P0-6 still pending

---

*See [[08-HARDCODED-DATA]] for exact file locations of all hardcoded values.*
*See [[07-API-ROUTES]] for the full list of existing endpoints to build against.*
