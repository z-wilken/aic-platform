# AIC Engineering Roadmap
## Technical Debt, Security Hardening & Production Readiness

**Version:** 3.0 (Major Revision)
**Date:** February 17, 2026
**Classification:** CONFIDENTIAL

---

## Executive Summary

This document supersedes all previous versions following a comprehensive 360-degree technical audit. The previous assessments (February 12 and February 15, 2026) contained inaccurate progress reports.

### Assessment Evolution

| Date | Assessment | Reality |
|------|------------|---------|
| Feb 12, 2026 | Vision 10/10, Code 3/10 | Accurate |
| Feb 15, 2026 | Vision 10/10, Code 7/10 | **Overstated** |
| Feb 17, 2026 | Vision 10/10, Code 4/10 | **Current accurate state** |

---

## Critical Issues (Updated Status)

### Issue 1: Authentication Security - NOT RESOLVED

**Previous Claim:** "Auth hardening complete"
**Actual Status:** Tutorial-level authentication

| Feature | Status | Risk |
|---------|--------|------|
| Multi-Factor Authentication | NOT IMPLEMENTED | CRITICAL |
| Account Lockout | NOT IMPLEMENTED | CRITICAL |
| Token Revocation | BROKEN (JTI not generated) | HIGH |
| Key Rotation | NOT SUPPORTED | HIGH |
| Brute Force Protection | NONE | HIGH |
| Identity Proofing | EMAIL DOMAIN ONLY | MEDIUM |

**Remediation Required:** 40+ hours

### Issue 2: Data Sovereignty - NOT RESOLVED

**Previous Claim:** "RLS resolved via getTenantDb()"
**Actual Status:** 9 endpoints bypass RLS

