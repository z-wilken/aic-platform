# AIC Legal Analysis
*Prepared February 24, 2026 | Review annually or on regulatory change*
*Cross-references: [[03-ALGORITHMIC-RIGHTS]] | [[04-CERTIFICATION-FRAMEWORK]] | [[10-STRATEGY]] | [[AIC-Risk-Register]] | [[00-INDEX]]*

> **Disclaimer:** This document is an internal analysis prepared for strategic and operational planning. It is not a legal opinion and does not constitute legal advice. AIC must engage qualified South African legal counsel before issuing its first certification, signing its first Alpha agreement, or publishing the AI Governance Index.

---

## 1. POPIA Section 71 — The Statutory Anchor

### What Section 71 Actually Says

Section 71 of the Protection of Personal Information Act 4 of 2013 provides:

> *"(1) A data subject may not be subject to a decision which results in legal consequences for him, her or it, or which affects him, her or it to a substantial degree, which is based solely on the basis of the automated processing of personal information intended to provide a profile of such person including his or her performance at work, or his or her credit worthiness, financial situation, health, personal preferences, reliability or behaviour."*

> *"(2) A responsible party may make a decision referred to in subsection (1) if the decision — (a) is made in the course of entering into or performing a contract and the request for the entering into or performance of the contract by the data subject was satisfied; (b) is authorised by or in terms of any law; or (c) is based on the explicit consent of the data subject."*

> *"(3) Where a decision referred to in subsection (1) has been made the data subject must be — (a) notified by the responsible party within a reasonable time of the making of such a decision, and (b) given a reasonable opportunity to make representations concerning such decision to the responsible party after such notification."*

### What This Means in Operational Terms

Section 71 creates four distinct obligations, each of which maps directly to an AIC Algorithmic Right:

| S71 Obligation | AIC Right | Current SA Enforcement Status |
|---|---|---|
| *"Notified within a reasonable time"* | **Right 1 — Transparency** | Unenforced |
| *"Understand the logic"* (implied by S71(3) and Condition 8) | **Right 2 — Explanation** | Unenforced |
| *"Not subject to solely automated decisions"* unless exceptions apply | **Right 1 — Human Agency** | Unenforced |
| *"Make representations"* (right to challenge) | **Right 4 — Correction** | Unenforced |

**Important definitional note:** Section 71 covers decisions based *"solely"* on automated processing. This creates a significant compliance loophole: organisations argue that because a human rubber-stamps the AI output, the decision is not "solely automated." AIC's certification framework must address this directly — rubber-stamping is not Human Agency. The certification requirement is that the human has *genuine authority and genuine information* to exercise judgment, not just formal sign-off.

### What Section 71 Does NOT Explicitly Cover

The following are not explicitly addressed in Section 71, creating strategic opportunities for AIC to fill the gap:

- **Right 5 — Empathy:** No statutory requirement for communications to be written with human dignity. AIC's Right 5 is entirely proprietary — this is a competitive advantage, not a compliance obligation.
- **Bias testing:** No statutory requirement for proactive bias auditing (Right 3 — Non-Discrimination). South African law prohibits discrimination but does not require AI-specific bias testing. AIC goes further than the statute.
- **Reading level requirements:** No statutory minimum. AIC's Grade 8 reading level requirement is above-market, defensible by reference to the right to "make representations" only being meaningful if the communication is understood.

**Strategic implication:** AIC's framework covers POPIA and exceeds it. The three rights that exceed POPIA (Empathy, Non-Discrimination testing, Reading Level) are where AIC creates certification value that no compliance team can replicate with a POPIA-only checklist.

---

## 2. The Information Regulator — Enforcement Reality

### Current Status (as of February 2026)

The Information Regulator of South Africa was established in 2016 under POPIA but only became fully operational in 2021. As of February 2026:

- **No Section 71 enforcement action has been issued.** The Regulator has issued enforcement notices for general POPIA breaches (data security incidents) but has not prosecuted any Section 71 case.
- **The Regulator is under-resourced:** operating with a fraction of its statutory staffing and budget.
- **Regulatory focus has been on PAIA** (access to information) and broad POPIA compliance rather than Section 71 specifically.

### Why Enforcement Is Coming

Despite the current vacuum, enforcement is structurally inevitable:

1. **Political pressure:** The Regulator has made public statements about AI governance as a 2026 priority. Civil society organisations (including the Right2Know Campaign) are actively lobbying for S71 enforcement.

2. **EU AI Act contagion:** South African subsidiaries of EU companies must comply with the EU AI Act. As EU enforcement begins in 2026–2027, SA operations will be cleaned up as part of global compliance programmes — creating demand for SA-specific certification to document local compliance.

