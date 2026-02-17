# AIC Technical Specification V2.0

> **⚠️ SECURITY AUDIT NOTICE (February 17, 2026)**
>
> A comprehensive security audit identified critical gaps. This spec describes the *intended* architecture; see [REMEDIATION_ROADMAP.md](./REMEDIATION_ROADMAP.md) for current fix status.

## 🔐 Security Architecture

### 1. Environment Enforcement

> **⚠️ ACTION REQUIRED:** Credentials were found in git history. Must be purged using BFG Repo-Cleaner and all secrets rotated.

Environment variables required (never commit to git):
*   `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
*   `NEXTAUTH_SECRET`
*   `PLATFORM_PRIVATE_KEY`, `PLATFORM_PUBLIC_KEY` (RS256 JWT signing)
*   `ENGINE_URL`, `ENGINE_API_KEY`

### 2. Authentication (Updated Feb 17)
*   **MFA:** ✅ TOTP implementation added (RFC 6238)
*   **Account Lockout:** ✅ 5 attempts → 15-minute lock
*   **JTI Tokens:** ✅ Now generated for revocation support
*   **Key Rotation:** 🔴 Infrastructure not yet built

### 3. Middleware Protection

> **⚠️ CRITICAL:** Middleware enforces *route access* but does NOT ensure *data isolation*. RLS policies at database layer are the actual security boundary.

*   **Admin Portal:** Secured via `apps/admin/middleware.ts` (Requires `ADMIN` or `AUDITOR`).
*   **HQ Command Center:** Secured via `apps/hq/middleware.ts` (Requires `isSuperAdmin` for `/governance`).
*   **Client Portal:** Secured via `apps/platform/middleware.ts` (Requires `VIEWER` or higher).

### 4. Row-Level Security (RLS)

> **⚠️ CRITICAL (Feb 17 Audit):** 9 API endpoints bypass RLS by using `getSystemDb()` instead of `getTenantDb(orgId)`. See REMEDIATION_ROADMAP.md Phase 1 for fix plan.

**Correct Pattern:**
```typescript
const db = getTenantDb(session.user.orgId); // Sets RLS context
```

**Known Bypass Points (to be fixed):**
- `incidents/public/route.ts` - ✅ Fixed Feb 17
- `incidents/escalate/route.ts` - 🔴 Pending
- `billing/webhook/route.ts` - 🔴 Pending
- `leads/route.ts` - 🔴 Pending
- Auth routes (3) - 🟡 Acceptable for global user lookup

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
