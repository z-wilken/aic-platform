# AIC Platform: Detailed Next Steps Checklist
## Master Execution Tracker

**Created:** February 17, 2026
**Purpose:** Day-by-day actionable checklist - nothing missed
**Status:** ACTIVE - Update daily

---

## How to Use This Document

1. **Daily:** Check off completed items, update status
2. **Weekly:** Review phase progress, adjust timeline if needed
3. **Blockers:** Add to "Blockers" section immediately when discovered
4. **Dependencies:** Don't start items until prerequisites are complete

---

## PHASE 0: Emergency Security (Week 1)
**Target Completion:** February 24, 2026
**Status:** 🟡 IN PROGRESS

### P0-1: Purge Credentials from Git History
**Priority:** CRITICAL | **Effort:** 4 hours | **Owner:** ___________

- [ ] **Backup repository** before any destructive operations
  ```bash
  git clone --mirror https://github.com/z-wilken/aic-platform.git aic-backup
  ```

- [ ] **Install BFG Repo-Cleaner**
  ```bash
  # Download from https://rtyley.github.io/bfg-repo-cleaner/
  # Or: brew install bfg (macOS)
  ```

- [ ] **Create list of secrets to purge** - check for:
  - [ ] `.env` files in git history
  - [ ] `POSTGRES_PASSWORD` values
  - [ ] `NEXTAUTH_SECRET` values
  - [ ] Any API keys or tokens
  - [ ] RSA private keys

- [ ] **Run BFG to remove secrets**
  ```bash
  bfg --delete-files .env
  bfg --replace-text passwords.txt  # file with secrets to redact
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  ```

- [ ] **Force push cleaned history**
  ```bash
  git push --force
  ```

- [ ] **Rotate ALL secrets immediately after purge:**
  - [ ] Generate new `POSTGRES_PASSWORD`
  - [ ] Generate new `NEXTAUTH_SECRET`: `openssl rand -base64 32`
  - [ ] Generate new `ENGINE_API_KEY`: `python -c "import secrets; print(secrets.token_hex(32))"`
  - [ ] Generate new RS256 key pair for JWT signing
  - [ ] Update all deployment configurations

- [ ] **Verify no secrets remain**
  ```bash
  git log -p --all -S 'PASSWORD' -- .
  git log -p --all -S 'SECRET' -- .
  ```

**Success Criteria:** `git log --all --full-history -- "*.env"` returns nothing

---

### P0-2: Fix Remaining RLS Bypass Endpoints
**Priority:** CRITICAL | **Effort:** 8 hours | **Owner:** ___________

**Already Fixed:**
- [x] `apps/platform/app/api/incidents/public/route.ts` - Fixed Feb 17

**Remaining Endpoints to Fix:**

- [ ] **incidents/escalate/route.ts** (`apps/platform/app/api/incidents/escalate/route.ts`)
  - Current: Uses `getSystemDb()` to read ALL incidents
  - Fix: Add session check, use `getTenantDb(session.user.orgId)`
  - Test: Verify user can only see their org's incidents

- [ ] **billing/webhook/route.ts** (`apps/platform/app/api/billing/webhook/route.ts`)
  - Current: Updates org tier without validating webhook signature properly
  - Fix: Verify Stripe webhook signature, validate org ownership
  - Note: This is a webhook so RLS context is different - document why bypass is acceptable OR add validation

- [ ] **leads/route.ts GET** (`apps/platform/app/api/leads/route.ts`)
  - Current: SuperAdmin bypass is intentional, but regular users need RLS
  - Fix: Already uses conditional `getTenantDb` for non-superadmin - verify it works
  - Test: Non-superadmin can only see their org's leads

- [ ] **leads/route.ts POST** (`apps/platform/app/api/leads/route.ts`)
  - Current: Uses `getSystemDb()` for upsert
  - Decision needed: Should leads be org-scoped or global?
  - If org-scoped: Use `getTenantDb()`
  - If global (marketing): Document why bypass is acceptable