3. **Precedent cases are accumulating:** Several high-profile credit decision disputes involving SA banks are working through the courts. The first S71 precedent case will catalyse enforcement activity.

4. **Regulator capacity building:** The Information Regulator has begun recruiting specialist AI investigators. The capacity constraint is resolving, slowly.

### AIC's Strategy with the Information Regulator

AIC should not position itself as a regulator, a deputy regulator, or as having regulatory authority. The correct positioning is:

- **Private-sector compliance infrastructure** that makes S71 compliance accessible and demonstrable
- **A trusted partner** that gives the Regulator confidence that certified organisations have implemented genuine human accountability
- **A data source** — AIC's Governance Index provides the Regulator with publicly available intelligence on S71 compliance posture across the JSE, at no cost

**Target engagement (Month 3):** Formal meeting with the Information Regulator's AI/digital team. Objective: not to seek endorsement, but to establish a working relationship, share the AIC methodology, and offer to assist with capacity-building for S71 enforcement guidance.

---

## 3. EU AI Act — The Immediate Commercial Lever

### Territorial Scope and SA Applicability

The EU AI Act (Regulation 2024/1689, entered into force August 2024) applies to:
- AI systems **placed on the EU market**, regardless of where the provider is located
- AI systems **affecting persons located in the EU**, regardless of where the system operates
- **Providers, deployers, and importers** in the AI value chain

**South African companies in scope:**
- Any SA company with a subsidiary, branch, or operations in the EU
- Any SA company providing AI systems or services to EU-based clients
- Any SA company using AI systems from EU-based providers that deploy into SA (indirect obligation via contract)

**Practically:** Standard Bank, Naspers/Prosus, MTN, Anglo American, BHP, Investec, Old Mutual, and others on the JSE Top 40 with EU operations are **directly** within scope of the EU AI Act.

### High-Risk Categories Relevant to SA Financial Sector

The EU AI Act categorises AI systems by risk. The following categories are **high-risk** and face the most stringent requirements:

| Category | SA Examples | EU AI Act Requirement |
|---|---|---|
| Credit scoring and creditworthiness assessment | Any SA bank's credit model used by EU entities | Technical documentation, human oversight, accuracy, robustness |
| Employment screening and recruitment | SA HR AI tools used by EU companies | Transparency, human oversight, bias testing |
| Insurance risk assessment | SA insurers with EU reinsurance relationships | Documentation, oversight, bias testing |
| Law enforcement (incl. fraud detection) | SA bank fraud systems touching EU payments | Fundamental rights impact assessment |
| Essential private and public services | Healthcare AI with EU data | Full EUAIA compliance regime |

### The Sales Conversation

The EU AI Act creates the **most immediate commercial urgency** for AIC's target clients. Unlike POPIA S71 (unenforced), EU AI Act enforcement is real:

- **August 2024:** Act in force
- **February 2025:** Prohibited AI practices ban applied
- **August 2026:** High-risk AI system requirements fully applicable
- **Fines:** Up to €30 million or 6% of global annual turnover

For an SA bank with EU operations, a €30 million fine for non-compliant high-risk AI is not hypothetical. AIC's certification demonstrates that the organisation's AI governance meets or exceeds the EU AI Act's human oversight and documentation requirements.

**Sales script:** *"POPIA enforcement is coming. EU AI Act enforcement is already here. Our certification gives you a single framework that satisfies both — and produces documented evidence for your regulatory file."*

### AIC Methodology vs EU AI Act Requirements

| EU AI Act Requirement | AIC Framework Coverage |
|---|---|
| Risk classification of AI systems (Article 9) | Right 1 — Transparency (AI system inventory with risk tier) |
| Human oversight measures (Article 14) | Right 1 — Human Agency (TIER_1/2/3 system) |
| Transparency obligations (Article 13) | Right 2 — Explanation + Right 5 — Truth |
| Bias and accuracy testing (Articles 9, 10, 15) | Right 3 — Non-Discrimination (bias testing methodology) |
| Logging and auditability (Article 12) | All rights — Audit Ledger |
| Fundamental rights impact assessment | Right 3 — Non-Discrimination |

AIC's framework provides a strong mapping to EU AI Act compliance. A formal "AIC Certification to EU AI Act Mapping" white paper would be high-value content for sales and media.

---

## 4. Alpha Participant Agreement — Key Terms Required

The first Alpha agreement must be reviewed by qualified SA legal counsel before any client signs. The following terms are the minimum requirements based on AIC's operational and legal exposure:

### 4.1 Scope and Limitations

