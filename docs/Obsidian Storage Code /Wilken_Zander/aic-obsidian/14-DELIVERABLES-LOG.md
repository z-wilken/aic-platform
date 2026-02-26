# AIC Deliverables Log
*Tracks what has been built, when, and where to find it*
*Last updated: February 26, 2026 — Backend sprint complete: roadmap, RBAC, security implementations, governance agent, frontend audit*

---

## ✅ DONE

### 1. Mock Alpha Deliverable — Integrity Score Report
**Status:** COMPLETE
**File:** [[AIC-Mock-Alpha-Report-Acme-Financial.pdf]]
**Built:** February 24, 2026
**Pages:** 15
**Contains:**
- Cover page with Integrity Score gauge (62/100)
- Executive summary with certification decision table
- Per-right score breakdown (radar chart + bar chart)
- Right 1 Transparency — 77/100 (evidence table, findings)
- Right 2 Explanation — 52/100 (system-by-system coverage)
- Right 3 Non-Discrimination — 71/100 (bias audit results)
- Right 4 Correction — 34/100 (CRITICAL — blocking condition)
- Right 5 Empathy — 41/100 (rubric table across 3 comms)
- Empathy deep-dive with original text, annotations, improved version
- POPIA Section 71 compliance mapping
- Gap analysis with 6 prioritised recommendations
- Provisional Tier 2 certification decision + conditions
- Methodology appendix with weighted scoring breakdown
- Declaration of Algorithmic Rights summary
- Next steps and contacts

**Use for:** Alpha sales conversations, investor demos, methodology stress-test
**Fictional company:** Acme Financial Services (Pty) Ltd

---

### 2. Claude Skills Overview
**Status:** COMPLETE
**File:** [[Claude-Skills-Overview]]
**Built:** February 24, 2026
**Contains:** Full catalogue of 50+ Claude skills across 11 categories with AIC-specific relevance notes

---

### 3. AI Governance Index Dashboard
**Status:** COMPLETE
**File:** `AIC-Governance-Index-Dashboard.html` (open in browser)
**Built:** February 24, 2026
**Contains:**
- Full JSE Top 40 rankings with scores (fictional but methodology-accurate)
- 5 KPI breakdown per company (Inventory, Policy Rates, Human Override, Audit Readiness, Board Oversight)
- Live filters: sector, score range, certification status, name search
- Score distribution histogram + sector average bar chart
- Expandable row detail with per-KPI breakdown
- Tier badges, delta vs Q3 2025, clickable sort on all columns
- Fully self-contained HTML — no server required, shareable as single file

**Use for:** Investor demos, press/media outreach, sales meeting opener, market pressure creation

---

### 4. Empathy Engine PRD
**Status:** COMPLETE
**File:** [[AIC-Empathy-Engine-PRD]]
**Built:** February 24, 2026
**Contains:**
- Problem statement and goals with measurable metrics
- 4 user stories (investor, auditor, Alpha client, SME)
- Full 7-dimension empathy rubric with weights — the core IP
- Per-dimension scoring scale (Exemplary → Critical)
- Phase 1 feature spec: input interface, scoring engine, results UI, batch mode
- TypeScript and Python interface definitions ready for dev
- Technical requirements (response time, rate limits, privacy)
- 3-phase roadmap: Rubric → NLP → Production API
- Success metrics and open questions

**Use for:** Handoff to technical co-founder, investor product demo, sales demo with clients

---

### 5. AIC Risk Register
**Status:** COMPLETE
**File:** [[AIC-Risk-Register]]
**Built:** February 24, 2026
**Contains:**
- 15 risks across 4 severity levels (Likelihood × Severity matrix)
- 2 CRITICAL risks: single point of failure (score 20), methodology challenge (score 15)
- 4 HIGH risks: no paying clients, enforcement delay, platform security, pay-to-play perception
- 5 MEDIUM risks with owners, mitigations, and residual risk scoring
- Summary table with next actions and review dates
- Review cycle: monthly until Alpha complete, then quarterly

**Use for:** Board/investor conversations, co-founder briefing, monthly operational review

---