- [ ] **Auth Routes (3 endpoints)** - ACCEPTABLE BYPASS
  - `auth/forgot-password/route.ts`
  - `auth/reset-password/route.ts`
  - `auth/verify-email/route.ts`
  - These need global user lookup by design
  - Action: Add comment documenting why bypass is acceptable:
    ```typescript
    // RLS BYPASS ACCEPTABLE: Global user lookup required for auth flow
    const db = getSystemDb();
    ```

**For each endpoint fixed:**
- [ ] Change `getSystemDb()` to `getTenantDb(orgId)`
- [ ] Add session validation
- [ ] Add audit logging for the access
- [ ] Write test case verifying isolation
- [ ] Document if bypass is intentional

**Success Criteria:** `grep -r "getSystemDb" apps/` returns only documented exceptions

---

### P0-3: Verify MFA Implementation
**Priority:** HIGH | **Effort:** 2 hours | **Owner:** ___________

- [ ] **Test MFA setup flow manually:**
  - [ ] Login to platform as test user
  - [ ] Navigate to Settings → Security
  - [ ] Click "Configure MFA"
  - [ ] Scan QR code with authenticator app
  - [ ] Enter 6-digit code
  - [ ] Verify "MFA Enabled" shows

- [ ] **Test MFA login flow:**
  - [ ] Logout
  - [ ] Login with email/password
  - [ ] Verify MFA prompt appears
  - [ ] Enter correct code → should succeed
  - [ ] Enter wrong code → should fail

- [ ] **Test MFA for privileged roles:**
  - [ ] ADMIN user has MFA enforced
  - [ ] COMPLIANCE_OFFICER has MFA enforced
  - [ ] Document: Should AUDITOR require MFA?

- [ ] **Write automated tests:**
  - [ ] `packages/auth/src/services/__tests__/mfa.test.ts`
  - [ ] Test `MFAService.generateSecret()`
  - [ ] Test `MFAService.verifyToken()` with valid/invalid tokens
  - [ ] Test clock drift tolerance (±30 seconds)

**Success Criteria:** MFA works end-to-end, automated tests pass

---

### P0-4: Verify Account Lockout
**Priority:** HIGH | **Effort:** 1 hour | **Owner:** ___________

- [ ] **Test lockout manually:**
  - [ ] Attempt login with wrong password 5 times
  - [ ] Verify account locked message appears
  - [ ] Verify lockout duration is 15 minutes
  - [ ] Wait 15 minutes, verify can login again

- [ ] **Verify database state:**
  ```sql
  SELECT email, failed_login_attempts, lockout_until
  FROM users
  WHERE failed_login_attempts > 0;
  ```

- [ ] **Verify reset on successful login:**
  - [ ] After successful login, `failed_login_attempts` should be 0
  - [ ] `lockout_until` should be NULL

- [ ] **Write automated test:**
  - [ ] Test 5 failed attempts triggers lockout
  - [ ] Test successful login resets counter

**Success Criteria:** Lockout works, counter resets on success

---

### P0-5: Verify Token Revocation
**Priority:** MEDIUM | **Effort:** 1 hour | **Owner:** ___________

- [ ] **Test logout flow:**
  - [ ] Login, note JWT
  - [ ] Logout
  - [ ] Attempt to use old JWT → should fail

- [ ] **Verify JTI is generated:**
  - [ ] Decode a JWT token
  - [ ] Confirm `jti` field exists and is UUID format

- [ ] **Check revocation storage:**
  - [ ] Verify `RevocationService` is storing revoked JTIs
  - [ ] Check TTL matches token expiry

**Success Criteria:** Logout invalidates tokens, JTI present in all tokens

---

## PHASE 0 COMPLETION CHECKLIST

Before moving to Phase 1, ALL of these must be true:

- [ ] Credentials purged from git history
- [ ] All secrets rotated
- [ ] 8 RLS endpoints fixed or documented
- [ ] MFA tested and working
- [ ] Account lockout tested and working
- [ ] Token revocation tested and working
- [ ] All changes committed and pushed

**Phase 0 Sign-off:** ___________ **Date:** ___________

---

