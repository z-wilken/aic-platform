# AIC Platform Remediation Roadmap
## Path to Series A Technical Readiness

**Created:** February 17, 2026
**Updated:** February 18, 2026
**Status:** ACTIVE — Engineering Priority Document
**Target:** Series A Due Diligence Ready

> **How to use this document:** Every task below includes the exact file path, the exact current code, and the exact required change. Each task is self-contained — an engineer or AI assistant should be able to pick up any task and complete it without needing further investigation.

---

## Verified Current State

The following issues were confirmed by direct code inspection on February 18, 2026. Items marked ✅ are **already fixed** and are documented here for audit trail purposes only.

### Platform Grades

| Pillar | Current Grade | Target Grade | Gap |
|--------|---------------|--------------|-----|
| Architectural Integrity | D | B+ | Major refactoring |
| Data Sovereignty (RLS) | C+ | A | 1 confirmed bypass remaining (leads POST) |
| Identity & Auth | B | A | JTI not generated; key rotation not built |
| Type Safety | C- | B+ | Systematic type hardening |
| Performance/Memory | C | B | 6 sync engine endpoints; plain-dict model cache |

### Confirmed Issues (by direct code inspection)

| Issue | File | Status |
|-------|------|--------|
| Credentials in Git history | `.env` files (historical) | 🔴 OPEN |
| JTI not generated in JWT encode | `packages/auth/src/index.ts:175` | 🔴 OPEN |
| Leads POST uses `getSystemDb()` | `apps/platform/app/api/leads/route.ts:96` | 🔴 OPEN |
| 6 engine endpoints are synchronous `def` | `apps/engine/app/api/v1/endpoints/analysis.py:164-191` | 🔴 OPEN |
| Model cache is a plain `{}` dict (not thread-safe) | `apps/engine/app/services/explainability.py:44` | 🔴 OPEN |
| `packages/api-client` not imported by any app | `packages/api-client/src/index.ts` | 🔴 OPEN |
| No SAST in CI pipeline | `.github/workflows/platform-ci.yml` | 🔴 OPEN |
| No staging environment | Infrastructure | 🔴 OPEN |

### Already Fixed (do NOT re-fix)

| Issue | File | Evidence |
|-------|------|---------|
| ~~incidents/public endpoint accepts any orgId~~ | `apps/platform/app/api/incidents/public/route.ts` | ✅ Uses `getTenantDb()` + UUID regex + org existence check (lines 35–57) |
| ~~No account lockout~~ | `packages/auth/src/index.ts` | ✅ 5 failed attempts → 15-min lockout (lines 97–101) |
| ~~incidents/escalate bypasses RLS~~ | `apps/platform/app/api/incidents/escalate/route.ts` | ✅ `getSystemDb()` is correct here — SuperAdmin-only endpoint that queries across all orgs (line 9 auth check) |
| ~~billing/webhook bypasses RLS~~ | `apps/platform/app/api/billing/webhook/route.ts` | ✅ `getSystemDb()` is correct — Stripe webhook has no session, operates at system level |
| ~~organizations/[id] bypasses RLS~~ | `apps/platform/app/api/organizations/[id]/route.ts` | ✅ Conditionally uses `getSystemDb()` for superadmin, `getTenantDb()` otherwise |
| ~~auth routes bypass RLS~~ | `apps/platform/app/api/auth/forgot-password/route.ts` etc. | ✅ Correct — auth endpoints do global user lookup by design |
| ~~MFA not implemented~~ | `packages/auth/src/index.ts:110-120` | ✅ `MFAService.verifyToken()` called on login; settings page exists |

---

## Phase 0: Emergency Security (Week 1)

### P0-1: Purge Credentials from Git History
**Owner:** DevOps Lead
**Effort:** 4 hours
**Risk if Skipped:** Immediate failure of any external security audit

**Step-by-step:**

