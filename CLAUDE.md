# CLAUDE.md - AI Integrity Certification (AIC) Platform

## Project Overview

AIC is a POPIA Section 71 compliant accountability framework for South African AI deployments. It certifies that organizations maintain genuine human oversight over algorithmic decisions using a risk-based three-tier certification model.

**Core Philosophy:** "We do not regulate AI. We certify that humans remain accountable."

## Architecture

This is a **monorepo** using npm workspaces with 4 Next.js applications, 1 Python microservice, and 5 shared packages.

```
aic-platform/
├── apps/
│   ├── web/           # Marketing site (port 3000)
│   ├── platform/      # AIC Pulse SaaS dashboard (port 3001)
│   ├── admin/         # Internal operations panel (port 3002)
│   ├── hq/            # Institutional governance & CMS (port 3004)
│   └── engine/        # Python audit engine microservice (port 8000)
├── packages/
│   ├── ui/            # Shared React components (@aic/ui)
│   ├── auth/          # Shared auth utilities
│   ├── events/        # Event system
│   ├── legal/         # Legal/compliance utilities
│   └── sockets/       # WebSocket utilities
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
- **Auth:** NextAuth.js (v5-beta on platform, v4 on admin/hq)
- **Password Hashing:** bcryptjs

### Audit Engine (apps/engine)
- **Framework:** FastAPI with slowapi rate limiting
- **Server:** Uvicorn
- **Data Processing:** Pandas, SciPy, NumPy
- **NLP:** TextBlob (sentiment analysis)
- **XAI:** SHAP (+ optional LIME)
- **Crypto:** RSA-3072 signing via `cryptography` library

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

# Run all tests
npm test               # TypeScript tests (Vitest)
cd apps/engine && python -m pytest  # Python tests
```

### Engine (Python)
```bash
cd apps/engine
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Testing

### TypeScript (Vitest)
- Config: `vitest.config.ts` at repo root
- Tests: `apps/*/\_\_tests\_\_/**/*.test.ts`
- Run: `npm test`
- 90 tests across web (scoring, report generation) and platform (auth, roles, permissions)

### Python (pytest)
- Config: `apps/engine/pytest.ini`
- Tests: `apps/engine/tests/`
- Run: `cd apps/engine && python -m pytest`
- 141 tests + 6 skipped covering all engine services
- Fixtures in `conftest.py` include authenticated and unauthenticated test clients

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

### Engine Endpoint Pattern
All engine endpoints follow this pattern with slowapi rate limiting:
```python
@router.post("/endpoint")
@limiter.limit("30/minute")
def endpoint_name(body: PydanticModel, request: Request):
    # IMPORTANT: slowapi requires the Starlette Request param to be named `request`
    # Pydantic body params must use a different name (e.g., `body`)
    result = service_function(body.field1, body.field2)
    result["signature"] = signing_service.sign_hash(result["audit_hash"])
    return result
