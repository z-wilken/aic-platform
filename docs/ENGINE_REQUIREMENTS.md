# AIC Python Audit Engine - Requirements Document

**Version:** 4.0
**Date:** February 9, 2026
**Status:** Updated after Sprint 3 — XAI + Crypto Signing + Batch Processing

---

## Executive Summary

This document defines the requirements for the AIC Python Audit Engine to ensure **safety, POPIA Section 71 compliance**, and alignment with the Mathematical Architectures and Engineering Standards for Algorithmic Accountability framework.

**Current overall readiness has been upgraded from ~35% to ~85% after Sprint 3.** SHAP, LIME, cryptographic signing, and batch processing are now implemented. The sections below reflect the updated status and detail what remains to be done.

---

## 1. Functional Requirements

### 1.1 Fairness Analysis

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-1.1** Disparate Impact | Four-Fifths Rule (≥0.80 threshold) | ✅ Implemented + Tested | P0 |
| **FR-1.2** Equalized Odds | TPR/FPR parity across groups | ✅ Implemented + Tested | P0 |
| **FR-1.3** Statistical Parity Difference | Absolute difference in positive rates | ✅ **NEW** — Implemented + Tested | P1 |
| **FR-1.4** ε-Differential Fairness | Intersectional subgroup probability bounds | ✅ **NEW** — Implemented + Tested | P1 |
| **FR-1.5** Intersectional Analysis | Multi-attribute fairness | ✅ Implemented + Tested | P0 |
| **FR-1.6** Statistical Significance | Chi-square testing | ✅ Implemented + Tested | P1 |

### 1.2 Economic Indices

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-2.1** Atkinson Index | Inequality aversion parameter (ε) for outcome distributions | ❌ Missing | P2 |
| **FR-2.2** Generalized Entropy | Individual/group unfairness (includes Theil Index) | ❌ Missing | P2 |

#### Detailed Steps to Implement FR-2.1 and FR-2.2
1. Create `apps/engine/app/services/economic_indices.py`
2. Implement Atkinson Index:
   - Accept a list of outcome values and an inequality aversion parameter (ε)
   - Formula: `A(ε) = 1 - (1/n * Σ(y_i/μ)^(1-ε))^(1/(1-ε))` for ε ≠ 1
   - For ε = 1: `A(1) = 1 - (Π(y_i)^(1/n))/μ` (geometric mean / arithmetic mean)
   - Return index value, interpretation, and audit hash
3. Implement Generalized Entropy Index:
   - Accept outcome values and an alpha parameter
   - GE(α) = (1/(nα(α-1))) * Σ((y_i/μ)^α - 1)
   - Special cases: α=0 (mean log deviation), α=1 (Theil L), α=2 (half squared CV)
   - Decompose into between-group and within-group unfairness
4. Add Pydantic request schemas to `analysis.py`
5. Add API endpoints: `POST /api/v1/analyze/atkinson` and `POST /api/v1/analyze/entropy`
6. Write known-answer unit tests with hand-calculated expected values
7. Update this document with ✅ status

### 1.3 Explainability (XAI)

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-3.1** Feature Importance | Top factors influencing decisions | ⚠️ Partial (manual input) | P0 |
| **FR-3.2** SHAP Integration | SHapley Additive exPlanations | ✅ **NEW** — Implemented + Tested (Sprint 3) | P1 |
| **FR-3.3** LIME Integration | Local Interpretable Model Explanations | ✅ **NEW** — Implemented + Tested (Sprint 3) | P1 |
| **FR-3.4** Counterfactual Explanations | Minimal changes for different outcome | ❌ Missing | P2 |

#### Detailed Steps to Implement FR-3.2 (SHAP)
1. Add `shap>=0.44.0` to `requirements.txt`
2. Create `apps/engine/app/services/explainability.py`
3. Implement a function that accepts:
   - A serialized model (pickle or ONNX) OR a prediction function callable
   - A dataset of feature vectors
   - A single instance to explain
