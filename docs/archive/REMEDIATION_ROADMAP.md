# AIC Platform Remediation Roadmap
## Path to Series A Technical Readiness

**Created:** February 17, 2026
**Status:** ACTIVE - Engineering Priority Document
**Target:** Series A Due Diligence Ready

---

## Current State Summary

Based on the comprehensive 360-degree audit conducted on February 17, 2026, the platform requires significant remediation work before Series A readiness.

### Platform Grades

| Pillar | Current Grade | Target Grade | Gap |
|--------|---------------|--------------|-----|
| Architectural Integrity | D | B+ | Major refactoring |
| Data Sovereignty (RLS) | F | A | Critical security fixes |
| Identity & Auth | F | A | Enterprise auth implementation |
| Type Safety | C- | B+ | Systematic type hardening |
| Performance/Memory | F | B | Engine rewrite required |

### Critical Issues Requiring Immediate Attention

1. **9 RLS Bypass Endpoints** - Tenant isolation broken
2. **No MFA Implementation** - Single-factor auth only
3. **Credentials in Git** - Plaintext secrets committed
4. **Engine OOM Risk** - Will crash under production load
5. **Token Revocation Non-functional** - JTI never generated
6. **5 Dead Shared Packages** - Unused code in monorepo

---

## Phase 0: Emergency Security (Week 1)

### P0-1: Purge Credentials from Git History
**Owner:** DevOps Lead
**Effort:** 4 hours
**Risk if Skipped:** Immediate security audit failure

```bash
# Actions Required
1. Use BFG Repo-Cleaner to purge .env files from history
2. Rotate ALL secrets (database, NextAuth, API keys)
3. Update all deployment configurations
4. Invalidate any cached credentials
```

**Files Affected:**
- `.env` (all apps)
- `docker-compose.yml`
- Any deployment scripts

### P0-2: Fix Incident Public Endpoint
**Owner:** Backend Engineer
**Effort:** 2 hours
**Risk if Skipped:** Any user can create incidents for any org

**File:** `apps/platform/app/api/incidents/public/route.ts`

**Current (VULNERABLE):**
```typescript
const { orgId: providedOrgId } = body;
// Accepts any orgId from request body
```

**Required Fix:**
```typescript
// Validate orgId matches known organization
// Or remove orgId from request, derive from authenticated session
```

### P0-3: Implement Account Lockout
**Owner:** Auth Engineer
**Effort:** 4 hours
**Risk if Skipped:** Unlimited brute force attempts

**File:** `packages/auth/src/index.ts`

**Implementation:**
- Track failed login attempts in Redis/DB
- Lock account after 5 failed attempts
- Exponential backoff: 30s, 2m, 5m, 15m, 1hr
- Admin unlock mechanism

### P0-4: Generate JTI for All Tokens
**Owner:** Auth Engineer
**Effort:** 2 hours
**Risk if Skipped:** Token revocation non-functional

**File:** `packages/auth/src/index.ts` (lines 133-135)

**Current:**
```typescript
return jwt.sign(token!, PRIVATE_KEY, { algorithm: 'RS256' });
// No JTI generated
```

**Required:**
```typescript
import { v4 as uuidv4 } from 'uuid';
return jwt.sign({ ...token!, jti: uuidv4() }, PRIVATE_KEY, { algorithm: 'RS256' });
```

---

## Phase 1: Security Foundation (Weeks 2-4)

### P1-1: Implement MFA (TOTP)
**Owner:** Auth Engineer
**Effort:** 16 hours
**Deliverables:**
- Database schema for TOTP secrets
- QR code generation for authenticator apps
- TOTP validation on login
- Backup codes for recovery
- Mandatory for ADMIN and COMPLIANCE_OFFICER roles

**New Files:**
- `packages/auth/src/services/mfa.ts`
- `apps/platform/app/settings/security/page.tsx`

**Schema Addition:**
```sql
ALTER TABLE users ADD COLUMN totp_secret TEXT;
ALTER TABLE users ADD COLUMN mfa_enabled BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN backup_codes JSONB;
```

### P1-2: Audit All getSystemDb() Calls
**Owner:** Backend Engineer
**Effort:** 8 hours
**Deliverables:**
- Document every `getSystemDb()` usage
- Add comment explaining why RLS bypass is acceptable
- Convert to `getTenantDb()` where possible
- Add audit logging for remaining cases

