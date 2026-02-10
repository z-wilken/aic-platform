# AIC Platform - Professional & Technical Review

**Review Date:** February 7, 2026
**Reviewer:** Automated Code Review (Claude)
**Scope:** Full codebase review — architecture, logic, security, workflow, engine

---

## Executive Assessment

The AIC platform is an ambitious and well-conceived project that addresses a genuine regulatory gap in South African AI governance. The vision is clear, the documentation is thorough, and the three-tier certification framework is intellectually sound. However, the platform is currently at **prototype stage** — not production-ready. The gap between the vision documents and the working code is significant and must be closed before any Alpha participant touches this system.

**Overall Maturity: ~35-40% production-ready**

---

## 1. What Works Well

### 1.1 Strong Conceptual Foundation
- The Three-Tier framework (Human-Approved / Human-Supervised / Automated-Permissible) is well-designed and maps cleanly to real regulatory risk levels.
- The 5 Algorithmic Rights are a distinctive differentiator — no other framework bundles empathy and truth as auditable rights.
- POPIA Section 71 alignment gives this genuine legal utility, not just thought-leadership positioning.

### 1.2 Monorepo Architecture
- Clean separation of concerns across 5 apps with a shared UI package.
- Docker Compose orchestration is correctly structured for local development.
- Each app has a clear purpose: marketing (web), client operations (platform), internal ops (admin), governance (hq), audit compute (engine).

### 1.3 Database Schema
- Well-normalized PostgreSQL schema with proper UUIDs, timestamps, and JSONB flexibility.
- Immutable audit_logs table with hash column is the right architectural choice.
- Role-based access control with a permissions JSONB field provides future flexibility.

### 1.4 Engine Core Logic
- The Four-Fifths Rule implementation in `bias_analysis.py` is mathematically correct.
- Equalized Odds (TPR/FPR parity) calculation is solid.
- Intersectional analysis with configurable minimum group size is a professional touch.
- Chi-square statistical significance testing with Cramér's V effect size is the right approach.

---

## 2. Critical Issues (Must Fix Before Alpha)

### 2.1 BROKEN: Engine Dockerfile CMD Path
**File:** `apps/engine/Dockerfile:11`
**Issue:** The CMD references `main:app` but the actual module path is `app.main:app`.
**Impact:** The Docker container will fail to start.
**Fix:** Change `CMD ["uvicorn", "main:app", ...]` to `CMD ["uvicorn", "app.main:app", ...]`

### 2.2 BROKEN: Missing Imports in analysis.py
**File:** `apps/engine/app/api/v1/endpoints/analysis.py:23-37`
**Issue:** The endpoint file uses `List`, `Dict`, `Any` in Pydantic model definitions (`PrivacyRequest`, `LaborRequest`, `RedTeamRequest`) but never imports them from `typing`.
**Impact:** The engine will crash on import — every endpoint will be unreachable.
**Fix:** Add `from typing import List, Dict, Any` at the top.

### 2.3 BROKEN: Duplicate `api_keys` Table in Schema
**File:** `apps/platform/db/schema.sql`
**Issue:** The `api_keys` table is defined twice with slightly different column definitions. The SQL will fail on second `CREATE TABLE`.
**Impact:** Database schema cannot be applied cleanly.
**Fix:** Merge into a single table definition, keeping the more complete version (the second one with `scopes` and `expires_at`).

### 2.4 BROKEN: Schema Ordering - `posts` References `users` Before Creation
**File:** `apps/platform/db/schema.sql`
**Issue:** The `posts` table has `author_id UUID REFERENCES users(id)` but the `users` table is defined AFTER the `posts` table in the file.
**Impact:** Schema creation will fail with a foreign key reference error.
**Fix:** Move the `users` table definition before `posts`.

### 2.5 SECURITY: Seed Password Hash is Invalid
**File:** `apps/platform/db/schema.sql` (seed data)
**Issue:** The bcrypt hash `$2a$10$XQxBtqXKPYJ.5Q5Q5Q5Q5O5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5` is not a valid bcrypt hash — it won't match any password. This is a placeholder that was never replaced.
**Impact:** No one can log in to the demo system.
**Fix:** Generate a real bcrypt hash: `npx bcryptjs 'demo123'` and replace the placeholder.

### 2.6 SECURITY: All Python Dependencies Unpinned
**File:** `apps/engine/requirements.txt`
**Issue:** All 5 dependencies are unpinned (`fastapi` instead of `fastapi==0.115.0`). Missing `numpy` entirely despite being imported.
**Impact:** Builds are non-reproducible. A breaking change in any dependency will silently break the engine. Supply chain attack risk.
**Fix:** Pin all dependencies with exact versions. Add `numpy` and `pydantic`.