4. Use `shap.Explainer` (auto-selects TreeExplainer, KernelExplainer, etc.)
5. Return: SHAP values per feature, base value, feature importance ranking, force plot data (JSON-serializable)
6. Add endpoint: `POST /api/v1/explain/shap`
7. **Important**: Validate that uploaded models are < 50MB and pickle files are screened (security risk — consider using ONNX only)
8. Write tests with a simple sklearn model (e.g., DecisionTreeClassifier)

#### Detailed Steps to Implement FR-3.3 (LIME)
1. Add `lime>=0.2.0` to `requirements.txt`
2. In `explainability.py`, add a LIME explanation function:
   - Use `lime.lime_tabular.LimeTabularExplainer`
   - Accept: training data summary, feature names, class names, instance to explain, prediction function
   - Return: feature contributions, prediction probabilities, intercept
3. Add endpoint: `POST /api/v1/explain/lime`
4. Write tests comparing LIME output against known simple models

### 1.4 Drift Monitoring

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-4.1** Population Stability Index | PSI thresholds (<0.1, 0.1-0.25, >0.25) | ✅ **NEW** — Implemented + Tested | P1 |
| **FR-4.2** Jensen-Shannon Divergence | Symmetric distributional shift monitoring | ✅ **NEW** — Implemented + Tested | P1 |
| **FR-4.3** Kolmogorov-Smirnov Test | CDF shift detection | ✅ **NEW** — Implemented + Tested | P2 |

### 1.5 Human Oversight Metrics

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-5.1** HITL Rate | Human-in-the-loop intervention rate | ✅ Implemented (labor_audit service) | P0 |
| **FR-5.2** Override Frequency | Human override tracking | ✅ Implemented (labor_audit service) | P0 |
| **FR-5.3** Correction Process Validation | Appeal mechanism scoring | ✅ Implemented + Tested | P1 |

### 1.6 5 Algorithmic Rights

| Right | Description | Current Status | Priority |
|-------|-------------|----------------|----------|
| **Right to Human Agency** | Bias detection, intervention tests | ✅ Implemented + Tested | P0 |
| **Right to Explanation** | Decision explainability | ✅ Implemented + Tested | P0 |
| **Right to Empathy** | Sentiment analysis of communications | ✅ Implemented + Tested | P1 |
| **Right to Correction** | Appeal workflow validation | ✅ Implemented + Tested | P1 |
| **Right to Truth** | AI disclosure analysis | ✅ Implemented + Tested | P1 |

---

## 2. Security Requirements

### 2.1 Input Validation

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **SR-1.1** Pydantic Schema Enforcement | Strong typing for all inputs | ✅ Implemented | P0 |
| **SR-1.2** Injection Prevention | Query/code injection protection | ✅ Pydantic + no raw SQL | P0 |
| **SR-1.3** Rate Limiting | API rate limiting | ✅ **NEW** — slowapi integration | P1 |
| **SR-1.4** Request Size Limits | Prevent DoS via large payloads | ✅ Implemented (Sprint 2) — 10MB middleware | P1 |

#### Remaining Step for SR-1.4
1. Add Starlette request size middleware to `main.py`:
   ```python
   from starlette.middleware import Middleware
   # Add max body size of 10MB
   app = FastAPI(middleware=[
       Middleware(TrustedHostMiddleware, allowed_hosts=["*"]),
   ])
   ```
2. Or configure at the reverse proxy level (nginx: `client_max_body_size 10m;`)

### 2.2 Data Protection

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **SR-2.1** PII Redaction in Logs | Automatic PII masking | ✅ Implemented (Sprint 2) | P0 |
| **SR-2.2** TLS 1.3 | Encryption in transit | ⚠️ Infrastructure | P0 |
| **SR-2.3** Secret Management | No hardcoded credentials | ⚠️ Environment vars | P0 |
| **SR-2.4** Data Minimization | Process only necessary fields | ⚠️ Not enforced | P1 |

#### Detailed Steps for SR-2.1 (PII Redaction)
1. Create `apps/engine/app/core/pii_filter.py`
2. Implement a logging filter class that:
   - Detects email patterns (`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b`)
   - Detects SA ID numbers (13-digit pattern)
   - Detects phone numbers
   - Replaces with `[REDACTED_EMAIL]`, `[REDACTED_ID]`, etc.
