# AIC Python Audit Engine - Requirements Document

**Version:** 1.0  
**Date:** February 7, 2026  
**Status:** Draft for Review

---

## Executive Summary

This document defines the requirements for the AIC Python Audit Engine to ensure **safety, POPIA Section 71 compliance**, and alignment with the Mathematical Architectures and Engineering Standards for Algorithmic Accountability framework.

---

## 1. Functional Requirements

### 1.1 Fairness Analysis

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-1.1** Disparate Impact | Four-Fifths Rule (≥0.80 threshold) | ✅ Implemented | P0 |
| **FR-1.2** Equalized Odds | TPR/FPR parity across groups | ✅ Implemented | P0 |
| **FR-1.3** Statistical Parity Difference | Absolute difference in positive rates | ❌ Missing | P1 |
| **FR-1.4** ε-Differential Fairness | Intersectional subgroup probability bounds | ❌ Missing | P1 |
| **FR-1.5** Intersectional Analysis | Multi-attribute fairness | ✅ Implemented | P0 |
| **FR-1.6** Statistical Significance | Chi-square testing | ✅ Implemented | P1 |

### 1.2 Economic Indices

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-2.1** Atkinson Index | Inequality aversion parameter (ε) for outcome distributions | ❌ Missing | P2 |
| **FR-2.2** Generalized Entropy | Individual/group unfairness (includes Theil Index) | ❌ Missing | P2 |

### 1.3 Explainability (XAI)

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-3.1** Feature Importance | Top factors influencing decisions | ⚠️ Partial (manual input) | P0 |
| **FR-3.2** SHAP Integration | SHapley Additive exPlanations | ❌ Missing | P1 |
| **FR-3.3** LIME Integration | Local Interpretable Model Explanations | ❌ Missing | P1 |
| **FR-3.4** Counterfactual Explanations | Minimal changes for different outcome | ❌ Missing | P2 |

### 1.4 Drift Monitoring

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-4.1** Population Stability Index | PSI thresholds (<0.1, 0.1-0.25, >0.25) | ❌ Missing | P1 |
| **FR-4.2** Jensen-Shannon Divergence | Symmetric distributional shift monitoring | ❌ Missing | P1 |
| **FR-4.3** Kolmogorov-Smirnov Test | CDF shift detection | ❌ Missing | P2 |

### 1.5 Human Oversight Metrics

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **FR-5.1** HITL Rate | Human-in-the-loop intervention rate | ⚠️ Schema only | P0 |
| **FR-5.2** Override Frequency | Human override tracking | ⚠️ Schema only | P0 |
| **FR-5.3** Correction Process Validation | Appeal mechanism scoring | ✅ Implemented | P1 |

### 1.6 5 Algorithmic Rights

| Right | Description | Current Status | Priority |
|-------|-------------|----------------|----------|
| **Right to Human Agency** | Bias detection, intervention tests | ✅ Implemented | P0 |
| **Right to Explanation** | Decision explainability | ✅ Implemented | P0 |
| **Right to Empathy** | Sentiment analysis of communications | ✅ Implemented | P1 |
| **Right to Correction** | Appeal workflow validation | ✅ Implemented | P1 |
| **Right to Truth** | AI disclosure analysis | ✅ Implemented | P1 |

---

## 2. Security Requirements

### 2.1 Input Validation

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **SR-1.1** Pydantic Schema Enforcement | Strong typing for all inputs | ✅ Implemented | P0 |
| **SR-1.2** Injection Prevention | Query/code injection protection | ⚠️ Partial | P0 |
| **SR-1.3** Rate Limiting | API rate limiting | ❌ Missing | P1 |
| **SR-1.4** Request Size Limits | Prevent DoS via large payloads | ❌ Missing | P1 |

### 2.2 Data Protection

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **SR-2.1** PII Redaction in Logs | Automatic PII masking | ❌ Missing | P0 |
| **SR-2.2** TLS 1.3 | Encryption in transit | ⚠️ Infrastructure | P0 |
| **SR-2.3** Secret Management | No hardcoded credentials | ⚠️ Environment vars | P0 |
| **SR-2.4** Data Minimization | Process only necessary fields | ⚠️ Not enforced | P1 |

### 2.3 Adversarial Robustness

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **SR-3.1** Evasion Attack Detection | Perturbation resistance metrics | ❌ Missing | P2 |
| **SR-3.2** Safe Perturbation Radius | Minimum change to flip prediction | ❌ Missing | P2 |

---

## 3. Audit Trail Requirements

### 3.1 Immutability

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **AT-1.1** SHA-256 Hashing | Hash of every audit record | ✅ Implemented | P0 |
| **AT-1.2** Hash Chain | Link to previous hash (h_i = Hash(h_{i-1} \|\| Entry_i)) | ❌ Missing | P0 |
| **AT-1.3** Cryptographic Signing | RSA-3072+ signatures | ❌ Missing | P1 |
| **AT-1.4** Timestamp Integrity | Trusted timestamping | ❌ Missing | P1 |

