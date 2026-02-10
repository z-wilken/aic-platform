# AIC Ecosystem Walkthrough V2: Hardened & Integrated

This guide walks you through the operational flow of the AIC platform following the Phase 4 Security & Integration sprint.

---

## 🔐 1. SECURITY & ACCESS CONTROL

Every app is now protected by mandatory environment variables and role-based middleware.

*   **Login to HQ:** Go to `localhost:3004/login`. Only accounts with `is_super_admin = true` can access the `/governance` tab.
*   **Login to Admin:** Go to `localhost:3002/login`. Only `ADMIN` or `AUDITOR` roles can enter.
*   **Login to Platform:** Go to `localhost:3001/login`. Clients can only see their own organization's data.

---

## 🔄 2. THE TECHNICAL AUDIT LOOP (Real Integration)

### **Step 1: The Bias Audit**
1.  Go to `localhost:3001/audits` (The Client Portal).
2.  Click **"RUN LIVE BIAS AUDIT"**.
3.  **Behind the Scenes:** 
    *   Next.js sends sample data to the **Python FastAPI Engine** (`localhost:8000`).
    *   The Engine calculates the **EEOC Four-Fifths** status.
    *   The result is saved to the database with a **SHA-256 Hash**.
4.  **Result:** A new log appears in the table with a "VERIFIED" status and an immutable integrity hash.

### **Step 2: The Scoring Engine**
1.  Go to `localhost:3001` (Dashboard Overview).
2.  The **Integrity Score** is now calculated using the rigorous weighted formula:
    *   `Oversight (35%)`
    *   `Documentation (20%)`
    *   `Reports (25%)`
    *   `Technical (20%)`
3.  **Verification:** If you verify a requirement in `localhost:3002`, the score here will update instantly based on these weights.

---

## 🧪 3. AUTOMATED VERIFICATION (The Trust Suite)

We have established a **Vitest** test suite to ensure the platform's core logic is never compromised.

*   **To run tests:** Open a terminal in `apps/platform` and run `npm test`.
*   **Scope:** Currently covers the weighted Integrity Scoring logic.

---

## 🏛️ 4. THE COMMAND CENTER (HQ)

`apps/hq` is your strategic heart.
*   **Growth:** Manage the 20 outreach targets in the **Growth Pipeline**.
*   **Voice:** Manage the public blog posts and newsletter subscribers in the **Content CMS**.
*   **Governance:** Manage the team's access and functional permissions.

---

*"We have moved from a promise of accountability to a platform of verification."*