3. Register as a Python logging filter on all handlers in `main.py`
4. Add unit tests with sample log messages containing PII
5. Verify no PII appears in any log output

### 2.3 Adversarial Robustness

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **SR-3.1** Evasion Attack Detection | Perturbation resistance metrics | ❌ Missing | P2 |
| **SR-3.2** Safe Perturbation Radius | Minimum change to flip prediction | ❌ Missing | P2 |

#### Detailed Steps for SR-3.1 and SR-3.2
1. Add `adversarial-robustness-toolbox>=1.17.0` to requirements (IBM ART)
2. Create `apps/engine/app/services/adversarial.py`
3. Implement perturbation testing:
   - Accept a model and test instances
   - Use FGSM (Fast Gradient Sign Method) to generate adversarial examples
   - Calculate minimum perturbation distance (L2, Linf norms)
   - Report: percentage of instances vulnerable, average perturbation needed
4. Add endpoint: `POST /api/v1/audit/adversarial`
5. This is P2 — only implement after all P0/P1 items are complete

---

## 3. Audit Trail Requirements

### 3.1 Immutability

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **AT-1.1** SHA-256 Hashing | Hash of every audit record | ✅ Implemented | P0 |
| **AT-1.2** Hash Chain | Link to previous hash (h_i = Hash(h_{i-1} \|\| Entry_i)) | ✅ **NEW** — Implemented + Tested | P0 |
| **AT-1.3** Cryptographic Signing | RSA-3072+ signatures | ✅ **NEW** — Implemented + Tested (Sprint 3) | P1 |
| **AT-1.4** Timestamp Integrity | Trusted timestamping | ❌ Missing | P1 |

#### Detailed Steps for AT-1.3 (Cryptographic Signing)
1. Generate RSA-3072 key pair for the engine:
   ```bash
   openssl genrsa -out private.pem 3072
   openssl rsa -in private.pem -pubout -out public.pem
   ```
2. Store private key securely (environment variable or secrets manager — never in repo)
3. Create `apps/engine/app/core/signing.py`:
   - Load private key from environment
   - Sign audit hashes using `cryptography` library: `signature = private_key.sign(hash_bytes, padding.PSS(...), hashes.SHA256())`
   - Provide verification function using public key
4. Add `cryptography>=43.0.0` to requirements.txt
5. Integrate signing into `HashChain.create_audit_record()` — add `signature` field
6. Add verification endpoint: `POST /api/v1/audit-trail/verify-signature`
7. Add unit tests for sign/verify round-trip

#### Detailed Steps for AT-1.4 (Trusted Timestamping)
1. Implement RFC 3161 timestamp requests:
   - Use a free TSA (e.g., FreeTSA.org) or deploy your own
   - Hash the audit record, send to TSA, receive signed timestamp token
2. Store the TSA response alongside the audit record
3. This provides third-party proof of when a record was created
4. Alternative: Use a blockchain-anchored timestamping service
5. This is P1 — implement after cryptographic signing works

### 3.2 Compliance

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **AT-2.1** Reconstruction Capability | Full timeline reconstruction | ✅ Improved (hash chain + sequence numbers) | P1 |
| **AT-2.2** Retention Policy | Configurable retention periods | ❌ Missing | P2 |

---

## 4. Infrastructure Requirements

### 4.1 Runtime

| Requirement | Description | Current Status | Recommendation |
|------------|-------------|----------------|----------------|
| **IR-1.1** Python Version | 3.12-alpine | ✅ **FIXED** — Upgraded from 3.9-slim | Done |
| **IR-1.2** Non-Root User | Container security | ✅ **FIXED** — Added `aic` user | Done |
| **IR-1.3** Minimal Base Image | Attack surface reduction | ✅ **FIXED** — Using alpine | Done |
| **IR-1.4** Health Checks | Liveness/readiness probes | ✅ **FIXED** — Docker HEALTHCHECK added | Done |

### 4.2 Dependencies

