# AIC Engineering Roadmap

**Technical Debt, Security Hardening & Production Readiness**

*February 2026 | CONFIDENTIAL*

---

## Executive Summary

This document outlines the engineering work required to take the AIC platform from MVP/demo state to production-ready. It addresses technical debt, security vulnerabilities, missing infrastructure, and architectural improvements needed before handling real compliance data.

**Current State:** Credible MVP for demos and alpha recruitment
**Target State:** Production-ready platform suitable for handling sensitive compliance data

---

## Critical Issues (Must Fix Before Production)

### 1. No Automated Testing

**Current State:** Zero test files across all applications
**Risk:** Cannot verify changes don't break existing functionality; compliance platform without tests is liability

**Action Items:**
```
Priority: CRITICAL
Timeline: Weeks 1-4

1. Set up Jest + React Testing Library for Next.js apps
   - apps/web: Smoke tests for all pages, form submissions
   - apps/platform: Dashboard data rendering, auth flows
   - apps/admin: Certification workflow

2. Set up pytest for apps/engine
   - Bias analysis functions (disparate impact, equalized odds)
   - API endpoint responses
   - Edge cases in statistical calculations

3. Add CI/CD pipeline (GitHub Actions)
   - Run tests on every PR
   - Block merges if tests fail
   - Code coverage reporting (target: 70% minimum)

4. Integration tests
   - API route → Database → Response validation
   - Auth flow end-to-end
```

**Files to Create:**
- `apps/platform/__tests__/` - Jest test files
- `apps/engine/tests/` - pytest files (directory exists but empty)
- `.github/workflows/test.yml` - CI pipeline

---

### 2. Hardcoded Secrets & Insecure Defaults

**Current State:** Multiple hardcoded secrets throughout codebase
**Risk:** Security breach if code is exposed; credentials in version control

**Locations Found:**
```typescript
// apps/platform/lib/db.ts
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'aic_admin',
  password: process.env.POSTGRES_PASSWORD || 'aic_password_secure',  // HARDCODED
  ...
});

// apps/platform/lib/auth-options.ts
secret: process.env.NEXTAUTH_SECRET || 'aic-secret-key-change-in-production',  // HARDCODED

// Similar patterns in apps/admin, apps/hq
```

**Action Items:**
```
Priority: CRITICAL
Timeline: Week 1

1. Remove ALL hardcoded fallback values
   - Database credentials
   - NextAuth secrets
   - API keys

2. Create proper environment configuration
   - .env.example with placeholder values
   - .env.local for development (gitignored)
   - Production secrets via secure secret manager

3. Add startup validation
   - App should FAIL to start if required env vars missing
   - No silent fallbacks to insecure defaults

4. Implement secrets management
   - Use Vercel Environment Variables (production)
   - Or HashiCorp Vault / AWS Secrets Manager for enterprise
```

**Code Change Example:**
```typescript
// BEFORE (insecure)
const pool = new Pool({
  password: process.env.POSTGRES_PASSWORD || 'aic_password_secure',
});

// AFTER (secure)
if (!process.env.POSTGRES_PASSWORD) {
  throw new Error('POSTGRES_PASSWORD environment variable is required');
}
const pool = new Pool({
  password: process.env.POSTGRES_PASSWORD,
});
```

---

### 3. Hardcoded Fallback Data Masks Failures

**Current State:** API routes return mock/demo data when database fails
**Risk:** Production errors silently return fake data instead of failing visibly

**Example (apps/platform/app/api/dashboard/route.ts):**
```typescript
} catch (error) {
  console.error('Error:', error);
  // Returns hardcoded demo data on ANY error
  return NextResponse.json({
    integrity_score: 78,
    tier: 'TIER_2',
    // ... fake data
  });
}
```

