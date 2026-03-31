# The 5 Algorithmic Rights
*Cross-references: [[01-PLATFORM-OVERVIEW]] | [[04-CERTIFICATION-FRAMEWORK]] | [[05-FUNCTIONS-TO-BUILD]] | [[07-API-ROUTES]] | [[00-INDEX]]*

---

## The Declaration of Algorithmic Rights

AIC's audit framework is built on five rights that apply to any person subject to a consequential automated decision. These rights do not depend on whether the system uses machine learning, statistical modelling, or rule-based logic — they apply whenever a system makes a decision that affects a human being.

The Declaration is not aspirational. It is the technical specification for what AIC certifies.

---

## Right 1: Human Agency

> *"Any consequential automated decision must be reviewable and overridable by a named, accountable human being."*

**What it means in practice:**
A person denied a loan by an algorithm must have a mechanism to request that a human reviews that decision. A parole system must require human sign-off before acting on a recommendation. An AI hiring filter must have a human auditor who can intervene.

**How AIC measures it:**
- Does the organisation's AI system have a documented override process?
- Is the override process used? (Evidence of human intervention logs)
- Is the responsible human named? (Accountable Person in system register)
- Does the system belong to TIER_1 (100% human approval) or TIER_2 (human supervision)?

**Engine services that test it:**
- `POST /api/v1/analyze` — Disparate impact analysis (four-fifths rule)
- `POST /api/v1/analyze/equalized-odds` — Equalized odds across demographic groups
- `POST /api/v1/analyze/intersectional` — Multi-attribute intersectional fairness
- `POST /api/v1/labor-audit` — Human oversight ratio verification

**Audit requirement categories linked:** `Human Agency`, `Override Process`, `Accountability Mapping`

**Platform display:** This right's score appears as the "Human Agency" axis in the Platform dashboard's Radar chart (Framework Distribution). See [[02-ARCHITECTURE]].

---

## Right 2: Explanation

> *"Any person affected by an automated decision has the right to understand why that decision was made, in plain language."*

**What it means in practice:**
A credit decision cannot simply say "declined." The organisation must be able to explain which factors drove the decision, what weight each factor carried, and whether those factors are proxies for protected characteristics.

**How AIC measures it:**
- Does the system have a decision explanation mechanism?
- Can it produce human-readable explanations (not just feature importance scores)?
- Are explanations retained and accessible to affected persons?
- Is the explanation verifiable (not just a post-hoc rationalisation)?

**Engine services that test it:**
- `POST /api/v1/explain` — SHAP (SHapley Additive exPlanations) decision explanation
- `POST /api/v1/explain` with `method: "lime"` — LIME (Local Interpretable Model-agnostic Explanations)

**SHAP Output Structure (from engine):**
```json
{
  "feature_importances": {
    "income": 0.42,
    "credit_history": 0.31,
    "postal_code": -0.28,  // negative = discriminatory proxy
    "age": 0.15
  },
  "decision_boundary": 0.6,
  "explanation_text": "Decision driven primarily by income (42%)..."
}
```

**Audit requirement categories linked:** `Explanation Mechanism`, `XAI Documentation`, `Decision Records`

**Platform display:** `/explain` page in `apps/platform` renders SHAP output. Radar chart axis.

---

## Right 3: Empathy

> *"Automated systems must not strip human context from decisions. When context matters, it must be considered."*

**What it means in practice:**
### 1. Healthcare: The "Deviation vs. Emergency" Context

**The Failure:** A pharmaceutical company uses an AI screening tool to select candidates for a high-precision clinical trial for a new chronic pain medication. The AI automatically rejects a group of candidates because their digital health records show "inconsistent medication adherence" (they missed several prescription refills in the past). The AI labels them as "unreliable data sources" who might skew the trial results.

**The Empathy Correction:** A context-aware system analyzes _why_ the adherence was inconsistent. It identifies that the gaps in medication coincided with a period of documented medical supply chain shortages or a change in the candidates' insurance provider, rather than a lack of personal discipline.

By recognizing this **socio-economic context**, the AI flags these candidates for a human coordinator to review. Instead of being excluded, these individuals—who may actually represent a critical "real-world" demographic for the drug's success—are retained in the pool. The system demonstrates "empathy" by understanding that a data point (a missed refill) is not always a character flaw or a risk to the trial’s integrity.

### Why this matters for your Framework:

In the context of the **Strategic Framework for AI Accountability**, this scenario addresses two critical areas:

1. **Algorithmic Bias:** It prevents the "Digital Redlining" of candidates from lower-income backgrounds who may face more systemic hurdles in healthcare access.
    
2. **KPI 3 (Human Override Rate):** This is a perfect example where the AI should not have the "final say." The system should provide the data but trigger a human override to ensure that **human context** (like the insurance gap) is the deciding factor in someone's right to access potentially life-saving medical research.

### 2. E-commerce/Banking: The "Life Event" Filter

**The Failure:** An automated fraud detection system applies a "Hard Block" to a customer’s credit card after they spend R20,000 at a furniture outlet and a baby nursery—a radical departure from their 5-year historical average of R400/day on essentials. The AI labels this "High-Probability Account Takeover," leaving the customer stranded at a checkout counter during a critical life transition.

**The Empathy Correction (Context-Aware Intelligence):** Instead of a binary "Fraud/Not Fraud" decision, the AI identifies **"Cluster Signifiers."** It recognizes that the surge in spending is occurring at reputable, physical local retailers and is categorized under "Home Improvement" and "Childcare."