| Current Dependency | Version Pinning | Security | Status |
|-------------------|-----------------|----------|--------|
| fastapi | ✅ ==0.115.6 | ✅ Pinned | **FIXED** |
| uvicorn | ✅ ==0.34.0 | ✅ Pinned | **FIXED** |
| pandas | ✅ ==2.2.3 | ✅ Pinned | **FIXED** |
| scipy | ✅ ==1.14.1 | ✅ Pinned | **FIXED** |
| numpy | ✅ ==2.0.2 | ✅ Pinned | **FIXED** (was missing) |
| textblob | ✅ ==0.18.0 | ✅ Pinned | **FIXED** |
| pydantic | ✅ ==2.10.4 | ✅ Pinned | **FIXED** (was implicit) |
| slowapi | ✅ ==0.1.9 | ✅ Pinned | **NEW** |

| shap | ✅ ==0.46.0 | ✅ Pinned | **NEW** (Sprint 3) |
| lime | ✅ ==0.2.0.1 | ✅ Pinned | **NEW** (Sprint 3) |
| scikit-learn | ✅ ==1.6.1 | ✅ Pinned | **NEW** (Sprint 3) |
| cryptography | ✅ ==44.0.0 | ✅ Pinned | **NEW** (Sprint 3) |

---

## 5. Testing Requirements

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **TR-1.1** Unit Tests | Function-level testing | ✅ **NEW** — 4 test files, 40+ test cases | P0 |
| **TR-1.2** Integration Tests | API endpoint testing | ✅ Implemented (Sprint 2) | P0 |
| **TR-1.3** Bias Metric Validation | Known-answer tests | ✅ **NEW** — Implemented | P0 |
| **TR-1.4** Security Scanning | Bandit, pip-audit | ✅ Implemented (Sprint 2) — CI pipeline | P1 |
| **TR-1.5** Load Testing | Concurrent request handling | ❌ Missing | P2 |

#### Detailed Steps for TR-1.2 (Integration Tests)
1. Create `apps/engine/tests/test_api_integration.py`
2. Use FastAPI's `TestClient` (from `starlette.testclient`):
   ```python
   from fastapi.testclient import TestClient
   from app.main import app
   client = TestClient(app)
   ```
3. Test each endpoint:
   - POST valid data → assert 200 and correct response shape
   - POST invalid data → assert 400/422 and error message
   - POST with missing fields → assert 422 validation error
   - GET health check → assert 200 and version
4. Test rate limiting by sending requests in a loop
5. Add to CI pipeline

#### Detailed Steps for TR-1.4 (Security Scanning)
1. Add to requirements-dev.txt:
   ```
   bandit==1.8.0
   pip-audit==2.7.3
   safety==3.2.0
   ```
2. Run `bandit -r app/` to check for common Python security issues
3. Run `pip-audit` to check for known vulnerabilities in dependencies
4. Add both to CI pipeline as required checks
5. Fix any findings before merging

---

## 6. API Requirements

### 6.1 Existing Endpoints ✅
- `GET /` - Health check with capabilities listing
- `POST /api/v1/analyze` - Disparate impact
- `POST /api/v1/analyze/equalized-odds` - Equalized odds
- `POST /api/v1/analyze/intersectional` - Intersectional analysis
- `POST /api/v1/analyze/statistical` - Chi-square significance
- `POST /api/v1/explain` - Decision explanation
- `POST /api/v1/analyze/empathy` - Sentiment analysis
- `POST /api/v1/analyze/disclosure` - AI disclosure check
- `POST /api/v1/validate/correction-process` - Correction process
- `POST /api/v1/correction/submit` - Correction request submission
- `POST /api/v1/audit/comprehensive` - Full system audit
- `POST /api/v1/audit/privacy` - Privacy audit
- `POST /api/v1/audit/labor` - Labor law compliance
- `POST /api/v1/audit/red-team` - Adversarial testing
- `POST /api/v1/audit/verify-document` - Evidence scanning
- `POST /api/v1/integrity/calculate` - Integrity score
- `POST /api/v1/assess` - Organization assessment
- `POST /api/v1/assess/tier` - Tier classification
- `GET /api/v1/frameworks` - Framework listing

### 6.2 New Endpoints (Added in this sprint) ✅
- `POST /api/v1/analyze/statistical-parity` - Statistical Parity Difference
- `POST /api/v1/analyze/epsilon-fairness` - ε-Differential Fairness
- `POST /api/v1/analyze/drift` - Drift monitoring (PSI + JSD + KS)
- `POST /api/v1/audit-trail/create` - Chain-linked audit record creation
- `POST /api/v1/audit-trail/verify` - Hash chain verification

