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

Each category is scored from 0 to 100 based on audit evidence.

---

## 📊 Tier Thresholds

The score determines the recommended Certification Tier, which dictates the level of ongoing monitoring required.

### Tier 1: Critical Risk (Score < 50)
*   **Definition:** High-stakes automated decisions (e.g., healthcare, criminal justice, significant credit).
*   **Requirement:** Mandatory **Human-Approved** status. Every decision must be reviewed by a human before execution.
*   **Audit Frequency:** Bi-annual.

### Tier 2: Elevated Risk (Score 50-79)
*   **Definition:** High-volume automated decisions with moderate impact (e.g., recruitment, standard insurance underwriting).
*   **Requirement:** **Human-Supervised** status. Real-time monitoring with sampled human review and statistical bias auditing.
*   **Audit Frequency:** Annual.

### Tier 3: Standard Risk (Score 80+)
*   **Definition:** Low-stakes automation (e.g., recommendation engines, customer support chatbots).
*   **Requirement:** **Automated-Permissible** status. Transparency disclosure and periodic audit logging.
*   **Audit Frequency:** Biennial.

---

## 🛠️ Assessment Criteria

### 1. Usage Context (20%)
*   **Scale of Impact:** Number of individuals affected.
*   **Legal Consequences:** Does it deny a service, right, or benefit?
*   **Data Sensitivity:** Processing of "Special Personal Information" under POPIA.

### 2. Human Oversight (35%)
*   **Intervention Efficacy:** Can a human override a decision in real-time?
*   **Accountability Gap:** Is there a named individual responsible for the system outcomes?
*   **Training:** Do "Humans-in-the-Loop" understand the model's failure modes?

### 3. Transparency (25%)
*   **Explainability (XAI):** Availability of local feature importance (e.g., SHAP, LIME) or global logic.
*   **Notification:** Are users informed of AI involvement at the point of decision?
*   **Recourse:** Is there a clear, non-technical path for users to appeal?

### 4. Infrastructure (20%)
*   **Auditability:** Are decision logs immutable and centralized?
*   **Data Residency:** Compliance with POPIA cross-border transfer rules.
*   **Model Governance:** Tracking of version drift and bias performance.