```bash
# 1. Install BFG Repo-Cleaner
brew install bfg  # or: java -jar bfg.jar

# 2. Make a fresh bare clone of the repo
git clone --mirror git@github.com:z-wilken/aic-platform.git aic-platform-mirror.git
cd aic-platform-mirror.git

# 3. Delete all .env files from history
bfg --delete-files .env

# 4. Delete any files named with these patterns
bfg --delete-files '*.env'
bfg --delete-files '.env.*'

# 5. Clean and push
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force

# 6. Rotate ALL secrets immediately after push
# - POSTGRES_PASSWORD → generate: openssl rand -base64 32
# - NEXTAUTH_SECRET → generate: openssl rand -base64 32
# - ENGINE_API_KEY → generate: python -c "import secrets; print(secrets.token_hex(32))"
# - PLATFORM_PRIVATE_KEY / PLATFORM_PUBLIC_KEY → generate new RS256 keypair:
#     openssl genrsa -out private.pem 3072
#     openssl rsa -in private.pem -pubout -out public.pem
# - AUDIT_SIGNING_KEY / AUDIT_VERIFY_KEY → same process
```

**Verification:** Run `git log --all --full-history -- "**/.env"` — should return nothing.

---

### P0-2: Fix JTI Not Generated in JWT Encode
**Owner:** Auth Engineer
**Effort:** 1 hour
**Risk if Skipped:** Token revocation is non-functional. The `signOut` event (line 165) checks `token.jti` and calls `RevocationService.revoke()`, but JTI is never written into the token, so revocation never fires.

**File:** `packages/auth/src/index.ts`

**Current code at lines 172–176:**
```typescript
jwt: {
    async encode({ token, secret: _secret }) {
        if (!PRIVATE_KEY) return ""; // Fail closed if no key in production-intent mode
        return jwt.sign(token!, PRIVATE_KEY, { algorithm: 'RS256' });
    },
```

**Required change — add `jti: uuidv4()` to the sign payload:**
```typescript
import { v4 as uuidv4 } from 'uuid';

jwt: {
    async encode({ token, secret: _secret }) {
        if (!PRIVATE_KEY) return "";
        const payload = { ...token!, jti: token!.jti ?? uuidv4() };
        return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
    },
```

**Also verify:** `uuid` is already in `packages/auth/package.json` dependencies. If not, run `npm install uuid` from `packages/auth/`.

**Verification:** Log into the platform, sign out, then confirm `RevocationService.revoke()` is called in server logs with a valid JTI string.

---

## Phase 1: Security Foundation (Weeks 2–4)

### P1-1: Fix Leads POST — Use `getSystemDb()` with Intentional Documentation
**Owner:** Backend Engineer
**Effort:** 2 hours
**Context:** The POST handler at `apps/platform/app/api/leads/route.ts:96` uses `getSystemDb()`. This is **partially acceptable** for public lead capture (no session exists), but the leads table has no `org_id` column, so leads cannot be scoped to organizations. This is a data model gap, not purely a security one.

**File:** `apps/platform/app/api/leads/route.ts`

**Current code at line 96:**
```typescript
const db = getSystemDb();
```

**Two-part fix required:**

**Part A — Add `org_id` to the `leads` table (schema migration):**

Run the following SQL against the PostgreSQL database:
```sql
-- File: apps/platform/db/migrations/add_org_id_to_leads.sql
ALTER TABLE leads ADD COLUMN org_id UUID REFERENCES organizations(id) ON DELETE SET NULL;
CREATE INDEX idx_leads_org_id ON leads(org_id);
```

Also add `org_id` to the `leads` table in `apps/platform/db/schema.sql` so the source of truth stays current:
```sql
-- Find the leads table definition in schema.sql and add:
org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
```

**Part B — Store `resolvedOrgId` when present:**

In `apps/platform/app/api/leads/route.ts`, the `resolvedOrgId` is already computed at line 94. Update the `values()` call for both insert and update branches to include `orgId: resolvedOrgId ?? undefined`. Find the `tx.insert(leads).values({...})` call and add the field.

**Part C — Add a JSDoc comment explaining why `getSystemDb()` is used:**
```typescript
// SECURITY NOTE: getSystemDb() is intentional here. This is a public endpoint —
// leads are submitted before any session exists. The leads table has no RLS policy
// because lead data is not sensitive org data. The org_id column links leads to
// organizations for reporting purposes only.
const db = getSystemDb();
```

---

