# Technical Architecture
*Cross-references: [[01-PLATFORM-OVERVIEW]] | [[06-DATABASE-SCHEMA]] | [[07-API-ROUTES]] | [[05-FUNCTIONS-TO-BUILD]] | [[00-INDEX]]*

---

## ⚡ ARCHITECTURE PIVOT — Feb 2026 (COMPLETE)

> **As of commit `51806ed` (Final Consolidation, Feb 26 2026):** The architecture has consolidated from 5 apps to **4 apps**. `apps/admin`, `apps/hq`, `apps/internal`, and `apps/web-legacy` have been **permanently deleted** (31,252 line deletion). All functionality now lives in `apps/platform` behind RBAC. A new `apps/governance-agent` MCP server has been added.

---

## System Map (NEW — 2-App Unified Architecture)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     apps/web  (port 3000)                           │
│                     PUBLIC FACE                                     │
│                                                                     │
│   Marketing site           Citizens portal                          │
│   Self-assessment quiz     Algorithmic rights portal                │
│   Alpha application        AI Governance Index (public)             │
│   Public org registry      Disclosures hub                          │
│   Corporate portal         Professional portal                      │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   apps/platform  (port 3001)                        │
│                   UNIFIED BACKEND — RBAC-GATED                      │
│                                                                     │
│   CLIENT FACE (tenant-isolated via getTenantDb)                     │
│   ────────────────────────────────────────────                      │
│   /dashboard          Org integrity score + velocity + radar        │
│   /workspace          Governance workspace (Governance Blocks)      │
│   /ai-systems         AI system registry + model cards              │
│   /incidents          Incident log + escalation                     │
│   /corrections        Right-to-correction pipeline                  │
│   /decisions          Decision audit trail + SHAP output            │
│   /reports            Compliance + insurance reports                │
│   /leaderboard        Global integrity rankings                     │
│   /settings           Billing, API keys, team management            │
│                                                                     │
│   ADMIN FACE (system-level via isSuperAdmin + capabilities)         │
│   ────────────────────────────────────────────────────────          │
│   /admin/queue        Certification application triage              │
│   /admin/permissions  God Mode — real-time RBAC management          │
│   /admin/dashboard    Pipeline, pending apps, verification queue    │
│   (HQ ops)            Revenue, CRM, engine monitoring               │
│   (Certification)     Approval → CERTIFIED state machine            │
│   (Audit Vault)       Document upload + SHA-256 checksum            │
│                                                                     │
│   UNIFIED API GATEWAY                                               │
│   /api/v1/[[...route]]   Capability-checked entry point             │
│   /api/v1/admin/approve  Issue certification (issuedCertifications) │
│   /api/v1/admin/triage   Queue triage                               │
│   /api/v1/vault/upload   Document vault (SHA-256 integrity)         │
│   /api/v1/stripe/webhook Stripe integration                         │
│   /api/public/*          Unauthenticated public endpoints           │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SHARED INFRASTRUCTURE                        │
│                                                                     │
│   apps/engine (port 8000)       packages/db                         │
│   Python FastAPI                PostgreSQL + Drizzle ORM            │
│                                                                     │
│   apps/governance-agent (NEW)   packages/auth                       │
│   MCP Server (stdio)            TOTP MFA (RFC 6238) ✅              │
│   get_org_integrity_score       JTI Revocation (Redis+DB) ✅        │
│   list_audit_requirements       Account Lockout ✅                   │
│   AI agents (Claude, GPT)                                           │
│   Bias analysis                 35+ tables (incl. new tables below) │
│   SHAP/LIME explainability      Row-Level Security (RLS)            │
│   Privacy audit                 Hash-chain audit ledger             │
│   Labour audit                  issued_certifications (NEW)         │
│   Drift monitoring              hitl_logs (NEW)                     │
│                                 audit_documents / vault (NEW)       │
│   Celery + Redis                roles + capabilities (NEW)          │
│   (async heavy tasks)                                               │
│                                 packages/auth                       │
│                                 NextAuth.js (shared)                │
│                                 WordPress-style RBAC                │
│                                 hasCapability(userId, slug)         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Apps Deleted (Feb 26, 2026 — commit `51806ed`)

| App | Status | Migrated to |
|-----|--------|-------------|
| `apps/admin` | **DELETED** (31,252 line deletion) | `apps/platform/app/admin/*` |
| `apps/hq` | **DELETED** | `apps/platform/app/(modules)/hq/*` |
| `apps/internal` | **DELETED** | `apps/platform/app/internal/*` |
| `apps/web-legacy` | **DELETED** | Replaced by `apps/web` |

> ⚠️ **Note:** Navigation links to HQ routes must use `/hq/...` prefix. Next.js App Router route group `(modules)` does NOT affect URL — confirmed bug in 2 nav links: `/intelligence/engine` → should be `/hq/intelligence/engine`, `/crm` → should be `/hq/crm`.

---

## Repository Structure (Current — Post-Pivot)

```
aic-platform/
├── apps/
│   ├── web/               Next.js 15 — marketing + public portal
│   ├── platform/          Next.js 15 — UNIFIED BACKEND (RBAC-gated)
│   │   ├── app/admin/         Certification queue + RBAC management
│   │   ├── app/(modules)/hq/  HQ operations (note: URL is /hq/*)
│   │   ├── app/api/v1/        Unified API gateway (capability-checked)
│   │   ├── app/api/public/    Public endpoints (no auth)
│   │   ├── lib/rbac.ts        hasCapability() — WordPress-style RBAC
│   │   ├── lib/capability-middleware.ts
│   │   ├── lib/navigation.ts  (Empathy Engine + Organizations added Feb 26)
│   │   ├── lib/security.ts    Account lockout + token revocation ✅
│   │   └── app/lib/state-machine.ts  Certification lifecycle
│   ├── engine/            Python FastAPI — AI analysis engine (port 8000)
│   └── governance-agent/  MCP Server (NEW — Feb 26 2026)
│       └── src/index.ts       Exposes AIC integrity tools to AI agents
├── packages/
│   ├── db/           Drizzle ORM schema + migrations + RLS (510 lines, 35+ tables)
│   ├── auth/         Shared NextAuth config + RBAC
│   │   └── src/services/
│   │       ├── mfa.ts         TOTP RFC 6238 — REAL IMPLEMENTATION ✅
│   │       └── revocation.ts  JTI revocation (Redis+DB) ✅ ⚠️ Redis setup incomplete
│   ├── types/        Shared TypeScript interfaces
│   ├── ui/           Radix UI design system (AIC Character here)
│   ├── legal/        POPIA + ISO 42001 helpers
│   └── notifications/ Alert system
├── docs/             Strategy + spec docs
├── scripts/
│   └── seed-capabilities.ts   Seeds default RBAC capabilities + roles ✅
├── e2e/              Playwright end-to-end tests
├── turbo.json        Turborepo task config
└── docker-compose.yml
```

---

## Application Deep Dive

### apps/web — Marketing & Public Portal (port 3000)
**Technology:** Next.js 15, Framer Motion, Tailwind CSS

**Purpose:** Convert prospects into leads; serve citizens; run self-assessment quiz.

**Key Pages:**
- `/` — Hero with routing for different audiences (citizens, businesses, regulators)
- `/assessment` — Self-assessment quiz (20 questions, 4 categories, weighted scoring)
- `/business` — B2B offering with pricing
- `/citizens` — Algorithmic rights portal
- `/citizens/appeal` — Submit an algorithmic decision appeal
- `/registry` — Search for certified organisations (publicly visible)
- `/blog` — Citizen education resources
- `/contact` — Lead capture form

**Self-Assessment Quiz (hardcoded — see [[08-HARDCODED-DATA]]):**
- 20 questions across 4 categories
- Scoring weights: Human Agency 20%, Explanation 35%, Empathy 25%, Truth 20%
- Outputs tier suggestion and report with improvement plan

**Connects to:** `packages/db` (leads, alphaApplications), `apps/engine` (assessment scoring)

---

### apps/platform — Client SaaS Dashboard (port 3001)
**Technology:** Next.js 15, NextAuth v5, Drizzle ORM, Recharts, Framer Motion

**Purpose:** The core client product. Organisations manage their AI systems here, complete audits, track compliance, report incidents.

**Key Pages:**
- `/` — Command dashboard: integrity score, velocity chart, radar chart, stats grid
- `/workspace` — Living governance workspace (Governance Blocks)
- `/workspace/[id]` — Individual AI system governance
- `/practitioner` — CPD professional certification
- `/leaderboard` — Global integrity rankings
- `/incidents` — AI decision incident log and management
- `/reports` — Compliance and insurance reports
- `/settings` — Billing, API keys, team management
- `/explain` — Decision explanation viewer (SHAP output)
- `/empathy` — Empathy/sentiment analysis viewer

**Data sources:** `/api/stats` (org intelligence), `/api/dashboard` (full metrics) — both query PostgreSQL via Drizzle with RLS.

**Connects to:** `apps/engine` (bias/fairness/explainability), `packages/db`, `packages/auth`

---

### apps/governance-agent — MCP Server (NEW — Feb 26 2026)
**Technology:** Node.js, `@modelcontextprotocol/sdk`, Drizzle ORM

**Purpose:** Exposes AIC's integrity intelligence as an MCP (Model Context Protocol) server. AI agents — Claude, GPT, or any MCP-compatible client — can call AIC tools directly to get certification data and audit requirements without needing the full platform API.

**Transport:** stdio (command-line process, not HTTP)

**Exposed Tools:**
- `get_org_integrity_score` — returns an org's current integrity score, tier, and open incidents from the system DB
- `list_audit_requirements` — returns the audit requirements checklist for an org by status

**Use case:** Allows enterprise clients running AI agents internally to query their AIC certification state programmatically. Also enables AIC's own internal agents to query platform data.

**Connects to:** `packages/db` via `getSystemDb()` (system-level read access)

---

### ~~apps/admin~~ — DELETED (Feb 26, 2026)
Functionality migrated to `apps/platform/app/admin/*` and `apps/platform/app/(modules)/hq/*` behind RBAC capability gates. See commit `51806ed`.

### ~~apps/hq~~ — DELETED (Feb 26, 2026)
HQ pages now live at `apps/platform/app/(modules)/hq/*`. URL prefix: `/hq/`. Key sections: `/hq/intelligence/engine`, `/hq/crm`, `/hq/governance`, `/hq/growth/revenue`.

---

### apps/engine — AI Analysis Engine (port 8000)
**Technology:** Python 3.12, FastAPI, pandas, scipy, scikit-learn, SHAP, LIME, TextBlob, Celery, Redis

**Purpose:** All statistical AI analysis. Called by the platform apps via authenticated REST API.

**Core Analysis Types:**
- `POST /api/v1/analyze` — Disparate impact (four-fifths rule)
- `POST /api/v1/analyze/equalized-odds` — Equalized odds fairness
- `POST /api/v1/analyze/intersectional` — Multi-attribute fairness
- `POST /api/v1/explain` — SHAP/LIME decision explanations
- `POST /api/v1/privacy-audit` — PII detection
- `POST /api/v1/labor-audit` — Human oversight ratio verification
- `POST /api/v1/drift` — Model drift monitoring
- `POST /analyze/async` — Async wrapper for heavy operations

**Authentication:** JWT Bearer tokens (RS256, `aud: "aic-engine"`) + API key middleware.

**Current Issues (see [[05-FUNCTIONS-TO-BUILD]]):**
- 40+ endpoints are synchronous `def` not `async def` — blocks under concurrent load
- Model cache unbounded — OOM risk after ~8 hours
- Only 4 endpoints use Celery for async — the rest block

---

## Shared Packages

### packages/db
The database layer. Shared by all Next.js apps.

- **ORM:** Drizzle ORM with PostgreSQL
- **Schema:** `packages/db/src/schema.ts` — 30+ tables
- **RLS:** Row-Level Security policies in `rls_policies.sql`
- **Key exports:**
  - `getTenantDb(orgId)` — RLS-enforced tenant database connection
  - `getSystemDb()` — System-level connection (admin/HQ only)
  - `calculateOrganizationIntelligence(orgId)` — Core scoring function

See [[06-DATABASE-SCHEMA]] for all tables.

### packages/auth
Shared NextAuth.js configuration.
- bcrypt password hashing
- JWT sessions (24h TTL)
- RBAC: `ADMIN` > `COMPLIANCE_OFFICER` > `AUDITOR` > `VIEWER`
- Org-level isolation via `orgId` in session
- **MFA: ✅ IMPLEMENTED** — Real TOTP RFC 6238 in `packages/auth/src/services/mfa.ts`. Zero-dependency. Custom base32 encode/decode, HMAC-SHA1, 30-second windows, ±1 window clock drift tolerance. `generateSecret()`, `verifyToken()`, `getOTPAuthURI()`.
- **JTI Revocation: ✅ IMPLEMENTED** — `packages/auth/src/services/revocation.ts`. Redis fast-path + PostgreSQL fallback dual-store. `RevocationService.revoke(jti, expiresAt)` + `isRevoked(jti)`. ⚠️ Redis client setup has `// ... (rest of redis setup)` placeholder — Redis client initialization is incomplete.
- **Account Lockout: ✅ IMPLEMENTED** — `apps/platform/lib/security.ts`. `recordLoginAttempt()` + `isTokenRevoked()`. 5 failures / 15 min lockout, DB-backed.

### packages/types
Canonical TypeScript interface definitions.
- `StatsResponse` — Platform dashboard data shape
- `DashboardData` — Full dashboard including 5-rights compliance
- `CertificationTier` — `'TIER_1' | 'TIER_2' | 'TIER_3'`
- `UserRole` — `'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER'`
- `EngineAnalysisType` — Engine endpoint types

### packages/ui
Radix UI design system with AIC-specific design tokens.

**Design colours:**
- `aic-cyan` — #00F5FF (primary action/data)
- `aic-gold` — (secondary, strategy/warning)
- `aic-red` — (error/critical)
- `aic-slate` — (muted text)
- `aic-obsidian` — (background)

### packages/legal
POPIA Section 71 compliance utilities and ISO/IEC 42001 framework helpers.

---

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend framework | Next.js 15.1.7, React 19 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Charts | Recharts |
| Authentication | NextAuth.js v5 (platform — only remaining Next.js app) |
| ORM | Drizzle ORM |
| Database | PostgreSQL (single instance, no read replicas yet) |
| Engine | Python 3.12 + FastAPI |
| ML/Statistics | scikit-learn, scipy, pandas, numpy |
| Explainability | SHAP 0.46, LIME 0.2 |
| NLP | TextBlob |
| Async tasks | Celery 5.4 + Redis |
| Cryptography | RSA-3072 (audit signatures), bcrypt (passwords) |
| Build system | Turborepo + npm workspaces |
| Containerisation | Docker + docker-compose |
| Testing | Vitest (TS), pytest (Python), Playwright (E2E) |
| Error tracking | Sentry |
| Payments | Stripe |

---

## Data Flow: How an Audit Works

```
1. Organisation submits AI system data
   apps/platform/workspace → POST /api/ai-systems

2. Platform calls Engine for bias analysis
   apps/platform/lib/engine-client.ts → POST engine/api/v1/analyze
   (JWT-authenticated, org-scoped)

3. Engine returns analysis results
   { disparate_impact_ratio, affected_groups, recommendations }

4. Platform stores results as audit requirements
   packages/db → auditRequirements table (status: PENDING)

5. AIC auditor reviews in admin
   apps/admin/audits → verifies evidence → status: VERIFIED

6. Score recalculated
   packages/db/calculateOrganizationIntelligence(orgId)
   Updates organizations.integrity_score

7. Platform dashboard refreshes
   GET /api/stats → returns updated StatsResponse
   AreaChart (velocity) + RadarChart (framework distribution) update

8. Ledger entry appended
   auditLogs → hash-chain entry with previousHash + integrityHash
```

---

## Environment Variables (Required)

```bash
# Database
POSTGRES_URL=postgresql://user:pass@localhost:5432/aic_platform

# Auth
NEXTAUTH_SECRET=<32-byte base64>
AUTH_SECRET=<same>

# App URLs
NEXTAUTH_URL_PLATFORM=http://localhost:3001
# NEXTAUTH_URL_ADMIN and NEXTAUTH_URL_HQ removed — apps/admin and apps/hq deleted Feb 26

# Engine
ENGINE_URL=http://localhost:8000
ENGINE_API_KEY=<auto-generated in dev>
PLATFORM_PUBLIC_KEY=<RSA public key PEM>
AUDIT_SIGNING_KEY=<RSA private key PEM>

# Optional
STRIPE_SECRET_KEY=...
SENTRY_DSN=...
GOOGLE_CLIENT_ID=...
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start all apps
npm run dev

# Start individual apps
npm run dev:web       # port 3000
npm run dev:platform  # port 3001
# (see package.json for all dev:* scripts)

# Database
npm run db:migrate    # run pending migrations
npm run db:push       # push schema changes (dev only)

# Tests
npm test              # vitest
npm run test:engine   # pytest
npm run test:e2e      # playwright
```

---

*Next: [[03-ALGORITHMIC-RIGHTS]] — the five rights that power the audit framework.*