## PHASE 1: Security Foundation (Weeks 2-4)
**Target Completion:** March 17, 2026
**Status:** ⬜ NOT STARTED

### P1-1: Implement Key Rotation Infrastructure
**Priority:** HIGH | **Effort:** 12 hours | **Owner:** ___________

- [ ] **Design key versioning schema:**
  - [ ] Add `kid` (key ID) to JWT header
  - [ ] Create `signing_keys` table:
    ```sql
    CREATE TABLE signing_keys (
      id UUID PRIMARY KEY,
      kid VARCHAR(50) UNIQUE NOT NULL,
      public_key TEXT NOT NULL,
      private_key_encrypted TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ,
      is_active BOOLEAN DEFAULT true
    );
    ```

- [ ] **Implement key rotation ceremony:**
  - [ ] Admin endpoint to generate new key pair
  - [ ] Grace period: old key valid for 24h after rotation
  - [ ] Automatic cleanup of expired keys

- [ ] **Update JWT signing:**
  - [ ] Include `kid` in JWT header
  - [ ] Lookup correct key by `kid` during verification
  - [ ] Fallback to active key if `kid` missing (backwards compat)

- [ ] **Document rotation procedure:**
  - [ ] Step-by-step runbook
  - [ ] Emergency rotation procedure
  - [ ] Key compromise response plan

**Success Criteria:** Can rotate keys without invalidating all sessions

---

### P1-2: Move Secrets to Vault
**Priority:** HIGH | **Effort:** 8 hours | **Owner:** ___________

- [ ] **Choose secrets management solution:**
  - [ ] Option A: Vercel Environment Variables (simplest)
  - [ ] Option B: AWS Secrets Manager
  - [ ] Option C: HashiCorp Vault
  - [ ] Decision: ___________

- [ ] **Migrate secrets:**
  - [ ] `POSTGRES_PASSWORD`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `PLATFORM_PRIVATE_KEY`
  - [ ] `PLATFORM_PUBLIC_KEY`
  - [ ] `ENGINE_API_KEY`
  - [ ] `AUDIT_SIGNING_KEY`
  - [ ] `STRIPE_SECRET_KEY`

- [ ] **Update deployment configuration:**
  - [ ] Remove secrets from `.env.example`
  - [ ] Update CI/CD to pull from vault
  - [ ] Test deployment with vault-sourced secrets

- [ ] **Add secret detection to CI:**
  - [ ] Install `gitleaks` or `trufflehog`
  - [ ] Add pre-commit hook
  - [ ] Add CI check that fails on detected secrets

**Success Criteria:** No secrets in code, all pulled from vault

---

### P1-3: Comprehensive Audit Logging
**Priority:** HIGH | **Effort:** 12 hours | **Owner:** ___________

- [ ] **Define events to log:**
  - [ ] All authentication events (login, logout, MFA, lockout)
  - [ ] All `getSystemDb()` accesses with reason
  - [ ] All SuperAdmin actions
  - [ ] All permission changes
  - [ ] All organization tier changes
  - [ ] All data exports

- [ ] **Create audit logging middleware:**
  ```typescript
  // packages/auth/src/middleware/audit.ts
  export function auditLog(event: string, details: object, orgId?: string)
  ```

- [ ] **Instrument all sensitive endpoints:**
  - [ ] Auth routes
  - [ ] Admin routes
  - [ ] Settings routes
  - [ ] Data export routes

- [ ] **Create audit log viewer:**
  - [ ] Admin dashboard page
  - [ ] Filter by event type, user, date
  - [ ] Export capability

**Success Criteria:** All sensitive actions logged, viewable in admin

---

### P1-4: Add org_id to Leads Table
**Priority:** MEDIUM | **Effort:** 4 hours | **Owner:** ___________

- [ ] **Create migration:**
  ```sql
  ALTER TABLE leads ADD COLUMN org_id UUID REFERENCES organizations(id);
  CREATE INDEX idx_leads_org_id ON leads(org_id);
  ```