### 2.7 SECURITY: CORS Allows All Methods and Headers
**File:** `apps/engine/app/main.py:13-18`
**Issue:** `allow_methods=["*"]` and `allow_headers=["*"]` is overly permissive.
**Impact:** Any origin on the allow list can make any type of request with any headers.
**Fix:** Restrict to `["GET", "POST", "OPTIONS"]` and specific required headers.

### 2.8 LOGIC: `comprehensive_audit` Returns Hardcoded Scores
**File:** `apps/engine/app/services/bias_analysis.py:528-573`
**Issue:** The `comprehensive_audit` function is documented as a "full system audit" but returns hardcoded placeholder scores (`human_agency: 75, explanation: 60`, etc.) regardless of input.
**Impact:** Any organization that runs a "comprehensive audit" will get the same score. This is functionally useless and could create legal liability if presented as a real audit result.
**Fix:** Either connect this to actual audit functions or clearly mark it as a stub/demo endpoint.

### 2.9 LOGIC: `assess_organization` Ignores Its Own Weights
**File:** `apps/engine/app/services/bias_analysis.py:575-611`
**Issue:** The function defines category weights (`USAGE: 0.20, OVERSIGHT: 0.35`, etc.) but then calculates a simple unweighted average: `total_score / max_possible`. The weights variable is entirely unused.
**Impact:** The integrity score calculation does not reflect the stated methodology. Organizations with weak oversight (the most important category at 35% weight) will score the same as organizations with weak infrastructure (20% weight).
**Fix:** Implement proper weighted scoring using the defined weights.

### 2.10 LOGIC: Tier Numbering is Inverted
**Issue:** Throughout the codebase, TIER_1 means "highest risk / most oversight required" but in common certification parlance (ISO, etc.), Tier 1 often implies the highest/best level. This is counter-intuitive and will cause confusion.
**Impact:** Client confusion, miscommunication in sales conversations.
**Recommendation:** This is a naming decision, not a bug. But consider adding prominent documentation explaining the convention, or adopting "Level" terminology (Level 1 = Critical, Level 3 = Standard).

---

## 3. Architecture & Design Issues

### 3.1 Engine Has No Database Connection
The Python engine operates entirely in-memory. Every analysis request receives data inline, processes it, and returns a result. There is no persistence layer, no way to store audit results, and no way to build a hash chain.

**Recommendation:** Add a PostgreSQL connection to the engine (it already runs alongside the database in Docker Compose). Store audit results with linked hashes.

### 3.2 No Async Operations in Engine
The FastAPI application uses synchronous endpoint handlers (`def` instead of `async def`). Pandas operations are CPU-bound, so this is technically acceptable, but it means the engine cannot handle concurrent requests well.

**Recommendation:** For I/O-bound operations (future database calls, external API calls), use `async def`. For CPU-bound analysis, consider running heavy computations in a thread pool using `asyncio.to_thread()`.

### 3.3 Platform SQL Queries Are Raw Strings
**File:** `apps/platform/lib/db.ts`
All database queries across the platform app are raw SQL strings with parameter binding. While the parameterized queries prevent SQL injection, there's no schema validation, no migration system, and no type safety.

**Recommendation:** Consider adopting Drizzle ORM or at minimum add a migration tool (like `node-pg-migrate`). The current approach works but will become error-prone as the schema grows.

### 3.4 No API Versioning Strategy
The engine uses `/api/v1/` prefixing, which is good. But the Next.js apps use `/api/` without versioning. When you need to make breaking API changes for the platform, admin, or HQ apps, you'll have no migration path.

**Recommendation:** Add `/api/v1/` prefixing to Next.js API routes from the start.

### 3.5 No Health Check Dependencies
The engine health check (`GET /`) returns a static success response. It doesn't verify database connectivity, memory availability, or dependency health.

**Recommendation:** Add a `/health` endpoint that checks all downstream dependencies.

### 3.6 SQL Query Logging Leaks Data
**File:** `apps/platform/lib/db.ts:8`
The database query logger outputs the full SQL text: `console.log('executed query', { text, duration, rows: res.rowCount })`. This will log sensitive queries containing user emails, password hashes, etc.

**Recommendation:** Log query duration and row count only, never the query text in production.

---

## 4. Security Assessment

