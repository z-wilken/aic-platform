# AIC Technical Specification V2.0

## 🔐 Security Architecture

### 1. Environment Enforcement
Hardcoded credentials have been deprecated. All applications now strictly require:
*   `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
*   `NEXTAUTH_SECRET`
*   `ENGINE_URL` (for engine calls)

### 2. Middleware Protection
*   **Admin Portal:** Secured via `apps/admin/middleware.ts` (Requires `ADMIN` or `AUDITOR`).
*   **HQ Command Center:** Secured via `apps/hq/middleware.ts` (Requires `isSuperAdmin` for `/governance`).
*   **Client Portal:** Secured via `apps/platform/middleware.ts` (Requires `VIEWER` or higher).

## ⚙️ Audit Engine Integration

### 1. Bias Analysis Pipeline
*   **Source:** `apps/platform/api/audit-logs`
*   **Processing:** Forwards data to `ENGINE_URL/api/v1/analyze` (Python FastAPI).
*   **Logic:** EEOC Four-Fifths rule + Disparate Impact calculation.
*   **Integrity:** Every analysis result generates a unique cryptographic hash stored in the DB.

### 2. local Explanation (XAI)
*   **Source:** `apps/platform/api/explain`
*   **Processing:** Forwards data to `ENGINE_URL/api/v1/explain`.
*   **Goal:** Provides human-readable justification for automated decisions (POPIA Sec. 71 compliance).

## ⚖️ Scoring Engine

### Weighted Formula
`Score = (DOCUMENTATION * 0.20) + (OVERSIGHT * 0.35) + (REPORTS * 0.25) + (TECHNICAL * 0.20)`

*   **Implementation:** Centralized in `apps/platform/api/stats/route.ts`.
*   **Verification:** Unit tests established in `apps/platform/tests/scoring.test.ts`.

---

## 🏗️ Monorepo Orchestration

| App | Port | Purpose |
| :--- | :--- | :--- |
| `web` | 3000 | Public Paths (Citizens/Business) |
| `platform`| 3001 | Client SaaS |
| `admin` | 3002 | Auditor Factory |
| `hq` | 3004 | Growth & Content Hub |
| `engine` | 8000 | Python Logic |
