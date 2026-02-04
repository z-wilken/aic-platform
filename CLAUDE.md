# CLAUDE.md - AI Integrity Certification (AIC) Platform

## Project Overview

AIC is a POPIA Section 71 compliant accountability framework for South African AI deployments. It certifies that organizations maintain genuine human oversight over algorithmic decisions using a risk-based three-tier certification model.

**Core Philosophy:** "We do not regulate AI. We certify that humans remain accountable."

## Architecture

This is a **monorepo** using npm workspaces with 4 Next.js applications, 1 Python microservice, and 1 shared UI package.

```
aic-platform/
├── apps/
│   ├── web/           # Marketing site (port 3000)
│   ├── platform/      # AIC Pulse SaaS dashboard (port 3001)
│   ├── admin/         # Internal operations panel (port 3002)
│   ├── hq/            # Institutional governance & CMS (port 3004)
│   └── engine/        # Python audit engine microservice (port 8000)
├── packages/
│   └── ui/            # Shared React components (@aic/ui)
├── docs/              # Strategic & business documentation
└── docker-compose.yml # PostgreSQL + PgAdmin
```

## Tech Stack

### Frontend (apps/web, platform, admin, hq)
- **Framework:** Next.js 16 (App Router)
- **Runtime:** React 19
- **Styling:** Tailwind CSS 4 (PostCSS)
- **Animations:** Framer Motion 12
- **Types:** TypeScript 5.9 (strict mode)
- **Linting:** ESLint 9 with Next.js config

### Backend
- **API Routes:** Next.js Route Handlers
- **Database:** PostgreSQL 15 (via `pg` driver)
- **Auth:** NextAuth.js v4/v5-beta
- **Password Hashing:** bcryptjs

### Audit Engine (apps/engine)
- **Framework:** FastAPI (async Python)
- **Server:** Uvicorn
- **Data Processing:** Pandas, SciPy, NumPy
- **NLP:** TextBlob (sentiment analysis)

## Development Commands

```bash
# Start all apps concurrently
npm run dev

# Start individual apps
npm run dev:web        # Marketing site on :3000
npm run dev:platform   # Platform dashboard on :3001
npm run dev:admin      # Admin panel on :3002
npm run dev:hq         # HQ governance on :3004

# Start database
docker-compose up -d

# Build all apps
npm run build
```

### Engine (Python)
```bash
cd apps/engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Key Conventions

### File Organization
- **App Router:** All routes in `app/` directory using folder-based routing
- **API Routes:** Located at `app/api/[feature]/route.ts`
- **Components:** In `app/components/` or co-located with routes
- **Utilities:** In `lib/` directory (db.ts, auth.ts, etc.)

### TypeScript Patterns
```typescript
// API route pattern (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const result = await query('SELECT * FROM table WHERE id = $1', [id]);
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Client Components
```typescript
'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Component() {
  // Use 'use client' directive for interactive components
}
```

### Database Access
```typescript
import { query } from '@/lib/db';

// Always use parameterized queries to prevent SQL injection
const result = await query(
  'SELECT * FROM organizations WHERE id = $1',
  [orgId]
);
```

### Path Aliases
All apps use `@/*` path alias mapping to the app root:
```typescript
import { query } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
```

## Database Schema

Core tables in `apps/platform/db/schema.sql`:

| Table | Purpose |
|-------|---------|
| `organizations` | Certified companies with tier, integrity_score |
| `users` | Platform users with roles (ADMIN, COMPLIANCE_OFFICER, AUDITOR, VIEWER) |
| `audit_logs` | Immutable audit trail with SHA-256 hash |
| `assessments` | Self-assessment quiz results |
| `leads` | Lead tracking from marketing site |
| `alpha_applications` | Alpha program applications |
| `audit_requirements` | Certification checklist items |
| `compliance_reports` | Monthly compliance archives |
| `notifications` | Alert system |
| `posts` | CMS content for HQ |

**Conventions:**
- UUID primary keys via `gen_random_uuid()`
- `TIMESTAMP WITH TIME ZONE` for all timestamps
- JSONB for flexible metadata
- Enum types for tiers and statuses

## Authentication & Authorization

### Role Hierarchy (lowest to highest)
1. `VIEWER` - Read-only dashboard access
2. `AUDITOR` - Can view audit logs and verify decisions
3. `COMPLIANCE_OFFICER` - Can write audit logs, manage incidents
4. `ADMIN` - Full access including settings and user management

