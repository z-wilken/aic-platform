# AIC Operational Workflow

This document defines the standard operating procedures (SOP) for client onboarding, technical auditing, and certification issuance.

---

## 1. Engagement & Onboarding
**Primary Role:** Compliance Officer

1.  **Lead Generation:** User completes the Self-Assessment Quiz on the marketing site.
2.  **Initial Qualification:** Compliance Officer reviews the Integrity Score and Tier recommendation.
3.  **Discovery Call:** Discussion of the specific AI use case and regulatory risks.
4.  **Alpha Enrollment:** Client signs the Alpha Agreement and receives their secure invite to the AIC Pulse portal.
5.  **Initialization:** Client completes their profile and system inventory in the portal.

---

## 2. Evidence Collection (The Roadmap)
**Primary Role:** Compliance Officer / Lead Auditor

1.  **Requirement Generation:** Portal generates a customized Certification Roadmap based on the client's Tier.
2.  **Evidence Upload:** Client uploads documentation (e.g., Human-in-the-Loop policies, Impact Assessments).
3.  **Gap Analysis:** Lead Auditor reviews evidence and provides "Findings" (Remediation Required or Verified).
4.  **Telemetry Sync:** Technical team assists client in connecting their AI logs to the AIC Pulse API for continuous monitoring.

---

## 3. Technical Bias Audit
**Primary Role:** Technical Audit Lead

1.  **Dataset Provisioning:** Client provides de-identified outcome data for the model being audited.
2.  **Execution:** Technical lead runs the dataset through the AIC Audit Engine using the appropriate Use Case configuration.
3.  **Significance Testing:** Engine calculates Disparate Impact, Statistical Significance, and Empathy scores.
4.  **Audit Report:** A formal technical report is generated and hashed into the AIC Trust Registry.

---

## 4. Final Assessment & Certification
**Primary Role:** Lead Auditor

1.  **Site Visit:** (Virtual or Physical) Lead Auditor conducts interviews with key accountability officers.
2.  **Integrity Score Calculation:** Engine calculates the final Integrity Score based on verified evidence and audit results.
3.  **Certification Decision:** If score exceeds threshold for the target Tier, Certification is issued.
4.  **Immutable Record:** Certificate details are recorded in the SHA-256 Trust Registry.

---

## 5. Continuous Monitoring (Maintenance)
**Primary Role:** AIC Pulse (Automated)

1.  **Live Telemetry:** System monitors for bias drift and human override frequency.
2.  **Citizen Appeals:** Public portal logs appeals; organizations must resolve them in the "Accountability Queue."
3.  **Monthly Reporting:** Automated Integrity Reports generated for the board.
4.  **Re-certification:** Annual or Bi-annual audits conducted based on Tier.