**Action Items:**
```
Priority: HIGH
Timeline: Weeks 2-3

1. Remove all fallback demo data from production code
   - API routes should return proper error responses
   - Frontend should handle error states gracefully

2. Create separate demo/seed data mechanism
   - Seed script for development database
   - Demo mode toggle (env var) for sales demos only
   - Clear visual indicator when in demo mode

3. Implement proper error handling
   - Structured error responses
   - Error tracking (Sentry or similar)
   - Alerting for critical failures
```

---

### 4. Audit Engine Not Integrated

**Current State:** Python FastAPI engine exists but not called from Next.js apps
**Risk:** Core value proposition (bias detection) not actually functional

**Action Items:**
```
Priority: HIGH
Timeline: Weeks 3-4

1. Create integration layer
   - apps/platform/lib/engine-client.ts
   - HTTP client to call engine API
   - Type definitions for request/response

2. Wire up to platform workflows
   - Certification assessment triggers engine analysis
   - Results stored in database
   - Dashboard displays engine output

3. Add health checks
   - Platform checks engine availability on startup
   - Graceful degradation if engine unavailable
   - Admin dashboard shows engine status

4. Document API contract
   - OpenAPI spec for engine
   - TypeScript types generated from spec
```

---

## High Priority Improvements

### 5. Database Migrations

**Current State:** Schema in single SQL file; changes require manual execution
**Risk:** Schema drift between environments; no rollback capability

**Action Items:**
```
Priority: HIGH
Timeline: Week 2

1. Set up migration tool
   - Option A: Drizzle ORM (TypeScript native)
   - Option B: Prisma (popular, good DX)
   - Option C: node-pg-migrate (lightweight)

2. Convert schema.sql to migrations
   - One migration per logical change
   - Timestamped, ordered execution

3. Add migration commands
   - npm run db:migrate (apply pending)
   - npm run db:rollback (undo last)
   - npm run db:status (show current state)
```

---

### 6. TypeScript Type Safety

**Current State:** Heavy use of `any` types; runtime errors possible
**Risk:** Type mismatches cause runtime failures; reduced developer confidence

**Action Items:**
```
Priority: MEDIUM
Timeline: Ongoing

1. Enable stricter TypeScript config
   - "noImplicitAny": true
   - "strictNullChecks": true (already enabled)

2. Create shared type definitions
   - packages/types/ - Shared TypeScript types
   - Database row types
   - API request/response types

3. Remove explicit `any` usage
   - Replace with proper types
   - Use `unknown` where type is truly unknown
```

---

### 7. API Input Validation

**Current State:** Minimal input validation on API routes
**Risk:** SQL injection (parameterized queries help), data corruption, security vulnerabilities

**Action Items:**
```
Priority: MEDIUM
Timeline: Weeks 3-4

1. Add Zod validation to all API routes
   - Request body validation
   - Query parameter validation
   - Type-safe parsing

2. Standardize error responses
   - Consistent error format
   - Validation error details
   - HTTP status codes

Example:
```typescript
import { z } from 'zod';