```
The assessment covers only: (a) information and documentation provided by
the Participant during the assessment period; (b) sample communications
submitted by the Participant. The assessment does not constitute a
guarantee of ongoing compliance, a legal opinion, a regulatory clearance,
or an assurance that the Participant's AI systems are technically sound.
```

**Why:** Limits AIC's liability if a certified company subsequently causes harm. The certification is point-in-time and evidence-bounded.

### 4.2 Evidence Completeness

```
The Participant warrants that evidence provided is accurate, complete, and
representative. AIC is not responsible for the consequences of incomplete
or misleading evidence submission. If evidence is subsequently found to be
materially incomplete or misleading, AIC reserves the right to revoke
certification and publish a notice of revocation.
```

**Why:** Protects AIC against pay-to-play accusations. If a client hides evidence, the fault is theirs. The revocation right is AIC's enforcement mechanism.

### 4.3 Confidentiality

```
AIC will treat all Participant information as strictly confidential and
will not disclose assessment findings, scores, or evidence to any third
party without the Participant's prior written consent, except: (a) as
required by law; (b) where the Participant publicly claims certification
status that differs from the actual certification issued; (c) in
aggregated, de-identified form for methodology improvement purposes.
```

**Why:** Standard confidentiality. Exception (b) is critical — if a client misrepresents their certification status publicly (claims Tier 1 when they have Tier 2), AIC must be able to correct the record.

### 4.4 Publication Rights

```
The Participant consents to AIC publishing: (a) the Participant's
certification status (certified/provisional/not certified), tier, and
Integrity Score on the public AIC Registry; (b) aggregate methodology
learnings from the assessment, without identifying the Participant by
name. AIC will not publish individual assessment findings without the
Participant's explicit written consent.
```

**Why:** Public registry is AIC's authority mechanism. Without it, certification is meaningless. The consent for aggregate learnings supports methodology development.

### 4.5 Conflict of Interest

```
AIC will not provide implementation services to the Participant for
the duration of the certification and for 24 months after certification
is issued or denied. AIC may refer the Participant to third-party
implementation partners and may receive a referral fee not exceeding 20%
of the partner's engagement fee, which will be disclosed to the Participant.
```

**Why:** The Arthur Andersen principle in contractual form. Non-negotiable.

### 4.6 Methodology Acknowledgment

```
The Participant acknowledges that AIC's certification methodology
is proprietary and evolving. AIC reserves the right to update the
methodology between assessment cycles. Changes to methodology that
materially affect an existing certification will be communicated
60 days in advance and will not retroactively alter existing
certifications.
```

**Why:** Protects AIC's ability to improve the methodology without voiding historical certifications.

### 4.7 Dispute Resolution

```
In the event of a dispute regarding the assessment methodology or
findings, the parties agree to first attempt mediation through an agreed
mediator. If mediation fails, the matter will be referred to arbitration
under the AFSA Rules, with South African law governing. The Participant
may not seek injunctive relief preventing AIC from publishing the
certification outcome, provided AIC has followed its published methodology.
```

**Why:** Arbitration is faster and more confidential than litigation. The anti-injunction provision prevents a client from silencing an adverse assessment through court action while the dispute is pending.

### 4.8 Alpha Programme Pricing and Terms

```
Alpha Programme participants receive the initial assessment at a
reduced rate of ZAR 50,000 (exclusive of VAT). In exchange, the
Participant grants AIC the right to: (a) use the assessment as a
methodology development case; (b) reference the Participant as an
"AIC Alpha Participant" in marketing materials (subject to the
Participant's written approval of specific references); (c) use
anonymised findings in the AIC Methodology White Paper.
```

**Why:** Correctly prices the Alpha as R&D (per [[10-STRATEGY]] and [[13-REVIEW-AND-OPINIONS]]). The methodology rights and case study rights are the commercial compensation for the reduced price.

---

## 5. AI Governance Index — Defamation and Legal Exposure

### The Risk

Publishing a ranked list of JSE Top 40 companies with scores that imply governance failures creates potential defamation and reputational harm liability. A company that scores 19/100 and believes the methodology is unfair could:
- Issue a letter of demand claiming defamation
- Seek an interdict preventing publication
- Publicly attack AIC's methodology and credibility

### The Defence

South African defamation law requires that a statement be:
1. Published
2. Defamatory (injures reputation)
3. Referring to the plaintiff
4. Wrongful (not justified by a defence)

The key defences available to AIC:

**Truth (Justification):** If the scores are factually accurate — based on publicly available information assessed against a published, defensible methodology — this is a complete defence. The strength of this defence depends entirely on the quality and transparency of the methodology.