| Area | Rating | Notes |
|------|--------|-------|
| Authentication | Good | NextAuth v5 + bcrypt + JWT is solid |
| Authorization | Fair | RBAC exists but middleware only covers top-level routes |
| Input Validation | Fair | Pydantic on engine, but Next.js API routes lack consistent validation |
| Data Protection | Poor | No PII redaction, query logging leaks data, no encryption at rest |
| Rate Limiting | Missing | No rate limiting on any service |
| Container Security | Poor | Running as root, Python 3.9 is outdated, no security scanning |
| Secret Management | Fair | Environment variables (acceptable for now, not for production) |
| CORS | Poor | Overly permissive on engine |

### Key Security Recommendations
1. Add rate limiting middleware to all services (express-rate-limit for Next.js, slowapi for FastAPI)
2. Upgrade to Python 3.12 and add a non-root USER directive in Dockerfile
3. Never log SQL query text in production
4. Add request size limits (body-parser limits for Next.js, Starlette request size for FastAPI)
5. Implement proper secret management before production (HashiCorp Vault, AWS Secrets Manager, etc.)

---

## 5. Testing Assessment

**Current test coverage: 0%**

There are no tests anywhere in the codebase. The `apps/engine/tests/` directory exists but contains only an empty `__init__.py`. The Next.js apps have Vitest configured but no test files.

This is the single highest-risk gap in the project. For a platform that certifies other organizations' AI compliance, having zero tests on your own audit calculations is a credibility problem.

### What Needs Tests (Priority Order)
1. **Bias calculations** — known-answer tests for Four-Fifths Rule, equalized odds, intersectional analysis
2. **Integrity score calculation** — verify weighted scoring, tier assignment, penalty system
3. **API endpoint contracts** — request validation, error handling, response shapes
4. **Authentication flows** — login, session management, role enforcement
5. **Hash generation** — verify deterministic hashing, collision resistance

---

## 6. Documentation Quality

The documentation is extensive and well-written. The business case documents are professional-grade. However:

1. **ENGINE_REQUIREMENTS.md** is accurate and honest in its self-assessment — the 35% readiness score is fair.
2. **SETUP_INSTRUCTIONS.md** needs updating to reflect the actual environment variable requirements and the broken schema ordering.
3. Missing: **API documentation** — no OpenAPI/Swagger docs are generated or hosted despite FastAPI's built-in support.
4. Missing: **Deployment guide** — no production deployment documentation exists.

---

## 7. Workflow Environment Review

### What's Built
- Local development with `npm run dev` (concurrent Next.js servers)
- Docker Compose for full-stack deployment
- Multi-stage Dockerfile for optimized Next.js builds
- PostgreSQL with seed data for demo scenarios

### What's Missing
- **No CI/CD pipeline** — no GitHub Actions, no automated testing, no deployment automation
- **No database migrations** — schema changes require manual SQL execution
- **No environment management** — no `.env.example`, no environment validation
- **No monitoring/observability** — no structured logging, no metrics, no alerting
- **No backup strategy** — PostgreSQL data volume with no backup configuration

---

## 8. Recommended Priority Actions

### Immediate (Before Alpha Program)
1. Fix the 5 broken items (Dockerfile, imports, schema ordering, duplicate table, seed hash)
2. Pin all Python dependencies with exact versions
3. Add unit tests for all bias calculation functions
4. Connect the engine to PostgreSQL for audit result persistence
5. Implement the hash chain for audit trail immutability
6. Add rate limiting to all services

### Short-Term (During Alpha)
7. Add CI/CD pipeline with automated testing
8. Implement database migration tooling
9. Add Statistical Parity Difference and drift monitoring to engine
10. Build proper health check endpoints
11. Add structured logging (replace console.log)
12. Create `.env.example` files for all apps

### Medium-Term (Post-Alpha)
13. Integrate SHAP/LIME for automated explanations
14. Add Prometheus metrics and Grafana dashboards
15. Implement proper secret management
16. Add load testing
17. Upgrade Python to 3.12
18. Add container security scanning

---

## 9. Honest Bottom Line

The vision is strong. The business case is compelling. The technical foundation is reasonable for an early-stage project. But there is a significant gap between the polish of the documentation and the maturity of the code.

**The biggest risks are:**
1. **Zero test coverage** on a platform that certifies others' compliance — this is a credibility issue
2. **Hardcoded placeholder data** in the comprehensive audit endpoint — if anyone calls this in Alpha, it returns fake scores
3. **Multiple broken code paths** that would prevent the Docker stack from running
4. **No audit trail immutability** — the hash chain described in documentation doesn't exist in code

The engine requirements document you wrote is honest and accurate. The priorities listed there are correct. The path forward is to close the gap between what the documentation promises and what the code delivers.

---

*This review is based on a complete reading of all source files, configuration files, and documentation in the repository as of February 7, 2026.*
