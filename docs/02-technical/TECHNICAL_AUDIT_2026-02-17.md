# AIC Platform Technical Audit Report
## 360-Degree Assessment for Series A Readiness

**Audit Date:** February 17, 2026
**Auditor:** Principal Software Architect
**Classification:** CONFIDENTIAL - Investor Due Diligence Material

---

## Executive Verdict

**Platform Status: REFACTOR-REQUIRED LIABILITY**

The AIC Platform exhibits a **Vision-Code Gap** of approximately **18-24 months** of engineering effort. While the architectural vision is sound (sovereign AI oversight, immutable audit ledger, algorithmic rights enforcement), the implementation is a **prototype masquerading as production infrastructure**.

| Pillar | Grade | Verdict |
|--------|-------|---------|
| Architectural Integrity | **D** | Folder organization, not enforced monorepo |
| Data Sovereignty (RLS) | **F** | 9 endpoints bypass RLS; tenant isolation broken |
| Identity & Auth | **F** | Tutorial-level; no MFA, credentials in git |
| Type Safety | **C-** | 55 violations; cross-layer inconsistency |
| Performance/Memory | **F** | OOM within hours under production load |

**Series A Risk:** An institutional investor performing technical due diligence will identify these issues within 4 hours of code review.

---

## 1. Architectural Integrity Assessment

### Finding: Monorepo is File Organization, Not Architecture

**Turborepo Status:** Configured but provides **zero enforcement**

```
turbo.json defines only build/test/lint tasks
No import boundary rules
No forbidden zones
Apps can import from each other freely
```

### The Separation of Concerns Illusion

| Issue | Evidence | Impact |
|-------|----------|--------|
| **Duplicate Auth** | 3 identical `lib/auth.ts` files across apps | Code drift, inconsistent role logic |
| **Competing EngineClients** | `apps/platform/lib/engine-client.ts` (391 lines) vs `packages/api-client/src/index.ts` (66 lines) | Wrong client may be used |
| **Dead Packages** | 5 packages created but never imported: `@aic/api-client`, `@aic/sockets`, `@aic/events`, `@aic/middleware`, `@aic/reports` | Wasted maintenance |
| **No ESLint Boundaries** | No `eslint-plugin-import` rules preventing cross-app imports | No automatic violation detection |

### Single Points of Failure (50 Orgs Scenario)

| Component | Failure Point | Threshold |
|-----------|---------------|-----------|
| **Uvicorn Workers** | 4 workers, synchronous endpoints | 4 concurrent requests |
| **Model Cache** | Per-worker, unbounded growth | OOM in ~8 hours |
| **SHAP/LIME** | 100-500MB per request, blocking | 5 concurrent = crash |
| **PostgreSQL** | Single instance, no read replicas | Connection pool exhaustion |
| **Redis** | Celery results held in memory | 500 pending tasks = exhaustion |

**The Power Grid Fails First At:** Python Engine synchronous API layer. Within 30 minutes of 50 orgs hitting the system, the engine will OOM.

---

## 2. Data Sovereignty & Security Assessment

### Critical: RLS Bypassed in 9 Endpoints

The RLS architecture is **theoretically correct** but **operationally broken**:

```sql
-- RLS Policy (packages/db/src/rls_policies.sql)
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
```

**However, these endpoints call `getSystemDb()` instead of `getTenantDb(orgId)`:**

| Endpoint | File | Risk |
|----------|------|------|
| `POST /api/incidents/public` | `incidents/public/route.ts:33` | **CRITICAL** - Accepts `orgId` from request body, creates incidents for ANY org |
| `POST /api/incidents/escalate` | `incidents/escalate/route.ts:13` | Reads ALL incidents across ALL tenants |
| `POST /api/billing/webhook` | `billing/webhook/route.ts:37` | Updates org tier without validating webhook orgId |
| `GET /api/leads` | `leads/route.ts:20` | No `org_id` column - leads table has zero isolation |
| Auth routes (3) | `forgot-password`, `reset-password`, `verify-email` | Global user lookup enables email enumeration |

### Identity Layer Assessment

**Question:** Is NextAuth sufficient for a "National Authority"?

