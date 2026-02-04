# AIC Ecosystem Walkthrough: The Path to Accountability

This document serves as a guide to the integrated processes and technical relationships within the AI Integrity Certification (AIC) platform.

---

## 🏛️ 1. THE ARCHITECTURE (The 5 Pillars)

| Application | Port | Identity | Purpose |
| :--- | :--- | :--- | :--- |
| **`apps/web`** | 3000 | **The Front Door** | Institutional marketing, Citizens' rights, and Lead qualification (Quiz). |
| **`apps/platform`** | 3001 | **The Portal** | Client-facing SaaS for continuous monitoring and certification progress. |
| **`apps/admin`** | 3002 | **The Factory** | Technical audit pipeline where auditors verify evidence and issue scores. |
| **`apps/hq`** | 3004 | **Command Center** | Growth & Content hub for CRM, CMS, and Super-Admin governance. |
| **`apps/engine`** | 8000 | **The Scientist** | Python-based bias audit logic and algorithmic rights enforcement. |

---

## 🔄 2. THE CERTIFICATION LIFECYCLE

### **Phase 1: Input (Lead Capture)**
*   **Source:** A company lands on `apps/web`.
*   **Action:** They complete the 20-question **Self-Assessment**.
*   **Internal Result:** Data is securely logged in the `leads` table.
*   **External Result:** The client receives a branded **PDF Integrity Report**.

### **Phase 2: Transition (Outreach & Enrollment)**
*   **Location:** `apps/hq/crm`.
*   **Action:** Zander views the lead, initiates a discovery call, and clicks **"Enroll in Alpha"**.
*   **Result:** A new `organization` entry is created. The database triggers the creation of 4-6 **Audit Requirements** (The Roadmap) specifically for their Tier.

### **Phase 3: Process (Remediation & Evidence)**
*   **Location:** `apps/platform/roadmap`.
*   **Action:** The client uploads **Evidence URLs** (e.g., SharePoint/Google Drive links to their AI policies).
*   **Technical Check:** For technical items, the client uses the **Audit Engine** (`apps/platform/audits`) to run a real-time bias test on their datasets.
*   **Intermediate Result:** Technical logs are generated with immutable hashes for proof of integrity.

### **Phase 4: Output (Auditor Verification)**
*   **Location:** `apps/admin/audits/[id]`.
*   **Action:** A Lead Auditor reviews the evidence. They click **"Verify"**.
*   **Result:** 
    1. The requirement status flips to `VERIFIED`.
    2. The organization's **Integrity Score** increases automatically.
    3. A **Notification** is pushed to the client's dashboard.

### **Phase 5: Outcome (Certification & Trust)**
*   **Trigger:** The Integrity Score reaches **100%**.
*   **Location:** `apps/platform/certificate`.
*   **Action:** The **Alpha Certified Seal** and **Official Certificate** appear.
*   **Result:** The client downloads their **Legal Documentation**—a professional PDF signed by the Lead Auditor, certifying their POPIA Section 71 compliance.
*   **Public Proof:** The organization's name is automatically published to the **Public Registry** on `apps/web/registry`.

---

## 🔗 3. TECHNICAL RELATIONSHIPS

1.  **Shared Database:** All apps connect to the same PostgreSQL instance. A change in `apps/admin` (Score update) is instantly reflected in `apps/platform` (Client view) and `apps/web` (Public Registry).
2.  **Auth Synchronization:** Users are managed centrally but have different access levels. A `is_super_admin` in `apps/hq` can see the whole system, while a `VIEWER` in `apps/platform` can only see their own company's data.
3.  **UI Workspace:** All apps share the `@aic/ui` package, ensuring that components like the **Alpha Seal** look identical whether they are in the Admin panel or on the final certificate.

---

## 🚀 4. OPERATIONAL READINESS

To see this in action:
1.  **Start the servers:** `npm run dev` in the root.
2.  **Generate a lead:** Go to `localhost:3000/assessment` and finish the quiz.
3.  **Enroll them:** Go to `localhost:3004/crm` and enroll the lead.
4.  **Submit Evidence:** Go to `localhost:3001/roadmap` (login as the organization).
5.  **Verify & Certify:** Go to `localhost:3002/audits/[id]` to verify and see the score hit 100%.