### 6. Revenue Model — Detailed Architecture
**Status:** COMPLETE (filled from empty file)
**File:** [[11-REVENUE-MODEL]]
**Built:** February 24, 2026
**Contains:**
- Dual-track structure: Track 1 (standard-setting as demand creation) vs Track 2 (certification revenue)
- Full unit economics: enterprise ~ZAR 73,500 delivery cost, SME ~ZAR 1,070 delivery cost
- 5-year revenue scenarios in ZAR thousands (Conservative and Optimistic)
- Conservative Year 1: ZAR 500K | Year 3: ZAR 14.4M | Year 5: ZAR 59.9M
- Optimistic Year 1: ZAR 1.4M | Year 3: ZAR 40.4M | Year 5: ZAR 170.6M
- Year 1 cost structure breakdown: ~ZAR 1.116M total
- Month-by-month cash flow critical path (survival condition: first Alpha by Month 3)
- Alpha pricing correction: recommend ZAR 75K–100K not ZAR 50K
- Pricing justification vs Big 4, ISO 9001, ESG verification, B Corp
- Renewal revenue engine mechanics (Year 3 cohort = ZAR 2.1M near-pure-profit)
- Investor metrics summary table with TAM framing (Africa: ZAR 2B+)
- Arthur Andersen conflict of interest guardrail — hardcoded into model

**Use for:** Investor pitch, co-founder briefing, Alpha pricing decisions, cash flow planning

---

### 7. Legal Analysis — Deep Dive
**Status:** COMPLETE
**File:** [[15-LEGAL-ANALYSIS]]
**Built:** February 24, 2026
**Contains:**
- POPIA Section 71 verbatim text and operational mapping to all 5 AIC rights
- What S71 covers and — critically — what AIC covers that S71 does not (empathy, bias, reading level)
- Information Regulator enforcement trajectory and why it is accelerating
- EU AI Act territorial scope for SA companies with high-risk category mapping
- AIC's value as EU AI Act bridge certification for SA exporters
- Alpha Participant Agreement: 8 key clauses with legal rationale
- AI Governance Index defamation risk: the three defences + 5 pre-publication requirements
- AIC's own POPIA obligations as responsible party (data map, DPA requirements, retention policy)
- PI insurance requirements: ZAR 10M per claim / ZAR 20M aggregate minimum
- 6 open legal questions requiring qualified counsel

**Use for:** Counsel briefing, Alpha agreement drafting, Index publication checklist, investor due diligence

---

### 8. Competitive Analysis
**Status:** COMPLETE
**File:** [[16-COMPETITIVE-ANALYSIS]]
**Built:** February 24, 2026
**Contains:**
- Direct competitor analysis: Holistic AI, Credo AI, ForHumanity, Responsible AI Institute
- AIC differentiation framing for each competitor (not competing, complementary in most cases)
- Adjacent framework analysis: ISO/IEC 42001 (alignment table), B Corp (structural model + lessons)
- Big 4 analysis: why they are referral partners, not competitors; how to structure the relationship
- "Do nothing" competitor analysis with specific objection counters
- Competitive positioning matrix (9 players × 11 dimensions) — AIC wins on unique combination
- AIC's 5 defensible moats: Declaration, Index first-mover, network, methodology IP, regulator relationship
- ForHumanity watch: the pre-emptive defence strategy
- Competitive intelligence monitoring table with frequency cadence

**Use for:** Sales conversations, investor deck, partnership outreach to Big 4, market positioning

---

### 9. AIC Own Compliance Obligations
**Status:** COMPLETE
**File:** [[17-AIC-COMPLIANCE-OBLIGATIONS]]
**Built:** February 24, 2026
**Contains:**
- Company registration obligations: CIPC, banking, employer registration, COIDA
- POPIA as responsible party: Information Officer, PAIA Manual, DPAs with Notion/Vercel/OpenAI, breach procedure
- Financial services and professional conduct: FAIS, Legal Practice Act, PI insurance, FICA
- SANAS accreditation path: 6-milestone roadmap, Year 2 Q1 application target
- Tax compliance: income tax, provisional tax, VAT, B-BBEE
- Labour law: BCEA/LRA templates, OHSA, UIF — pre-hire requirements
- IP protection: trademark (AIC, AI Integrity Certification, Integrity Score), domain registration (4 domains)
- Website and digital compliance: privacy policy, cookie notice, ToS, WCAG 2.1 AA, PCI-DSS via Stripe
- Certification body ethics: ISO/IEC 17021 obligations — COI policy, impartiality, complaints, appeals, revocation
- Compliance priority matrix: CRITICAL / HIGH / MEDIUM / LOW with timing