```

## Engine Services

| Service | File | Purpose |
|---------|------|---------|
| Bias Analysis | `bias_analysis.py` | Four-fifths rule, disparate impact, chi-square tests |
| Fairness Metrics | `fairness_metrics.py` | Theil index, Atkinson index, epsilon-differential fairness, statistical parity |
| Explainability | `explainability.py` | SHAP-based feature importance (global + local) |
| XAI Service | `xai_service.py` | LIME explanations (optional dependency) |
| Drift Monitoring | `drift_monitoring.py` | PSI + Jensen-Shannon + KS test via `DriftMonitor` class |
| Hash Chain | `hash_chain.py` | SHA-256 hash chain for audit immutability |
| Chain Verification | `chain_verification.py` | Legacy chain verification (kept for compatibility) |
| Scoring | `scoring.py` | Integrity score calculation |
| Privacy Audit | `privacy_audit.py` | Data privacy compliance checks |
| Labor Audit | `labor_audit.py` | Labor practice auditing |
| Red Team | `red_team.py` | Adversarial robustness testing |
| Evidence Scanner | `evidence_scanner.py` | Document/evidence validation |

## Engine Security

- **API Key Auth:** All non-public endpoints require `X-API-Key` header
- **Public Paths:** `/`, `/health`, `/docs`, `/redoc`, `/openapi.json`
- **Key Management:** `ENGINE_API_KEY` env var; auto-generated in dev mode
- **Signing:** RSA-3072 via `app/core/signing.py` (loads from `AUDIT_SIGNING_KEY` env var)
- **Rate Limiting:** slowapi with per-endpoint limits (typically 30/minute)
- **Request Size:** 10MB max body size via middleware

## Database Schema

Source of truth: `apps/platform/db/schema.sql`
Demo seed data: `apps/platform/db/seed.sql` (DO NOT run in production)

Core tables (30+):

| Table | Purpose |
|-------|---------|
| `organizations` | Certified companies with tier, integrity_score |
| `users` | Platform users with roles |
| `audit_logs` | Immutable trail with SHA-256 hash chain + RSA signatures |
| `assessments` | Self-assessment quiz results |
| `leads` | Lead tracking from marketing site |
| `alpha_applications` | Alpha program applications |
| `audit_requirements` | Certification checklist items |
| `compliance_reports` | Monthly compliance archives |
| `notifications` | Alert system |
| `posts` | CMS content for HQ |
| `incidents` | Incident tracking and management |
| `api_keys` | API key management for organizations |
| `decision_records` | Algorithmic decision audit records |
| `correction_requests` | Appeal/correction tracking |
| `hash_chain_anchors` | Blockchain anchor points for audit chains |

**Conventions:**
- UUID primary keys via `gen_random_uuid()`
- `TIMESTAMP WITH TIME ZONE` for all timestamps
- JSONB for flexible metadata
- Enum types for tiers (`certification_tier`) and statuses

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
1. **Right to Human Agency** - Bias detection via Four-Fifths Rule, intersectional analysis
2. **Right to Explanation** - SHAP/LIME feature importance validation
3. **Right to Empathy** - TextBlob sentiment analysis of rejection communications
4. **Right to Correction** - Appeal mechanism validation
5. **Right to Truth** - AI disclosure compliance checking

## Environment Variables

See `.env.example` for all variables. Key ones:
```
POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB
NEXTAUTH_SECRET          # Generate: openssl rand -base64 32
NEXTAUTH_URL             # Per-app URL (3000/3001/3002/3004)
ENGINE_URL               # Default: http://localhost:8000
ENGINE_API_KEY           # Generate: python -c "import secrets; print(secrets.token_hex(32))"
AUDIT_SIGNING_KEY        # PEM-encoded RSA private key (optional in dev)
AUDIT_VERIFY_KEY         # PEM-encoded RSA public key (optional in dev)
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

## Shared Packages

| Package | Path | Purpose |
|---------|------|---------|
| `@aic/ui` | `packages/ui/` | TrustBadge, AlphaSeal components |
| `@aic/auth` | `packages/auth/` | Shared auth utilities |
| `@aic/events` | `packages/events/` | Event system |
| `@aic/legal` | `packages/legal/` | Legal/compliance utilities |
| `@aic/sockets` | `packages/sockets/` | WebSocket utilities |

Import via: `import { TrustBadge } from '@aic/ui'`

## CI/CD

GitHub Actions workflow (`.github/workflows/platform-ci.yml`):
1. **Test job:** Runs `npm test` (Vitest) on push/PR to main/develop
2. **Build job:** Matrix build of all 4 Next.js apps (depends on test passing)

## Security Considerations

1. **SQL Injection Prevention:** Always use parameterized queries
2. **Authentication:** NextAuth.js with JWT strategy
3. **Authorization:** Role-based middleware checks
4. **Security Headers:** X-Frame-Options, X-Content-Type-Options, etc. set in middleware
5. **Password Storage:** bcryptjs hashing
6. **Audit Integrity:** SHA-256 hash chain with RSA-3072 signatures
7. **Engine Auth:** API key middleware with constant-time comparison
8. **Rate Limiting:** slowapi on all engine endpoints
9. **Request Size Limits:** 10MB max on engine
10. **CORS:** Restricted to known origins

## Common Tasks

### Adding a new API route (Next.js)
1. Create `app/api/[feature]/route.ts`
2. Import `query` from `@/lib/db`
3. Export async `GET`, `POST`, `PUT`, or `DELETE` functions
4. Use parameterized queries and proper error handling

### Adding a new engine endpoint
1. Add Pydantic request model in `analysis.py`
2. Add service function in appropriate `services/*.py` file
3. Add route with `@router.post()` and `@limiter.limit()` decorators
4. Name Starlette Request param `request` (required by slowapi)
5. Sign result hash with `signing_service.sign_hash()`

### Adding a new page
1. Create `app/[route]/page.tsx`
2. Use `'use client'` directive if interactive
3. Fetch data via API routes or server components

### Adding database tables
1. Add DDL to `apps/platform/db/schema.sql`
2. Run the SQL against your PostgreSQL instance
3. Create corresponding TypeScript types

## Code Style Guidelines

- Use TypeScript strict mode
- Prefer async/await over promises
- Use descriptive variable names
- Keep components focused and single-purpose
- Co-locate related code (components with their routes)
- Use Tailwind CSS utility classes for styling
- Prefer server components unless interactivity is needed
- Cast numpy types to native Python before returning from engine endpoints
