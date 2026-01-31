# AIC PRODUCT REQUIREMENTS DOCUMENT
**Version:** 1.0 — Foundation & Future State
**Date:** January 31, 2026
**Classification:** CONFIDENTIAL
**Status:** Active — Phase 1 In Development

---

## 1. Executive Summary
AI Integrity Certification (AIC) is a purpose-built third-party certification body that validates whether organisations deploying artificial intelligence maintain genuine human accountability over algorithmic decisions. AIC does not regulate AI technology itself — it certifies the people, processes, and governance structures that surround it.

South Africa's POPIA Section 71 explicitly prohibits automated decision-making without human oversight. Yet 82% of Fortune 500 companies using AI-powered systems lack any governance certification. Globally, AI discrimination lawsuits have escalated from theoretical to litigated. The market is not hypothetical. The risk is real. The law is clear.

AIC's solution is a three-tier accountability framework that maps certification requirements directly to the stakes of the decisions being made.
*   **Tier 1:** Critical, irreversible decisions (Human Approval Required).
*   **Tier 2:** Consequential but reversible decisions (Human Supervision).
*   **Tier 3:** Low-stakes, routine decisions (Automated with Monitoring).

## 2. Vision & Mission
**Vision:** To become the definitive trust infrastructure for AI deployment across Africa.
**Mission:** To provide rigorous, third-party certification that organisations deploying AI in high-stakes decisions maintain genuine human oversight.
**Core Belief:** We are not afraid of AI. We hold accountable those who wield it irresponsibly.

## 3. Market Context
**Legal Precedent:**
*   *Mobley v. Workday (2025):* Established that AI vendors can be liable as "agents".
*   *EEOC v. iTutorGroup (2024):* $365k penalty for age bias in hiring algorithms.

**South African Regulatory Environment:**
*   **POPIA Section 71:** Prohibits solely automated processing for legal effects.
*   **National AI Policy Framework (2024):** Emphasizes bias mitigation.

## 4. User Personas
1.  **Sarah Nkosi (Chief Risk Officer):** Needs independent proof of compliance to protect the bank from reputational risk.
2.  **David Cele (Chief Compliance Officer):** Needs a defensible framework for AI in clinical settings.
3.  **Thabo Dlamini (Head of People Ops):** Needs to prove non-discrimination to enterprise clients using his recruitment platform.

## 5. Product Ecosystem
**Phase 1: The Website (Launch)**
*   Information engine, lead generation.
*   **Key Features:** Interactive Self-Assessment, Alpha Program Application.

**Phase 2: The Platform (Growth)**
*   **Client Portal:** Secure dashboard for evidence upload and audit tracking.
*   **AIC Pulse SaaS:** Continuous governance monitoring (bias drift detection).

**Phase 3: Expansion**
*   **Insurance Integration:** API layer for premium discounts.
*   **SADC Regional Platform:** Cross-border certification.

## 6. The Tier Framework
| Tier | Description | Examples | Requirements |
| :--- | :--- | :--- | :--- |
| **Tier 1: Human-Approved** | Critical, irreversible decisions. | Cancer treatment, Parole, Major Loans. | 100% human review of decisions. |
| **Tier 2: Human-Supervised** | Consequential but reversible. | Consumer loans, Hiring, Fraud detection. | Explainable AI, Human override mechanism. |
| **Tier 3: Automated** | Low-stakes, routine. | Recommendations, Spam filters. | Clear disclosure, Periodic audits. |

## 7. Functional Requirements (Phase 1)
**Self-Assessment Tool:**
*   20 questions across 4 categories (Usage, Oversight, Transparency, Infrastructure).
*   Email gate at Question 15.
*   Generates Integrity Score (0-100) and Tier Recommendation.

**Alpha Program Page:**
*   Collects use case and tier estimate.
*   Positions program as exclusive (Cohort 1).

## 8. Technical Architecture
**Stack:**
*   **Frontend:** Next.js (Static Generation).
*   **Styling:** Tailwind CSS (Editorial Design System).
*   **Backend (Phase 2):** Node.js/Express or Python, PostgreSQL.
*   **Monitoring:** AIC Pulse (Real-time drift detection).

**Security:**
*   POPIA Compliant (Data Sovereignty).
*   Role-Based Access Control (RBAC).
*   Immutable Audit Logs.

---
*End of Extract from Original PRD Document*