**Known Locations (9 endpoints):**
1. `incidents/escalate/route.ts:13`
2. `incidents/public/route.ts:33`
3. `leads/route.ts:20`
4. `leads/route.ts:80`
5. `auth/forgot-password/route.ts:14`
6. `auth/verify-email/route.ts:12`
7. `auth/reset-password/route.ts:17`
8. `billing/webhook/route.ts:37`
9. `organizations/[id]/route.ts:25`

### P1-3: Add org_id to Leads Table
**Owner:** Backend Engineer
**Effort:** 4 hours
**Risk if Skipped:** No tenant isolation for leads

**Migration:**
```sql
ALTER TABLE leads ADD COLUMN org_id UUID REFERENCES organizations(id);
CREATE INDEX idx_leads_org_id ON leads(org_id);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
```

### P1-4: Move Secrets to Vault
**Owner:** DevOps Lead
**Effort:** 8 hours
**Options:**
- Vercel Environment Variables (simplest)
- HashiCorp Vault (enterprise)
- AWS Secrets Manager (cloud-native)

**Secrets to Migrate:**
- `POSTGRES_PASSWORD`
- `NEXTAUTH_SECRET`
- `PLATFORM_PRIVATE_KEY`
- `PLATFORM_PUBLIC_KEY`
- `ENGINE_API_KEY`
- `AUDIT_SIGNING_KEY`

### P1-5: Implement Key Rotation Support
**Owner:** Auth Engineer
**Effort:** 12 hours
**Deliverables:**
- Multiple active keys with version identifiers
- JWT `kid` header for key identification
- Admin ceremony for key rotation
- Graceful deprecation of old keys

---

## Phase 2: Stability & Performance (Weeks 5-8)

### P2-1: Convert Engine Endpoints to Async
**Owner:** Python Engineer
**Effort:** 24 hours
**Impact:** Enables concurrent request handling

**Current (40+ synchronous endpoints):**
```python
@router.post("/analyze")
def disparate_impact(body: BiasAuditRequest, request: Request):
    # Blocks entire worker thread
```

**Target:**
```python
@router.post("/analyze")
async def disparate_impact(body: BiasAuditRequest, request: Request):
    # Non-blocking, can handle concurrent requests
```

### P2-2: Implement Model Cache LRU with TTL
**Owner:** Python Engineer
**Effort:** 8 hours
**Current Issue:** Unbounded cache growth causes OOM

**File:** `apps/engine/app/services/explainability.py`

**Implementation:**
```python
from cachetools import TTLCache
from functools import lru_cache

# Replace naive _MODEL_CACHE with:
_MODEL_CACHE = TTLCache(maxsize=20, ttl=3600)  # 20 models, 1 hour TTL
```

### P2-3: Add Streaming for SHAP/LIME
**Owner:** Python Engineer
**Effort:** 16 hours
**Current Issue:** 100-500MB memory per request

**Approach:**
- Chunk large datasets
- Stream partial results
- Use Celery for all heavy computation
- Return task IDs for polling

### P2-4: Migrate All Endpoints to Celery
**Owner:** Python Engineer
**Effort:** 16 hours
**Current:** Only 4 of 40+ endpoints use Celery

**Target:** All computation-heavy endpoints:
- All bias analysis endpoints
- All explainability endpoints
- All drift monitoring endpoints

### P2-5: Delete or Document Unused Packages
**Owner:** Tech Lead
**Effort:** 4 hours

**Dead Packages:**
| Package | Action | Reason |
|---------|--------|--------|
| `@aic/api-client` | DELETE or CONSOLIDATE | Competing with platform engine-client |
| `@aic/sockets` | DELETE or DOCUMENT | Zero imports |
| `@aic/events` | MERGE into types | 7 lines only |
| `@aic/middleware` | DELETE or USE | Never imported |
| `@aic/reports` | DELETE or USE | Never imported |

---

## Phase 3: Architecture Enforcement (Weeks 9-12)

### P3-1: Add ESLint Import Boundary Rules
**Owner:** Tech Lead
**Effort:** 8 hours

**Add to `eslint.config.mjs`:**
```javascript
{
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          "../apps/*/",  // No cross-app imports
          "apps/*/",
          "@aic/**/internal"  // No internal package access
        ]
      }
    ]
  }
}
```

### P3-2: Consolidate to Single EngineClient
**Owner:** Backend Engineer
**Effort:** 8 hours

**Decision:** Keep `apps/platform/lib/engine-client.ts` (391 lines, feature-complete)
**Action:** Delete `packages/api-client/src/index.ts` (66 lines, unused)

### P3-3: Enforce Ledger as Mandatory Gate
**Owner:** Backend Engineer
**Effort:** 16 hours
**Current Issue:** Critical events bypass audit ledger

