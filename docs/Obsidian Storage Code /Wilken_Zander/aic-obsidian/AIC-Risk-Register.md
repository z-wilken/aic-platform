# AIC Risk Register — Pre-Alpha Launch
*Version 1.0 · February 24, 2026 · Owner: Wilken Zander*
*Review cycle: Monthly until Alpha complete, then quarterly*

---

## Risk Matrix Key

| Likelihood | Score | Severity | Score |
|-----------|-------|----------|-------|
| Rare (< 10%) | 1 | Negligible | 1 |
| Unlikely (10–30%) | 2 | Minor | 2 |
| Possible (30–60%) | 3 | Moderate | 3 |
| Likely (60–80%) | 4 | Major | 4 |
| Almost Certain (>80%) | 5 | Critical | 5 |

**Risk Score = Likelihood × Severity**
- 1–4: LOW (monitor) · 5–9: MEDIUM (manage) · 10–16: HIGH (act now) · 17–25: CRITICAL (escalate immediately)

---

## CRITICAL Risks (17–25)

### R-01 — Single Point of Failure
**Category:** Operational
**Description:** AIC is currently a one-person operation. Illness, burnout, or a competing opportunity could halt all activity. There is no redundancy in any function: sales, delivery, technology, strategy, administration.
**Likelihood:** 4 (Likely) × **Severity:** 5 (Critical) = **Score: 20**
**Current Controls:** None in place.
**Mitigation Actions:**
1. Document all processes in Notion and Obsidian (in progress via AIC knowledge base)
2. Identify at least one co-founder candidate by end of Month 2
3. Brief one trusted person monthly so they can step in with 1-week notice
4. Evaluate part-time delivery contractor for Alpha period
**Owner:** Wilken Zander **Due:** Month 2
**Residual Risk:** HIGH (14) — cannot fully mitigate without co-founder

---

### R-02 — Methodology Challenged or Discredited
**Category:** Reputational / Commercial
**Description:** A company that performs poorly on the Index or fails certification could publicly challenge AIC's methodology as unscientific, commercially motivated, or legally unsound. This is an existential reputational risk for a new standards body. A single credible challenge that goes unanswered could undermine all future commercial activity.
**Likelihood:** 3 (Possible) × **Severity:** 5 (Critical) = **Score: 15** → escalated to CRITICAL given existential nature
**Current Controls:** ISO/IEC 42001 alignment documented; POPIA mapping documented.
**Mitigation Actions:**
1. Publish detailed methodology PDF before Index goes public — transparency defuses most challenges
2. Engage independent academic reviewer to validate rubric (target: University of Cape Town or Wits AI faculty)
3. Legal review of all public-facing methodology claims before publication
4. Prepare a standard "methodology challenge" response document
5. Set up a formal methodology review process — challenges are acknowledged within 5 business days
**Owner:** Wilken Zander **Due:** Before Index launch
**Residual Risk:** MEDIUM (9)

---

## HIGH Risks (10–16)

### R-03 — No Paying Clients Within 6 Months
**Category:** Commercial / Financial
**Description:** AIC could complete the authority-building phase (Declaration, Index, content) but fail to convert this into paying Alpha clients. Without revenue by Month 6, runway becomes the binding constraint.
**Likelihood:** 3 × **Severity:** 4 = **Score: 12**
**Current Controls:** None — no signed clients yet.
**Mitigation Actions:**
1. Identify 3 specific named prospects by end of Month 1 (not "banks" — a person at a company)
2. Build the Mock Alpha Deliverable as the primary sales tool *(DONE — February 2026)*
3. Build the AI Governance Index as an inbound pipeline tool *(DONE — February 2026)*
4. Price the SME self-assessment at ZAR 5K–15K as a lower-barrier revenue entry point
5. Track: conversations initiated, proposals sent, decisions made — review weekly
**Owner:** Wilken Zander **Due:** Ongoing
**Residual Risk:** MEDIUM (8) — reduces as pipeline develops

---