The system crosses-reference this with other subtle context clues—such as a recent change in a digital "Life Stage" tag or the geographic proximity to the user's home—and calculates a **"Life Event Probability"** score. Rather than a hard block, the AI initiates a **"Frictionless Verification"** (like a push notification: _"We noticed a large purchase for your home—is this you?"_). This recognizes that human financial needs are not linear, but seasonal and milestone-driven.

### 3. Education: The "Learning Curve" Context

**The Failure:** An AI grading tool flags a student for "low effort" because their essay takes three times longer to type than the class average, or because their vocabulary is simpler than their peers. **The Empathy Correction:** The AI integrates the context that the student is a **second-language learner** or has a documented physical disability affecting typing speed. Instead of a low grade for "fluency," the system evaluates the progression of ideas and logic, normalizing the score against the student’s specific linguistic background rather than a generic "elite" standard.

**How AIC measures it:**
- Has the organisation tested for context-stripping bias?
- Is there a mechanism to flag decisions where contextual factors were unavailable?
- Does the system documentation acknowledge domain-specific context requirements?
- Are empathy annotations used in training data?

**Engine services that test it:**
- `POST /api/v1/empathy` (currently partial implementation — see [[05-FUNCTIONS-TO-BUILD]]) — NLP sentiment analysis of decision narratives using TextBlob
- Intersectional analysis tests for contextual group disparities

**Audit requirement categories linked:** `Contextual Bias`, `Empathy Annotations`, `Domain Adaptation`

**Platform display:** `/empathy` page in `apps/platform`. Radar chart axis.

---

## Right 4: Correction

> *"Any person affected by an automated decision has the right to challenge it and have their challenge responded to."*

**What it means in practice:**
Appeals cannot go into a void. AIC certifies that the organisation has a functioning correction pipeline: appeals are logged, assigned, responded to within a defined SLA, and the outcome is recorded. The right to correction is only meaningful if there is a measurable response rate.

**How AIC measures it:**
- Does the system expose a correction/appeal mechanism? (Public-facing)
- What is the average time-to-response on correction requests?
- What percentage of corrections are upheld? (Evidence of genuine consideration)
- Is the correction history immutably logged?

**Engine services that test it:** No dedicated engine endpoint yet — tracked via DB metrics. See [[05-FUNCTIONS-TO-BUILD]] for `GET /api/corrections/analytics`.

**Database tables involved:** `correctionRequests`, `incidents` — see [[06-DATABASE-SCHEMA]]

**Audit requirement categories linked:** `Correction Pipeline`, `Appeal SLA`, `Response Rate`

**Platform display:** Radar chart axis. `/incidents` page shows open correction requests.

---

## Right 5: Truth

> *"Any person interacting with an automated system has the right to know they are interacting with an automated system."*

**What it means in practice:**
AI disclosure is not optional. A chatbot must identify itself. An AI-generated risk score on a loan application must be disclosed as AI-generated. An automated hiring screening must disclose that a human did not read the CV first. This right prevents the "automation opacity" that allows institutions to hide behind ambiguity.

**How AIC measures it:**
- Does the organisation have documented AI disclosure policies?
- Are disclosure statements present at all decision points?
- Does the system metadata accurately describe the AI's role in each decision?
- Are disclosures specific enough to be meaningful (not just legal boilerplate)?

**Engine services that test it:**
- AI disclosure analysis (currently implemented as part of privacy audit — formal endpoint pending, see [[05-FUNCTIONS-TO-BUILD]])

**Audit requirement categories linked:** `AI Disclosure`, `Transparency Documentation`, `Public Statements`

**Platform display:** Radar chart axis.

---

## How the 5 Rights Map to the Platform

```
Right            → DB Category          → Engine Endpoint        → Platform Page
──────────────────────────────────────────────────────────────────────────────
Human Agency     → auditRequirements    → /analyze               → /workspace
                   (category: Agency)    /labor-audit             /incidents

Explanation      → auditRequirements    → /explain (SHAP/LIME)   → /explain
                   (category: Explain)

Empathy          → auditRequirements    → /empathy               → /empathy
                   (category: Empathy)   /intersectional

Correction       → correctionRequests   → (DB metrics only)      → /incidents
                   incidents

Truth            → auditRequirements    → (privacy audit)        → /workspace
                   (category: Truth)
```

---

## Integrity Score Calculation

Each right contributes to the organisation's overall **Integrity Score** (0–100):

```
Integrity Score = Σ(verified requirements / total requirements) × 100

Per-right scores are calculated by category:
{
  "Human Agency": verified_agency / total_agency × 100,
  "Explanation":  verified_explain / total_explain × 100,
  "Empathy":      verified_empathy / total_empathy × 100,
  "Correction":   verified_correction / total_correction × 100,
  "Truth":        verified_truth / total_truth × 100
}
```

This is calculated in `packages/db/src/calculateOrganizationIntelligence()` and stored in `organizations.integrity_score`. Monthly snapshots are stored in `complianceReports.integrityScore`.

See [[04-CERTIFICATION-FRAMEWORK]] for how this maps to certification tiers.

---

## AIMS Readiness Levels

The **Algorithmic Impact Management System (AIMS)** readiness level is displayed on the platform dashboard. It is currently hardcoded to "Level 3/4" and needs to be made dynamic. See [[05-FUNCTIONS-TO-BUILD]] — `calculateAIMSReadinessLevel()`.

| Level | Requirements |
|-------|-------------|
| Level 1 | Basic disclosure — organisation acknowledges use of AI |
| Level 2 | Documented processes — policies exist for all 5 rights |
| Level 3 | Verified implementation — evidence submitted and verified |
| Level 4 | Continuous governance — real-time monitoring, incident response |

---

*Next: [[04-CERTIFICATION-FRAMEWORK]] — how the rights map to certifiable tiers.*
