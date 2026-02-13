# AIC Pulse: Foundation Stabilization Roadmap (2026)

## Executive Summary
The AIC Pulse platform currently suffers from a "Vision-Code Gap": while the strategic trajectory is world-class, the technical implementation is a fragile MVP masquerading as an institutional-grade system. To become the SANAS-accredited national authority for AI Integrity, we must first stabilize our own infrastructure. This roadmap prioritizes **technical integrity over feature velocity**, focusing on type safety, architectural decoupling, and CI/CD enforcement. We will not process real organizational data until this foundation is hardened.

## Current State vs. Desired State

| Metric | Current State (MVP) | Desired State (Institutional) |
| :--- | :--- | :--- |
| **Monorepo** | Basic workspaces (no `turbo.json`). | Fully optimized Turborepo with caching. |
| **Type Safety** | Widespread `any`; failing type-checks. | 100% strict TypeScript; zero `any`. |
| **Security** | Application-layer tenant filtering. | Database-level Row Level Security (RLS). |
| **Code Quality** | Duplicated logic between `admin` & `hq`. | Unified Internal Portal with strict RBAC. |
| **Resilience** | Synchronous heavy analysis (Engine). | Asynchronous task queues (Redis/Celery). |
| **Verification** | Zero test coverage; manual audits. | 70%+ coverage; automated CI enforcement. |

---

## Phase 1: Immediate Stability (Weeks 1-2)
**Goal:** Fix the "Monorepo Illusion" and eradicate "Type-Safety Myths."

### Execution Plan: Phase 1
1.  **Step 1.1: Formalize Turborepo Configuration**
    *   **Owner:** DevOps Engineer
    *   **Deliverable:** `turbo.json` with defined pipelines for `build`, `lint`, `type-check`, and `test`.
    *   **Success Criteria:** `npm run build` utilizes Turborepo caching and parallel execution.
2.  **Step 1.2: Strict Type Hardening & `any` Purge**
    *   **Owner:** Lead Architect
    *   **Deliverable:** Purge all `any` usages from `@aic/auth`, `@aic/db`, and core API routes.
    *   **Success Criteria:** `npm run type-check` passes monorepo-wide.
3.  **Step 1.3: Version Stabilization**
    *   **Owner:** Lead Architect
    *   **Deliverable:** Align monorepo on stable Next.js 15.x and React 19.x.
    *   **Success Criteria:** Resolved build-time library incompatibilities.
4.  **Step 1.4: Sanitize React Anti-Patterns**
    *   **Owner:** Senior Frontend
    *   **Deliverable:** Fix "impure renders" (Math.random) and "infinite loops" (unguarded setState in effects).
    *   **Success Criteria:** Zero hydration warnings in browser console.

---

## Phase 2: Architectural Hardening (Weeks 3-6)
**Goal:** Consolidate redundant systems and enforce data isolation.

### Execution Plan: Phase 2
1.  **Step 2.1: Internal Portal Consolidation**
    *   **Owner:** Senior Frontend / Backend
    *   **Deliverable:** Merge `apps/admin` and `apps/hq` into a single `@aic/internal` portal using RBAC.
    *   **Success Criteria:** Deletion of one redundant application directory; functionality preserved.
2.  **Step 2.2: Standardized Drizzle Migration System**
    *   **Owner:** Backend Engineer
    *   **Deliverable:** Versioned migrations using `drizzle-kit generate` and `migrate.sh`.
    *   **Success Criteria:** Schema changes are traceable and reproducible across environments.
3.  **Step 2.3: Centralized Shared UI Library**
    *   **Owner:** Senior Frontend
    *   **Deliverable:** Refactor `packages/ui` to use Radix UI primitives and Shadcn-style architecture.
    *   **Success Criteria:** Consistent styling and WCAG 2.2 AA compliance across all apps.

---

## Phase 3: Production Readiness & Scale (Months 2-3)
**Goal:** Automate resilience and establish the Sovereign Audit Ledger.

### Execution Plan: Phase 3
1.  **Step 3.1: Async Evidence Pipeline**
    *   **Owner:** Backend / DevOps
    *   **Deliverable:** Integration of S3/MinIO for immutable audio/code storage.
    *   **Success Criteria:** Large file uploads no longer cause OOM errors in the API.
2.  **Step 3.2: CI/CD Enforcement (The "Green Barrier")**
    *   **Owner:** DevOps Engineer
    *   **Deliverable:** GitHub Actions that block merges unless `lint`, `type-check`, and `test` pass.
    *   **Success Criteria:** Main branch remains in a 100% "ready to deploy" state.
3.  **Step 3.3: Global Audit Ledger**
    *   **Owner:** Lead Architect
    *   **Deliverable:** A dedicated, immutable hash-chain for internal administrative actions.
    *   **Success Criteria:** Proof of non-tampering for internal system changes (SANAS Ready).

## Phase 4: Sovereign Infrastructure Hardening (Immediate Priority)
**Goal:** Transition from "Soft Isolation" to "Zero-Bypass Multi-Tenancy" and "Immutable Evidence."

### Execution Plan: Phase 4
1.  **Step 4.1: Zero-Bypass Multi-Tenancy (Database Proxy)**
    *   **Owner:** Lead Architect / Backend Engineer
    *   **Deliverable:** Refactor `@aic/db` to hide the raw `db` instance. Developers must use `tenantDb(orgId)` which automatically enforces RLS.
    *   **Success Criteria:** Impossible to execute a query without an `orgId` context except for explicitly marked system operations.
2.  **Step 4.2: Real-Time Event Bus (SSE/WebSockets)**
    *   **Owner:** Backend / Senior Frontend
    *   **Deliverable:** Replace notification polling with a persistent event stream powered by Redis Pub/Sub.
    *   **Success Criteria:** 90% reduction in "Read-Lock" DB traffic from dashboard polling.
3.  **Step 4.3: Service-to-Service OIDC/JWT Auth**
    *   **Owner:** DevOps / Lead Architect
    *   **Deliverable:** Replace `ENGINE_API_KEY` with short-lived, RSA-signed JWTs for Platform -> Engine calls.
    *   **Success Criteria:** System survives a compromised Platform API without compromising the Engine's integrity.

---

## Risks & Mitigation
- **Risk:** Migration from Next.js 16 (beta) to 15 (stable) may break experimental features.
  - **Mitigation:** Comprehensive audit of feature usage before downgrade; use polyfills where necessary.
- **Risk:** Consolidation of Admin/HQ may disrupt current "simulated" workflows.
  - **Mitigation:** Map all existing routes to the new RBAC structure before moving code.

## Success Metrics (Stable Foundation)
1.  **Zero-Error Baseline:** `lint` and `type-check` pass 100% of the time.
2.  **Single Source of Truth:** All domain models originate from `@aic/types` or `@aic/db`.
3.  **Sovereign Isolation:** Zero data leakage between tenants (Verified via RLS).
4.  **Auditable History:** 100% of database changes are versioned through Drizzle migrations.