**Fair Comment:** Opinion published in good faith on a matter of public interest. AIC's Index scores are not statements of fact ("this company is corrupt") but assessments ("based on public evidence, this company's AI governance practices score X against this published rubric"). This framing is important.

**Public Interest:** AI governance of major financial institutions is unambiguously a matter of public interest. The Index contributes to accountability discourse in the same way as credit ratings, ESG scores, or JSE regulatory filings.

### Risk Mitigation Requirements — Before Index Publication

The following must be in place before the Index goes public:

1. **Methodology transparency:** Publish the full scoring methodology, including data sources, KPI definitions, scoring rubric, and assessment process, before publishing any company scores. A company that disputes their score must be able to see exactly how it was calculated.

2. **Right of response:** Before publishing, notify each company of their score and methodology, and give them 10 business days to provide additional public evidence that AIC may have missed. This does not give them veto power over the score — it ensures AIC has considered available evidence.

3. **Clear labelling:** Every score must be labelled as an assessment against AIC's framework, based on publicly available data, not a statement of fact about the company's internal practices.

4. **Legal review:** Have SA legal counsel review the scoring methodology, the right-of-response process, and the Index disclaimers before publication. This review is an insurance policy, not a bottleneck.

5. **Errors and corrections policy:** Publish a clear process for companies to flag factual errors. If AIC made a factual mistake (missed a published policy, misread a disclosure), correct it promptly and transparently.

---

## 6. AIC's Own POPIA Obligations

AIC processes personal information in the course of its certification activities. This creates POPIA obligations that AIC must itself comply with before asking clients to do so.

### Information AIC Processes

| Data Type | Source | Legal Basis | Retention |
|---|---|---|---|
| Client contact details | Certification applications | Contractual necessity | Duration of relationship + 5 years |
| Assessment evidence documents | Submitted by clients | Contractual necessity | Duration of certification + 5 years |
| Sample automated communications | Submitted by clients | Contractual necessity + consent | Assessment period only |
| AI system metadata | Client-submitted | Contractual necessity | Duration of certification |
| Empathy Engine input text | User submission | Consent (no account required) | **Not retained — session only** |
| Index scoring data | Public sources | Legitimate interest | Indefinitely (public record) |

### Required PAIA Manual

Section 51 of PAIA requires all private organisations to maintain a PAIA manual. AIC must produce this before beginning operations with clients. The manual must include:
- Categories of personal information processed
- Purposes of processing
- Third-party recipients
- Access request procedure

### Data Processing Agreements

Before using any third-party tools that process client data (e.g. Notion, Vercel, OpenAI API), AIC must have Data Processing Agreements in place. This is a POPIA Condition 8 requirement and a contractual obligation to clients under the Alpha agreement.

**Current gap:** No DPAs are in place for Notion, Vercel, or OpenAI usage in the context of client data. This must be remediated before any client data is processed on these platforms.

---

## 7. Professional Liability Insurance

Before issuing the first certification, AIC requires Professional Indemnity (PI) insurance covering:
- Claims arising from negligent assessment methodology
- Claims arising from publication of the AI Governance Index
- Claims arising from certification of a company that subsequently causes harm

**Recommended coverage:** Minimum ZAR 10 million per claim / ZAR 20 million aggregate for Year 1.

**Underwriter consideration:** PI insurers will want to review the methodology, the disclaimers, and the Alpha agreement before providing coverage. This review should be treated as a methodology quality check — if an insurer won't cover it, the methodology needs strengthening.

---

## 8. Open Legal Questions (Require Counsel)

| Question | Priority | Implication |
|---|---|---|
| Can AIC issue binding certifications without being a registered accreditation body (SANAS)? | HIGH | Affects what AIC can claim about its certifications |
| Is there defamation risk for the Governance Index as currently conceived? | HIGH | Affects publication approach |
| What is AIC's liability exposure if a certified company causes harm? | HIGH | Affects disclaimer language and PI insurance |
| Does AIC require a company registration as a specific entity type? | MEDIUM | Affects contracting and liability |
| Are there sector-specific regulations that affect AIC's ability to certify banks and insurers? | MEDIUM | FSB / FSCA oversight may apply to assessments of regulated entities |
| Does the Empathy Engine constitute "legal services" requiring a practising certificate? | LOW | Unlikely but needs confirmation |

---

*Priority action: Engage SA legal counsel by Month 2. Brief on: SANAS accreditation, Index defamation exposure, Alpha agreement review, PI insurance requirements.*
*See [[AIC-Risk-Register]] for R-09 (data breach), R-10 (liability), and R-06 (pay-to-play) which all have legal dimensions.*
