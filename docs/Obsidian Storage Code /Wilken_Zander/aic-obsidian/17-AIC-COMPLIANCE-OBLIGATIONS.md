# AIC — Own Compliance Obligations
*February 24, 2026 | Review: before first client onboarding, then annually*
*Cross-references: [[15-LEGAL-ANALYSIS]] | [[AIC-Risk-Register]] | [[11-REVENUE-MODEL]] | [[00-INDEX]]*

> **The credibility imperative:** AIC cannot certify other organisations' AI accountability practices while failing to meet basic compliance obligations itself. The first question any sophisticated client, investor, or regulator will ask is: "Are you compliant with what you preach?" This document maps every material compliance obligation AIC faces and tracks status.

---

## Compliance Tracker

Status codes: ✅ Done · 🔶 In progress · ❌ Not started · ⏳ Future (trigger-based)

---

## 1. Company Registration and Structure

| Obligation | Legislation | Status | Action Required | Deadline |
|---|---|---|---|---|
| Register as legal entity (Pty Ltd) | Companies Act 71 of 2008 | ❌ | Register with CIPC — Pty Ltd recommended for liability protection | Before first client contract |
| Appoint a company secretary | Companies Act | ⏳ | Required when > certain thresholds — confirm with counsel | Month 3 |
| Register for VAT | VAT Act 89 of 1991 | ⏳ | Required when annual turnover exceeds ZAR 1M — monitor threshold | Month 6–12 |
| Open business banking account | — | ❌ | Required for client invoicing and payment processing | Before first invoice |
| Register as employer with SARS | Income Tax Act | ⏳ | Required when first employee hired | Before first hire |
| COIDA registration (employer) | Compensation for Occupational Injuries Act | ⏳ | Required when first employee hired | Before first hire |

---

## 2. POPIA Compliance — AIC as Responsible Party

AIC processes personal information from clients, website visitors, and self-assessment users. This creates POPIA obligations as a **responsible party**.

| Obligation | POPIA Condition | Status | Action Required | Deadline |
|---|---|---|---|---|
| Appoint an Information Officer | §55 | ❌ | Register with Information Regulator at ir.org.za | Before first client data |
| Publish PAIA Manual | §51 PAIA | ❌ | Draft and publish on website — covers categories of info processed, purposes, access procedures | Before first client data |
| Privacy Policy (website) | Condition 3 — Purpose Specification | ❌ | Draft privacy policy covering: what AIC collects, why, retention, sharing | Before website launch |
| Data Processing Register | Condition 3 | ❌ | Internal register of all processing activities (see [[15-LEGAL-ANALYSIS]] for data map) | Before first client data |
| Data Processing Agreements | Condition 8 — Accountability | ❌ | DPAs required with: Notion, Vercel, Supabase, OpenAI (for any client data processed via API) | Before first client data |
| Empathy Engine — no-retention policy | Condition 3 & 5 | 🔶 | Confirm in PRD: engine does not retain input text after session end. Add explicit privacy notice to demo UI | Before Empathy Engine launch |
| Breach notification procedure | §22 | ❌ | Written procedure for detecting, assessing, and notifying data breaches within 72 hours | Before first client data |
| Retention and destruction policy | Condition 7 | ❌ | Define: how long assessment documents are kept, how they are destroyed, who authorises destruction | Before first client data |
| Cross-border transfer controls | §72 | 🔶 | Assessment: does data leave SA when processed via OpenAI/Vercel? Likely yes — confirm legal basis (explicit consent or standard contractual clauses) | Before first client data |

---

## 3. Financial Services and Professional Conduct

