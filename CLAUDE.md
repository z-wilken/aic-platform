# CLAUDE.md - AI Integrity Certification (AIC) Platform

## Project Overview

AIC is the global standard for human accountability in automated decision systems. We certify that human empathy and accountability remain in the loop for every consequential automated decision — starting in South Africa with POPIA Section 71 as the market entry regulatory anchor, and built for global applicability. The framework is built on the 5 Algorithmic Rights and operationalised through a risk-based three-tier certification model.

**Core Philosophy:** "We certify that human empathy and accountability remain in the loop."

## Architecture

This is a **monorepo** using npm workspaces with 4 primary applications (Next.js and FastAPI) and 8 shared packages.

```
aic-platform/
├── apps/
│   ├── web/                # Marketing site & citizen portal (port 3000)
│   ├── platform/           # Unified SaaS/Admin/HQ/Internal dashboard (port 3001)
│   ├── governance-agent/   # AI-powered governance assistant (MCP server)
│   └── engine/             # Python audit engine microservice (port 8000)
├── packages/
│   ├── ui/            # Shared React components (@aic/ui)
│   ├── auth/          # Shared NextAuth v5 utilities (@aic/auth)
│   ├── db/            # Drizzle ORM schema & services (@aic/db)
│   ├── legal/         # Legal/compliance utilities (@aic/legal)
│   ├── middleware/    # Shared RBAC & security middleware (@aic/middleware)
│   ├── notifications/ # Shared notification logic (@aic/notifications)
│   └── types/         # Shared TypeScript types (@aic/types)
├── docs/              # Strategic & technical documentation (Obsidian Vault)
└── docker-compose.yml # PostgreSQL + PgAdmin orchestration
```

## Tech Stack

### Frontend (apps/web, apps/platform)
- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Styling:** Tailwind CSS 4 (PostCSS)
- **Animations:** Framer Motion 12
- **Types:** TypeScript 5.9 (strict mode)

### Backend
- **Unified API:** Next.js Route Handlers in `apps/platform/app/api/v1/`
- **Database:** PostgreSQL 15 via Drizzle ORM
- **Auth:** NextAuth.js v5-beta (shared across `web` and `platform`)

### Audit Engine (apps/engine)
- **Framework:** FastAPI with slowapi rate limiting
- **Data processing:** Pandas, SciPy, NumPy
- **XAI:** SHAP feature importance validation
- **Crypto:** RSA-3072 signing via `cryptography`

## Development Commands

```bash
# Start all apps concurrently
npm run dev

# Start individual apps
npm run dev:web        # Marketing site on :3000
npm run dev:platform   # Unified dashboard on :3001

# Start database
docker-compose up -d

# Start engine
cd apps/engine && uvicorn app.main:app --reload --port 8000
```

## Authentication & RBAC

### Role Hierarchy (lowest to highest)
1. `VIEWER` - Read-only dashboard access
2. `AUDITOR` - Can view audit logs, triage certification queue
3. `COMPLIANCE_OFFICER` - Can write audit logs, manage incidents
4. `ADMIN` - Full system access, RBAC management, revenue metrics

### Unified API Patterns
- **Client Face:** `GET /api/v1/dashboard`, `POST /api/v1/ai-systems` (tenant-isolated via `getTenantDb`)
- **Admin Face:** `GET /api/v1/admin/queue`, `POST /api/v1/admin/approve` (system-level via `getSystemDb`)
- **Public Face:** `GET /api/v1/public/leaderboard` (unauthenticated)

## Key Conventions

- **SQL Injection Prevention:** Always use parameterized queries via Drizzle ORM.
- **Multi-tenancy:** Enforce tenant isolation using the `org_id` filter and `getTenantDb` helper.
- **Audit trail:** All sensitive operations must generate a SHA-256 hash-chained log with RSA signatures.
- **RBAC:** Use the `hasCapability(userId, slug)` helper from `packages/db` for granular permissions.

## Project Documentation

The repository follows an **Obsidian Vault** structure in the `docs/` folder:
- `docs/01-PLATFORM-OVERVIEW.md` - Core vision.
- `docs/02-ARCHITECTURE.md` - Unified 2-app architecture details.
- `docs/06-DATABASE-SCHEMA.md` - Drizzle-kit schema reference.
- `docs/07-API-ROUTES.md` - Complete API endpoint documentation.
- `docs/10-STRATEGY.md` - Master plan and market expansion strategy.

---

**Copyright 2026 AI Integrity Certification (AIC). Proprietary - Johannesburg, South Africa.**