| Endpoint | Method | Risk Level |
|----------|--------|------------|
| /api/incidents/public | POST | CRITICAL |
| /api/incidents/escalate | POST | HIGH |
| /api/billing/webhook | POST | HIGH |
| /api/leads | GET/POST | HIGH |
| /api/auth/* | Various | MEDIUM |
| /api/organizations/[id] | Various | MEDIUM |

**Remediation Required:** 16+ hours

### Issue 3: Credentials in Version Control - CRITICAL

**Previous Status:** "Improved - dev fallbacks remain"
**Actual Status:** Plaintext credentials committed to git

```
Files containing credentials:
- .env (binary, committed)
- apps/*/env (various)
Contains: POSTGRES_PASSWORD, NEXTAUTH_SECRET, etc.
```

**Remediation Required:** 4 hours + secret rotation

### Issue 4: Engine Scalability - NOT RESOLVED

**Previous Claim:** "Celery async tasks complete"
**Actual Status:** 4 of 40+ endpoints use Celery

| Component | Issue | Impact |
|-----------|-------|--------|
| API Endpoints | All synchronous | 4 concurrent max |
| SHAP/LIME | 100-500MB per request | OOM |
| Model Cache | Unbounded growth | 10GB/24h |
| Workers | 4 Uvicorn, blocking | No scaling |

**Remediation Required:** 48+ hours

### Issue 5: Monorepo Architecture - NOT ENFORCED

**Previous Claim:** "Turborepo properly configured"
**Actual Status:** Zero import boundary enforcement

| Issue | Evidence |
|-------|----------|
| Dead packages | 5 packages never imported |
| Duplicate code | 3 identical auth files |
| Competing implementations | 2 EngineClient versions |
| No ESLint boundaries | Apps can import anything |

**Remediation Required:** 20+ hours

---

## Revised Engineering Backlog

### P0 - Emergency (Week 1)

| Task | Description | Effort | Owner |
|------|-------------|--------|-------|
| PURGE-CREDS | Remove credentials from git history | 4h | DevOps |
| FIX-INCIDENTS | Validate orgId in public endpoint | 2h | Backend |
| ACCOUNT-LOCK | Implement account lockout | 4h | Backend |
| GEN-JTI | Generate JTI for all tokens | 2h | Backend |

### P0 - Security Foundation (Weeks 2-4)

| Task | Description | Effort | Owner |
|------|-------------|--------|-------|
| IMPL-MFA | TOTP multi-factor authentication | 16h | Auth |
| AUDIT-RLS | Document all getSystemDb() calls | 8h | Backend |
| SECRETS-VAULT | Move secrets to secure vault | 8h | DevOps |
| KEY-ROTATION | Support multiple signing keys | 12h | Auth |
| LEADS-ORG | Add org_id to leads table | 4h | Backend |

### P1 - Engine Stabilization (Weeks 5-8)

| Task | Description | Effort | Owner |
|------|-------------|--------|-------|
| ASYNC-ALL | Convert all endpoints to async | 24h | Python |
| CACHE-TTL | Implement LRU with TTL | 8h | Python |
| CELERY-ALL | Migrate heavy ops to Celery | 16h | Python |
| STREAM-SHAP | Streaming for large computations | 16h | Python |

### P1 - Architecture Cleanup (Weeks 9-12)

| Task | Description | Effort | Owner |
|------|-------------|--------|-------|
| DELETE-DEAD | Remove unused packages | 4h | Tech Lead |
| MERGE-AUTH | Consolidate auth utilities | 8h | Backend |
| ESLINT-BOUNDS | Add import boundary rules | 8h | Tech Lead |
| LEDGER-ENFORCE | Make ledger mandatory | 16h | Backend |
| SINGLE-CLIENT | Consolidate EngineClient | 8h | Backend |

### P2 - Production Hardening (Weeks 13-16)

| Task | Description | Effort | Owner |
|------|-------------|--------|-------|
| LOAD-TEST | Test with 50+ concurrent orgs | 16h | QA |
| SAST-CI | Add security scanning to CI | 4h | DevOps |
| STAGING | Deploy staging environment | 8h | DevOps |
| SECURITY-AUDIT | External penetration test | 16h | External |
| MONITORING | Implement observability | 16h | DevOps |

---

## Definition of "Production Ready" (Revised)

### Security Checklist

| Requirement | Previous Status | Required Action |
|-------------|-----------------|-----------------|
| No credentials in git | FAILING | Purge history |
| MFA implemented | FAILING | Implement TOTP |
| All RLS enforced | FAILING | Audit 9 endpoints |
| Token revocation works | FAILING | Generate JTI |
| Account lockout | FAILING | Implement |
| Secrets in vault | FAILING | Migrate |
| Key rotation | FAILING | Implement |

### Scalability Checklist

| Requirement | Previous Status | Required Action |
|-------------|-----------------|-----------------|
| Engine handles 50+ orgs | FAILING | Async + Celery |
| Model cache bounded | FAILING | LRU + TTL |
| Rate limiting | FAILING | Redis-based |
| Load tested | FAILING | Performance tests |

### Architecture Checklist

| Requirement | Previous Status | Required Action |
|-------------|-----------------|-----------------|
| No dead code | FAILING | Delete 5 packages |
| No duplicate code | FAILING | Consolidate auth |
| Import boundaries | FAILING | ESLint rules |
| Audit trail mandatory | FAILING | Enforce ledger |

---

## Effort Summary (Revised)

### Previous Estimate (Inaccurate)
| Category | Hours |
|----------|-------|
| Remaining Total | 50-75 |
| Timeline | 1.5-2 weeks |

### Actual Estimate (Corrected)
| Category | Hours |
|----------|-------|
| Security (P0) | 60-80 |
| Engine (P1) | 60-80 |
| Architecture (P1) | 40-60 |
| Production (P2) | 50-60 |
| **Total** | **210-280** |

**Timeline:** 12-16 weeks with dedicated resources

---

## Engineering Team Requirements

| Role | Allocation | Duration | Focus |
|------|------------|----------|-------|
| Backend Engineer | 100% | 16 weeks | Security, RLS, Ledger |
| Python Engineer | 100% | 8 weeks | Engine async, Celery |
| Auth Specialist | 50% | 4 weeks | MFA, Key rotation |
| DevOps Engineer | 25% | Ongoing | Secrets, CI, Staging |
| Tech Lead | 25% | Ongoing | Architecture decisions |

**Minimum Team:** 2 full-time engineers
**Ideal Team:** 3 engineers + DevOps

---

## Weekly Milestones

| Week | Milestone | Success Criteria |
|------|-----------|------------------|
| 1 | Emergency security | Creds purged, lockout implemented |
| 2 | MFA foundation | Database schema, TOTP logic |
| 3 | MFA deployment | Mandatory for admin roles |
| 4 | Security audit | All getSystemDb() documented |
| 5 | Engine async start | 10 endpoints converted |
| 6 | Engine async complete | All endpoints async |
| 7 | Celery migration | Heavy ops in background |
| 8 | Cache implementation | LRU + TTL operational |
| 9 | Dead code removal | 5 packages deleted |
| 10 | Auth consolidation | Single source of truth |
| 11 | Import boundaries | ESLint rules enforced |
| 12 | Ledger enforcement | All state changes logged |
| 13 | Load testing | 50+ orgs sustained |
| 14 | Security audit | External pentest passed |
| 15 | Staging deployment | Mirror of production |
| 16 | Due diligence ready | All checklists green |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Timeline slips | HIGH | HIGH | Weekly checkpoints |
| Scope creep | HIGH | MEDIUM | Feature freeze |
| Key person leaves | MEDIUM | HIGH | Documentation |
| External audit fails | MEDIUM | HIGH | Internal pre-audit |
| Investor discovers issues | HIGH | CRITICAL | Pause fundraising |

---

## Success Metrics

### Week 4 Checkpoint
- [ ] No credentials in git history
- [ ] MFA operational for admin roles
- [ ] Account lockout implemented
- [ ] All getSystemDb() documented

### Week 8 Checkpoint
- [ ] All engine endpoints async
- [ ] Celery processing heavy operations
- [ ] Model cache bounded (LRU + 1hr TTL)
- [ ] No OOM under 50 concurrent requests

### Week 12 Checkpoint
- [ ] Dead packages removed
- [ ] Auth utilities consolidated
- [ ] ESLint boundaries enforced
- [ ] Ledger mandatory for state changes

### Week 16 Checkpoint (Series A Ready)
- [ ] External security audit passed
- [ ] Load testing completed
- [ ] Staging environment operational
- [ ] All production checklists green

---

## Conclusion

The engineering roadmap has been **completely revised** to reflect actual platform state. Previous assessments underestimated remaining work by approximately 3x.

**Key Corrections:**
- Security is NOT resolved (40+ hours needed)
- Engine is NOT stable (48+ hours needed)
- Architecture is NOT enforced (20+ hours needed)
- Timeline is NOT 4-6 weeks (12-16 weeks realistic)

The platform requires focused remediation before Series A discussions resume.

---

*AI Integrity Certification | Engineering Roadmap v3.0 | February 17, 2026*
*Supersedes versions 1.0 and 2.0*