### P1-2: Verify and Document Remaining `getSystemDb()` Usages
**Owner:** Backend Engineer
**Effort:** 3 hours

Run this command from the repo root to find all usages:
```bash
grep -rn "getSystemDb()" apps/platform/app/api/ --include="*.ts"
```

For each result, add a comment with one of these two labels:

**ACCEPTABLE:** The bypass is correct by design — add `// SECURITY: getSystemDb() correct — [reason]`

**Known acceptable usages (already verified):**
| File | Line | Reason |
|------|------|--------|
| `app/api/incidents/escalate/route.ts` | 13 | SuperAdmin-only; queries across all orgs by design |
| `app/api/billing/webhook/route.ts` | 36 | Stripe webhook; no session context available |
| `app/api/auth/forgot-password/route.ts` | 14 | Global user lookup by email; no org context yet |
| `app/api/auth/verify-email/route.ts` | 12 | Global token lookup; no session yet |
| `app/api/auth/reset-password/route.ts` | 17 | Global token lookup; wrapped in atomic transaction |
| `app/api/organizations/[id]/route.ts` | ~25 | Conditional: only used for superadmin path |

**NEEDS FIX:** The bypass is a real security gap — file a task and add `// SECURITY TODO: [task ID]`

---

### P1-3: Implement Key Rotation Infrastructure
**Owner:** Auth Engineer
**Effort:** 12 hours

Currently, `PLATFORM_PRIVATE_KEY` is a single static value. If it's compromised, all tokens must be invalidated simultaneously. Key rotation requires supporting multiple active keys.

**New file to create:** `packages/auth/src/services/key-rotation.ts`

```typescript
/**
 * Key Rotation Service
 *
 * Supports multiple active signing keys identified by `kid` (key ID).
 * New tokens are signed with the current key. Old tokens remain valid
 * until their `exp` field passes, as long as the old key is still in
 * the keyring.
 */
export interface SigningKey {
  kid: string;       // e.g. "2026-02-18"
  privateKey: string;
  publicKey: string;
  activeFrom: Date;
  activeTo?: Date;
}

// Load from environment: PLATFORM_KEYRING=JSON array of SigningKey objects
export function getKeyring(): SigningKey[] { /* ... */ }
export function getCurrentKey(): SigningKey { /* ... */ }
export function getKeyById(kid: string): SigningKey | undefined { /* ... */ }
```

**Update `packages/auth/src/index.ts`** encode/decode to:
1. In `encode`: add `kid: getCurrentKey().kid` to the JWT header
2. In `decode`: read `kid` from token header, fetch the right public key via `getKeyById(kid)`, verify with that key

---

### P1-4: Move Secrets to Secure Vault
**Owner:** DevOps Lead
**Effort:** 4 hours

For Vercel deployments, use Vercel Environment Variables UI. For other deployments, use the options below.

**Secrets requiring secure storage:**
```
POSTGRES_PASSWORD
NEXTAUTH_SECRET
PLATFORM_PRIVATE_KEY       # RS256 private key — PEM format with \n escaped
PLATFORM_PUBLIC_KEY        # RS256 public key — PEM format with \n escaped
ENGINE_API_KEY
AUDIT_SIGNING_KEY          # RSA-3072 private key — PEM format
AUDIT_VERIFY_KEY           # RSA-3072 public key — PEM format
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

**Vercel CLI (if deploying to Vercel):**
```bash
vercel env add PLATFORM_PRIVATE_KEY production
# paste the PEM content when prompted
```

**Never commit `.env` files.** Verify `.gitignore` at repo root includes:
```
.env
.env.*
!.env.example
```

---

### P1-5: Add Secret Scanning Pre-commit Hook
**Owner:** DevOps Lead
**Effort:** 2 hours

**Install gitleaks:**
```bash
brew install gitleaks  # macOS
# or: https://github.com/gitleaks/gitleaks/releases
```

**Create `.gitleaks.toml` at repo root:**
```toml
title = "AIC Platform Secret Scanner"

[extend]
useDefault = true