### R-04 — Regulatory Enforcement Delay (Timing Paradox)
**Category:** Market / External
**Description:** POPIA Section 71 exists but is unenforced. The Information Regulator has issued no Section 71 enforcement actions. If enforcement takes 3+ more years, AIC's primary compliance-urgency argument weakens.
**Likelihood:** 4 × **Severity:** 3 = **Score: 12**
**Current Controls:** EU AI Act pressure on SA companies; Insurance partnership angle; Investor due diligence angle.
**Mitigation Actions:**
1. Do not build the business case around POPIA enforcement urgency alone — use multiple pressure vectors
2. Engage Information Regulator proactively (Month 3) — position AIC as the private sector solution
3. Track EU AI Act implementation — companies with EU operations face hard deadlines
4. Develop the "reputational risk" narrative independent of legal enforcement
**Owner:** Wilken Zander **Due:** Strategy update monthly
**Residual Risk:** MEDIUM (8)

---

### R-05 — Platform Security Incident Before Alpha
**Category:** Technical / Reputational
**Description:** The AIC platform has documented P0 security vulnerabilities (RLS bypass on 9 endpoints, no MFA, non-functional token revocation). If a client's data is accessed by another client before these are fixed, AIC's credibility is destroyed — we certify AI governance but our own platform is insecure.
**Likelihood:** 2 × **Severity:** 5 = **Score: 10**
**Current Controls:** Platform not yet deployed to production with real client data.
**Mitigation Actions:**
1. Fix all P0 security issues BEFORE any client data enters the platform *(see [[05-FUNCTIONS-TO-BUILD]] P0-1 through P0-6)*
2. Do not give Alpha clients platform access until P0 issues are resolved
3. Use document-based delivery (PDFs, email) for Alpha if platform is not P0-clean
4. Commission independent penetration test before first client data onboarding
**Owner:** Engineering **Due:** Before client data onboarding
**Residual Risk:** LOW (4) once P0 items complete

---

### R-06 — "Pay to Play" Perception
**Category:** Reputational
**Description:** If AIC certifies companies that pay but fails companies that don't, the certification becomes worthless. This is the Arthur Andersen failure mode. Even the perception of this destroys the brand.
**Likelihood:** 2 × **Severity:** 5 = **Score: 10**
**Current Controls:** Conflict of interest rule documented and enforced: AIC assesses and certifies only — never implements.
**Mitigation Actions:**
1. Publish the conflict of interest policy publicly before first certification
2. Publish the criteria for certification denial — make it explicit what fails
3. Certify a company provisionally when their score warrants it — never full cert for a low score
4. If the first Alpha client scores below 50, communicate this honestly to them and to the market
5. Consider publishing an "AIC did not certify X" disclosure policy
**Owner:** Wilken Zander **Due:** Before first Alpha certification
**Residual Risk:** LOW (4) with controls active

---

## MEDIUM Risks (5–9)

### R-07 — Empathy Framing Misread by Buyers
**Category:** Commercial
**Description:** The word "empathy" resonates with citizens and media but may alienate procurement decision-makers (CROs, CCOs, legal teams) who think in risk and liability.
**Likelihood:** 3 × **Severity:** 3 = **Score: 9**
**Mitigation:** Test alternative framings in first 5 sales conversations. Track which framing generates follow-ups. Options: "communication quality certification," "automated interaction standards," "human dignity assurance."
**Owner:** Wilken Zander **Due:** Measure by Month 3

---

### R-08 — Larger Competitor Enters Market
**Category:** Competitive
**Description:** A Big 4 firm or an established standards body (BSI, Bureau Veritas, ISO) launches an AI governance certification product in South Africa. Their brand, resources, and enterprise relationships dwarf AIC's.
**Likelihood:** 3 × **Severity:** 3 = **Score: 9**
**Mitigation:** Speed and specificity are AIC's moats. Move faster than Big 4 can. Own the South African specific framing (POPIA, JSE context). The Declaration of Algorithmic Rights is AIC's IP — open-source it so it becomes the standard, making AIC the certification body of record.
**Owner:** Wilken Zander **Due:** Monitor quarterly

---