### 6.3 Sprint 3 Endpoints (Added) ✅
- `POST /api/v1/explain/shap` - SHAP-based model explanations
- `POST /api/v1/explain/lime` - LIME-based local explanations
- `POST /api/v1/audit-trail/verify-signature` - Cryptographic signature verification
- `GET /api/v1/audit-trail/public-key` - Public key export for external verification
- `GET /api/v1/audit-trail/signing-status` - Signing availability check
- `POST /api/v1/analyze/batch` - Batch analysis (up to 20 analyses per request)

### 6.4 Still Required (Future)

| Endpoint | Purpose | Priority |
|----------|---------|----------|
| `POST /api/v1/analyze/atkinson` | Atkinson inequality index | P2 |
| `POST /api/v1/analyze/entropy` | Generalized entropy index | P2 |
| `POST /api/v1/audit/adversarial` | Adversarial robustness testing | P2 |

---

## 7. Summary Scorecard

| Category | Original | Sprint 1 | Sprint 2 | Sprint 3 (Current) | Notes |
|----------|----------|----------|----------|---------------------|-------|
| **Fairness Analysis** | 60% | 85% | 85% | **85%** | SPD + ε-Differential Fairness |
| **Security** | 40% | 60% | 80% | **85%** | + Crypto signing, batch limits |
| **Audit Trail** | 50% | 80% | 80% | **95%** | + RSA-3072 signing, signature verification |
| **XAI** | 30% | 30% | 30% | **85%** | + SHAP + LIME integration |
| **Testing** | 0% | 65% | 85% | **90%** | + Explainability + signing tests |
| **Drift Monitoring** | 0% | 100% | 100% | **100%** | PSI + JSD + KS test |
| **Infrastructure** | 40% | 85% | 95% | **95%** | CI/CD, health checks, migration script |
| **Overall Readiness** | **~35%** | **~60%** | **~75%** | **~85%** | Remaining: Economic indices, adversarial, counterfactual |

---

## 8. Remaining Work — Prioritized Action Items

### P0 — Safety Critical (Do Before Alpha)
1. ~~Implement hash chain~~ ✅ Done
2. ~~Pin dependencies~~ ✅ Done
3. ~~Add unit tests~~ ✅ Done
4. ~~Implement PII redaction in logs~~ ✅ Done (Sprint 2)
5. ~~Add integration tests~~ ✅ Done (Sprint 2)
6. ~~Fix `comprehensive_audit` function~~ ✅ Done (Sprint 2) — Now runs real analysis across all 5 rights
7. ~~Fix `assess_organization` weighted scoring~~ ✅ Done (Sprint 2) — Proper weighted categories

### P1 — Compliance (Do During Alpha)
8. ~~Add SHAP integration~~ ✅ Done (Sprint 3) — KernelExplainer with auto-surrogate model
9. ~~Add LIME integration~~ ✅ Done (Sprint 3) — LimeTabularExplainer with classification/regression support
10. ~~Add cryptographic signing~~ ✅ Done (Sprint 3) — RSA-3072 PSS with auto-gen dev keys
11. ~~Add security scanning to CI~~ ✅ Done (Sprint 2) — Bandit + pip-audit in GitHub Actions
12. ~~Add request size limits~~ ✅ Done (Sprint 2) — 10MB max via middleware
13. ~~Set up CI/CD pipeline~~ ✅ Done (Sprint 2) — engine-ci.yml + platform-ci.yml

### P2 — Enhancements (Post-Alpha)
14. **Economic inequality metrics** (FR-2.1, FR-2.2) — See detailed steps in Section 1.2
15. **Adversarial robustness testing** (SR-3.1, SR-3.2) — See detailed steps in Section 2.3
16. **Trusted timestamping** (AT-1.4) — See detailed steps in Section 3.1
17. ~~Batch processing endpoint~~ ✅ Done (Sprint 3) — Up to 20 analyses per request
18. **Load testing** (TR-1.5) — Use locust or k6
19. **Retention policy configuration** (AT-2.2)
20. **Counterfactual explanations** (FR-3.4) — Minimal change analysis