| Obligation | Legislation | Status | Action Required | Deadline |
|---|---|---|---|---|
| Confirm AIC is not a financial services provider | FAIS Act | ❌ | Legal opinion required: does providing AI governance assessments to FSPs constitute financial services? Likely no, but confirm | Before first FSP client |
| Confirm AIC is not providing legal advice | Legal Practice Act | ❌ | Legal opinion required: do POPIA compliance assessments constitute legal advice? Likely no, but confirm | Before first client |
| Professional Indemnity Insurance | — | ❌ | Minimum ZAR 10M per claim / ZAR 20M aggregate. Required before first certification issued | Before Month 3 |
| Anti-money laundering (FICA) | FICA 38 of 2001 | ⏳ | AIC is not currently an accountable institution under FICA but should confirm with counsel | Month 3 |

---

## 4. SANAS Accreditation — Medium-Term

SANAS (South African National Accreditation System) is the recognised national accreditation body. Accreditation from SANAS would allow AIC to claim "accredited certification body" status — significantly increasing the credibility and legal weight of AIC certificates.

| Milestone | Status | Requirement | Timeline |
|---|---|---|---|
| Understand SANAS scope | ❌ | Confirm whether SANAS accredits management systems certification bodies of AIC's type | Month 2 |
| Gap analysis against ISO/IEC 17021 | ❌ | ISO/IEC 17021 is the standard for conformity assessment certification bodies — AIC must assess compliance | Month 4–6 |
| Documentation system | ❌ | SANAS requires documented quality management system (QMS) covering all certification activities | Month 6–9 |
| Auditor qualification | ❌ | SANAS requires auditors meet defined competency criteria — defines what the "Lead Auditor" role requires | Month 6–9 |
| Application submission | ⏳ | After QMS is in place and at least 5 certifications completed | Year 2 Q1 |
| SANAS assessment | ⏳ | SANAS conducts assessment of AIC's own processes | Year 2 |

**Strategic note:** SANAS accreditation is not required to operate. AIC can issue certifications as a private company without it. But accreditation dramatically increases credibility with regulators, enterprise clients, and insurers. It is the Year 2 priority for institutional legitimacy.

---

## 5. Tax Compliance

| Obligation | Act | Status | Action Required | Deadline |
|---|---|---|---|---|
| Income tax registration | Income Tax Act | ❌ | Register entity with SARS | On company registration |
| Provisional tax | Income Tax Act | ⏳ | Two provisional tax payments per year — first due 6 months after tax year start | After entity registration |
| VAT registration | VAT Act | ⏳ | Register when annual turnover exceeds ZAR 1M (voluntary registration possible earlier for input credit) | Monitor threshold |
| B-BBEE certificate | B-BBEE Act | ❌ | Obtain exemption certificate (< ZAR 10M turnover) or Level 1–8 certificate | Before first enterprise client who requires it |
| Transfer pricing (if offshore entity later) | Income Tax Act §31 | ⏳ | Relevant if international expansion involves offshore structure | Year 3+ |

---

## 6. Labour Law

| Obligation | Act | Status | Action Required | Deadline |
|---|---|---|---|---|
| Employment contract templates | BCEA / LRA | ❌ | Draft employment and contractor agreement templates before first hire | Month 3–4 |
| Employment Equity Plan | EEA | ⏳ | Required when > 50 employees — not immediately applicable | Year 3+ |
| OHSA workplace compliance | OHSA | ⏳ | Basic health and safety obligations apply from first employee | Before first hire |
| UIF registration | UIF Act | ⏳ | Required for all employees — register with Department of Labour | Before first hire |

---

## 7. Intellectual Property

| Asset | Protection | Status | Action Required | Deadline |
|---|---|---|---|---|
| "AIC" brand name | Trademark | ❌ | Trademark search and application for "AIC", "AI Integrity Certification", AIC logo | Month 1–2 |
| Declaration of Algorithmic Rights | Copyright (automatic) + CC licence | 🔶 | Confirm CC licence version and attribution requirements before publication | Before publication |
| Empathy Rubric (7-dimension scoring) | Trade secret + Copyright | 🔶 | Document in detail (done in PRD). Decide: keep proprietary or open-source rubric to build standard | Before Engine launch |
| AI Governance Index methodology | Copyright + documented methodology | ❌ | Publish methodology document with datestamp — creates prior art defence | Before Index publication |
| "Integrity Score" | Trademark | ❌ | Search availability and apply | Month 2–3 |
| Domain names | — | ❌ | Register aic.co.za, aic.org.za, aiintegritycertification.co.za, algorithmicrights.org.za | Immediately |

