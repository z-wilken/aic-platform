# AIC Integrity Score Methodology

**Version 1.0 (Alpha)**

The AIC Integrity Score is a quantitative measure of an organization's adherence to the principle of human accountability in AI deployment, specifically designed to satisfy the requirements of **POPIA Section 71**.

---

## 🧮 Score Calculation

The score is a weighted average across four core categories:

| Category | Weight | Focus Area |
|----------|--------|------------|
| **Usage Context (UC)** | 20% | Criticality of decisions, data sensitivity, and scale. |
| **Human Oversight (HO)** | 35% | Intervention mechanisms, training, and accountability structures. |
| **Transparency (TR)** | 25% | Explainability, disclosure, and user recourse. |
| **Infrastructure (IN)** | 20% | Data residency, audit logging, and fallback systems. |

**Formula:**
`Integrity Score = (UC * 0.20) + (HO * 0.35) + (TR * 0.25) + (IN * 0.20)`

---

## 📊 Alpha Scoring Matrix (Detailed)

Each category is comprised of specific controls. Auditors assign a score of 0-4 for each control:
*   **0:** No evidence / Non-existent
*   **1:** Ad-hoc / Undocumented
*   **2:** Documented but inconsistent
*   **3:** Implemented and verified
*   **4:** Optimized / Continuous monitoring

### 1. Usage Context (20%)
*   **UC.1 Decision Criticality:** Mapping of all AI systems to the 3-Tier framework based on legal/human impact.
*   **UC.2 Data Sensitivity:** Inventory of Special Personal Information (SPI) processed by models.
*   **UC.3 Impact Assessment:** Presence of a formal Algorithmic Impact Assessment (AIA) for high-stakes models.

### 2. Human Oversight (35%) - *POPIA Section 71 Core*
*   **HO.1 Intervention Efficacy:** Demonstrated ability for a human to override an automated decision in real-time (Tier 1 & 2).
*   **HO.2 Accountability Structure:** Clear appointment of a "Human-in-the-Loop" officer with legal authority to stop models.
*   **HO.3 Empathy & Context:** Reviewers are trained to identify model failures that affect human dignity.
*   **HO.4 Review UI:** The interface used by human reviewers provides sufficient context to make an informed decision.

### 3. Transparency (25%)
*   **TR.1 Decision Explainability:** Technical implementation of XAI (e.g., Top 3 factors provided for every denial).
*   **TR.2 Disclosure:** Clear, prominent notice to data subjects that a decision was made via automated processing.
*   **TR.3 Recourse Mechanism:** A non-technical workflow for data subjects to request human intervention or contest results.

### 4. Infrastructure (20%)
*   **IN.1 Audit Logging:** Immutable logs capturing the input, model version, recommendation, and final human decision.
*   **IN.2 Bias Monitoring:** Scheduled technical audits for disparate impact (EEOC Four-Fifths Rule).
*   **IN.3 Data Residency:** Verification that processing of sensitive South African data complies with cross-border transfer rules.

---

## 🏁 Tier Thresholds

The score determines the recommended Certification Tier:

### Tier 1: Critical Risk (Score < 50)
*   **Requirement:** Mandatory **Human-Approved** status. Every decision must be reviewed by a human before execution.
*   **Audit Frequency:** Bi-annual.

### Tier 2: Elevated Risk (Score 50-79)
*   **Requirement:** **Human-Supervised** status. Real-time monitoring with sampled human review.
*   **Audit Frequency:** Annual.

### Tier 3: Standard Risk (Score 80+)
*   **Requirement:** **Automated-Permissible** status. Transparency disclosure and periodic monitoring.
*   **Audit Frequency:** Biennial.