# AIC Alpha Audit Checklist

**Standardized Verification Procedures for Cohort 1**

---

## 📂 Section A: Documentation Review

| ID | Requirement | Evidence Required | Status |
|----|-------------|-------------------|--------|
| A.1 | **AI Inventory** | List of all production AI models, their purpose, and owners. | [ ] |
| A.2 | **Impact Assessment** | Documented analysis of potential harm/bias to South African citizens. | [ ] |
| A.3 | **Privacy Policy** | Updated POPIA-compliant policy explicitly mentioning Section 71. | [ ] |
| A.4 | **Governance Charter** | Definition of roles: Model Owner, Lead Auditor, Human-in-the-Loop. | [ ] |

---

## 🧠 Section B: Human Oversight Verification

| ID | Requirement | Verification Method | Status |
|----|-------------|---------------------|--------|
| B.1 | **Manual Override** | Live demonstration of a human stopping/reversing an AI decision. | [ ] |
| B.2 | **Review Interface** | UI review: Does the reviewer see explainability data (why the AI chose X)? | [ ] |
| B.3 | **Override Logs** | Audit of historical data: How often are AI decisions changed by humans? | [ ] |
| B.4 | **Training Logs** | Records of staff training on AI bias and system limitations. | [ ] |

---

## 🔍 Section C: Technical Bias & Transparency

| ID | Requirement | Verification Method | Status |
|----|-------------|---------------------|--------|
| C.1 | **Four-Fifths Rule** | Statistical test for disparate impact across protected groups (Race, Gender). | [ ] |
| C.2 | **Explainability Portability** | Can a non-technical person understand the "top 3 factors" of a decision? | [ ] |
| C.3 | **Notification Flow** | User journey review: Is the "Made by AI" badge prominent? | [ ] |
| C.4 | **Drift Monitoring** | Review of alerts for model performance degradation over time. | [ ] |

---

## 🏗️ Section D: Infrastructure & Security

| ID | Requirement | Verification Method | Status |
|----|-------------|---------------------|--------|
| D.1 | **Data Residency** | Verification of AWS/Azure/GCP region (must be South Africa if sensitive). | [ ] |
| D.2 | **Audit Log Immutability** | Proof that AI decision logs cannot be altered after the fact. | [ ] |
| D.3 | **Fallback Redundancy** | Review of the "Kill Switch" protocol and manual business continuity. | [ ] |

---

## 📝 Auditor Notes

**Organization:** _________________________
**Audit Date:** ___________________________
**Lead Auditor:** _________________________
**Preliminary Tier:** [ 1 ] [ 2 ] [ 3 ]
**Integrity Score:** ________ / 100