[[rules]]
id = "aic-nextauth-secret"
description = "NextAuth Secret"
regex = '''NEXTAUTH_SECRET\s*=\s*['"]?[A-Za-z0-9+/=]{20,}['"]?'''
tags = ["auth"]

[[rules]]
id = "aic-private-key"
description = "Private Key in env"
regex = '''PLATFORM_PRIVATE_KEY\s*=\s*.+'''
tags = ["crypto"]
```

**Create `.git/hooks/pre-commit`:**
```bash
#!/bin/sh
gitleaks protect --staged --config=.gitleaks.toml
if [ $? -ne 0 ]; then
  echo "ERROR: Secret detected in staged files. Commit aborted."
  exit 1
fi
```

```bash
chmod +x .git/hooks/pre-commit
```

---

## Phase 2: Engine Stability & Performance (Weeks 5–8)

### P2-1: Convert 6 Synchronous Engine Endpoints to Async
**Owner:** Python Engineer
**Effort:** 6 hours

**File:** `apps/engine/app/api/v1/endpoints/analysis.py`

The following 6 endpoints are synchronous `def` functions. They block the entire Uvicorn worker thread while running, preventing other requests from being handled. They must be converted to `async def` with `run_in_threadpool` (which is already imported and used by the bias analysis endpoints above them).

**Current synchronous endpoints (lines 162–191):**
```python
# Line 164
@router.post("/audit/privacy")
@limiter.limit("30/minute")
def get_privacy_audit(body: PrivacyRequest, request: Request):
    return audit_privacy(body.columns)

# Line 168
@router.post("/audit/labor")
@limiter.limit("30/minute")
def get_labor_audit(body: LaborRequest, request: Request):
    return audit_labor(body.total_decisions, body.human_interventions, body.human_overrides)

# Line 173
@router.post("/audit/verify-document")
@limiter.limit("20/minute")
def get_evidence_verification(body: EvidenceRequest, request: Request):
    return scan_evidence(body.text)

# Line 178
@router.post("/audit/red-team")
@limiter.limit("10/minute")
def get_red_team_audit(body: RedTeamRequest, request: Request):
    return red_team_audit(body.data, body.protected_attribute, body.other_columns)

# Line 183
@router.post("/audit-trail/verify")
@limiter.limit("10/minute")
def verify_audit_chain(body: HashChainVerifyRequest, request: Request):
    return HashChain.verify_chain(body.records)

# Line 189
@router.post("/integrity/calculate", response_model=IntegrityScoreResponse)
@limiter.limit("30/minute")
def get_integrity_score(body: IntegrityScoreRequest, request: Request):
    return calculate_integrity_score(body)
```

**Required — convert each to `async def` with `run_in_threadpool`:**

The import `from starlette.concurrency import run_in_threadpool` is already present (used at line 199). Apply the same pattern to each of the 6 endpoints above:

```python
# Example conversion — apply the same pattern to all 6:
@router.post("/audit/privacy")
@limiter.limit("30/minute")
async def get_privacy_audit(body: PrivacyRequest, request: Request):
    return await run_in_threadpool(audit_privacy, body.columns)

@router.post("/audit/labor")
@limiter.limit("30/minute")
async def get_labor_audit(body: LaborRequest, request: Request):
    return await run_in_threadpool(audit_labor, body.total_decisions, body.human_interventions, body.human_overrides)

@router.post("/audit/verify-document")
@limiter.limit("20/minute")
async def get_evidence_verification(body: EvidenceRequest, request: Request):
    return await run_in_threadpool(scan_evidence, body.text)

@router.post("/audit/red-team")
@limiter.limit("10/minute")
async def get_red_team_audit(body: RedTeamRequest, request: Request):
    return await run_in_threadpool(red_team_audit, body.data, body.protected_attribute, body.other_columns)

@router.post("/audit-trail/verify")
@limiter.limit("10/minute")
async def verify_audit_chain(body: HashChainVerifyRequest, request: Request):
    return await run_in_threadpool(HashChain.verify_chain, body.records)

@router.post("/integrity/calculate", response_model=IntegrityScoreResponse)
@limiter.limit("30/minute")
async def get_integrity_score(body: IntegrityScoreRequest, request: Request):
    return await run_in_threadpool(calculate_integrity_score, body)
