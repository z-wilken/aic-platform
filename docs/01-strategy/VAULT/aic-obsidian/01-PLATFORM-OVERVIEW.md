# AIC Platform Overview
*Cross-references: [[10-STRATEGY]] | [[11-REVENUE-MODEL]] | [[02-ARCHITECTURE]] | [[03-ALGORITHMIC-RIGHTS]] | [[04-CERTIFICATION-FRAMEWORK]] | [[00-INDEX]]*

---

## What Is AIC?

**AI Integrity Certification (AIC)** is a South African institution that audits, certifies, and continuously governs organisations' use of algorithmic decision systems. It is built around a foundational conviction:

> *"When systems make decisions that affect human beings, humans must remain accountable for those decisions."*
> — Zander Wilken, Founder

AIC does not audit the technology. It audits the **accountability** behind the technology. A credit scoring algorithm, a parole recommendation model, an insurance underwriting tool, a hiring filter — all affect human lives. AIC certifies that a named human being can explain every consequential decision, intervene when the system fails, and be held responsible for the outcome.

**What kind of organisation is AIC?** This is the defining question. See [[10-STRATEGY]].

> The recommended answer: **Start as the institution. Use technology to scale the certification. Keep professional services as small as possible.**
> Year 1 = Become the authority. Year 2 = Automate the certification. Year 3 = Scale the platform.

---

## The Problem AIC Solves

Algorithmic systems are now making decisions that were historically made by humans with names and faces:

- Who gets a loan and who is denied
- Who gets hired and who is screened out
- Who receives medical treatment and who waits
- Who is recommended for parole and who stays incarcerated

When these decisions cause harm — discrimination, exclusion, error — there is often no accountability. "The algorithm decided" becomes a shield. AIC breaks that shield by making accountability auditable, certifiable, and enforceable.

**Legal anchor (South Africa):** POPIA Section 71 prohibits automated decision-making without human oversight. AIC turns that legislative requirement into a verifiable certification standard.

**Subscription model justification:** Because human oversight is a legal requirement — AI cannot be its own regulatory judge — the subscription model holds even as AI becomes more capable. You're paying for the accountability structure, not the technology.

**The solopreneur question:** As AI enables more solo-run companies to deploy AI outputs at scale with no human accountability, AIC's role becomes more critical, not less. Who holds a one-person company accountable for the AI decisions it makes about customers?

---

## The Dual-Track Model

AIC doesn't just sell certification. It creates the conditions that make certification valuable.

**Track 1 — The Standard (creates demand):**
- Declaration of Algorithmic Rights — open and free
- AI Governance Index — public scoring of JSE Top 40
- Weekly content — authority before revenue proves it
- Regulator engagement — policy influence

**Track 2 — The Certification (captures demand):**
- Enterprise certification: ZAR 75K–500K
- SME self-serve: ZAR 5K–15K
- Annual renewals, auditor training, referral fees

See [[11-REVENUE-MODEL]] for full pricing and scenarios.

---

## Who Uses the Platform

| User Type | App | Role |
|-----------|-----|------|
| **Certified Organisation** | `apps/platform` | Manages AI systems, submits evidence, tracks compliance score, reports incidents |
| **AIC Auditor** | `apps/admin` | Reviews evidence, verifies requirements, issues certifications |
| **AIC Operations / Founder** | `apps/hq` | Monitors pipeline, revenue, regulatory relationships, team |
| **Practitioner (individual)** | `apps/platform/practitioner` | Tracks their own CPD certification |
| **Citizen** | `apps/web/citizens` | Understands algorithmic rights, submits appeals |
| **Prospect / Lead** | `apps/web` | Takes self-assessment, applies for pilot, learns about AIC |

---

## Four Products

### 1. Enterprise Certification
Organisations certify AI/algorithmic systems against the 5 Algorithmic Rights. Produces an Integrity Score (0–100) and a Certification Tier (TIER_1 to TIER_3). ZAR 75K–500K. See [[04-CERTIFICATION-FRAMEWORK]].

### 2. SME Self-Serve Assessment
40-question self-assessment with evidence upload, automated scoring, empathy quick-scan, PDF report, and "AIC Assessed" badge. ZAR 5K–15K. No sales call. ~85% margin. This IS the scale product. See [[11-REVENUE-MODEL]].

