# AIC Strategic Roadmap V2

**Status:** Technical Core Hardened | Phase 4 Platform Build Accelerated  
**Date:** February 5, 2026

---

## 🛰️ Current Technical State

The AIC platform has transitioned from a high-fidelity prototype to a functional, secure, and integrated ecosystem.

| Milestone | Status | Impact |
| :--- | :--- | :--- |
| **Security Hardening** | ✅ COMPLETE | Removed all hardcoded credentials; enforced environment variables. |
| **Technical Engine Wiring** | ✅ COMPLETE | `apps/platform` now calls `apps/engine` for real bias audits. |
| **Rigorous Scoring** | ✅ COMPLETE | Implemented PRD-mandated weighted formula across ecosystem. |
| **Automated Verification** | ✅ STARTED | Established Vitest suite with core logic unit tests. |
| **Dual-Path Architecture** | ✅ COMPLETE | Website split into Citizens vs. Organizations pathways. |
| **Institutional HQ** | ✅ COMPLETE | Launched `apps/hq` for CRM, CMS, and Governance. |

---

## 📈 Phase 1 & 2: Demand Validation & Alpha Execution (Current Focus)

### **1. Alpha Outreach (Week 1-3)**
*   **Target:** 20 South African Organizations (Banks, Health, HR).
*   **Activity:** Personalized outreach using the **Growth Pipeline** in `apps/hq`.
*   **Goal:** Sign 5-7 Alpha participants at 50% discount.

### **2. Technical Audit Cycle (Week 4-8)**
*   **Evidence Collection:** Organizations submit policy docs via the **Remediation Roadmap**.
*   **Live Bias Audits:** Run production model outcomes through the **AIC Engine** (EEOC 4/5ths Rule).
*   **Verification:** Auditors use `apps/admin` to verify evidence and flip the **Integrity Score** to 100%.

### **3. Regulatory Alignment**
*   **IR Meeting:** Present the **Meaningful Human Intervention** framework to the Information Regulator.
*   **Outcome:** Secure a letter of acknowledgment for AIC's alignment with POPIA Section 71.

---

## 🛠️ Next Technical Milestones

1.  **Expand Test Coverage:** Increase unit and integration tests across all 5 apps to reaching >70% coverage of core logic.
2.  **Rich Content CMS:** Enhance the `hq` CMS with a full Markdown editor and image upload capability.
3.  **Real-Time Notifications:** Transition from 30s polling to WebSockets for instant auditor-to-client alerts.
4.  **Insurance API:** Build the first mockup of the "Risk Score" API for insurance partners (iTOO, Santam).

---

*"Trust is verified, not just claimed."*