- [ ] **Update RLS policy:**
  - [ ] Already added in `packages/db/src/rls_policies.sql`
  - [ ] Verify policy is applied to database

- [ ] **Update leads API:**
  - [ ] POST: Set `org_id` from session if available
  - [ ] GET: Filter by `org_id` for non-superadmin

- [ ] **Backfill existing leads:**
  - [ ] Decide: Assign to org based on email domain? Leave NULL?

**Success Criteria:** Leads table has RLS, tested isolation

---

### P1-5: Consolidate Auth Utilities
**Priority:** MEDIUM | **Effort:** 8 hours | **Owner:** ___________

- [ ] **Identify duplicate auth files:**
  - [ ] `apps/platform/lib/auth.ts`
  - [ ] `apps/admin/lib/auth.ts`
  - [ ] `apps/hq/lib/auth.ts`

- [ ] **Compare implementations:**
  - [ ] Document differences
  - [ ] Identify canonical version

- [ ] **Migrate to `@aic/auth`:**
  - [ ] Move common functions to package
  - [ ] Export unified API
  - [ ] Update all apps to import from package

- [ ] **Delete duplicate files:**
  - [ ] Remove app-level auth.ts files
  - [ ] Update imports throughout

**Success Criteria:** Single auth implementation in `@aic/auth`

---

## PHASE 1 COMPLETION CHECKLIST

- [ ] Key rotation infrastructure built
- [ ] Secrets moved to vault
- [ ] Secret detection in CI
- [ ] Comprehensive audit logging
- [ ] Leads table has org_id and RLS
- [ ] Auth utilities consolidated
- [ ] All changes committed and pushed

**Phase 1 Sign-off:** ___________ **Date:** ___________

**GATE:** Can now begin Alpha outreach conversations

---

## PHASE 2: Stability & Performance (Weeks 5-8)
**Target Completion:** April 14, 2026
**Status:** ⬜ NOT STARTED

### P2-1: Convert Engine Endpoints to Async
**Priority:** HIGH | **Effort:** 24 hours | **Owner:** ___________

- [ ] **Inventory sync endpoints:**
  ```bash
  grep -r "^def " apps/engine/app/api/v1/endpoints/
  grep -r "^async def " apps/engine/app/api/v1/endpoints/
  ```
  - [ ] Count: ___ sync, ___ async

- [ ] **Convert analysis.py endpoints:**
  - [ ] `def disparate_impact` → `async def disparate_impact`
  - [ ] `def equalized_odds` → `async def equalized_odds`
  - [ ] `def intersectional` → `async def intersectional`
  - [ ] (continue for all endpoints)

- [ ] **Update service layer:**
  - [ ] Ensure DB calls use async driver
  - [ ] Use `asyncio.to_thread()` for CPU-bound operations

- [ ] **Test under load:**
  - [ ] 10 concurrent requests → no blocking
  - [ ] 50 concurrent requests → graceful handling

**Success Criteria:** All endpoints async, no blocking under load

---

### P2-2: Migrate Heavy Computation to Celery
**Priority:** HIGH | **Effort:** 16 hours | **Owner:** ___________

- [ ] **Identify CPU-heavy endpoints:**
  - [ ] SHAP explanations (100-500MB, 30-120s)
  - [ ] LIME explanations
  - [ ] Large dataset bias analysis
  - [ ] Model training

- [ ] **Create Celery tasks:**
  ```python
  # apps/engine/app/tasks/explainability.py
  @celery.task
  def compute_shap_explanation(data, config):
      ...
  ```

- [ ] **Update API to return task ID:**
  ```python
  @router.post("/explain/shap")
  async def explain_shap(body: ExplainRequest):
      task = compute_shap_explanation.delay(body.data, body.config)
      return {"task_id": task.id, "status": "PENDING"}
  ```

- [ ] **Create status polling endpoint:**
  ```python
  @router.get("/tasks/{task_id}")
  async def get_task_status(task_id: str):
      result = AsyncResult(task_id)
      return {"status": result.status, "result": result.result}
  ```

- [ ] **Update platform to poll for results:**
  - [ ] Add polling logic to `apps/platform/lib/queue.ts`
  - [ ] Show progress indicator in UI

