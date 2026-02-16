# AIC Platform Wiki

> **"When systems make decisions that affect human dignity, humans must remain accountable."**

This is the comprehensive project wiki for the **AI Integrity Certification (AIC) Platform** — a POPIA Section 71 compliant accountability framework for South African AI deployments. AIC certifies that organizations maintain genuine human oversight over algorithmic decisions using a risk-based three-tier certification model.

---

## Table of Contents

- [1. Vision & Mission](#1-vision--mission)
- [2. The 5 Algorithmic Rights](#2-the-5-algorithmic-rights)
- [3. Three-Tier Certification Model](#3-three-tier-certification-model)
- [4. Integrity Score Methodology](#4-integrity-score-methodology)
- [5. Architecture Overview](#5-architecture-overview)
- [6. Applications](#6-applications)
- [7. Audit Engine](#7-audit-engine)
- [8. Shared Packages](#8-shared-packages)
- [9. Database Schema](#9-database-schema)
- [10. Infrastructure & Services](#10-infrastructure--services)
- [11. Authentication & Authorization](#11-authentication--authorization)
- [12. Roles & Responsibilities](#12-roles--responsibilities)
- [13. Certification Workflow](#13-certification-workflow)
- [14. Developer Guide](#14-developer-guide)
- [15. Testing](#15-testing)
- [16. Environment Variables](#16-environment-variables)
- [17. CI/CD](#17-cicd)
- [18. Security](#18-security)
- [19. Business Context](#19-business-context)
- [20. Document Index](#20-document-index)

---

## 1. Vision & Mission

### The Problem

> "Who is accountable when systems make decisions about human beings?"

Algorithms increasingly make decisions about credit, employment, healthcare, and criminal justice — yet no standardized framework exists in South Africa to certify that humans remain accountable for these decisions.

### The Solution

AIC does **not** regulate AI. It certifies that humans remain accountable. Drawing on South Africa's constitutional principles (Section 10 — dignity) and POPIA Section 71 (human oversight requirement), AIC provides an independently verifiable certification that organizations can demonstrate to regulators, customers, and the public.

### 30-Year Trajectory

| Horizon | Goal |
|---------|------|
| **2030** | South African standard for algorithmic accountability |
| **2035** | Africa-wide framework adoption |
| **2045** | Integration with international AI governance frameworks |
| **2055** | Embedded principle in global technology governance |

---

## 2. The 5 Algorithmic Rights

AIC certifies and enforces five fundamental rights for anyone affected by algorithmic decisions:

| # | Right | Principle | Engine Enforcement |
|---|-------|-----------|-------------------|
| 1 | **Right to Human Agency** | No final decision may be made solely by a machine; a human must be accountable | Bias detection via Four-Fifths Rule, disparate impact analysis, chi-square tests, intersectional analysis |
| 2 | **Right to Explanation** | Every person has the right to know *why* a decision was made; black-box opacity is a violation | SHAP and LIME feature importance validation, global and local explanations |
| 3 | **Right to Empathy** | Automated interactions must preserve human dignity | TextBlob sentiment analysis of rejection communications and automated responses |
| 4 | **Right to Correction** | A clear, accessible, human-staffed appeal mechanism must exist | Appeal mechanism validation, correction request tracking |
| 5 | **Right to Truth** | Every person has the right to know if they are interacting with AI; deception is a violation | AI disclosure compliance checking |

---

## 3. Three-Tier Certification Model

Certification tier is determined by the Integrity Score and maps accountability requirements to decision risk:

| Tier | Name | Score Range | Human Oversight | Audit Frequency | Examples |
|------|------|-------------|-----------------|-----------------|----------|
| **Tier 1** | Human-Approved | < 50 | 100% human approval required | Bi-annual | Cancer diagnosis, parole decisions, child welfare |
| **Tier 2** | Human-Supervised | 50–79 | Human supervision with override capability | Annual | Credit decisions, resume screening, insurance pricing |
| **Tier 3** | Automated-Permissible | 80+ | Periodic monitoring sufficient | Biennial | Product recommendations, spam filtering, content curation |

---

## 4. Integrity Score Methodology

The Integrity Score is a weighted average (0–100) across four categories:

| Category | Weight | What It Measures |
|----------|--------|-----------------|
| **Human Oversight** | **35%** | Intervention mechanisms, training programs, accountability structures |
| **Transparency** | **25%** | Explainability of decisions, user recourse availability |
| **Usage Context** | **20%** | Decision criticality, data sensitivity |
| **Infrastructure** | **20%** | Audit logging, bias monitoring, data residency |

> Human Oversight is intentionally the heaviest-weighted category — this is the POPIA Section 71 focus.

### Control Scoring Scale

Each control is scored 0–4:

| Score | Level | Description |
|-------|-------|-------------|
| 0 | None | No evidence of the control |
| 1 | Initial | Ad-hoc, undocumented |
| 2 | Managed | Documented and repeatable |
| 3 | Defined | Standardized across the organization |
| 4 | Optimized | Continuous monitoring and improvement |

---

## 5. Architecture Overview

AIC is a **monorepo** using npm workspaces with Turborepo, containing 4 Next.js applications, 1 Python microservice, and 5 shared packages.

```
aic-platform/
├── apps/
│   ├── web/              # Marketing site (port 3000)
│   ├── platform/         # AIC Pulse SaaS dashboard (port 3001)
│   ├── admin/            # Auditor review portal (port 3002)
│   ├── hq/               # Governance & CMS (port 3004)
│   ├── internal/         # Internal operations portal (port 3005)
│   ├── engine/           # Python audit engine (port 8000)
│   └── governance-agent/ # Governance automation agent
├── packages/
│   ├── ui/               # Shared React components (@aic/ui)
│   ├── auth/             # Shared auth utilities (@aic/auth)
│   ├── events/           # Event system (@aic/events)
│   ├── legal/            # Legal/compliance utilities (@aic/legal)
│   └── sockets/          # WebSocket utilities (@aic/sockets)
├── docs/                 # Strategic & business documentation
└── docker-compose.yml    # Full infrastructure stack
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS 4 (PostCSS) |
| **Animations** | Framer Motion 12 |
| **Language** | TypeScript 5.9 (strict mode) |
| **Build System** | Turborepo |
| **Database** | PostgreSQL 15 |
| **ORM** | Drizzle ORM |
| **Auth** | NextAuth.js (v4/v5-beta) |
| **Engine** | FastAPI + Uvicorn (Python) |
| **Task Queue** | Celery + Redis |
| **Object Storage** | MinIO (S3-compatible) |
| **Testing** | Vitest (TS), pytest (Python), Playwright (E2E) |
| **CI/CD** | GitHub Actions |
| **Design Language** | "Cyber-Luxury" — Black, Gold, IBM Plex Mono |

---

## 6. Applications

### Web — Marketing Site (port 3000)

The public-facing marketing website. Handles lead generation, the self-assessment Risk Assessment Quiz, and alpha program applications.

**Key flows:**
- Visitor takes Risk Assessment Quiz → score generated → lead captured in database
- Alpha program application submission
- Information about AIC, the methodology, and the 5 Rights

### Platform — AIC Pulse Dashboard (port 3001)

The client-facing SaaS dashboard where certified organizations manage their compliance.

**Key flows:**
- Organization dashboard with Integrity Score display
- Audit log viewer with hash chain verification
- Incident management and tracking
- Decision record audit trail
- Correction request (appeal) management
- Certificate display and download
- API key management

### Admin — Auditor Review Portal (port 3002)

Internal portal for auditors to review and manage certifications. *(Transitioning to Internal app)*

### HQ — Governance & CMS (port 3004)

Institutional governance portal with built-in CMS for content management, newsletter management, and internal strategic tooling.

### Internal — Operations Portal (port 3005)

New internal operations portal replacing Admin, providing expanded operational capabilities.

### Engine — Python Audit Microservice (port 8000)

FastAPI-based microservice that enforces the 5 Algorithmic Rights through statistical analysis. See [Section 7](#7-audit-engine) for details.

---

## 7. Audit Engine

The engine is the technical heart of AIC — a FastAPI microservice that performs bias audits, explainability analysis, and integrity verification.

### Engine Services

| Service | File | Purpose |
|---------|------|---------|
| **Bias Analysis** | `bias_analysis.py` | Four-fifths rule, disparate impact, chi-square tests |
| **Fairness Metrics** | `fairness_metrics.py` | Theil index, Atkinson index, epsilon-differential fairness, statistical parity |
| **Explainability** | `explainability.py` | SHAP-based feature importance (global + local) |
| **XAI Service** | `xai_service.py` | LIME explanations (optional dependency) |
| **Drift Monitoring** | `drift_monitoring.py` | PSI + Jensen-Shannon + KS test via `DriftMonitor` class |
| **Hash Chain** | `hash_chain.py` | SHA-256 hash chain for audit immutability |
| **Chain Verification** | `chain_verification.py` | Legacy chain verification |
| **Scoring** | `scoring.py` | Integrity score calculation |
| **Privacy Audit** | `privacy_audit.py` | Data privacy compliance checks |
| **Labor Audit** | `labor_audit.py` | Labor practice auditing |
| **Red Team** | `red_team.py` | Adversarial robustness testing |
| **Evidence Scanner** | `evidence_scanner.py` | Document/evidence validation |

### Engine Security

- **Authentication**: JWT (RS256) via platform tokens + API key fallback
- **Public Paths**: `/`, `/health`, `/docs`, `/redoc`, `/openapi.json`
- **Rate Limiting**: slowapi with per-endpoint limits (typically 30/minute)
- **Request Size**: 10MB max body size
- **Signing**: RSA-3072 signatures on all audit hashes
- **CORS**: Restricted to localhost ports 3000–3005

### Engine Endpoint Pattern

```python
@router.post("/endpoint")
@limiter.limit("30/minute")
def endpoint_name(body: PydanticModel, request: Request):
    # slowapi requires the Starlette Request param named `request`
    # Pydantic body params must use a different name (e.g., `body`)
    result = service_function(body.field1, body.field2)
    result["signature"] = signing_service.sign_hash(result["audit_hash"])
    return result
```

---

## 8. Shared Packages

| Package | Import | Purpose |
|---------|--------|---------|
| **@aic/ui** | `import { TrustBadge } from '@aic/ui'` | TrustBadge, AlphaSeal shared components |
| **@aic/auth** | `import { ... } from '@aic/auth'` | Shared authentication utilities |
| **@aic/events** | `import { ... } from '@aic/events'` | Cross-app event system |
| **@aic/legal** | `import { ... } from '@aic/legal'` | Legal and compliance utilities |
| **@aic/sockets** | `import { ... } from '@aic/sockets'` | WebSocket utilities |

---

## 9. Database Schema

Source of truth: `apps/platform/db/schema.sql`

### Core Tables

| Table | Purpose |
|-------|---------|
| `organizations` | Certified companies with tier, integrity_score |
| `users` | Platform users with roles |
| `audit_logs` | Immutable trail with SHA-256 hash chain + RSA signatures |
| `audit_requirements` | Certification checklist items |

### CRM & Lead Management

| Table | Purpose |
|-------|---------|
| `leads` | Lead tracking from marketing site |
| `assessments` | Self-assessment quiz results |
| `alpha_applications` | Alpha program applications |

### Operations & Compliance

| Table | Purpose |
|-------|---------|
| `compliance_reports` | Monthly compliance archives |
| `scheduled_audits` | Planned audit scheduling |
| `notifications` | Alert system |
| `incidents` | Incident tracking and management |

### Audit Trail & Integrity

| Table | Purpose |
|-------|---------|
| `decision_records` | Algorithmic decision audit records |
| `correction_requests` | Appeal/correction tracking |
| `hash_chain_anchors` | Blockchain anchor points for audit chains |
| `models` | Registered AI model metadata |

### Content & CMS

| Table | Purpose |
|-------|---------|
| `posts` | CMS content for HQ |
| `newsletter_subscribers` | Newsletter management |

### Security & Access

| Table | Purpose |
|-------|---------|
| `api_keys` | API key management for organizations |
| `security_logs` | Security event logging |
| `sessions` | Active session tracking |
| `password_reset_tokens` | Password reset flow |

### Internal Operations

| Table | Purpose |
|-------|---------|
| `performance_metrics` | Team performance tracking |
| `operations_qc` | Quality control records |
| `training_progress` | Staff training tracking |
| `lead_auditor_credentials` | Auditor qualification records |

### Design Conventions

- UUID primary keys via `gen_random_uuid()`
- `TIMESTAMP WITH TIME ZONE` for all timestamps
- JSONB for flexible metadata columns
- Enum types: `tier_enum` (TIER_1/2/3), `user_role`, `audit_status`, `correction_status`

---

## 10. Infrastructure & Services

### Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Web (Marketing) | 3000 | Lead generation, self-assessment |
| Platform (Pulse) | 3001 | Client SaaS dashboard |
| Admin | 3002 | Auditor review portal |
| HQ | 3004 | Governance & CMS |
| Internal | 3005 | Internal operations |
| Engine | 8000 | Python audit microservice |
| PostgreSQL | 5432 | Primary database |
| Redis | 6379 | Queue broker & caching |
| MinIO | 9000/9001 | S3-compatible evidence storage |
| PgAdmin | 5050 | Database admin UI |

### Docker Compose Stack

The `docker-compose.yml` defines the full infrastructure:

- **db** — PostgreSQL 15 with health check probes
- **engine** — FastAPI audit service
- **worker** — Celery task processor for async jobs
- **redis** — Message broker and cache
- **minio** — S3-compatible object storage for evidence files
- **web, platform, admin, internal, hq** — Next.js applications

All application services depend on a healthy database before starting.

---

## 11. Authentication & Authorization

### Auth Stack

- **Platform**: NextAuth.js v5-beta with JWT strategy
- **Admin/HQ**: NextAuth.js v4
- **Engine**: JWT (RS256) tokens with audience claim `aic-engine`, plus API key fallback
- **Password Storage**: bcryptjs hashing

### Role Hierarchy (lowest to highest)

| Role | Access Level |
|------|-------------|
| `VIEWER` | Read-only dashboard access |
| `AUDITOR` | View audit logs, verify decisions |
| `COMPLIANCE_OFFICER` | Write audit logs, manage incidents |
| `ADMIN` | Full access including settings and user management |

### Route Protection

Protected routes are enforced via `middleware.ts`:

```typescript
const protectedRoutes = ['/dashboard', '/settings', '/certificate', '/audit-logs', '/incidents']
const roleRequirements = {
  '/settings': ['ADMIN', 'COMPLIANCE_OFFICER'],
  '/audit-logs': ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR']
}
```

### Auth Helpers

```typescript
import { getCurrentUser, hasRole, hasPermission } from '@/lib/auth';

const user = await getCurrentUser();
if (hasRole(user.role, 'COMPLIANCE_OFFICER')) { /* ... */ }
if (hasPermission(user.role, 'write:audit-logs')) { /* ... */ }
```

---

## 12. Roles & Responsibilities

These are the organizational (human) roles within AIC operations:

| Role | Responsibility | Key Qualifications |
|------|---------------|-------------------|
| **Lead Auditor** | Final authority on certification decisions; conducts site assessments | 5+ years ISO/IEC experience |
| **Technical Audit Lead** | Maintains engine integrity; statistical bias expertise | Data Science degree |
| **Regulatory & Legal Advisor** | POPIA/Constitution expert; engages Information Regulator | Legal qualification with POPIA specialization |
| **Compliance Officer** | Onboarding support; evidence tracking; manages appeals queue | Project management + compliance background |
| **Founder/Principal Officer** | Strategic vision; partnerships (Insurers, Government, SANAS) | Domain expertise |

---

## 13. Certification Workflow

The certification process follows five phases:

### Phase 1: Engagement & Onboarding
**Owner:** Compliance Officer

1. Lead qualification (from web quiz or outreach)
2. Discovery session and scoping
3. Alpha program enrollment
4. Initial evidence requirements communicated

### Phase 2: Evidence Collection
**Owner:** Compliance Officer + Auditor

1. Customized compliance roadmap created
2. Organization uploads evidence to platform
3. Gap analysis performed
4. Telemetry sync configured (for continuous monitoring)

### Phase 3: Technical Bias Audit
**Owner:** Technical Audit Lead

1. Organization provides datasets
2. Engine executes bias analysis (Four-Fifths Rule, disparate impact, fairness metrics)
3. Statistical significance testing
4. Explainability validation (SHAP/LIME)
5. Formal audit report generated with signed hash chain

### Phase 4: Final Assessment & Certification
**Owner:** Lead Auditor

1. Site visit / comprehensive review
2. Integrity Score calculated across all four categories
3. Certification decision made (tier assigned)
4. Immutable record created (SHA-256 hash chain + RSA-3072 signature)
5. Certificate issued

### Phase 5: Continuous Monitoring
**Owner:** Automated + Compliance Officer

1. Live telemetry monitoring for drift detection (PSI, Jensen-Shannon, KS test)
2. Citizen appeals queue managed
3. Monthly compliance reports generated
4. Re-certification triggered per tier schedule (bi-annual / annual / biennial)

---

## 14. Developer Guide

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15 (or use Docker)

### Quick Start

```bash
# Clone the repository
git clone <repo-url> && cd aic-platform

# Install dependencies
npm install

# Start database and infrastructure
docker-compose up -d

# Start all apps concurrently
npm run dev
```

### Individual App Development

```bash
npm run dev:web        # Marketing site on :3000
npm run dev:platform   # Platform dashboard on :3001
npm run dev:admin      # Admin panel on :3002
npm run dev:hq         # HQ governance on :3004
```

### Engine Development

```bash
cd apps/engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Path Aliases

All apps use `@/*` mapping to the app root:

```typescript
import { query } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
```

### Common Tasks

#### Adding a New API Route

1. Create `app/api/[feature]/route.ts`
2. Import `query` from `@/lib/db`
3. Export async `GET`, `POST`, `PUT`, or `DELETE` functions
4. Always use parameterized queries

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const result = await query('SELECT * FROM table WHERE id = $1', [id]);
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

#### Adding a New Engine Endpoint

1. Add Pydantic request model in `analysis.py`
2. Add service function in appropriate `services/*.py` file
3. Add route with `@router.post()` and `@limiter.limit()` decorators
4. Name Starlette Request param `request` (required by slowapi)
5. Sign result hash with `signing_service.sign_hash()`

#### Adding a New Page

1. Create `app/[route]/page.tsx`
2. Use `'use client'` directive if interactive
3. Fetch data via API routes or server components

#### Adding Database Tables

1. Add DDL to `apps/platform/db/schema.sql`
2. Run the SQL against your PostgreSQL instance
3. Create corresponding TypeScript types

---

## 15. Testing

### TypeScript Tests (Vitest)

- **Config**: `vitest.config.ts` at repo root
- **Location**: `apps/*/__tests__/**/*.test.ts`
- **Run**: `npm test`
- **Coverage**: `npm run test:coverage`
- **Watch mode**: `npm run test:watch`
- **Scope**: 90+ tests covering scoring, report generation, auth, roles, permissions

### Python Tests (pytest)

- **Config**: `apps/engine/pytest.ini`
- **Location**: `apps/engine/tests/`
- **Run**: `cd apps/engine && python -m pytest`
- **Scope**: 141+ tests covering all engine services
- **Fixtures**: `conftest.py` includes authenticated and unauthenticated test clients

### E2E Tests (Playwright)

- **Run**: `npm run test:e2e`
- **Framework**: Playwright

### Pre-commit Hooks

Husky + lint-staged runs on every commit:
- ESLint with `--fix` on `*.{ts,tsx}` files
- Vitest on related test files

---

## 16. Environment Variables

See `.env.example` for all variables. Key configuration:

| Variable | Purpose | Notes |
|----------|---------|-------|
| `POSTGRES_USER` | Database username | |
| `POSTGRES_PASSWORD` | Database password | |
| `POSTGRES_HOST` | Database host | Default: `localhost` |
| `POSTGRES_PORT` | Database port | Default: `5432` |
| `POSTGRES_DB` | Database name | |
| `NEXTAUTH_SECRET` | Auth session secret | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Per-app auth URL | `http://localhost:3000` etc. |
| `ENGINE_URL` | Audit engine URL | Default: `http://localhost:8000` |
| `ENGINE_API_KEY` | Engine API key | Generate: `python -c "import secrets; print(secrets.token_hex(32))"` |
| `AUDIT_SIGNING_KEY` | RSA private key (PEM) | Optional in dev (auto-generated) |
| `AUDIT_VERIFY_KEY` | RSA public key (PEM) | Optional in dev (auto-generated) |
| `SENTRY_DSN` | Sentry error tracking | Optional |

---

## 17. CI/CD

GitHub Actions workflow: `.github/workflows/platform-ci.yml`

| Job | Trigger | What It Does |
|-----|---------|-------------|
| **Test** | Push/PR to `main`/`develop` | Runs `npm test` (Vitest) |
| **Build** | After tests pass | Matrix build of all Next.js apps |

---

## 18. Security

### Application Security

| Measure | Implementation |
|---------|---------------|
| SQL Injection Prevention | Parameterized queries everywhere |
| Authentication | NextAuth.js with JWT strategy |
| Authorization | Role-based middleware checks |
| Security Headers | X-Frame-Options, X-Content-Type-Options, etc. |
| Password Storage | bcryptjs hashing |
| CORS | Restricted to known origins |

### Audit Integrity

| Measure | Implementation |
|---------|---------------|
| Hash Chain | SHA-256 chain linking every audit log entry |
| Digital Signatures | RSA-3072 on all audit hashes |
| Chain Verification | Independent verification service |
| Hash Chain Anchors | Periodic anchor points for chain integrity |

### Engine Security

| Measure | Implementation |
|---------|---------------|
| Authentication | JWT (RS256) + API key fallback |
| Rate Limiting | slowapi per-endpoint (30/min typical) |
| Request Size | 10MB maximum body |
| Constant-time comparison | For API key validation |

---

## 19. Business Context

### Current Phase: Alpha Program Preparation

**Status:** Foundation complete, preparing for outreach.

| Timeline | Milestone | Status |
|----------|-----------|--------|
| Feb 2026 | Marketing website MVP | Completed |
| Feb 2026 | Documentation consolidated | Completed |
| Months 1–2 | Alpha Program recruitment | In Progress |
| Months 3–4 | First certifications | Planned |
| Month 6 | SANAS application | Planned |
| Month 7+ | Investment raise (ZAR 10M) | Planned |

### Revenue Projections

| Year | Revenue | Employees |
|------|---------|-----------|
| Year 1 (Alpha) | ZAR 1.0M | 1 + contractors |
| Year 2 | ZAR 19.1M | 10 |
| Year 3 | ZAR 45.6M | 12 |

**Investment target:** ZAR 10M for 25% equity (post-Alpha validation)

---

## 20. Document Index

### Vision & Strategy

| Document | Description |
|----------|-------------|
| [Founder's Vision](./FOUNDERS_VISION.md) | 30-year vision, constitutional values, accountability principles |
| [Declaration of Rights](./DECLARATION_OF_RIGHTS.md) | The 5 Algorithmic Rights |
| [Master Plan](./MASTER_PLAN.md) | Consolidated strategic overview |
| [One Pager](./ONE_PAGER.md) | Single-page investor summary |

### Business & Investment

| Document | Description |
|----------|-------------|
| [Business Plan](./BUSINESS_PLAN.md) | Investor memo: market analysis, unit economics, projections |
| [Strategic Roadmap](./STRATEGIC_ROADMAP.md) | Phased execution plan (Phase 0–5) |
| [Operational Roadmap](./OPERATIONAL_ROADMAP.md) | 21-month path to 10 employees |
| [Risk Analysis](./RISK_ANALYSIS.md) | Competitive landscape and risk mitigation |

### Technical

| Document | Description |
|----------|-------------|
| [Technical Specification](./AIC_TECHNICAL_SPEC.md) | Architecture, APIs, database schema |
| [Engine Requirements](./ENGINE_REQUIREMENTS.md) | Python audit engine functional requirements |
| [Methodology](./METHODOLOGY.md) | Integrity Score calculation formula |
| [Roles & Permissions](./ROLES.md) | Role hierarchy and permission definitions |

### Developer Guides

| Document | Description |
|----------|-------------|
| [Onboarding Guide](./AIC_ONBOARDING_GUIDE.md) | Architecture walkthrough, port mappings, user journeys |
| [Ecosystem Walkthrough](./AIC_ECOSYSTEM_WALKTHROUGH.md) | Lead capture, audit pipeline, certification lifecycle |
| [Project Explainer](./project-explainer.md) | High-level overview for non-technical stakeholders |
| [Workflow](./WORKFLOW.md) | Five-phase certification workflow |

### Operational

| Document | Description |
|----------|-------------|
| [Audit Checklist](./AUDIT_CHECKLIST.md) | Certification checklist items |
| [Launch Checklist](./AIC_Launch_Checklist.md) | Pre-launch milestone tracking |
| [Operational Tasks](./OPERATIONAL_TASKS.md) | Current task tracking |

---

*This wiki was generated from the AIC Platform codebase and documentation. For the most up-to-date technical reference, see [CLAUDE.md](../CLAUDE.md) at the repository root.*
