# AIC Alpha Audit Checklist

**Standardized Verification Procedures for Cohort 1**

---

## 📂 Section A: Documentation Review (Maps to UC & HO)

| ID | Requirement | Evidence Required | Methodology Code | Status |
|----|-------------|-------------------|------------------|--------|
| A.1 | **AI Inventory** | List of all production models, their purpose, and assigned owners. | UC.1 | [ ] |
| A.2 | **Impact Assessment** | Documented analysis of potential harm to South African data subjects. | UC.3 | [ ] |
| A.3 | **Privacy Policy** | POPIA-compliant policy explicitly mentioning Sec. 71 rights. | TR.2 | [ ] |
| A.4 | **Governance Charter** | Definition of roles: Model Owner vs. Human-in-the-Loop Reviewer. | HO.2 | [ ] |

---

## 🧠 Section B: Human Oversight (Maps to HO)

| ID | Requirement | Verification Method | Methodology Code | Status |
|----|-------------|---------------------|------------------|--------|
| B.1 | **Manual Override** | Live demonstration of a human stopping/reversing a model decision. | HO.1 | [ ] |
| B.2 | **Review Interface** | UI review: Does the reviewer see "Why" the model chose X? | HO.4 | [ ] |
| B.3 | **Override Logs** | Audit of historical data: Frequency of humans changing model output. | HO.1 | [ ] |
| B.4 | **Training Records** | proof of staff training on model limitations and bias risks. | HO.3 | [ ] |

---

## 🔍 Section C: Technical Bias & Transparency (Maps to TR & IN)

| ID | Requirement | Verification Method | Methodology Code | Status |
|----|-------------|---------------------|------------------|--------|
| C.1 | **Bias Audit** | Technical report showing Four-Fifths rule impact on protected groups. | IN.2 | [ ] |
| C.2 | **Explainability** | Can a non-technical person understand the "top 3 factors" of a result? | TR.1 | [ ] |
| C.3 | **Notification Flow** | User journey review: Is the "Made by AI" disclosure prominent? | TR.2 | [ ] |
| C.4 | **Appeal Workflow** | Testing the "Contest Decision" button and human response time. | TR.3 | [ ] |

---

## 🏗️ Section D: Infrastructure (Maps to IN)

| ID | Requirement | Verification Method | Methodology Code | Status |
|----|-------------|---------------------|------------------|--------|
| D.1 | **Data Residency** | Verification of server regions (Must be SA for sensitive biometrics). | IN.3 | [ ] |
| D.2 | **Log Immutability** | Proof that AI decision logs cannot be altered after the fact. | IN.1 | [ ] |
| D.3 | **Drift Monitoring** | Review of automated alerts for model performance degradation. | IN.2 | [ ] |

---

## 📝 Auditor Notes

**Organization:** _________________________
**Lead Auditor:** _________________________
**Total Verified Controls:** ____ / 15
**Final Integrity Score:** ________ / 100