### Middleware Protection
Protected routes defined in `middleware.ts`:
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

## Three-Tier Certification Model

| Tier | Risk Level | Human Oversight | Examples |
|------|------------|-----------------|----------|
| TIER_1 | Critical | 100% human approval | Cancer diagnosis, parole decisions |
| TIER_2 | Elevated | Human supervision with override | Credit decisions, resume screening |
| TIER_3 | Standard | Periodic monitoring | Product recommendations, spam filtering |

## The 5 Algorithmic Rights

The audit engine (`apps/engine`) enforces these rights:
1. **Right to Human Agency** - Bias detection via Four-Fifths Rule
2. **Right to Explanation** - XAI validation (local/global feature importance)
3. **Right to Empathy** - Sentiment analysis of rejection communications
4. **Right to Correction** - Appeal mechanism validation
5. **Right to Truth** - AI disclosure compliance checking

## API Patterns

### REST Conventions
- `GET` for reading data
- `POST` for creating resources
- `PUT` for updates
- Status codes: 200 (success), 400 (bad request), 404 (not found), 500 (server error)

### Response Format
```typescript
// Success
return NextResponse.json({ data: result, timestamp: new Date().toISOString() });

// Error
return NextResponse.json({ error: 'Message' }, { status: 400 });
```

### Engine API (FastAPI)
Base URL: `http://localhost:8000/api/v1`
- `POST /analysis` - Run bias detection, explainability, empathy scoring

## Environment Variables

Each app requires a `.env` file with:
```
POSTGRES_USER=aic_admin
POSTGRES_PASSWORD=aic_password_secure
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=aic_platform
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001
```

## Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Web (Marketing) | 3000 | Lead generation, self-assessment |
| Platform (Pulse) | 3001 | Client SaaS dashboard |
| Admin | 3002 | Internal operations |
| HQ | 3004 | Governance & CMS |
| Engine | 8000 | Python audit microservice |
| PostgreSQL | 5432 | Database |
| PgAdmin | 5050 | Database admin UI |

## Shared UI Package

Located at `packages/ui/`, exports:
- `TrustBadge` - Certification status widget
- `AlphaSeal` - Alpha program badge

Import via: `import { TrustBadge } from '@aic/ui'`

## Documentation

Key docs in `/docs`:
- `vision/FOUNDERS_VISION.md` - 30-year roadmap
- `product/PRD.md` - Product requirements
- `strategy/STRATEGIC_ROADMAP.md` - Execution plan
- `business/PILOT_PROGRAM.md` - Alpha program details
- `framework/METHODOLOGY.md` - Audit methodology

## Testing

No test infrastructure is currently configured. When adding tests:
- Use Jest + React Testing Library for Next.js apps
- Use pytest for the Python engine

## Security Considerations

1. **SQL Injection Prevention:** Always use parameterized queries
2. **Authentication:** NextAuth.js with JWT strategy
3. **Authorization:** Role-based middleware checks
4. **Security Headers:** X-Frame-Options, X-Content-Type-Options, etc. set in middleware
5. **Password Storage:** bcryptjs hashing
6. **Audit Integrity:** SHA-256 hashes for immutable logs

## Common Tasks

### Adding a new API route
1. Create `app/api/[feature]/route.ts`
2. Import `query` from `@/lib/db`
3. Export async `GET`, `POST`, `PUT`, or `DELETE` functions
4. Use parameterized queries and proper error handling

### Adding a new page
1. Create `app/[route]/page.tsx`
2. Use `'use client'` directive if interactive
3. Fetch data via API routes or server components

### Adding database tables
1. Add DDL to `apps/platform/db/schema.sql`
2. Run the SQL against your PostgreSQL instance
3. Create corresponding TypeScript types

### Working with the shared UI package
1. Add components to `packages/ui/src/`
2. Export from `packages/ui/src/index.ts`
3. Import in apps via `@aic/ui`

## Code Style Guidelines

- Use TypeScript strict mode
- Prefer async/await over promises
- Use descriptive variable names
- Keep components focused and single-purpose
- Co-locate related code (components with their routes)
- Use Tailwind CSS utility classes for styling
- Prefer server components unless interactivity is needed