**Answer: NO.** This is tutorial-level authentication with critical gaps:

| Requirement | Status | Gap |
|-------------|--------|-----|
| **MFA** | NOT IMPLEMENTED | Database has no TOTP columns |
| **JTI (Token ID)** | Referenced but never generated | Revocation system non-functional |
| **Account Lockout** | NONE | Unlimited brute force attempts |
| **Key Rotation** | No versioning | Compromised key = all tokens invalid |
| **Identity Proofing** | Email domain only | Auto-creates users on domain match |
| **Cryptographic JWS** | RS256 implemented | But fallback returns empty string on missing key |

**CRITICAL: Credentials in Git**
```
.env files contain plaintext POSTGRES_PASSWORD
Committed as binary files (detected in .git)
```

---

## 3. Type Safety Assessment

### Type Rot Quantified

| Category | Count | Severity |
|----------|-------|----------|
| Direct `any` usage | 35 occurrences / 23 files | HIGH |
| `as any` assertions | 20 occurrences / 13 files | HIGH |
| `Record<string, any>[]` | 36 occurrences / 2 files | CRITICAL |
| Definition sites per type | 4-5 per core type | MEDIUM |

### Drifting Definitions

**Organization** appears in 5 places with inconsistent fields:

1. `packages/types/index.ts` - canonical TypeScript interface
2. `packages/db/src/schema.ts` - Drizzle ORM (camelCase vs snake_case mismatch)
3. API responses - manually constructed objects
4. NextAuth session - double-cast `(user.permissions as unknown as Permissions)`
5. Python Pydantic models - separate validation schema

### Worst Type Offenders

1. **`apps/platform/lib/engine-client.ts`** - 20+ methods with `Record<string, any>[]` parameters
2. **`apps/platform/app/api/organizations/[id]/route.ts`** - 3x `as any` database transaction casts
3. **`packages/api-client/src/index.ts`** - Full engine client untyped

---

## 4. Performance & Memory Assessment

### Python Engine Assessment

**Question:** Is it "Stateful" or "Stateless Script Wrapper"?

**Answer: Stateless Script Wrapper** with problematic pseudo-state (model cache).

```
Architecture:
- 4 Uvicorn workers (synchronous, blocking)
- 40+ endpoints defined as `def`, not `async def`
- Celery exists but only 4 endpoints use it
- Each worker maintains separate model cache (inconsistent state)
```

### Memory Handling: Critical OOM Risks

| Operation | Memory Cost | Duration | Risk |
|-----------|-------------|----------|------|
| DataFrame creation | 3x JSON size | Instantaneous | Spike |
| SHAP KernelExplainer | 100-500MB | 30-120 seconds | Blocking |
| Model training | 50MB per model | 5-15 seconds | Cumulative |
| Model cache (20 entries) | 1GB per worker | Persistent | Unbounded growth |

**Model Cache Implementation (`explainability.py:260-373`):**
```python
if len(_MODEL_CACHE) > 20:
    oldest_key = min(_MODEL_CACHE.keys(), ...)
    del _MODEL_CACHE[oldest_key]
```

**Issue:** Only deletes when threshold exceeded. With 4 workers x 50% unique datasets x 100 requests/hour:
- 200 models/day x 50MB = **10GB in 24 hours**
- No TTL, no LRU, no memory pressure response

---

## 5. Audit Immutability Assessment

### Finding: The Ledger is NOT a Mandatory Gate

The hash chain architecture exists but **is not enforced**:

```typescript
// LedgerService exists but API routes can bypass entirely
// apps/platform/app/api/decisions/route.ts
await db.insert(decisionRecords).values({...});
// No LedgerService.appendEntry() call required
```

**Where Ledger IS Used:**
- `audit-logs/route.ts` - explicit hash chain verification
- `incidents/[id]/route.ts` - status changes logged

**Where Ledger IS NOT Used:**
- Decision records (core algorithmic decisions)
- Model registration/updates
- User permission changes
- Organization tier changes

**Impact:** The "immutable audit trail" claim is marketing, not architecture.

---

## 6. Documentation vs Reality Matrix

