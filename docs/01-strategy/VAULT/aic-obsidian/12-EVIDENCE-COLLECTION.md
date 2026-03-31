# Evidence Collection Models
*How AIC audits without full system access — the practical methodology*

*Cross-references: [[10-STRATEGY]] | [[04-CERTIFICATION-FRAMEWORK]] | [[03-ALGORITHMIC-RIGHTS]] | [[05-FUNCTIONS-TO-BUILD]] | [[00-INDEX]]*

---

## The Core Constraint

No company is giving a startup full access to their AI infrastructure.

- Banks have regulatory obligations preventing third-party system access
- IP protection means algorithms are trade secrets
- Cybersecurity policies prohibit external connections to production systems
- Even Big 4 firms operate under strict access limitations
- Contractual frameworks to enable access take months to negotiate

**This is not a problem. It is a design constraint.** The four models below are how AIC audits within these constraints, progressively requiring more access as trust builds over time.

---

## Model 1 — Document-Based Audit
*How we start. Available immediately. Year 1 primary method.*

Never touch systems. Audit documentation, processes, and outputs.

**Evidence requested from client:**
- AI system inventory (what systems exist, what decisions they make)
- Decision-making process documentation
- Sample automated communications (rejection letters, denial notices, approval messages)
- Override policies and logs (evidence that humans can and do intervene)
- Bias testing results (whatever they have already conducted)
- Escalation procedures
- Staff training materials on algorithmic systems
- Appeals documentation and outcomes

**What AIC produces from this:**
- Gap analysis against the 5 Algorithmic Rights
- Integrity Score based on documentation completeness and quality
- Recommendations for each gap
- Empathy assessment of communications (see below)
- POPIA Section 71 compliance mapping

**Strengths:** Achievable from Day 1. How most financial auditors work. Low client barrier — no system access required. Most sensitive for Right 3 (Empathy) and Right 5 (Truth), which are purely communication-based.

**Weaknesses:** Relies entirely on what the client chooses to share. Cannot independently verify that stated processes are followed in practice. Vulnerable to clients "staging" evidence.

**Best for:** Alpha Programme (Year 1). Any client where system access is blocked. SME self-serve (clients upload their own documents).

**Cert level produced:** "AIC Assessed" — the entry-level badge. Documents reviewed; practices not independently verified.

---

## Model 2 — Output Testing
*Middle ground. Available once initial trust is established. Year 1–2.*

Test outcomes, not the model. The client provides anonymised decision data with demographic breakdowns. AIC never sees the algorithm — only the results it produces.

**What AIC receives:**
- 10,000+ anonymised decisions with outcome (approved/denied/scored)
- Demographic category (race, gender, age — anonymised/coded)
- Confidence score or probability
- Whether human reviewed
- Timestamp (to check for response time patterns)

**What AIC determines:**
- Four-Fifths Rule compliance (disparate impact across demographic groups)
- Demographic parity in approval/denial rates
- Human override frequency and pattern (Right 1: Human Agency)
- Decision distribution patterns
- Adverse impact calculation per group

**This is how the EEOC works** — they audit hiring results, not the algorithm. The methodology is legally established and understood by corporate compliance teams.

**Strengths:** Statistically rigorous. Independent of algorithm access. Legally familiar framing. Produces defensible numbers.