**Implementation:**
1. Create middleware that wraps state-changing operations
2. Require `LedgerService.appendEntry()` before any INSERT/UPDATE
3. Add database trigger as backup enforcement
4. Alert on any direct writes that bypass ledger

### P3-4: Implement Comprehensive Audit Logging
**Owner:** Backend Engineer
**Effort:** 12 hours

**Required Events:**
- All authentication decisions (success, failure, lockout)
- All `getSystemDb()` accesses
- All SuperAdmin actions
- All permission changes
- All organization tier changes

### P3-5: Consolidate Auth Utilities
**Owner:** Backend Engineer
**Effort:** 8 hours

**Current:** 3 duplicate `lib/auth.ts` files
**Action:** Move all to `@aic/auth` package, export unified API

---

## Phase 4: Production Hardening (Weeks 13-16)

### P4-1: Implement Distributed Rate Limiting
**Owner:** Backend Engineer
**Effort:** 8 hours

**File:** `packages/middleware/src/rate-limit.ts`
**Backend:** Redis-based sliding window

### P4-2: Add SAST to CI Pipeline
**Owner:** DevOps Lead
**Effort:** 4 hours

**Tools:**
- Semgrep for code analysis
- npm audit for dependencies
- pip-audit for Python

### P4-3: Implement Secret Detection Pre-commit
**Owner:** DevOps Lead
**Effort:** 2 hours

**Tool:** trufflesecurity/trufflehog or gitleaks

### P4-4: Load Testing
**Owner:** QA Engineer
**Effort:** 16 hours

**Scenarios:**
- 50 concurrent organizations
- 100 requests/minute sustained
- SHAP/LIME under load
- Memory pressure testing

### P4-5: Staging Environment
**Owner:** DevOps Lead
**Effort:** 8 hours

**Requirements:**
- Mirror production architecture
- Separate database
- CI/CD deployment on PR merge to develop

---

## Success Criteria

### Series A Technical Due Diligence Checklist

#### Security (Must Pass)
- [ ] No credentials in git history
- [ ] MFA implemented and mandatory for privileged users
- [ ] All RLS bypass points documented and justified
- [ ] Account lockout implemented
- [ ] Token revocation functional
- [ ] Secrets in secure vault

#### Scalability (Must Pass)
- [ ] Engine handles 50+ concurrent requests without OOM
- [ ] Model cache bounded with TTL
- [ ] All heavy computation in background tasks
- [ ] Load tested to spec

#### Architecture (Should Pass)
- [ ] Import boundaries enforced
- [ ] No duplicate code across apps
- [ ] All shared packages actively used or removed
- [ ] Audit ledger mandatory for state changes

#### Quality (Should Pass)
- [ ] Type violations < 10
- [ ] Test coverage > 80%
- [ ] All CI checks passing

---

## Timeline Summary

| Phase | Focus | Duration | End Date |
|-------|-------|----------|----------|
| Phase 0 | Emergency Security | 1 week | Week 1 |
| Phase 1 | Security Foundation | 3 weeks | Week 4 |
| Phase 2 | Stability & Performance | 4 weeks | Week 8 |
| Phase 3 | Architecture Enforcement | 4 weeks | Week 12 |
| Phase 4 | Production Hardening | 4 weeks | Week 16 |

**Total Timeline:** 16 weeks (4 months)
**With Parallel Work:** 10-12 weeks (2.5-3 months)
**Minimum for Series A Ready:** 8 weeks (2 months, critical path only)

---

## Resource Requirements

| Role | Allocation | Duration |
|------|------------|----------|
| Backend Engineer | 100% | 16 weeks |
| Python Engineer | 100% | 8 weeks (Phase 2) |
| Auth Engineer | 50% | 4 weeks (Phase 0-1) |
| DevOps Lead | 25% | Ongoing |
| Tech Lead | 25% | Code review, decisions |

**Total Effort:** 200-270 engineering hours

---

## Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scope creep | High | Freeze features, security only |
| Key personnel unavailable | Medium | Document decisions, pair programming |
| Unexpected dependencies | Medium | Spike early, prototype risky changes |
| Investor timeline pressure | High | Communicate realistic dates upfront |

---

## Weekly Checkpoints

**Week 1:** Phase 0 complete, credentials purged
**Week 4:** Phase 1 complete, MFA deployed
**Week 8:** Phase 2 complete, engine stable
**Week 12:** Phase 3 complete, architecture enforced
**Week 16:** Phase 4 complete, Series A ready

---

*AI Integrity Certification | Remediation Roadmap | February 17, 2026*