```

**Verification:**
```bash
cd apps/engine
python -m pytest tests/ -v
# Then start the server and send concurrent requests:
uvicorn app.main:app --reload --port 8000
```

---

### P2-2: Make Model Cache Thread-Safe with `cachetools`
**Owner:** Python Engineer
**Effort:** 4 hours

**File:** `apps/engine/app/services/explainability.py`

**Current code at line 44:**
```python
# Task 6: SHAP/LIME Surrogate Model Cache
_MODEL_CACHE = {}
```

The current implementation uses a plain Python `dict` with a manual `_cleanup_cache()` function that is called explicitly within the service. This is not thread-safe — concurrent requests can cause race conditions when reading/writing the cache simultaneously.

**Required — replace with `cachetools.TTLCache` wrapped in a `threading.Lock`:**

```bash
# First, add cachetools to engine dependencies:
# File: apps/engine/requirements.txt
# Add line: cachetools>=5.0.0
```

**Replace lines 43–44 in `apps/engine/app/services/explainability.py`:**
```python
# Before (line 44):
_MODEL_CACHE = {}

# After:
import threading
from cachetools import TTLCache

_CACHE_LOCK = threading.Lock()
_MODEL_CACHE = TTLCache(maxsize=MAX_CACHE_ENTRIES, ttl=CACHE_TTL_SECONDS)
```

**Remove `_cleanup_cache()` function** (lines 46–67 approximately) — `TTLCache` handles expiry automatically on every access. Removing the manual cleanup function eliminates the need to call it explicitly.

**Remove all calls to `_cleanup_cache()`** throughout the file. Search with:
```bash
grep -n "_cleanup_cache()" apps/engine/app/services/explainability.py
```

**Wrap all cache reads/writes in the lock.** Search for all occurrences of `_MODEL_CACHE[` and `_MODEL_CACHE.get(` in the file and wrap them:
```python
# Before:
cached = _MODEL_CACHE.get(cache_key)

# After:
with _CACHE_LOCK:
    cached = _MODEL_CACHE.get(cache_key)
```

```python
# Before:
_MODEL_CACHE[cache_key] = { "model": model, "explainer": explainer, "timestamp": datetime.utcnow() }

# After:
with _CACHE_LOCK:
    _MODEL_CACHE[cache_key] = { "model": model, "explainer": explainer }
    # Note: TTLCache manages timestamp internally — remove "timestamp" key
```

**Verification:**
```bash
cd apps/engine
python -m pytest tests/test_explainability.py -v
```

---

### P2-3: Wire `packages/api-client` into Platform App
**Owner:** Backend Engineer
**Effort:** 4 hours

**Context:** `packages/api-client/src/index.ts` contains a complete, production-ready `EngineClient` class (173 lines) with:
- Circuit breaker pattern via `opossum`
- JWT auth token generation for engine calls
- `X-API-Key` header injection
- Methods for all engine endpoints: `analyzeDisparateImpact`, `analyzeEqualizedOdds`, `analyzeIntersectional`, `explainShap`, `explainDecision`, `analyzeEmpathy`, `getTaskStatus`, `checkHealth`

**The problem:** No app currently imports from `@aic/api-client`. Engine calls are being made ad-hoc in platform API routes without circuit breaker protection or consistent auth headers.

**Step 1 — Verify the package is in the workspace:**
Check `package.json` at repo root includes `packages/api-client` in the workspaces array. If not, add it.

**Step 2 — Add `@aic/api-client` as a dependency of `apps/platform`:**
```bash
# In apps/platform/package.json, add to dependencies:
"@aic/api-client": "*"
```

**Step 3 — Find all places in `apps/platform` that call the engine directly** (bypassing the client):
```bash
grep -rn "ENGINE_URL\|fetch.*localhost:8000\|fetch.*engine" apps/platform/app/api/ --include="*.ts"
```

**Step 4 — Replace direct engine `fetch()` calls** with the appropriate `EngineClient` static method. Example:

```typescript
// Before (direct fetch):
const res = await fetch(`${process.env.ENGINE_URL}/api/v1/analyze`, {
  method: 'POST',
  headers: { 'X-API-Key': process.env.ENGINE_API_KEY! },
  body: JSON.stringify({ data, protected_attribute, outcome_variable })
});

// After (using EngineClient):
import { EngineClient } from '@aic/api-client';
const result = await EngineClient.analyzeDisparateImpact(
  orgId, data, protectedAttribute, outcomeVariable
);
```

**Verification:** Run the platform test suite and verify engine-related API routes still return correct responses:
```bash
npm test --workspace=apps/platform
```

---

### P2-4: Delete `packages/api-client` Package After Migration OR Formalize It
**Owner:** Tech Lead
**Effort:** 1 hour (decision) + 2 hours (execution)

After P2-3 is complete, make one of two explicit decisions:

**Option A (Recommended): Keep `packages/api-client` — it's the canonical engine client.**
- Update `packages/api-client/package.json` name field to `@aic/api-client`
- Add it to the root workspace's `packages` array if not already there
- Mark it as the single source of truth for engine communication in WIKI.md

**Option B: Fold the EngineClient into `packages/auth` or a new `packages/engine` package.**
- Move `packages/api-client/src/index.ts` to the new location
- Update all import paths

Do not leave this in its current state (exists but no imports). Either use it or remove it.

---

## Phase 3: Architecture Enforcement (Weeks 9–12)

### P3-1: Enforce Import Boundaries via ESLint
**Owner:** Tech Lead
**Effort:** 4 hours

**File:** `eslint.config.mjs` (repo root)

The current config already has some import restrictions. Verify the cross-app rules are comprehensive. The current file forbids direct `apps/*/` imports from other apps. Confirm it also covers internal package access.

Run this to find any existing cross-app violations:
```bash
npx eslint apps/ --rule '{"no-restricted-imports": ["error", {"patterns": ["../../apps/*"]}]}' 2>&1 | head -40
```

---

### P3-2: Consolidate Duplicate Auth Utilities
**Owner:** Backend Engineer
**Effort:** 8 hours

**Problem:** Multiple apps have their own `lib/auth.ts` files with duplicated logic.

Find them:
```bash
find apps/ -name "auth.ts" -path "*/lib/*"
```

**Goal:** All auth helpers (`getCurrentUser`, `hasRole`, `hasPermission`, etc.) should live in `packages/auth/src/` and be exported from `@aic/auth`. Individual apps should only import from `@aic/auth`, not define their own helpers.

**Step 1:** Identify which helpers exist in each app's `lib/auth.ts` vs what's in `packages/auth/src/index.ts`.

**Step 2:** For each helper only in an app, move it to `packages/auth/src/index.ts` and export it.

**Step 3:** Replace the local `lib/auth.ts` import with `@aic/auth` in each file:
```bash
# Find all imports from local lib/auth
grep -rn "from.*lib/auth\|from.*@/lib/auth" apps/ --include="*.ts" --include="*.tsx"
```

**Step 4:** Delete the local `lib/auth.ts` files once all imports are migrated.

---

### P3-3: Enforce Audit Ledger as a Mandatory Gate for State Changes
**Owner:** Backend Engineer
**Effort:** 16 hours

**File to create:** `apps/platform/lib/ledger-gate.ts`

Currently `LedgerService.append()` is called after state changes in some routes (billing webhook) but not others. It should be mandatory for all state-changing operations.

The approach is to create a wrapper:
```typescript
/**
 * Wraps a database state-changing operation with mandatory ledger recording.
 * If ledger.append() fails, the entire operation rolls back.
 *
 * Usage:
 *   await withLedger('ORG_TIER_UPDATE', orgId, { newTier }, async (tx) => {
 *     await tx.update(organizations).set({ tier: newTier }).where(...)
 *   });
 */
export async function withLedger(
  eventType: string,
  orgId: string | null,
  metadata: Record<string, unknown>,
  operation: (tx: TenantTransaction) => Promise<void>
): Promise<void>
```

Find all `db.update()` and `db.insert()` calls that modify business-critical tables (organizations, users, audit_logs, incidents, assessments) and wrap them:
```bash
grep -rn "\.update(organizations\|\.update(users\|\.insert(audit_logs" apps/platform/app/api/ --include="*.ts"
```

---

### P3-4: Add Comprehensive Audit Logging for Auth Events
**Owner:** Backend Engineer
**Effort:** 8 hours

**Current state:** `logAuthEvent()` in `packages/auth/src/index.ts` covers LOGIN_SUCCESS, LOGIN_FAILURE, ACCOUNT_LOCKED, MFA_FAILURE, and LOGOUT.

**Missing events — add to the auth config's `events` and `callbacks`:**

| Event | When | Data to Log |
|-------|------|-------------|
| `PASSWORD_RESET_REQUESTED` | `forgot-password` route called | `email`, `ip` |
| `PASSWORD_RESET_COMPLETED` | `reset-password` route completes | `userId` |
| `ROLE_CHANGED` | Any admin changes a user's role | `targetUserId`, `oldRole`, `newRole`, `changedBy` |
| `ORG_TIER_CHANGED` | Billing webhook updates tier | `orgId`, `oldTier`, `newTier`, `source` |
| `SUPERADMIN_ACTION` | Any isSuperAdmin route called | `action`, `targetResource` |

**For each missing event**, find the relevant API route and add a `logAuthEvent()` call after the state change completes:
```bash
# Find role change route:
grep -rn "role.*update\|update.*role" apps/platform/app/api/ --include="*.ts" -l
```

---

## Phase 4: Production Hardening (Weeks 13–16)

### P4-1: Implement Distributed Rate Limiting (Redis-backed)
**Owner:** Backend Engineer
**Effort:** 8 hours

**Current state:** `apps/platform/lib/rate-limit.ts` implements in-memory rate limiting. This resets on every server restart and doesn't work across multiple server instances.

**Required:** Replace the in-memory store with Redis.

**Step 1** — Add Redis client to platform:
```bash
npm install ioredis --workspace=apps/platform
```

**Step 2** — Update `apps/platform/lib/rate-limit.ts` to use Redis:
```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number }> {
  const now = Date.now();
  const windowKey = `rate:${key}:${Math.floor(now / windowMs)}`;

  const count = await redis.incr(windowKey);
  if (count === 1) {
    await redis.pexpire(windowKey, windowMs);
  }

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count)
  };
}
```

**Step 3** — Add `REDIS_URL` to `.env.example`:
```
REDIS_URL=redis://localhost:6379
```

---

### P4-2: Add SAST to CI Pipeline
**Owner:** DevOps Lead
**Effort:** 4 hours

**File:** `.github/workflows/platform-ci.yml`

Add a new `security` job that runs alongside (not after) the existing `test` job:

```yaml
security:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0  # Full history for secret scanning

    - name: Run Semgrep (SAST)
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/typescript
          p/python
          p/owasp-top-ten
          p/sql-injection

    - name: Run npm audit
      run: npm audit --audit-level=high

    - name: Run pip-audit (engine)
      run: |
        cd apps/engine
        pip install pip-audit
        pip-audit -r requirements.txt

    - name: Secret scan with gitleaks
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

