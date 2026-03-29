# AIC: AI Integrity Certification
**The Accountability Layer for Sovereign AI Governance**

> "We do not regulate AI. We certify that humans remain accountable."

AIC is a POPIA Section 71 compliant accountability framework for AI deployments, aligned with ISO/IEC 42001 for global sovereign AI governance. This monorepo contains the complete digital ecosystem — from marketing to deep-tech bias audit logic — designed to ensure that when a system makes a decision affecting human dignity, a human remains responsible.

---

## Platform Architecture (Unified)

As of March 2026, AIC has consolidated into a 2-app primary structure (Web + Platform) to streamline operations and enforce strict RBAC across all institutional functions.

```
aic-platform/
├── apps/
│   ├── web/                # Public marketing & citizen portal (port 3000)
│   ├── platform/           # Unified SaaS + Admin + HQ + Internal (port 3001)
│   ├── governance-agent/   # AI governance agent (MCP Server)
│   └── engine/             # Python audit engine (port 8000)
├── packages/
│   ├── auth/          # Shared NextAuth v5 configuration (@aic/auth)
│   ├── db/            # Drizzle ORM schema & services (@aic/db)
│   ├── legal/         # Legal/compliance utilities (@aic/legal)
│   ├── middleware/    # Shared middleware & RBAC (@aic/middleware)
│   ├── notifications/ # Notification system (@aic/notifications)
│   ├── types/         # Shared TypeScript types (@aic/types)
│   └── ui/            # React component library (@aic/ui)
├── docs/              # Strategic, technical, and "Obsidian" documentation
├── turbo.json         # Turborepo pipeline configuration
└── docker-compose.yml # Local development orchestration
```

| Application | Stack | Purpose |
|:---|:---|:---|
| **`apps/web`** | Next.js, Framer Motion | Marketing site, self-assessment, public index, citizen rights portal |
| **`apps/platform`** | Next.js, NextAuth v5, Drizzle | **Unified Dashboard:** Client SaaS, Auditor Queue, HQ Revenue, and RBAC Management |
| **`apps/governance-agent`** | Next.js, MCP | AI-powered governance assistant and integration layer |
| **`apps/engine`** | FastAPI, SHAP, SciPy | Audit engine — 40+ bias, fairness, and explainability endpoints |

---

## The 5 Algorithmic Rights

The audit engine enforces these rights through statistical analysis:

1. **Right to Human Agency** — Bias detection: four-fifths rule, equalized odds, intersectional fairness.
2. **Right to Explanation** — XAI via SHAP and LIME model explanations.
3. **Right to Empathy** — NLP sentiment analysis of AI-generated communications.
4. **Right to Correction** — Appeal mechanism validation and scoring.
5. **Right to Truth** — AI disclosure and deception pattern detection.

---

## Getting Started

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start database and run migrations
docker-compose up db -d
npm run db:migrate

# 4. Start the engine
cd apps/engine && pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 5. Start all apps via Turborepo
npm run dev
```

### Access Points (Dev)

| Service | URL | Role Required |
|---------|-----|---------------|
| Marketing Site | http://localhost:3000 | Public |
| Client Dashboard | http://localhost:3001/dashboard | VIEWER+ |
| Auditor Queue | http://localhost:3001/admin/queue | AUDITOR+ |
| HQ Ops | http://localhost:3001/hq | ADMIN (SuperAdmin) |
| Engine API Docs | http://localhost:8000/docs | — |

---

## Project Documentation (Obsidian Vault)

The core strategy and technical specifications are maintained as an Obsidian-compatible vault in the `docs/` directory.

| Document | Description |
|----------|-------------|
| [01-PLATFORM-OVERVIEW](docs/01-PLATFORM-OVERVIEW.md) | High-level vision and problem statement |
| [02-ARCHITECTURE](docs/02-ARCHITECTURE.md) | Technical system map and 2-app unification |
| [06-DATABASE-SCHEMA](docs/06-DATABASE-SCHEMA.md) | Drizzle schema and RLS policy documentation |
| [07-API-ROUTES](docs/07-API-ROUTES.md) | Complete V1 Admin and Client API reference |
| [10-STRATEGY](docs/10-STRATEGY.md) | Master Plan: from South African beachhead to global scale |
| [TECHNICAL-SPECIFICATION](docs/TECHNICAL-SPECIFICATION.md) | Security, scoring weighted formulas, and monorepo orchestration |
| [STRATEGIC-ROADMAP](docs/STRATEGIC-ROADMAP.md) | Engineering and business milestones for 2026 |

---

**Copyright 2026 AI Integrity Certification (AIC). Proprietary - Johannesburg, South Africa.**