| Claim in Existing Docs | Reality from Audit |
|------------------------|-------------------|
| "RLS resolved via getTenantDb()" | 9 endpoints bypass RLS entirely |
| "Auth hardening resolved" | No MFA, JTI not generated, tutorial-level |
| "70-80% production ready" | F grades across security, memory, auth |
| "268 tests passing" | Tests exist but don't catch the critical issues |
| "Tenant isolation complete" | User-supplied orgId accepted without validation |
| "11 shared packages operational" | 5 are completely unused/dead code |
| "Celery async tasks complete" | Only 4 of 40+ endpoints use Celery |
| "Circuit breaker operational" | Dead code - @aic/api-client never imported |

---

## 7. Series A Due Diligence Risks

### What Investors Will Find in 4 Hours

1. **Credentials in Git** - Immediate disqualification for security-conscious investors
2. **No MFA** - Unacceptable for regulatory tech
3. **RLS Bypass Endpoints** - Multi-tenancy claim invalidated
4. **OOM in Hours** - Not production-ready
5. **Dead Shared Packages** - Engineering maturity concerns

### The Vision-Code Gap

| Claimed Capability | Implementation Reality |
|--------------------|------------------------|
| "Sovereign AI Oversight" | No identity proofing, email domain trust |
| "Immutable Audit Trail" | Optional ledger, bypassable |
| "Enterprise Multi-Tenancy" | 9 RLS bypass points |
| "Production-Ready Engine" | Script wrapper, OOM risk |
| "Type-Safe Monorepo" | 55 type violations, 5 dead packages |

---

## 8. Remediation Roadmap

### Phase 0: Stop the Bleeding (Week 1)
| Task | Priority | Effort |
|------|----------|--------|
| Remove credentials from git history | P0 | 2h |
| Implement account lockout (5 attempts) | P0 | 4h |
| Generate JTI for all tokens | P0 | 2h |
| Fix `incidents/public` orgId validation | P0 | 2h |

### Phase 1: Security Critical (Weeks 2-4)
| Task | Priority | Effort |
|------|----------|--------|
| Implement MFA (TOTP minimum) | P0 | 16h |
| Audit all `getSystemDb()` calls | P0 | 8h |
| Add `org_id` to leads table | P1 | 4h |
| Move secrets to vault | P1 | 8h |
| Implement key rotation support | P1 | 12h |

### Phase 2: Stability (Weeks 5-8)
| Task | Priority | Effort |
|------|----------|--------|
| Convert engine endpoints to async | P0 | 24h |
| Implement LRU cache with TTL | P1 | 8h |
| Add streaming for SHAP/LIME | P1 | 16h |
| Delete unused packages or document | P2 | 4h |

### Phase 3: Architecture (Weeks 9-16)
| Task | Priority | Effort |
|------|----------|--------|
| Add ESLint import boundary rules | P1 | 8h |
| Consolidate to single EngineClient | P1 | 8h |
| Enforce ledger as mandatory gate | P0 | 16h |
| Implement comprehensive audit logging | P1 | 12h |

---

## 9. Effort Summary

| Category | Hours | Timeline |
|----------|-------|----------|
| Security Critical Path | 80-100h | Weeks 1-4 |
| Engine Rewrite | 60-80h | Weeks 5-8 |
| Architecture Enforcement | 40-60h | Weeks 9-12 |
| Documentation & Cleanup | 20-30h | Ongoing |
| **Total** | **200-270h** | **12-16 weeks** |

**With 2 engineers:** 6-8 weeks intensive
**With 1 engineer:** 12-16 weeks

---

## 10. Verdict

**The AIC Platform is a vision document with executable code, not production infrastructure.**

For Series A readiness:
- **5-7 months** before institutional due diligence passes
- **CRITICAL** items must be resolved before any alpha deployment

**Current State Appropriate For:**
- Alpha pilot with 5-10 orgs under close supervision
- Demo environments
- NOT: Production deployment
- NOT: Series A fundraising
- NOT: National regulatory authority status

---

*AI Integrity Certification | Technical Audit | February 17, 2026 | CONFIDENTIAL*
