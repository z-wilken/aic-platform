# GEMINI.md - AI Integrity Certification (AIC) Platform

## Project Overview

The **AI Integrity Certification (AIC) Platform** is a global benchmark for human accountability in automated decision systems. Based in South Africa and anchored in **POPIA Section 71**, the platform ensures that no final decision about a person is made solely by a machine. It operationalises "human empathy and accountability in the loop" through a risk-based three-tier certification model and five Algorithmic Rights.

### Key Technologies
- **Monorepo:** Managed with `npm` workspaces and `Turborepo`.
- **Frontend/API:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion 12.
- **Backend (Audit Engine):** Python 3.12 (FastAPI), Pandas, SciPy, NumPy, SHAP, LIME.
- **Database:** PostgreSQL 15+ with **Drizzle ORM**.
- **Authentication:** NextAuth.js v5-beta with shared utilities.
- **Infrastructure:** Redis for Token Revocation List (TRL), MCP (Model Context Protocol) for governance agents.
- **Security:** RSA-3072 signing for audit logs, SHA-256 hash-chaining for integrity.

### Architecture
The repository is structured into `apps/` and `packages/`:

#### Applications (`apps/`)
- `web`: Marketing site and citizen portal (Port 3000).
- `platform`: Unified SaaS/Admin dashboard and API gateway (Port 3001).
- `engine`: Python-based AI audit engine microservice (Port 8000).
- `governance-agent`: MCP server exposing integrity tools to AI agents.

#### Shared Packages (`packages/`)
- `db`: Drizzle ORM schema, migrations, and Row-Level Security (RLS).
- `auth`: Shared authentication, MFA (TOTP), and token revocation logic.
- `ui`: Shared React component library (Radix UI based).
- `types`: Shared TypeScript interfaces and enums.
- `middleware`: Shared security and RBAC middleware.
- `legal`: Compliance helpers for POPIA and ISO 42001.
- `notifications`: Shared alerting logic.

---

## Building and Running

### Prerequisites
- Node.js (v20+)
- Python 3.12+
- Docker & Docker Compose (for PostgreSQL and PgAdmin)

### Initial Setup
```bash
# Install root and workspace dependencies
npm install

# Start the database and supporting services
docker-compose up -d

# Seed initial RBAC capabilities and roles
npx tsx scripts/seed-capabilities.ts
```

### Development Commands
```bash
# Start all apps concurrently (Turborepo)
npm run dev

# Start specific apps
npm run dev:web        # Marketing site on :3000
npm run dev:platform   # Unified dashboard on :3001

# Start engine (Manual)
cd apps/engine && uvicorn app.main:app --reload --port 8000

# Database Operations
npm run db:generate    # Generate Drizzle migrations
npm run db:push        # Push schema to DB (Dev only)
npm run db:migrate     # Apply migrations
```

### Testing
```bash
# Run all tests
npm test

# Component/Unit tests (Vitest)
npm run test:watch

# Engine tests (Pytest)
npm run test:engine

# E2E tests (Playwright)
npm run test:e2e
```

---

## Development Conventions

### Multi-tenancy & Isolation
- **Tenant Isolation:** Enforced at the database level using Row-Level Security (RLS) and the `getTenantDb(orgId)` helper. Always use `org_id` filters in queries.
- **System Access:** Use `getSystemDb()` for super-admin/HQ operations that span all tenants.

### Authentication & RBAC
- **Roles:** `VIEWER`, `AUDITOR`, `COMPLIANCE_OFFICER`, `ADMIN`.
- **Capabilities:** Fine-grained permissions are checked via `hasCapability(userId, slug)`.
- **MFA:** TOTP (RFC 6238) is implemented for sensitive operations.

### Security & Integrity
- **Audit Logs:** Every consequential decision must be recorded in the `auditLogs` table. Logs are hash-chained (previousHash + currentHash) and RSA-3072 signed.
- **SQL Injection:** Always use Drizzle ORM's parameterized queries; never use raw SQL strings without proper escaping.
- **Secrets:** Keep `.env` files protected. Use the provided `.env.example` as a template.

### Coding Style
- **TypeScript:** Strict mode is enabled. Use shared types from `@aic/types`.
- **Tailwind:** Use `aic-*` design tokens (e.g., `aic-cyan`, `aic-gold`) for consistent branding.
- **Next.js:** Prefer Server Components (RSC) where possible; use `'use client'` only for interactive components.
- **Python:** Follow PEP 8 guidelines. Use `async def` for new FastAPI endpoints to avoid blocking.

---
© 2026 AI Integrity Certification (Pty) Ltd.