**Success Criteria:** Heavy computation doesn't block API, tasks complete in background

---

### P2-3: Implement Proper Model Cache
**Priority:** HIGH | **Effort:** 8 hours | **Owner:** ___________

**Already Done (Feb 17):**
- [x] TTL-based cleanup (1 hour)
- [x] LRU eviction at 20 entries
- [x] Centralized config

**Remaining:**

- [ ] **Add memory pressure monitoring:**
  ```python
  import psutil

  def check_memory_pressure():
      mem = psutil.virtual_memory()
      if mem.percent > 80:
          _cleanup_cache(force=True)
  ```

- [ ] **Add cache metrics:**
  - [ ] Hit/miss ratio
  - [ ] Eviction count
  - [ ] Memory usage

- [ ] **Expose cache stats endpoint:**
  ```python
  @router.get("/debug/cache")
  def get_cache_stats():
      return {
          "entries": len(_MODEL_CACHE),
          "memory_mb": get_cache_memory_usage(),
          "hit_rate": _CACHE_HITS / (_CACHE_HITS + _CACHE_MISSES)
      }
  ```

- [ ] **Load test cache behavior:**
  - [ ] 100 unique datasets → should not OOM
  - [ ] Repeated datasets → should hit cache

**Success Criteria:** Engine handles 100 requests without OOM

---

### P2-4: Add Request Size Limits
**Priority:** MEDIUM | **Effort:** 4 hours | **Owner:** ___________

**Already Done (Feb 17):**
- [x] Config: `MAX_DATA_ROWS=10,000`
- [x] Config: `MAX_FEATURES=500`
- [x] Config: `MAX_BATCH_SIZE=100`

**Remaining:**

- [ ] **Enforce limits in all endpoints:**
  ```python
  if len(body.data) > MAX_DATA_ROWS:
      raise HTTPException(400, f"Data exceeds {MAX_DATA_ROWS} rows")
  ```

- [ ] **Add request body size middleware:**
  ```python
  # Already in config: MAX_BODY_SIZE = 10MB
  # Verify middleware is applied
  ```

- [ ] **Test limit enforcement:**
  - [ ] Send 15,000 row payload → should reject
  - [ ] Send 600 feature payload → should reject

**Success Criteria:** Oversized requests rejected with clear error

---

### P2-5: Set Up Staging Environment
**Priority:** MEDIUM | **Effort:** 8 hours | **Owner:** ___________

- [ ] **Choose hosting:**
  - [ ] Option A: Vercel (Next.js) + Railway (Engine)
  - [ ] Option B: AWS (all services)
  - [ ] Option C: DigitalOcean
  - [ ] Decision: ___________

- [ ] **Create staging database:**
  - [ ] Separate PostgreSQL instance
  - [ ] Seed with test data (not production data!)

- [ ] **Deploy staging apps:**
  - [ ] `staging.aicpulse.co.za` (platform)
  - [ ] `staging-engine.aicpulse.co.za` (engine)

- [ ] **Configure CI/CD:**
  - [ ] Auto-deploy `develop` branch to staging
  - [ ] Run tests before deploy

- [ ] **Add staging environment variables:**
  - [ ] Separate secrets from production
  - [ ] Test Stripe keys

**Success Criteria:** Staging environment mirrors production, auto-deploys

---

## PHASE 2 COMPLETION CHECKLIST

- [ ] All engine endpoints async
- [ ] Heavy computation via Celery
- [ ] Model cache properly bounded
- [ ] Request size limits enforced
- [ ] Staging environment live
- [ ] Load tested to 50 concurrent orgs

**Phase 2 Sign-off:** ___________ **Date:** ___________

**GATE:** Can now onboard Alpha participants

---

## PHASE 3: Architecture Enforcement (Weeks 9-12)
**Target Completion:** May 12, 2026
**Status:** ⬜ NOT STARTED

### P3-1: Add ESLint Import Boundaries
**Priority:** MEDIUM | **Effort:** 8 hours | **Owner:** ___________