**Weaknesses:** Client controls which 10,000 decisions to share. Cherry-picking risk. Requires client to have demographic data (many claim they don't).

**Best for:** Enterprise certifications Year 1–2. Bias testing component. Financial services (they have the data).

**Platform support:** `apps/engine/POST /api/v1/analyze` (disparate impact), `/analyze/equalized-odds`, `/analyze/intersectional`. These take anonymised data files, not system access.

**Cert level produced:** "AIC Certified" — methodology applied; outputs independently tested.

---

## Model 3 — Controlled Sandbox
*Future state. Requires established trust and technical cooperation. Year 2–3.*

Organisation sets up a sandboxed test environment. AIC sends synthetic test cases through and observes outputs.

**How it works:**
- AIC creates 1,000+ synthetic applicants/cases with controlled variations
- Identical financial profiles but different demographic markers
- Client submits them through their actual system in sandbox mode
- AIC analyses output differences with demographics held constant

**Example:** 1,000 synthetic loan applicants. Same credit history, income, employment — but race, gender, postal code varied. Identical profiles should receive identical decisions. Any divergence is bias.

**Why this matters:** Tests the actual algorithm, not just its historical outputs. Can catch bias that the client's own bias testing missed (because their testing used the same biased data).

**Strengths:** Gold standard for bias detection. Tests actual model behaviour. Controls for selection bias in historical data.

**Weaknesses:** Requires technical cooperation and significant setup time. Only possible with organisations who have sandboxed environments. Takes months to negotiate access agreements.

**Best for:** Tier 1 certifications (highest-stakes decisions). Premium offering. Year 2–3 when trust is established.

**Cert level produced:** "AIC Certified — Verified" — independent testing of actual algorithm.

---

## Model 4 — Self-Assessment + Verification
*The scalable play. Becomes the SME product. Available now.*

Organisation completes detailed self-assessment with evidence attachments. AIC verifies and spot-checks.

**How B Corp certification works** — mostly self-reported with verification audit.

**Evidence attachments clients upload:**
- Screenshots of override capability in action (Right 1: Human Agency)
- Sample automated communications (Right 3: Empathy)
- Process flow diagrams for decision-making (Right 2: Explanation)
- Org charts showing accountability chain (Right 1: Human Agency)
- Policy documents (all 5 Rights)
- Appeals outcome logs (Right 4: Correction)
- AI disclosure statements (Right 5: Truth)

**AIC verification:**
- Spot-check consistency between answers and evidence
- Empathy Engine assessment of uploaded communications
- Flag contradictions (e.g., claiming 100% human review but no evidence)
- Assign Integrity Score based on verified responses

**Strengths:** Scales without AIC headcount. Client does the work. Evidence is permanently stored. Works for any size organisation. This IS the SME product.

**Weaknesses:** Self-reported; verification is sampling, not comprehensive. Clients may overstate practices. Quality depends on client honesty.

**Best for:** SME market (ZAR 5K–15K). Volume play. Any client where direct audit is cost-prohibitive.

**Platform support:** `apps/web/assessment` + evidence upload + `apps/platform/workspace`. See [[05-FUNCTIONS-TO-BUILD]] for the SME upgrade needed.

---

## The Empathy Assessment — Easiest and Most Unique

**The single capability that requires zero system access and zero client cooperation.**

Every organisation that uses automated communications has sent rejection letters, denial notices, and automated responses. These are:
- Available on request (any document review)
- Often public (job applicants screenshot them and post on social media)
- Never previously scored for human dignity standards

**What gets submitted:** 3–10 sample automated adverse communications.

**What AIC produces:** Empathy Score (0–100) with dimension breakdown and annotated recommendations.

**The seven dimensions:**

| Dimension | Weight | What It Asks |
|-----------|--------|--------------|
| Tone | 20% | Is the language respectful and considerate? |
| Human Recourse | 20% | Is a human contact point offered? How accessible? |
| Impact Acknowledgment | 15% | Does it recognise this decision matters to this person? |
| Explanation Clarity | 15% | Is the reason clearly explained? |
| Reading Level | 10% | Can an average person understand it? (Target: Grade 8) |
| Next Steps | 10% | Are clear, actionable next steps provided? |
| Response Time | 10% | Is there a buffer before the decision becomes permanent? |

**Build status:** Phase 1 (structured rubric) can be built in 2–3 weeks. Phase 2 (NLP-assisted analysis) comes later. The rubric IS the IP — it codifies what "empathetic automated communication" means. See [[05-FUNCTIONS-TO-BUILD]].

**Demo flow:** Paste rejection letter → Empathy Score: 34/100 → Dimension breakdown → Annotated version → "Here's what 85/100 looks like."

**Why this is the highest-priority demo build:** It requires no client access, no client relationship, no data agreements. It can be demonstrated today with publicly available rejection letters from job portals, banks, and insurance companies. It is both the easiest to build and the most compelling to investors.

---

## Progression by Client Maturity

Trust builds over time. Each engagement year, the client gives more access.

| Stage | Engagement Year | Evidence Model | Empathy Method | Bias Testing | Cert Level |
|-------|----------------|----------------|----------------|--------------|------------|
| Entry | Year 1 | Model 1 + 4 | Document review | Client-provided results | "AIC Assessed" |
| Standard | Year 2 | Model 2 | + NLP analysis | Output testing (10K decisions) | "AIC Certified" |
| Premium | Year 3+ | Model 3 | + Automated scoring | Synthetic testing | "AIC Certified — Verified" |

---

## What This Means for Platform Build Order

Most of the current platform assumes Model 3 (full system integration, API connections, real-time analysis). But the business reality is that Year 1 is Model 1 and Model 4.

This means the **most valuable platform features for Year 1** are:
- Evidence upload and management (document review support)
- Empathy Engine (communications scoring)
- PDF report generation (Mock Alpha Deliverable)
- SME self-serve assessment

The **API-heavy platform features** (engine bias analysis, SHAP/LIME, real-time monitoring) become valuable in Year 2–3 as clients graduate to Model 2 and 3.

This should inform which items in [[05-FUNCTIONS-TO-BUILD]] get prioritised.

---

*The methodology is designed to work with the access you have, not the access you wish you had.*

*Next: [[04-CERTIFICATION-FRAMEWORK]] for how each evidence model maps to certification tiers.*
