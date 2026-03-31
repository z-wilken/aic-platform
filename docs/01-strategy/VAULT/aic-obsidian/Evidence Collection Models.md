# Evidence Collection Models — How We Audit Without System Access

> **Core problem:** No company gives a startup full access to AI infrastructure. This shapes what we build now.

Related: [[Strategy Session AIC Pivot#Fear 3 The Access Problem]], [[What to Build Now]], [[Methodology]]

---

## Why Traditional Access Won't Work

- Banks have regulatory obligations preventing third-party system access
- IP protection means algorithms are trade secrets
- Cybersecurity policies prohibit external connections to production
- Even Big 4 operate under strict access limitations
- Contractual frameworks take months to negotiate

---

## Model 1: Document-Based Audit
*How we start. Available immediately.*

Never touch systems. Audit documentation, processes, and outputs.

**Evidence requested:** AI system inventory, decision-making process docs, sample automated communications, override policies and logs, bias testing results, escalation procedures, training materials, appeals documentation.

**Strengths:** Achievable immediately. How most financial auditors work. Low client barrier.
**Weaknesses:** Relies on what client shares. Can't independently verify. 
**Best for:** [[Pilot Program|Alpha Program]], Year 1.

> **📝 My notes:**
> 

---

## Model 2: Output Testing
*Middle ground. Available once trust established.*

Test outcomes, not the model. Client provides anonymised decision data with demographic breakdowns.

**What we receive:** 10,000+ anonymised decisions with outcome, demographic category, confidence score, whether human reviewed.

**What we determine:** Four-Fifths Rule compliance, demographic parity, override rates, distribution patterns, adverse impact.

**This is how the EEOC actually works** — they audit hiring results, not the algorithm.

**Best for:** Enterprise certs Year 1-2, bias testing.

> **📝 My notes:**
> 

---

## Model 3: Controlled Sandbox
*Future state. Requires trust and tech cooperation.*

Organisation sets up sandboxed test environment. We send synthetic applicants through and observe outputs.

**Example:** 1,000 synthetic loan applicants with controlled demographic variations, identical financial profiles. Submit through credit scoring. Analyse output differences.

**Best for:** Tier 1 certs, Year 2-3, premium offering.

> **📝 My notes:**
> 

---

## Model 4: Self-Assessment + Verification
*The scalable play. Becomes the SME product.*

Organisation completes detailed self-assessment with evidence attachments. We verify and spot-check.

**How B Corp certification works** — mostly self-reported with audit verification.

**Evidence attachments:** Screenshots of override capability, sample communications, process flow diagrams, org charts, policy documents.

**Best for:** SME market (ZAR 5K-15K), volume play, Year 1+. See [[Revenue Architecture#The SME Product in Detail]].

> **📝 My notes:**
> 

---

## The Empathy Assessment — Easiest Without Access

**You don't need API keys to audit rejection letters.**

Request copies of all automated adverse communications. Review for tone, reading level, human recourse, impact acknowledgment, explanation clarity, next steps, response timing.

This is a document review. It's our most unique capability. Most accessible to deliver. See [[What to Build Now#The Empathy Analysis Engine]].

**Start here. Empathy auditing begins day one of any engagement.**

> **📝 My notes:**
> 

---

## Progression by Client Maturity

| | Year 1 | Year 2 | Year 3+ |
|---|---|---|---|
| First engagement | Model 1 + 4 | Model 2 | Model 3 |
| Empathy | Document review | + NLP analysis | + Automated scoring |
| Bias testing | Client data | Output testing | Synthetic testing |
| Cert level | "AIC Assessed" | "AIC Certified" | "AIC Certified — Verified" |

Trust builds over time. Each year the client gives more access.

> **📝 My notes:**
> 

---

Tags: #methodology #access #operations #critical
