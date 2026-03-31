# PRD — Empathy Analysis Engine
*AIC Product Spec · Version 1.0 · February 24, 2026*
*Status: READY FOR DEVELOPMENT*

---

## 1. Problem Statement

Organisations deploying AI to make consequential decisions communicate those decisions through automated text — rejection letters, denial notices, fraud alerts, collections notices, chatbot responses. These communications are almost universally written to protect the organisation legally, not to serve the person receiving them.

The result: people receive life-affecting decisions (loan denied, job rejected, account suspended) in language they don't understand, with no explanation of why, no recourse pathway, and no acknowledgment that the decision matters to them.

AIC's Right 5 (Empathy) establishes that this is a rights violation, not just bad UX. The Empathy Analysis Engine is the technology that operationalises this right — making it measurable, auditable, and improvable.

**The core insight:** A structured rubric that scores automated communications on 7 dimensions produces a defensible, repeatable, evidence-based empathy score. This is AIC's proprietary methodological IP.

---

## 2. Goals

| Goal | Metric | Target |
|------|--------|--------|
| Provide investors with a live, compelling demo | Demo completion rate | 100% in first 5 demo conversations |
| Enable Alpha clients to self-assess empathy | Assessments run per client | ≥3 per Alpha engagement |
| Generate AIC methodology IP | Rubric version | v1.0 shipped; v2.0 after first 50 assessments |
| Create content for AI Governance Index | Communications scored per Index company | ≥2 per JSE company |
| Support the paid self-assessment tier | Empathy scan included in paid tier | Yes |

---

## 3. Non-Goals (Phase 1)

- Real-time API endpoint for third-party integration (Phase 3)
- Automated scoring without human review (Phase 2)
- Mobile interface
- Multi-language support (English only for Phase 1)
- Fine-tuned LLM scoring (Phase 2 — rubric-based scoring only for now)

---

## 4. User Stories

**Investor Demo User**
> As a potential investor viewing the AIC demo, I want to paste a real rejection letter and immediately see it scored with annotations, so that I understand what AIC's methodology does and why it's defensible.

**AIC Auditor**
> As an AIC auditor running a client assessment, I want to upload or paste up to 10 communications and receive rubric scores for each, so that I can include empathy analysis in the Integrity Score Report.

**Alpha Client (Self-Assessment)**
> As a compliance officer at an Alpha participant, I want to paste our standard rejection letter and see where it scores and why, so that I know what to prioritise in our remediation plan.

**Paid Self-Assessment User**
> As an SME owner paying for the AIC self-assessment, I want an empathy quick-scan of 3 of our automated communications included in my report, so that I understand my Right 5 posture.

---

## 5. The Empathy Rubric — Core IP

The rubric scores automated communications across 7 dimensions. Weights are based on AIC's assessment of relative importance to the individual receiving the communication.

| # | Dimension | Weight | What It Measures |
|---|-----------|--------|-----------------|
| 1 | **Tone** | 20% | Is the language respectful, warm, and human — or cold, legalistic, and distancing? |
| 2 | **Human Recourse** | 20% | Is there a real human contact pathway? How accessible is it? Is there a named contact, phone number, and SLA? |
| 3 | **Impact Acknowledgment** | 15% | Does the communication acknowledge that this decision matters to the person? |
| 4 | **Explanation Clarity** | 15% | Is the reason for the decision explained in plain language a layperson understands? |
| 5 | **Reading Level** | 10% | Is the text readable at Grade 8 or below (target for consequential communications)? |
| 6 | **Next Steps** | 10% | Are actionable next steps clearly stated? Does the person know what they can do? |
| 7 | **Response Buffer** | 10% | Is there a meaningful window before the decision becomes permanent? Is it stated? |

### Scoring Scale (per dimension)

| Score | Label | Criteria |
|-------|-------|----------|
| 80–100 | Exemplary | Exceeds AIC standard; suitable for best-practice showcase |
| 65–79 | Adequate | Meets minimum AIC standard for Tier 2 certification |
| 45–64 | Requires Improvement | Below standard; flagged in assessment report |
| 20–44 | Poor | Significant gap; highlighted as priority remediation |
| 0–19 | Critical | Communication violates Right 5; certification blocking in Tier 1 |

### Overall Score Calculation
`Total = (Tone × 0.20) + (HumanRecourse × 0.20) + (ImpactAck × 0.15) + (ExplanationClarity × 0.15) + (ReadingLevel × 0.10) + (NextSteps × 0.10) + (ResponseBuffer × 0.10)`

---

## 6. Feature Spec — Phase 1

### 6.1 Input Interface

**Location:** `apps/web/empathy-demo` (public, no auth required for demo)

**Input options:**
- Free text paste (primary — for demo and quick scans)
- File upload: .txt, .docx, .pdf (for auditor use)
- Communication type selector: `Credit Decision` | `Insurance` | `Employment` | `Fraud/Security` | `Collections` | `Government` | `Other`

**Character limits:** 50 minimum, 5,000 maximum per communication

**No PII warning:** Display a notice prompting users to anonymise before pasting. Engine does not store input text after session ends (Phase 1).

---

### 6.2 Scoring Engine

**Location:** `apps/engine/app/routers/empathy.py`

**Endpoint:** `POST /api/v1/empathy/analyze`

**Input:**
```typescript
interface EmpathyRequest {
  text: string
  communicationType: CommunicationType
  language: "en"  // Phase 1 only
}
```