---

## 9. What Changed in This Sprint

| Item | Before | After |
|------|--------|-------|
| **Dockerfile** | Python 3.9-slim, runs as root, wrong CMD path | Python 3.12-alpine, non-root user, correct CMD, healthcheck |
| **requirements.txt** | 5 unpinned deps, missing numpy | 8 pinned deps with exact versions |
| **Endpoints** | Missing imports crashed on startup | Fixed imports, 5 new endpoints added |
| **Fairness** | 4 metrics | 6 metrics (added SPD + ε-Differential Fairness) |
| **Drift** | None | Full PSI + Jensen-Shannon + KS test suite |
| **Audit Trail** | Individual hashes only | Complete hash chain with creation + verification |
| **Rate Limiting** | None | Per-endpoint rate limits via slowapi |
| **Error Handling** | None | Global exception handler + structured logging |
| **CORS** | allow_methods=["*"], allow_headers=["*"] | Restricted to GET/POST/OPTIONS + specific headers |
| **Tests** | Empty tests/ folder | 4 test files, 40+ test cases |
| **Schema** | Broken (duplicate table, wrong ordering) | Fixed ordering, merged duplicates, added hash chain columns |

### Sprint 2 Changes

| Item | Before | After |
|------|--------|-------|
| **comprehensive_audit** | Hardcoded placeholder scores | Real analysis across all 5 Algorithmic Rights |
| **assess_organization** | Defined weights but ignored them | Proper weighted scoring with category bucketing |
| **PII Redaction** | Not implemented | Logging filter for emails, SA IDs, phone numbers, bcrypt hashes |
| **Request Size Limits** | None | 10MB max body via middleware |
| **Health Check** | Static success response | `/health` endpoint with dependency verification and uptime |
| **CI/CD** | None | GitHub Actions: engine tests + security scan + Docker build; platform build matrix |
| **Integration Tests** | None | 20+ API endpoint tests via FastAPI TestClient |
| **Migration Script** | None | `migrate.sh` with --check dry-run and --seed-only modes |
| **Env Validation** | None | `lib/env.ts` with fail-fast in production, warnings in dev |
| **Structured Logging** | `console.log` everywhere | JSON logger for platform, PII-filtered logger for engine |
| **Security Headers** | Platform only | All 4 Next.js apps (platform, admin, hq, web) |
| **Middleware** | Role check exact-path only | Sub-path matching for `/settings/*`, `/audit-logs/*`, etc. |
| **db.ts** | Logged full SQL queries | Logs duration + row count only (PII safe) |
| **CORS Origins** | Hardcoded | Configurable via CORS_ORIGINS env var |

### Sprint 3 Changes

| Item | Before | After |
|------|--------|-------|
| **SHAP Integration** | Not implemented | `explainability.py` with KernelExplainer, auto-surrogate model, per-instance + global explanations |
| **LIME Integration** | Not implemented | `explainability.py` with LimeTabularExplainer, classification + regression modes |
| **Cryptographic Signing** | Not implemented | `signing.py` with RSA-3072 PSS/SHA-256, auto-gen dev keys, env-based production keys |
| **Hash Chain** | Unsigned records | Records now include `signature` field when signing is available |
| **Batch Processing** | Not implemented | `/analyze/batch` endpoint supporting 7 analysis types, max 20 per request |
| **Dependencies** | 8 packages | 12 packages (+shap, lime, scikit-learn, cryptography) |
| **Endpoints** | 24 endpoints | 30 endpoints (+SHAP, LIME, signature verify, public key, signing status, batch) |
| **Tests** | 60+ test cases | 80+ test cases (+explainability input validation, sign/verify roundtrip, tamper detection) |
| **XAI Readiness** | 30% | 85% (SHAP + LIME operational, counterfactual explanations remaining) |
| **Audit Trail** | 80% | 95% (cryptographic signing + signature verification added) |

---

*Document Version: 4.0 | February 9, 2026 | Updated after Sprint 3 — XAI + Crypto Signing + Batch Processing*