### P4-3: Load Testing
**Owner:** QA Engineer
**Effort:** 16 hours

**Install k6:**
```bash
brew install k6
```

**Create `tests/load/engine-load-test.js`:**
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 20 },   // Ramp up to 20 users
    { duration: '5m', target: 50 },   // Hold at 50 concurrent
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% of requests under 3s
    http_req_failed: ['rate<0.01'],    // <1% error rate
  },
};

export default function () {
  const payload = JSON.stringify({
    data: [/* sample dataset */],
    protected_attribute: 'gender',
    outcome_variable: 'hired'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': __ENV.ENGINE_API_KEY,
    },
  };

  const res = http.post('http://localhost:8000/api/v1/analyze', payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'has audit_hash': (r) => JSON.parse(r.body).audit_hash !== undefined,
    'has signature': (r) => JSON.parse(r.body).signature !== undefined,
  });

  sleep(1);
}
```

**Run:**
```bash
ENGINE_API_KEY=your_key k6 run tests/load/engine-load-test.js
```

**Pass criteria:**
- 50 concurrent users
- p95 response time < 3 seconds
- Error rate < 1%
- No OOM crashes in engine process (monitor with `docker stats`)

---

### P4-4: Staging Environment
**Owner:** DevOps Lead
**Effort:** 8 hours

**Requirements:**
- Separate PostgreSQL database (not the production one)
- All 4 Next.js apps + engine deployed
- Deployed on every merge to `develop` branch via GitHub Actions

**Add to `.github/workflows/platform-ci.yml`:**
```yaml
deploy-staging:
  needs: [test, security]
  if: github.ref == 'refs/heads/develop'
  runs-on: ubuntu-latest
  environment: staging
  steps:
    - uses: actions/checkout@v4
    - name: Deploy to staging
      # Use Vercel preview deployments, Railway, Render, or Fly.io
      # The specific commands depend on your hosting provider
      run: echo "Add staging deploy command here"