**Output:**
```typescript
interface EmpathyAnalysis {
  overallScore: number        // 0–100, weighted
  grade: "Exemplary" | "Adequate" | "Requires Improvement" | "Poor" | "Critical"
  dimensions: {
    tone:                { score: number; rationale: string; quotes: string[] }
    humanRecourse:       { score: number; rationale: string; missing: string[] }
    impactAcknowledgment:{ score: number; rationale: string }
    explanationClarity:  { score: number; rationale: string; readabilityIssues: string[] }
    readingLevel:        { score: number; fleschKincaidGrade: number; target: 8 }
    nextSteps:           { score: number; rationale: string; stepsFound: string[] }
    responseBuffer:      { score: number; bufferDaysFound: number | null }
  }
  annotations: Array<{
    quote: string           // exact text from original
    issue: string           // what's wrong
    suggestion: string      // specific improvement
    dimension: string       // which rubric dimension
    severity: "critical" | "high" | "medium" | "low"
  }>
  improvedVersion: string   // rewritten version scoring ≥75/100
  certificationImplication: string  // what this score means for AIC certification
  processingTimeMs: number
}
```

**Scoring logic (Phase 1 — structured rubric):**

For each dimension, the engine applies a deterministic rule set:

```python
# Example: Human Recourse scoring
def score_human_recourse(text: str) -> DimensionScore:
    score = 0
    missing = []

    if has_phone_number(text): score += 25
    else: missing.append("No phone number found")

    if has_email_or_portal(text): score += 20
    else: missing.append("No email or web portal contact")

    if has_named_contact(text): score += 20
    else: missing.append("No named contact person")

    if has_sla_or_timeframe(text): score += 20
    else: missing.append("No response timeframe stated")

    if has_case_reference(text): score += 15
    else: missing.append("No case or reference number")

    return DimensionScore(score=min(score, 100), missing=missing)
```

Reading level uses `textstat` library: `textstat.flesch_kincaid_grade(text)`.

Tone detection uses keyword/phrase pattern matching in Phase 1 (upgrade to fine-tuned classifier in Phase 2).

**Improved version generation:** Use Claude API via `packages/ai` with a structured prompt that applies rubric requirements as rewrite constraints.

---

### 6.3 Results UI

**Display:**
- Overall score with colour-coded badge and grade label
- Gauge/dial visualisation (same component as Mock Alpha report)
- 7-dimension breakdown: bar per dimension with score and brief rationale
- Annotated original text: highlights problematic phrases with severity colour coding
- "What 80/100 looks like" improved version displayed side-by-side
- Certification implication statement (contextualised to score)
- Download options: PNG screenshot, PDF one-pager, JSON (for auditors)

**Share/Export:**
- Shareable link to results (session-scoped, 24h expiry)
- "Include in Assessment" button (when user is authenticated as AIC auditor)

---

### 6.4 Auditor Batch Mode

**Location:** `apps/platform/empathy` (authenticated)

Allows AIC auditors to:
- Upload up to 20 communications per session
- Score all in batch
- Tag each with system name and communication type
- Export combined results as PDF table (for inclusion in Integrity Score Report)
- Compare scores across communications ("your fraud notice scores 18 points higher than your credit rejection")

---

## 7. Technical Requirements

| Requirement | Spec |
|-------------|------|
| Response time (Phase 1) | < 3 seconds for single communication |
| Availability | 99.5% uptime (demo-critical) |
| Text storage | No persistent storage of input text (privacy-by-design) |
| Rate limiting | 10 requests/minute for unauthenticated; 60/minute for authenticated |
| Languages | English only (Phase 1) |
| Dependencies | `textstat` (readability), `spacy` (tokenisation), Claude API (improved version generation) |
| Auth | Public endpoint for demo; authenticated for batch/export |

---

## 8. Phase Roadmap

### Phase 1 — Rubric Engine (Build now, 2–3 weeks)
- Structured rule-based scoring on 7 dimensions
- Improved version generation via Claude API
- Public demo interface
- PDF export of single result

### Phase 2 — NLP Enhancement (Month 2–3)
- Fine-tune tone classifier on AIC-labelled dataset (collect labels during Phase 1)
- Add TextBlob/SpaCy semantic analysis for impact acknowledgment dimension
- Multi-communication comparison view
- Batch mode for auditors

### Phase 3 — Production API (Month 4–6, post-Alpha)
- Authenticated REST API for enterprise clients
- Webhook notifications when communications fall below threshold
- Integration with `apps/platform` governance workspace
- Drift detection: alert when communication scores decline over time

---

## 9. Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Demo conversion (investor sees demo → requests follow-up) | ≥60% | Month 2 |
| Alpha clients using empathy scan | 100% of Alpha cohort | Month 3 |
| Communications scored (cumulative) | 500 | Month 6 |
| Average score improvement after rewrite recommendation | ≥20 points | Month 4 |
| Rubric v2.0 published (based on first 50 assessments) | Yes | Month 5 |

---

## 10. Open Questions

| Question | Owner | Target Date |
|----------|-------|-------------|
| Should the demo show a real AIC-scored example on load (pre-loaded rejection letter)? | Product | Before dev starts |
| What's the right improved-version prompt to ensure rewrites stay legally appropriate? | Legal + Product | Before Phase 1 ship |
| Do we disclose which LLM generates the improved version? | Legal | Before Phase 1 ship |
| Reading level target — is Grade 8 right for all communication types? | Methodology | Month 2 |
| How do we handle communications that mix English and Afrikaans/isiZulu? | Engineering | Phase 2 |

---

## 11. Dependencies

- `apps/engine` FastAPI server running (Python 3.11+)
- `textstat` library installed in engine environment
- Claude API key configured in `packages/ai`
- `apps/web` demo route created and deployed
- Design: wireframes for results UI (use existing AIC component library)

---

*See [[02-ARCHITECTURE]] for engine architecture context*
*See [[B0-2]] in [[05-FUNCTIONS-TO-BUILD]] for build priority context*
*See [[03-ALGORITHMIC-RIGHTS]] for Right 5 definition*