**Use for:** Counsel briefing, pre-launch checklist, SANAS planning, insurance procurement

---

### 10. Business Model Canvas
**Status:** COMPLETE
**File:** `AIC-Business-Model-Canvas.html` (open in browser)
**Built:** February 25, 2026
**Contains:**
- All 9 BMC sectors populated from AIC knowledge base
- Key Partners: Information Regulator, SANAS, Big 4, law firms, Holistic AI, Anthropic, academia
- Value Propositions: POPIA S71 defence, EU AI Act bridge, Empathy Engine (unique), 3rd-party verified, open standard + paid cert
- Customer Segments: Enterprise (JSE Top 40), SME, practitioners, SA-to-EU exporters, solopreneurs at scale
- Channels: AI Governance Index (flagship), content/Substack, direct outreach, Big 4 referral, self-serve, Empathy Engine demo tool
- Customer Relationships: founder-led enterprise, self-serve SME, community, practitioner CPD, regulator partnership
- Revenue Streams: enterprise cert ZAR 75K–500K, SME ZAR 5K–15K, renewals, practitioner training, referral fees, insurance API
- Key Resources: methodology IP, Empathy Engine, Index data asset, audit platform, brand authority, PI insurance
- Key Activities: certifying, publishing Index, running Empathy Engine, content, methodology refinement, training
- Cost Structure: Year 1 ZAR 1.116M, break-even at 3 enterprise certs, 75% gross margin target
- 5-Year trajectory: ZAR 500K → ZAR 4.5M → ZAR 14.4M → ZAR 59.9M (conservative)
- Fully branded with AIC colours (navy/teal/gold/red), responsive layout

**Use for:** Investor conversations, co-founder briefing, strategic planning, board presentation, partnership conversations

---

---

### 11. Backend Roadmap Dashboard
**Status:** COMPLETE
**File:** `AIC-Backend-Roadmap.html` (open in browser — Obsidian Storage root)
**Built:** February 26, 2026
**Contains:**
- Interactive HTML dashboard — all 85 tasks across 10 architectural layers
- Filterable by phase (Foundation/Core/Advanced), priority (B0/P0/P1/P2/P3), and status
- Visual stats bar: total tasks, P0 security count, B0 business critical count, completed count
- 5-day sprint plan panel (Feb 26 – Mar 3)
- Investor readiness checklist panel
- ⚠️ **Frontend Button Audit Notice** (added Feb 26): Red-bordered warning section documenting 8 missing API routes, 2 broken nav links, 1 dead page, 148 working buttons. Includes Gemini brief with exact fix instructions.

**Use for:** Gemini desktop implementation briefing, sprint planning, investor demo prep

---

### 12. Active Sprint Task List (TASKS.md)
**Status:** COMPLETE — active document, updated weekly
**File:** `TASKS.md` (Obsidian Storage root `/Wilken_Zander/TASKS.md`)
**Built:** February 26, 2026
**Contains:**
- 12 active sprint tasks (B-1 through B-12), Feb 26 – Mar 3
- 9 next-phase tasks (N-1 through N-9), Mar 4–17
- 5 someday/later tasks (L-1 through L-5)
- Completed log for Feb 26 session
- Decode reference for all AIC shorthand (B0, P0, RBAC, HITL, etc.)

**Use for:** Daily standups, Gemini handoff briefs, session continuity

---

### 13. Memory Files (projects.md + glossary.md)
**Status:** COMPLETE — active documents
**Files:** `memory/projects.md`, `memory/glossary.md`, `memory/CLAUDE.md` (Obsidian Storage root)
**Built:** February 26, 2026
**Contains:**
- `projects.md` — AIC Platform status, repo URL, local ports, architecture summary, immediate next steps
- `glossary.md` — Decoded shorthand: B0, P0, RBAC, HITL, God Mode, Dual-Face, AIMS, BFG, Obsidian
- `CLAUDE.md` — Working memory for cross-session continuity