- [ ] **Install eslint-plugin-boundaries:**
  ```bash
  npm install -D eslint-plugin-boundaries
  ```

- [ ] **Configure boundaries in eslint.config.mjs:**
  ```javascript
  {
    rules: {
      "boundaries/element-types": [2, {
        default: "disallow",
        rules: [
          { from: "apps/*", allow: ["packages/*"] },
          { from: "packages/*", allow: ["packages/*"] },
          // apps cannot import from each other
        ]
      }]
    }
  }
  ```

- [ ] **Fix violations:**
  - [ ] Run ESLint, count violations
  - [ ] Fix each cross-app import
  - [ ] Move shared code to packages

**Success Criteria:** `npm run lint` passes with boundaries enforced

---

### P3-2: Enforce Ledger as Mandatory Gate
**Priority:** HIGH | **Effort:** 16 hours | **Owner:** ___________

- [ ] **Design ledger middleware:**
  ```typescript
  // All state-changing operations must call this
  async function appendToLedger(event: LedgerEvent): Promise<string> {
    // Generate hash, link to previous, store
    return ledgerEntryId;
  }
  ```

- [ ] **Identify operations requiring ledger:**
  - [ ] Decision records created
  - [ ] Model registrations
  - [ ] User permission changes
  - [ ] Organization tier changes
  - [ ] Incident status changes

- [ ] **Add ledger calls to each endpoint:**
  - [ ] Before INSERT/UPDATE, call `appendToLedger()`
  - [ ] Store `ledger_entry_id` in the record

- [ ] **Add database trigger as backup:**
  ```sql
  CREATE TRIGGER ensure_ledger_entry
  BEFORE INSERT ON decision_records
  FOR EACH ROW
  WHEN (NEW.ledger_entry_id IS NULL)
  EXECUTE FUNCTION reject_unlogged_write();
  ```

- [ ] **Create ledger verification endpoint:**
  - [ ] Walk chain from any entry
  - [ ] Verify all hashes

**Success Criteria:** State changes without ledger entry are rejected

---

### P3-3: Type Safety Hardening
**Priority:** MEDIUM | **Effort:** 16 hours | **Owner:** ___________

- [ ] **Count current violations:**
  ```bash
  grep -r "any" --include="*.ts" --include="*.tsx" | wc -l
  ```
  Current count: ___