**IP strategy note:** AIC's Declaration of Algorithmic Rights should be open (CC BY 4.0) — wide adoption creates the market. AIC's certification methodology (how the rubric is applied, the scoring engine, the Integrity Score calculation) should be proprietary. The standard is free; the audit process is paid. This is exactly how OWASP and PCI-DSS work.

---

## 8. Website and Digital Compliance

| Obligation | Basis | Status | Action Required | Deadline |
|---|---|---|---|---|
| Privacy policy | POPIA | ❌ | Draft and publish before any form collects data | Before website launch |
| Cookie notice | POPIA / eCommerce Regulations | ❌ | Cookie consent banner for non-essential cookies | Before website launch |
| Terms of service | Contract | ❌ | ToS for self-assessment users and Empathy Engine users | Before tools launch |
| Accessibility (WCAG 2.1 AA) | — ethical obligation + enterprise procurement requirement | 🔶 | AIC's Right 5 (Empathy) requires AIC's own platform to be accessible. See [[05-FUNCTIONS-TO-BUILD]] | Before Index/Engine launch |
| Payment processing PCI compliance | PCI-DSS (via Stripe) | ⏳ | Stripe handles PCI compliance — AIC must not store card data. Confirm in platform architecture | Before SME paid tier |

---

## 9. Certification Body Ethics Obligations

These are not statutory but are essential for credibility as a certification body:

| Obligation | Standard | Status | Action Required |
|---|---|---|---|
| Conflict of interest policy (written) | ISO/IEC 17021 | ❌ | Publish the Arthur Andersen principle as written policy before first cert |
| Impartiality statement | ISO/IEC 17021 | ❌ | Publish written statement of AIC's independence from implementation services |
| Complaints procedure | ISO/IEC 17021 | ❌ | Written, published procedure for companies to challenge assessments or scores |
| Certification revocation policy | Best practice | ❌ | Published procedure for what triggers revocation and how AIC communicates it |
| Confidentiality of client information | ISO/IEC 17021 | ❌ | Written policy, incorporated in Alpha agreement |
| Appeals process | ISO/IEC 17021 | ❌ | If a company disputes their score, what is the escalation path? |

---

## Compliance Priority Matrix

| Item | Priority | Timing |
|---|---|---|
| Register legal entity (Pty Ltd) | CRITICAL | Before first contract |
| Domain names — aic.co.za | CRITICAL | Immediately |
| Trademark search — "AIC" | CRITICAL | Immediately |
| Information Officer registration (POPIA) | HIGH | Before first client data |
| Data Processing Agreements (Notion, Vercel, OpenAI) | HIGH | Before first client data |
| Privacy Policy and PAIA Manual | HIGH | Before first client data |
| Professional Indemnity Insurance | HIGH | Before first certification issued |
| Alpha Participant Agreement (legal review) | HIGH | Before first Alpha client signs |
| Conflict of interest policy (published) | HIGH | Before first certification issued |
| Index methodology documentation (dated) | HIGH | Before Index publication |
| Legal opinion: FAIS / Legal Practice Act | MEDIUM | Before first FSP client |
| VAT registration | MEDIUM | When approaching ZAR 1M threshold |
| SANAS accreditation journey | MEDIUM | Begin Month 4–6, complete Year 2 |
| Employment contract templates | MEDIUM | Before first hire |
| B-BBEE certificate | LOW | Before first enterprise client requires it |

---

*This document is a planning tool, not legal advice. Every item marked CRITICAL or HIGH should be reviewed with qualified SA legal counsel.*
*See [[15-LEGAL-ANALYSIS]] for detailed POPIA and legal analysis*
*See [[AIC-Risk-Register]] for risk items linked to these obligations*