### 3.2 Compliance

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **AT-2.1** Reconstruction Capability | Full timeline reconstruction | ⚠️ Partial | P1 |
| **AT-2.2** Retention Policy | Configurable retention periods | ❌ Missing | P2 |

---

## 4. Infrastructure Requirements

### 4.1 Runtime

| Requirement | Description | Current Status | Recommendation |
|------------|-------------|----------------|----------------|
| **IR-1.1** Python Version | 3.9-slim | ⚠️ Outdated | Upgrade to 3.12-alpine |
| **IR-1.2** Non-Root User | Container security | ❌ Missing | Add USER directive |
| **IR-1.3** Minimal Base Image | Attack surface reduction | ⚠️ -slim | Use python:3.12-alpine |
| **IR-1.4** Health Checks | Liveness/readiness probes | ⚠️ Basic | Add structured checks |

### 4.2 Dependencies

| Current Dependency | Version Pinning | Security | Recommendation |
|-------------------|-----------------|----------|----------------|
| fastapi | ❌ Unpinned | Risk | Pin with `==` |
| uvicorn | ❌ Unpinned | Risk | Pin with `==` |
| pandas | ❌ Unpinned | Risk | Pin with `==` |
| scipy | ❌ Unpinned | Risk | Pin with `==` |
| textblob | ❌ Unpinned | Risk | Pin with `==` |

**Missing Dependencies (per Mathematical Framework):**
- `fairlearn` - Fairness metrics library
- `aif360` - IBM AI Fairness 360
- `shap` - SHAP explanations
- `lime` - LIME explanations
- `nannyml` - Drift detection
- `whylogs` - Data logging/monitoring

---

## 5. Testing Requirements

| Requirement | Description | Current Status | Priority |
|------------|-------------|----------------|----------|
| **TR-1.1** Unit Tests | Function-level testing | ❌ Empty tests/ folder | P0 |
| **TR-1.2** Integration Tests | API endpoint testing | ❌ Missing | P0 |
| **TR-1.3** Bias Metric Validation | Known-answer tests | ❌ Missing | P0 |
| **TR-1.4** Security Scanning | Bandit, pip-audit | ❌ Missing | P1 |
| **TR-1.5** Load Testing | Concurrent request handling | ❌ Missing | P2 |

---

## 6. API Requirements

### 6.1 Existing Endpoints ✅
- `GET /` - Health check
- `POST /api/v1/analyze` - Disparate impact
- `POST /api/v1/analyze/equalized-odds` - Equalized odds
- `POST /api/v1/analyze/intersectional` - Intersectional analysis
- `POST /api/v1/explain` - Decision explanation
- `POST /api/v1/empathy` - Sentiment analysis
- `POST /api/v1/disclosure` - AI disclosure check
- `POST /api/v1/correction/validate` - Correction process

### 6.2 Required Endpoints (Missing)

| Endpoint | Purpose | Priority |
|----------|---------|----------|
| `POST /api/v1/analyze/drift` | Distribution drift monitoring | P1 |
| `POST /api/v1/analyze/shap` | SHAP-based explanations | P1 |
| `POST /api/v1/analyze/batch` | Large dataset processing | P2 |
| `GET /api/v1/audit-trail/verify` | Hash chain verification | P1 |

---

## 7. Summary Scorecard

| Category | Score | Notes |
|----------|-------|-------|
| **Fairness Analysis** | 60% | Core metrics present, missing advanced methods |
| **Security** | 40% | Basic Pydantic validation, needs hardening |
| **Audit Trail** | 50% | Hashing exists, no chain or signing |
| **XAI** | 30% | Manual only, no automated explanations |
| **Testing** | 0% | No tests present |
| **Drift Monitoring** | 0% | Not implemented |
| **Overall Readiness** | **~35%** | Solid foundation, significant gaps for production |

---

## 8. Improvement Recommendations

### High Priority (Safety Critical)

1. **Implement Immutable Hash Chain** - Current: Individual record hashes. Required: Linked chain `h_i = Hash(h_{i-1} || Entry_i)` for regulatory audit trail reconstruction.

2. **Add Dependency Version Pinning** - All dependencies unpinned, creating supply chain risk. Use `pip-tools` workflow.

3. **Implement Unit Tests** - The `tests/` directory is empty. Need known-answer tests for bias calculations.

### Medium Priority (Compliance)

4. **Add SHAP/LIME Integration** - Provides legally defensible explanations per POPIA Section 71(3).

5. **Implement Drift Monitoring** - Add PSI and Jensen-Shannon divergence endpoints.

6. **Upgrade Docker Image** - Use `python:3.12-alpine` with non-root user.

### Lower Priority (Enhancements)

7. **Economic Inequality Metrics** - Add Atkinson Index and Generalized Entropy.

8. **Adversarial Robustness Testing** - Integrate IBM's Adversarial Robustness Toolbox.

---

## 9. Next Steps

1. **Immediate**: Pin dependencies and add security scans
2. **Short-term**: Implement unit tests for existing calculations
3. **Medium-term**: Integrate SHAP/LIME and drift monitoring
4. **Long-term**: Full hash-chain audit trail with cryptographic signing

---

*Document Version: 1.0 | February 2026*