**Use for:** Session resumption, Gemini context handoff

---

### 14. Governance Agent MCP Server
**Status:** COMPLETE — code shipped in repo
**File:** `apps/governance-agent/src/index.ts` (GitHub repo)
**Built:** February 26, 2026 (shipped by Zander in desktop session)
**Contains:**
- MCP (Model Context Protocol) server using `@modelcontextprotocol/sdk`
- Exposes `get_org_integrity_score` tool — queries system DB for org's score, tier, open incidents
- Exposes `list_audit_requirements` tool — returns checklist for an org
- Transport: stdio (command-line process, not HTTP)
- Allows Claude, GPT, and any MCP-compatible AI agent to query AIC data directly

**Use for:** Enterprise client AI agent integrations, internal AIC agent tooling, investor differentiation story

---

### 15. Real Security Implementations (Feb 26 desktop session)
**Status:** COMPLETE — code shipped in repo
**Files:** In GitHub repo (commit `3e8ff8c` and related)
**Built:** February 26, 2026
**Contains:**
- `packages/auth/src/services/mfa.ts` — Real TOTP RFC 6238 (P0-2 ✅ done)
- `packages/auth/src/services/revocation.ts` — JTI revocation, Redis+DB dual-store (P0-3 ✅ done, Redis client init incomplete)
- `apps/platform/lib/security.ts` — Account lockout, 5 failures/15 min (P0-4 ✅ done)
- `scripts/seed-capabilities.ts` — Seeds RBAC default capabilities + roles

**Use for:** Security audit discussions, investor due diligence ("P0 security items being resolved")

---

### 16. Navigation Updates (Feb 26 session)
**Status:** COMPLETE
**Files:** `apps/platform/app/components/Sidebar.tsx`, `apps/platform/lib/navigation.ts`
**Built:** February 26, 2026
**Contains:**
- Empathy Engine added to sidebar nav (Heart icon, `B0-2` badge, under `access_hq`)
- Organizations added as sub-item under System Admin
- Heart icon imported in Sidebar.tsx and added to ICON_MAP

---

### 17. UI Redesign Spec (docs/UI_REDESIGN_SPEC.md)
**Status:** ⚠️ WRITTEN BUT DELETED
**File:** Was at `docs/UI_REDESIGN_SPEC.md` — deleted in commit `51806ed` (Final Consolidation)
**Built:** February 26, 2026 — **deleted same day in consolidation commit**
**Contains (from memory):**
- 6-department navigation structure replacing current 4-item sidebar
- New colour palette: slate/warm-white replacing current navy/amber gold
- Full component specs for each department
- Gemini desktop implementation brief

**Status:** Needs to be recreated and committed to repo before Gemini can implement it. Current sidebar still uses old navy/amber design.

---

## 📋 QUEUED

| Item | Priority | Skill | Est. Effort | Notes |
|------|----------|-------|-------------|-------|
| Investor Pitch Deck | B0 | `pptx` | 1 day | Cover, problem, solution, market, model, team, ask |
| Alpha Participant Agreement (template) | B0 | `legal:contract-review` | 2 hrs | Based on 8 clauses in [[15-LEGAL-ANALYSIS]] |
| Self-Assessment Enhancement Spec | B0 | `product-management:feature-spec` | 3 hrs | SME product, ZAR 5K–15K, automated |
| AIC Brand Voice Guidelines | HIGH | `brand-voice:guideline-generation` | 3 hrs | Tone, vocabulary, what AIC never says |
| Revenue Model Spreadsheet | HIGH | `xlsx` | 2 hrs | Populate from [[11-REVENUE-MODEL]] scenarios |
| Alpha Outreach Email Templates | HIGH | `brand-voice:brand-voice-enforcement` | 1 hr | 3 templates: warm intro, cold follow-up, post-demo |
| Methodology White Paper (ISO 42001 mapping) | MEDIUM | `docx` | 3 hrs | Academic credibility + pre-emptive challenge defence |

---

*See [[00-INDEX]] for full platform context*
*See [[Claude-Skills-Overview]] for available tools*
