# Roadmap: Foundation Stabilization

Version: 1.0.0
Status: High Priority Directive
Objective: Transition AIC Pulse from a fragile prototype to a resilient, type-safe, and secure production system.

## 1. Executive Summary
The "A+ MVP / C- Production" assessment is accurate. While we have achieved functional parity with the PRD, the implementation is procedural and high-risk. This roadmap prioritizes Compile-time Safety over Runtime Hope. By implementing a type-safe ORM, centralized security middleware, and a shared component library, we eliminate entire classes of bugs (SQL injection, data leaks, UI drift) before they reach production.

## 2. Current State vs. Desired State

| Dimension | Current State (Fragile) | Desired State (Resilient) |
| :--- | :--- | :--- |
| Data Access | Raw SQL strings (pg) | Drizzle ORM (Type-safe) |
| Multi-tenancy | Local per-route WHERE clauses | Global Middleware enforcement |
| Code Sharing | Duplicated types/interfaces | Shared @aic/types package |
| UI Structure | "God Components" (DashboardShell) | Atomic, testable UI units |
| Security | Manual parameterized queries | Schema-level validation & ORM |
| CI/CD | Manual verification | Automated "Green-to-Merge" gate |

## 3. Implementation Phases

### Phase 1: Immediate Stability (Short-term, 1–2 Weeks)
Focus: Security, Data Integrity, and Monorepo Hygiene.
1. Drizzle ORM Migration: Eliminate raw SQL and establish a single source of truth for the schema.
2. Global Tenant Isolation: Move org_id checks to Next.js Middleware.
3. Shared Types Package: Centralize all DB and API models.
4. CI/CD Baseline: GitHub Actions for linting and build validation.

### Phase 2: Architectural Hardening (Medium-term)
Focus: UI Consistency and Component Decomposition.
1. Shadcn Component Library: Build @aic/ui to stop UI drifting.
2. Dashboard Refactor: Decompose DashboardShell into modular units.
3. Unified Error Handling: Implement granular error codes and global boundaries.
4. API Versioning: Formalize the contract between Platform and Engine.

### Phase 3: Production Readiness (Long-term)
Focus: Scaling and Reliability.
1. Testing Enforcement: 80% coverage for business logic (Vitest + Playwright).
2. Production Docker: Hardened, non-root Docker configurations.
3. Monitoring: Sentry/OpenTelemetry integration.

---

## 4. Step-by-Step Execution Plan

### Phase 1: Infrastructure & Data

| Step | Task | Owner | Success Criteria | Effort |
| :--- | :--- | :--- | :--- | :--- |
| 1.1 | Setup `@aic/types` | Architect | No duplicate interfaces in apps/ | 1 Day |
| 1.2 | Install & Config Drizzle | Backend | Successful connection & schema introspection | 2 Days |
| 1.3 | Middleware Tenant Check | Backend | API 401s if org_id is missing/mismatched | 1 Day |
| 1.4 | GitHub Actions Setup | DevOps | PRs cannot merge if npm run build fails | 1 Day |

### Phase 2: Refactoring & Quality

| Step | Task | Owner | Success Criteria | Effort |
| :--- | :--- | :--- | :--- | :--- |
| 2.1 | Setup `@aic/ui` (Shadcn) | Frontend | Shared library with Button, Input, Modal | 2 Days |
| 2.2 | Decompose `DashboardShell` | Frontend | Main file < 150 lines; logic in hooks | 2 Days |
| 2.3 | Port Core Routes to Drizzle | Backend | Dashboard/Stats routes use zero raw SQL | 3 Days |
| 2.4 | Standardize Error Codes | Backend | All API errors return { code, message } | 1 Day |

---

## 5. Risks & Mitigation
* Risk: Migration to Drizzle takes longer than expected.
    * Mitigation: Hybrid approach—keep pg for complex legacy queries initially, but use Drizzle for all new and refactored logic.
* Risk: Breaking existing features during Middleware refactor.
    * Mitigation: Implement regression smoke tests in Playwright before refactoring.
* Risk: Developer friction from strict CI.
    * Mitigation: Provide clear linting/fixing scripts to run locally before pushing.

## 6. Success Metrics
1. Zero Raw SQL: No occurrences of query('SELECT...') in the main data paths.
2. Type Coverage: 100% of API responses mapped to shared @aic/types.
3. Automated Gate: 100% of merges to main passed CI.
4. UI Performance: 20% reduction in DashboardShell bundle size via decomposition.
