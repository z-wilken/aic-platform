# AIC Ecosystem: Developer Onboarding Guide

Welcome to the **AI Integrity Certification (AIC)** platform. This document is a guided walkthrough of the architecture, data flow, and developer experience.

## 1. High-Level Architecture

AIC is a **monorepo** using npm workspaces + Turborepo. It contains 5 Next.js frontends, 1 Python audit engine, and 11 shared packages.

### Applications

| App | Port | Purpose |
|-----|------|---------|
| `apps/web` | 3000 | Public-facing marketing site. AI Risk Quiz generates leads. |
| `apps/platform` | 3001 | Client SaaS dashboard (AIC Pulse). Organizations manage compliance here. |
| `apps/internal` | 3002 | Internal operations portal for the AIC team. Manages pipeline, billing, operations. |
| `apps/hq` | 3004 | Governance & CMS. Blog, newsletter, strategic tooling. |
| `apps/engine` | 8000 | Python/FastAPI microservice that performs mathematical bias audits. |

### Shared Packages

| Package | Purpose |
|---------|---------|
| `@aic/ui` | Shared React components (TrustBadge, AlphaSeal) |
| `@aic/auth` | Shared NextAuth config and auth utilities |
| `@aic/db` | Drizzle ORM schema, RLS, encryption helpers |
| `@aic/types` | Zod schemas and shared TypeScript types |
| `@aic/api-client` | Engine API client with circuit breaker |
| `@aic/reports` | PDF report generation |
| `@aic/events` | Cross-app event system |
| `@aic/legal` | Legal and compliance utilities |
| `@aic/sockets` | WebSocket utilities |
| `@aic/middleware` | Shared Next.js middleware |
| `@aic/notifications` | Alert and notification system |

## 2. The User Journey (Follow this to test)

### Step 1: The Lead (Web — port 3000)
1. Go to `http://localhost:3000`.
2. Take the **Risk Assessment Quiz**.
3. On completion, a `lead` record is created in the database.
4. **Code reference:** `apps/web/app/quiz/page.tsx` → `apps/web/app/api/leads/route.ts`

### Step 2: Internal Review (Internal — port 3002)
1. Go to `http://localhost:3002/login`.
2. View the **Pipeline** — your quiz entry should appear in the CRM section.
3. **Code reference:** `apps/internal/app/api/leads/route.ts`

### Step 3: Client Dashboard (Platform — port 3001)
1. Go to `http://localhost:3001`.
2. This is the "Audit Dashboard." It displays real-time Integrity Scores based on `audit_requirements`.
3. **Code reference:** `apps/platform/lib/auth.ts` (NextAuth v5-beta) and `apps/platform/app/api/stats/route.ts`

### Step 4: Governance (HQ — port 3004)
1. Go to `http://localhost:3004/login`.
2. Only accounts with `is_super_admin = true` can access the `/governance` tab.
3. Manage blog posts, newsletter subscribers, and team access.
4. **Code reference:** `apps/hq/app/api/`

## 3. Data Schema Essentials

- **Organizations** — Core entity. Every user and audit log belongs to one.
- **Users** — Roles: `ADMIN`, `COMPLIANCE_OFFICER`, `AUDITOR`, `VIEWER`.
- **Audit Requirements** — Checklist items an org must complete to get certified.
- **Integrity Score** — Weighted average (0–100) calculated from audit requirements.
  - Human Oversight 35%, Transparency 25%, Usage Context 20%, Infrastructure 20%
- **Audit Logs** — Immutable SHA-256 hash chain + RSA-3072 signatures.
- **Decision Records** — Algorithmic decision audit trail.
- **Correction Requests** — Appeal mechanism tracking.

Source of truth: `apps/platform/db/schema.sql`

## 4. Development Workflow

### Quick Start

```bash
# Install dependencies
npm install

# Start database and infrastructure
docker-compose up -d

# Start all apps (Turborepo)
npm run dev
```

### Individual App Development

```bash
cd apps/web && npm run dev        # :3000
cd apps/platform && npm run dev   # :3001
cd apps/internal && npm run dev   # :3002
cd apps/hq && npm run dev         # :3004
```

### Engine Development

```bash
cd apps/engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Running Tests

```bash
npm test                  # All TypeScript tests (Vitest via Turborepo) — 127 tests
npm run test:engine       # Python tests (pytest) — 141 tests
npm run test:e2e          # End-to-end (Playwright)
npm run test:coverage     # TypeScript with coverage
```

## 5. Authentication

- **Platform & Internal:** NextAuth.js v5-beta with JWT strategy
- **Admin & HQ:** NextAuth.js v4
- **Engine:** API key (`X-API-Key` header) + JWT (RS256) audience `aic-engine`
- **Passwords:** bcryptjs

## 6. Design Language

The platform uses a "Cyber-Luxury" aesthetic:
- **Colors:** Black, Gold (#FFD700), dark grays
- **Font:** IBM Plex Mono
- **Animation:** Framer Motion 12
- **Styling:** Tailwind CSS 4

## 7. Path Aliases

All apps use `@/*` mapping to the app root:

```typescript
import { query } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
```

Shared packages are imported by name:

```typescript
import { TrustBadge } from '@aic/ui';
import { db } from '@aic/db';
import { hasRole } from '@aic/auth';
```

---

*Updated: February 17, 2026*
