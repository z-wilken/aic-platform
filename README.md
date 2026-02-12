# AIC: AI Integrity Certification
**The Accountability Layer for South African AI**

> "We do not regulate AI. We certify that humans remain accountable."

AIC is the first POPIA Section 71 compliant accountability framework for South African AI deployments. This monorepo contains the complete digital ecosystem — from marketing to deep-tech bias audit logic — designed to ensure that when a system makes a decision affecting human dignity, a human remains responsible.

---

## Platform Architecture

```
aic-platform/
├── apps/
│   ├── web/           # Public marketing site (port 3000)
│   ├── platform/      # AIC Pulse SaaS dashboard (port 3001)
│   ├── admin/         # Internal operations panel (port 3002)
│   ├── hq/            # Governance & growth HQ (port 3004)
│   └── engine/        # Python audit engine (port 8000)
├── packages/
│   ├── auth/          # Shared NextAuth configuration
│   ├── ui/            # Shared React components (@aic/ui)
│   ├── events/        # Event system (stub)
│   ├── sockets/       # WebSocket utilities (stub)
│   └── legal/         # Legal framework (stub)
├── docs/              # Strategic & business documentation
└── docker-compose.yml # Local development orchestration
```

| Application | Stack | Purpose |
|:---|:---|:---|
| **`apps/web`** | Next.js 16, Framer Motion | Marketing site, lead generation, self-assessment quiz |
| **`apps/platform`** | Next.js 16, NextAuth v5-beta, PostgreSQL | Client SaaS dashboard — integrity scores, audit logs, certification |
| **`apps/admin`** | Next.js 16, NextAuth v4 | Internal ops — lead management, audit workflow, certifications |
| **`apps/hq`** | Next.js 16, NextAuth v4 | Governance, HR, CRM, training curriculum, engine monitoring |
| **`apps/engine`** | FastAPI, pandas, scipy, SHAP | Audit engine — 40+ bias/fairness/XAI endpoints |

---

## The Three-Tier Framework

| Tier | Risk Level | Human Oversight | Examples |
|------|-----------|-----------------|----------|
| **Tier 1** | Critical | 100% human approval | Cancer diagnosis, parole decisions |
| **Tier 2** | Elevated | Human supervision with override | Credit scoring, resume screening |
| **Tier 3** | Standard | Periodic monitoring | Recommendations, spam filtering |

---

## The 5 Algorithmic Rights

The audit engine enforces these rights through statistical analysis:

1. **Right to Human Agency** — Bias detection: four-fifths rule, equalized odds, intersectional fairness, Theil/Atkinson index, differential fairness
2. **Right to Explanation** — XAI via SHAP and LIME model explanations
3. **Right to Empathy** — NLP sentiment analysis of AI-generated communications
4. **Right to Correction** — Appeal mechanism validation and scoring
5. **Right to Truth** — AI disclosure and deception pattern detection

---

## Getting Started

### Prerequisites
- **Node.js 20+**
- **Python 3.12+**
- **PostgreSQL 15** (or Docker)

### Quick Start

```bash
# 1. Clone and install
git clone https://github.com/z-wilken/aic-platform.git
cd aic-platform
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your database credentials and a random NEXTAUTH_SECRET

# 3. Start database
docker-compose up db -d
# Wait for healthcheck to pass, then:
psql -U aic_admin -d aic_platform -f apps/platform/db/schema.sql
psql -U aic_admin -d aic_platform -f apps/platform/db/seed.sql  # demo data only

# 4. Start the engine
cd apps/engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 5. Start all Next.js apps (in another terminal)
cd /path/to/aic-platform
npm run dev
```

### Access Points

| Service | URL | Credentials (dev) |
|---------|-----|-------------------|
| Marketing site | http://localhost:3000 | — |
| Platform dashboard | http://localhost:3001 | admin@enterprise.co.za / demo123 |
| Admin panel | http://localhost:3002 | admin@enterprise.co.za / demo123 |
| Growth HQ | http://localhost:3004 | admin@enterprise.co.za / demo123 |
| Engine API docs | http://localhost:8000/docs | — |

### Docker (Full Stack)

```bash
cp .env.example .env
docker-compose up --build
```

---

## Running Tests

```bash
# All TypeScript tests (90 tests: auth, scoring, report generation)
npm test

# Python engine tests (141 tests: bias, fairness, drift, signing, PII, API)
cd apps/engine && python -m pytest tests/ -v

# Security scan
cd apps/engine && bandit -r app/ -ll && pip-audit
```

**Current test status:** 231 tests passing (141 Python + 90 TypeScript), 0 failures.

---

## Environment Variables

Copy `.env.example` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `POSTGRES_USER` / `PASSWORD` / `HOST` / `PORT` / `DB` | Yes | Database connection |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret (shared across apps) |
| `NEXTAUTH_URL` | Yes | Per-app URL (must match port) |
| `ENGINE_URL` | Yes | Python engine URL (`http://localhost:8000`) |
| `ENGINE_API_KEY` | Prod only | Engine auth token (auto-generated in dev) |
| `AUDIT_SIGNING_KEY` | Prod only | RSA private key PEM (auto-generated in dev) |
| `AUDIT_VERIFY_KEY` | Prod only | RSA public key PEM |

---

## Database

Schema source of truth: `apps/platform/db/schema.sql` (30+ tables).
Demo seed data: `apps/platform/db/seed.sql` (separate, never run in production).

Key tables: `organizations`, `users`, `audit_logs` (hash-chained), `audit_requirements`, `compliance_reports`, `incidents`, `api_keys`, `leads`, `assessments`.

---

## Project Documentation

| Document | Location |
|----------|----------|
| Technical Spec | `docs/AIC_TECHNICAL_SPEC.md` |
| Product Requirements | `docs/PRD.md` |
| Founder's Vision | `docs/FOUNDERS_VISION.md` |
| Strategic Roadmap | `docs/STRATEGIC_ROADMAP.md` |
| Pilot Program | `docs/PILOT_PROGRAM.md` |
| Audit Methodology | `docs/METHODOLOGY.md` |
| Engine Requirements | `docs/ENGINE_REQUIREMENTS.md` |
| Onboarding Guide | `docs/AIC_ONBOARDING_GUIDE.md` |

---

## Security

- **Authentication:** NextAuth.js with bcrypt password hashing, JWT sessions (24h)
- **Authorization:** Role-based (ADMIN, COMPLIANCE_OFFICER, AUDITOR, VIEWER)
- **Engine auth:** API key middleware with constant-time comparison
- **SQL injection:** Parameterized queries only
- **Audit trail:** SHA-256 hash-chained logs with RSA-3072 cryptographic signatures
- **PII protection:** Automatic log redaction (email, phone, SSN patterns)
- **Rate limiting:** slowapi (5-60 req/min by endpoint)
- **Security headers:** X-Frame-Options, X-Content-Type-Options, Referrer-Policy

---

**Copyright 2026 AI Integrity Certification (AIC). Proprietary - Johannesburg, South Africa.**