### R-09 — Alpha Client Data Confidentiality Breach (Non-Technical)
**Category:** Legal / Reputational
**Description:** An Alpha client's AI system details or assessment findings are disclosed — through a conversation, a document leak, or social media — without their consent. Particularly damaging if a client scored poorly.
**Likelihood:** 2 × **Severity:** 4 = **Score: 8**
**Mitigation:** Alpha participant agreement must include strict confidentiality terms. All assessment documents handled in encrypted channels. Never discuss client scores publicly without explicit consent. Get legal review of agreement before first Alpha client signs.
**Owner:** Wilken Zander **Due:** Before first Alpha agreement signed

---

### R-10 — AIC Liability for Incorrect Certification
**Category:** Legal
**Description:** AIC certifies a company as Tier 2 compliant. That company's AI system subsequently causes demonstrable harm. The harmed party sues AIC, arguing the certification was negligent. This is a low-probability but potentially existential legal risk.
**Likelihood:** 1 × **Severity:** 5 = **Score: 5**
**Mitigation:**
1. Legal review of all certification report disclaimers before first issuance *(see [[05-FUNCTIONS-TO-BUILD]] for current disclaimer language)*
2. Certification explicitly covers: evidence provided at time of assessment only. It is not a guarantee of ongoing compliance.
3. AIC carries professional indemnity insurance from Month 3 (before Alpha certifications issued)
4. Certification scope is explicitly scoped to the AIC framework — not a legal opinion on regulatory compliance
**Owner:** Wilken Zander + Legal **Due:** Month 3

---

### R-11 — Technical Talent Unavailability
**Category:** Operational
**Description:** AIC needs a technical co-founder or senior engineer to implement the P0 security fixes and build the Empathy Engine. If no suitable candidate is found, the technology roadmap stalls.
**Likelihood:** 3 × **Severity:** 3 = **Score: 9**
**Mitigation:** Define the technical co-founder role clearly. Target networks: UCT CS alumni, Cape Town tech community, African AI researchers. Consider a equity-for-work arrangement for early-stage contribution.
**Owner:** Wilken Zander **Due:** Month 2 decision

---

## LOW Risks (1–4)

| ID | Risk | Score | Mitigation |
|----|------|-------|-----------|
| R-12 | Domain name or trademark challenge to "AIC" | 3 | Trademark search and registration priority |
| R-13 | Key tool/vendor dependency (Notion, Vercel, OpenAI) | 4 | Data portability policy; avoid vendor lock-in |
| R-14 | Content publishing causes regulatory attention | 2 | Frame as private sector initiative; avoid regulatory criticism |
| R-15 | Alpha client drops out mid-assessment | 3 | Alpha agreement includes exit terms; do not refund Phase 1 work |

---

## Risk Register Summary

| Risk | Score | Status | Next Action |
|------|-------|--------|-------------|
| R-01 Single point of failure | 20 | 🔴 CRITICAL | Find co-founder candidates by Month 2 |
| R-02 Methodology challenged | 15* | 🔴 CRITICAL | Academic reviewer; publish methodology before Index |
| R-03 No paying clients | 12 | 🟠 HIGH | Name 3 specific prospects by Month 1 end |
| R-04 Enforcement delay | 12 | 🟠 HIGH | Diversify pressure vectors; engage IR Month 3 |
| R-05 Platform security | 10 | 🟠 HIGH | Fix P0 items before any client data onboarding |
| R-06 Pay-to-play perception | 10 | 🟠 HIGH | Publish COI policy and denial criteria |
| R-07 Empathy framing | 9 | 🟡 MEDIUM | Test framings in first 5 sales conversations |
| R-08 Competitor entry | 9 | 🟡 MEDIUM | Move fast; open-source Declaration |
| R-09 Client data breach | 8 | 🟡 MEDIUM | Legal review Alpha agreement before signing |
| R-10 Certification liability | 5 | 🟡 MEDIUM | PI insurance + disclaimers by Month 3 |
| R-11 Technical talent | 9 | 🟡 MEDIUM | Co-founder search by Month 2 |

---

*Next review: March 24, 2026*
*See [[10-STRATEGY]] for the five fears that informed this register*
*See [[05-FUNCTIONS-TO-BUILD]] for P0 security items linked to R-05*