### 3. AI Governance Index
Free public rankings of JSE Top 40 on AI governance. Uses only public data (annual reports, policies, press releases). Creates market pressure, media attention, and a compounding data asset. The flagship that makes the market. See [[10-STRATEGY]].

### 4. Practitioner Certification
Individuals earn a professional credential for conducting algorithmic accountability audits. CPD modules, exams, annual renewal. In development. See [[02-ARCHITECTURE]].

---

## The 5 Algorithmic Rights (Audit Framework)

AIC's certification methodology is built on five rights that apply to any person subject to a consequential automated decision:

| Right | What It Means | Audit Approach |
|-------|---------------|----------------|
| **Human Agency** | A human must be able to override any consequential decision | Document review, output testing, labour audit |
| **Explanation** | The system must explain why a decision was made | SHAP/LIME analysis, decision record review |
| **Empathy** | Automated communications must treat people as human beings | Empathy Engine — see [[10-STRATEGY]] |
| **Correction** | People must have a right of appeal that is genuinely acted upon | Correction pipeline metrics, SLA tracking |
| **Truth** | The system must be honest about being an AI | AI disclosure review |

See [[03-ALGORITHMIC-RIGHTS]] for deep detail on each right and how they map to the platform.

---

## The Empathy Engine — Highest Priority Build

The single most important investor demo piece. Ingests automated communications (rejection letters, denial notices, chatbot transcripts) and produces an Empathy Score with diagnostics and recommendations.

**Why it matters strategically:** It requires zero client system access. Can be demo'd today with publicly available rejection letters from social media. Codifies what "empathetic automated communication" means — that's IP.

**Scoring dimensions:** Tone (20%), Human Recourse (20%), Impact Acknowledgment (15%), Explanation Clarity (15%), Reading Level (10%), Next Steps (10%), Response Time (10%).

**Demo:** Paste rejection letter → Score: 34/100 → Breakdown → "Here's what 85/100 looks like."

See [[05-FUNCTIONS-TO-BUILD]] for build spec.

---

## South African Context

- **POPIA Section 71** — the legislative hook: automated decisions require human oversight
- **SADC expansion** — mid-term target (2025–2030)
- **Historical resonance** — the founder's vision explicitly links algorithmic discrimination to South Africa's history of administrative oppression. Systems that seem administratively neutral can automate injustice at scale. South Africa knows this.
- **Information Regulator** — target regulatory partner; Section 71 enforcement not yet active but EU AI Act creates global pressure independent of local enforcement
- **Moody's model** — AIC creates the standard AND runs the certification. Like Fair Trade Foundation or LEED, not like Deloitte.

---

## Current Status (February 2026)

| Phase | Status |
|-------|--------|
| **Identity** | Positioning as institution + certification body. Technology is the scaling mechanism, not the product. |
| **Platform (apps)** | Functional for alpha but not production-hardened. Key metrics hardcoded. See [[08-HARDCODED-DATA]]. |
| **Immediate build priority** | Mock Alpha Deliverable → Empathy Engine → AI Governance Index. See [[05-FUNCTIONS-TO-BUILD]]. |
| **Alpha pilot** | Targeting 3–5 paying participants. First document-based assessments. |
| **Security** | Technical audit (Feb 17) found critical gaps. 5 P0 issues before any scale. See [[05-FUNCTIONS-TO-BUILD]]. |

---

## Key People

| Name | Role |
|------|------|
| Zander Wilken | Founder — vision, strategy, sales, product |
| Johann | Content creation, course curriculum |
| Tay | Content writing, social media |
| EE | Training session sign-off, quality |

---

## What NOT to Build Yet

> From the strategic planning session — don't let the platform roadmap distract from the business priorities.

- Full client portal — after 5 paying clients
- Admin dashboard enhancements — after first hire
- Automated bias engine — needs real client data first
- Mobile app — nobody audits AI governance on phones
- Blockchain anything — no

---

*Next: [[10-STRATEGY]] — the strategic identity question, 5 fears, 5 opportunities, and 12-month sequencing.*