const CreateIncidentSchema = z.object({
  title: z.string().min(1).max(255),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  description: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = CreateIncidentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  // ... proceed with validated data
}
```
```

---

### 8. Authentication Hardening

**Current State:** Basic NextAuth setup; some routes may be unprotected
**Risk:** Unauthorized access to sensitive compliance data

**Action Items:**
```
Priority: HIGH
Timeline: Weeks 2-3

1. Audit all API routes for auth requirements
   - Document which routes need auth
   - Add middleware protection where missing

2. Implement rate limiting
   - Prevent brute force attacks
   - Rate limit login attempts

3. Add MFA support (for Tier 1 orgs)
   - TOTP (Google Authenticator)
   - Required for admin roles

4. Session management
   - Secure session expiry
   - Force logout on password change
   - Session activity logging
```

---

## Medium Priority Improvements

### 9. Monitoring & Observability

**Current State:** Console.log only; no production monitoring

**Action Items:**
```
Priority: MEDIUM
Timeline: Weeks 4-6

1. Error tracking
   - Sentry integration
   - Error grouping and alerting

2. Application Performance Monitoring
   - Vercel Analytics (if deployed there)
   - Or custom metrics (Datadog, New Relic)

3. Database monitoring
   - Query performance tracking
   - Connection pool health
   - Slow query logging

4. Uptime monitoring
   - External health checks
   - Alerting on downtime
```

---

### 10. Documentation

**Current State:** CLAUDE.md provides good overview; missing API docs, deployment guide

**Action Items:**
```
Priority: MEDIUM
Timeline: Weeks 5-6

1. API Documentation
   - OpenAPI/Swagger spec for all routes
   - Auto-generated from code if possible

2. Deployment Guide
   - Step-by-step production deployment
   - Environment variable reference
   - Infrastructure requirements

3. Developer Onboarding
   - Local development setup
   - Architecture decision records
   - Contribution guidelines
```

---

## Recommended Implementation Timeline

### Week 1-2: Security Foundation
- [ ] Remove all hardcoded secrets
- [ ] Create .env.example files
- [ ] Add startup validation for required env vars
- [ ] Set up Jest/pytest infrastructure
- [ ] Write first 20 critical tests

### Week 3-4: Core Reliability
- [ ] Remove fallback demo data from API routes
- [ ] Implement proper error handling
- [ ] Set up database migrations
- [ ] Integrate audit engine with platform
- [ ] Add Zod validation to API routes

### Week 5-6: Production Readiness
- [ ] Add Sentry error tracking
- [ ] Implement rate limiting
- [ ] Create deployment documentation
- [ ] API documentation (OpenAPI)
- [ ] Load testing critical paths

### Week 7-8: Polish
- [ ] Reach 70% test coverage
- [ ] Performance optimization
- [ ] Security audit
- [ ] Accessibility audit (WCAG 2.1)

---

## Definition of "Production Ready"

The platform is production-ready when:

1. **Security**
   - [ ] No hardcoded secrets in codebase
   - [ ] All API routes properly authenticated
   - [ ] Input validation on all endpoints
   - [ ] Rate limiting implemented
   - [ ] Security headers configured

2. **Reliability**
   - [ ] 70%+ test coverage
   - [ ] CI/CD pipeline with test gates
   - [ ] Error tracking and alerting
   - [ ] Database migrations versioned
   - [ ] No demo data in production code

3. **Integration**
   - [ ] Audit engine connected and functional
   - [ ] Email notifications working
   - [ ] All API routes returning real data

4. **Operations**
   - [ ] Deployment documentation complete
   - [ ] Monitoring dashboards set up
   - [ ] Backup and recovery tested
   - [ ] On-call runbook created

---

## Effort Estimates

| Category | Estimated Hours | Priority |
|----------|-----------------|----------|
| Testing Infrastructure | 40-60 | Critical |
| Security Hardening | 20-30 | Critical |
| Error Handling | 15-20 | High |
| Engine Integration | 20-30 | High |
| Database Migrations | 10-15 | High |
| Input Validation | 15-20 | Medium |
| Monitoring | 15-20 | Medium |
| Documentation | 10-15 | Medium |
| **Total** | **145-210 hours** | — |

At full-time pace: **4-6 weeks**
At part-time (20 hrs/week): **8-10 weeks**

---

## Recommended Tooling

| Purpose | Recommended Tool | Alternative |
|---------|-----------------|-------------|
| Testing (JS) | Jest + RTL | Vitest |
| Testing (Python) | pytest | unittest |
| CI/CD | GitHub Actions | GitLab CI |
| Error Tracking | Sentry | Rollbar |
| Database Migrations | Drizzle | Prisma |
| API Validation | Zod | Yup |
| API Docs | OpenAPI/Swagger | - |
| Secrets Management | Vercel Env | Vault |

---

*This roadmap should be reviewed and updated weekly as work progresses.*

*AI Integrity Certification | Engineering Roadmap | February 2026 | CONFIDENTIAL*