- [ ] **Enable strict mode in all tsconfigs:**
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true
    }
  }
  ```

- [ ] **Fix violations by file:**
  - [ ] `packages/db/src/schema.ts` (AnyPgColumn issue)
  - [ ] `packages/auth/src/index.ts`
  - [ ] `apps/platform/lib/queue.ts`
  - [ ] (continue for all files)

- [ ] **Add type-check to CI:**
  ```bash
  npm run type-check  # Should pass with 0 errors
  ```

**Success Criteria:** `any` count < 10, all in documented exceptions

---

## PHASE 3 COMPLETION CHECKLIST

- [ ] ESLint import boundaries enforced
- [ ] Ledger is mandatory gate
- [ ] Type violations < 10
- [ ] All changes committed and pushed

**Phase 3 Sign-off:** ___________ **Date:** ___________

---

## PHASE 4: Production Hardening (Weeks 13-16)
**Target Completion:** June 9, 2026
**Status:** ⬜ NOT STARTED

### P4-1: External Security Audit
**Priority:** HIGH | **Effort:** 16 hours + external | **Owner:** ___________

- [ ] **Select security auditor:**
  - [ ] Get 3 quotes
  - [ ] Decision: ___________
  - [ ] Budget: ZAR ___________

- [ ] **Prepare for audit:**
  - [ ] Documentation package
  - [ ] Access credentials
  - [ ] Architecture diagrams

- [ ] **Schedule audit:**
  - [ ] Date: ___________
  - [ ] Duration: ___ days

- [ ] **Remediate findings:**
  - [ ] Critical: Fix within 24h
  - [ ] High: Fix within 1 week
  - [ ] Medium: Fix within 2 weeks

- [ ] **Get clean report:**
  - [ ] Re-test after fixes
  - [ ] Obtain certification letter

**Success Criteria:** External auditor certifies no critical/high issues

---

### P4-2: Load Testing
**Priority:** HIGH | **Effort:** 16 hours | **Owner:** ___________

- [ ] **Set up load testing tool:**
  - [ ] Option A: k6
  - [ ] Option B: Locust
  - [ ] Option C: Artillery
  - [ ] Decision: ___________

- [ ] **Create test scenarios:**
  - [ ] 50 concurrent users browsing dashboard
  - [ ] 10 concurrent bias analyses
  - [ ] 5 concurrent SHAP explanations
  - [ ] Sustained 100 req/min for 1 hour

- [ ] **Run tests against staging:**
  - [ ] Record response times
  - [ ] Monitor memory usage
  - [ ] Check for errors

- [ ] **Document results:**
  - [ ] P95 response time: ___ ms
  - [ ] Max memory usage: ___ MB
  - [ ] Error rate: ___%

- [ ] **Optimize if needed:**
  - [ ] Database query optimization
  - [ ] Caching improvements
  - [ ] Horizontal scaling

**Success Criteria:** 50 concurrent orgs, P95 < 2s, 0% error rate

---

### P4-3: Error Tracking (Sentry)
**Priority:** MEDIUM | **Effort:** 4 hours | **Owner:** ___________

- [ ] **Create Sentry project:**
  - [ ] Organization: ___________
  - [ ] Project: aic-platform

- [ ] **Install Sentry SDK:**
  ```bash
  npm install @sentry/nextjs
  ```

- [ ] **Configure for each app:**
  - [ ] `apps/web/sentry.client.config.ts`
  - [ ] `apps/platform/sentry.client.config.ts`
  - [ ] `apps/admin/sentry.client.config.ts`

- [ ] **Configure for engine:**
  ```bash
  pip install sentry-sdk[fastapi]
  ```

- [ ] **Set up alerts:**
  - [ ] Critical errors → immediate notification
  - [ ] Error spike → Slack channel

**Success Criteria:** Errors captured in Sentry, alerts configured

---

### P4-4: Documentation Review
**Priority:** MEDIUM | **Effort:** 8 hours | **Owner:** ___________

- [ ] **Review all docs for accuracy:**
  - [ ] TECHNICAL_AUDIT still accurate?
  - [ ] REMEDIATION_ROADMAP status updated?
  - [ ] API documentation current?

- [ ] **Create operations runbook:**
  - [ ] Deployment procedure
  - [ ] Rollback procedure
  - [ ] Incident response procedure
  - [ ] On-call rotation

- [ ] **Create user documentation:**
  - [ ] Platform user guide
  - [ ] API integration guide
  - [ ] FAQ

**Success Criteria:** Docs reviewed, runbook exists

---

## PHASE 4 COMPLETION CHECKLIST

- [ ] External security audit passed
- [ ] Load testing passed
- [ ] Error tracking configured
- [ ] Documentation complete
- [ ] Production deployment checklist created

**Phase 4 Sign-off:** ___________ **Date:** ___________

**GATE:** Series A due diligence ready

---

## CURRENT BLOCKERS

| Blocker | Impact | Owner | Status |
|---------|--------|-------|--------|
| | | | |
| | | | |
| | | | |

---

## DAILY STANDUP TEMPLATE

**Date:** ___________

**Yesterday:**
-

**Today:**
-

**Blockers:**
-

---

## WEEKLY CHECKPOINT TEMPLATE

**Week:** ___ of 16
**Phase:** ___

**Completed This Week:**
- [ ]
- [ ]

**Planned Next Week:**
- [ ]
- [ ]

**Risk/Issues:**
-

**On Track?** Yes / No / At Risk

---

## CONTACT INFO

| Role | Name | Contact |
|------|------|---------|
| Project Owner | | |
| Technical Lead | | |
| Security Contact | | |
| Investor Contact | | |

---

*AI Integrity Certification | Next Steps Checklist | February 17, 2026*