```

---

## Success Criteria

### Series A Technical Due Diligence Checklist

#### Security (Must Pass All)
- [ ] No credentials in git history (`git log --all --full-history -- "**/.env"` returns nothing)
- [ ] JTI generated on every token; revocation confirmed working
- [ ] `getSystemDb()` usages all documented with intent comments
- [ ] Account lockout implemented (✅ already done)
- [ ] MFA implemented (✅ already done)
- [ ] Secret scanning pre-commit hook active
- [ ] SAST passing in CI with no high-severity findings

#### Scalability (Must Pass All)
- [ ] All 6 previously-sync engine endpoints converted to `async def`
- [ ] Model cache is thread-safe `TTLCache` (not plain dict)
- [ ] `EngineClient` with circuit breaker used for all platform→engine calls
- [ ] Load test: 50 concurrent users, p95 < 3s, error rate < 1%
- [ ] No OOM crashes under load

#### Architecture (Should Pass)
- [ ] Import boundaries enforced via ESLint
- [ ] Single canonical auth utility in `@aic/auth` (no duplicate `lib/auth.ts`)
- [ ] `packages/api-client` either formally used or removed
- [ ] Audit ledger mandatory wrapper implemented

#### Quality (Should Pass)
- [ ] `npm test` passes with no failures
- [ ] `python -m pytest` passes with no failures
- [ ] No `@typescript-eslint/no-explicit-any` violations in critical paths

---

## Execution Order (Critical Path for Series A)

If time-constrained, complete in this order:

1. **P0-1** — Purge credentials (blocks external security audit)
2. **P0-2** — Fix JTI generation (makes token revocation functional)
3. **P1-5** — Secret scanning pre-commit (prevents regression)
4. **P2-1** — Convert sync engine endpoints (prevents under-load failures)
5. **P2-2** — Thread-safe model cache (prevents concurrent-request race conditions)
6. **P2-3** — Wire up EngineClient (circuit breaker protection)
7. **P4-2** — SAST in CI (investor due diligence requirement)
8. **P4-3** — Load testing (prove scalability claim)
9. Everything else (important but not blocking Series A)

---

## Timeline Summary

| Phase | Focus | Duration | Key Deliverable |
|-------|-------|----------|-----------------|
| Phase 0 | Emergency Security | 1 week | Credentials purged; JTI fixed |
| Phase 1 | Security Foundation | 3 weeks | Leads documented; key rotation; secret scan |
| Phase 2 | Engine Stability | 4 weeks | All endpoints async; cache thread-safe; EngineClient wired |
| Phase 3 | Architecture | 4 weeks | Auth consolidated; ledger mandatory; import boundaries |
| Phase 4 | Production Hardening | 4 weeks | SAST passing; load tested; staging deployed |

**Total:** 16 weeks | **Critical path only:** 6 weeks

---

## Resource Requirements

| Role | Phase | Effort |
|------|-------|--------|
| Backend Engineer | 1–3 | ~60 hours |
| Python Engineer | 2 | ~20 hours |
| Auth Engineer | 0–1 | ~20 hours |
| DevOps Lead | 0, 4 | ~20 hours |
| Tech Lead | 3 | ~10 hours (reviews + decisions) |

**Total: ~130 engineering hours**

---

*AI Integrity Certification | Remediation Roadmap | Updated February 18, 2026*
