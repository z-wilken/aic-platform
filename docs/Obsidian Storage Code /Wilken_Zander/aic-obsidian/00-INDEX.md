# AIC Platform — Knowledge Base Index
*Last updated: February 2026 | For new team members and contributors*

> **Strategic context (read first):** AIC's current phase is *become the authority*. The platform is being built in parallel but the immediate business priority is the Empathy Engine demo, the AI Governance Index, and the Mock Alpha report. See [[10-STRATEGY]] before touching [[05-FUNCTIONS-TO-BUILD]].

---

> **AIC (AI Integrity Certification)** is a South African platform that audits, certifies, and governs algorithmic decision systems against a framework of five human rights. The platform enforces accountability when systems make decisions that affect human lives.

---

## Navigation Map

| # | Document | What It Answers |
|---|----------|-----------------|
| [[01-PLATFORM-OVERVIEW]] | Platform Overview | What is AIC? Who is it for? Why does it exist? |
| [[10-STRATEGY]] | Strategic Pivot (Feb 2026) | Identity question, 5 fears, 5 opportunities, 12-month sequencing |
| [[11-REVENUE-MODEL]] | Revenue Architecture | Dual-track model, pricing, scenarios, conflict of interest rules |
| [[12-EVIDENCE-COLLECTION]] | Evidence Collection | How AIC audits without full system access — 4 models |
| [[13-REVIEW-AND-OPINIONS]] | Independent Review | Contradictions, gaps, opinions, and 10 recommendations |
| [[15-LEGAL-ANALYSIS]] | **Legal Analysis** | POPIA S71 deep-dive, EU AI Act, Alpha agreement terms, defamation risk ✅ |
| [[16-COMPETITIVE-ANALYSIS]] | **Competitive Analysis** | AIC vs Holistic AI, Credo AI, ForHumanity, Big 4, ISO 42001, B Corp — positioning matrix and moat ✅ |
| [[17-AIC-COMPLIANCE-OBLIGATIONS]] | **Own Compliance Obligations** | AIC's regulatory obligations — CIPC, POPIA, SANAS, tax, labour, IP, website, certification ethics ✅ |
| [[18-BACKEND-WEEKLY-PLAN]] | **Backend Completion Plan** | Week of Feb 26 — dual-face backend vision, day-by-day build order, redundant file cleanup, investor readiness checklist ✅ |
| AIC-Backend-Roadmap.html | **Backend Roadmap Dashboard** | Interactive HTML dashboard — 85 tasks, 10 layers, frontend button audit notice (8 missing routes, 2 broken links) ✅ |
| [[14-DELIVERABLES-LOG]] | **Deliverables Log** | 17 deliverables logged through Feb 26 — platform code, docs, tooling, security implementations ✅ |
| TASKS.md | **Active Sprint Task List** | 12 active tasks (B-1 to B-12), next-phase, completed log, decode reference ✅ |
| AIC-Business-Model-Canvas.html | **Business Model Canvas** | All 9 BMC sectors — partners, value props, segments, channels, revenue, costs ✅ |
| [[AIC-Empathy-Engine-PRD]] | **Empathy Engine PRD** | Full product spec — ready for development ✅ |
| [[AIC-Risk-Register]] | **Risk Register** | Pre-Alpha risk assessment — 15 risks, 2 critical ✅ |
| [[02-ARCHITECTURE]] | Technical Architecture | What are the 5 apps? How do they connect? |
| [[03-ALGORITHMIC-RIGHTS]] | The 5 Algorithmic Rights | What is the audit framework built on? |
| [[04-CERTIFICATION-FRAMEWORK]] | Certification Framework | How do organisations get certified? |
| [[05-FUNCTIONS-TO-BUILD]] | Functions to Build | Business priorities first, then platform hardening |
| [[06-DATABASE-SCHEMA]] | Database Schema | What tables exist? How do they relate? |
| [[07-API-ROUTES]] | API Routes | All endpoints across all applications |
| [[08-HARDCODED-DATA]] | Hardcoded Data Audit | What is static/fake? What needs real data? |
| [[09-NOTION-INTEGRATION]] | Notion Integration | How Notion maps to platform data and processes |

---

## Platform at a Glance (Updated Feb 26 2026 — 2-App Architecture)

> **apps/admin, apps/hq, apps/internal have been DELETED** (commit `51806ed`, Feb 26 2026 — 31,252 line deletion). Everything is now in apps/platform behind RBAC. A new `apps/governance-agent` MCP server was added. See [[02-ARCHITECTURE]].

```
PUBLIC                      UNIFIED BACKEND
────────────────────────    ────────────────────────
apps/web  (port 3000)  →   apps/platform (port 3001)
  Marketing site              CLIENT FACE (tenant-RLS)
  Lead capture                  Dashboard, Workspace
  Self-assessment               AI Systems, Incidents
  Citizens portal               Reports, Billing
  Corporate/Pro portals
  AI Governance Index         ADMIN FACE (RBAC-gated)
  Public registry               Certification factory
                                Queue triage + approval
                                HITL logs
                                RBAC / God Mode
                                Revenue + CRM (/hq/*)

                            apps/engine (port 8000)
                              Python FastAPI
                              Bias analysis
                              SHAP/LIME, Privacy, Labour

                            apps/governance-agent (NEW)
                              MCP Server (stdio)
                              get_org_integrity_score
                              list_audit_requirements
                              AI agents: Claude, GPT
```

---

## The Core Loop

1. **Organisation applies** via `apps/web` → alpha application stored in DB
2. **AIC reviews** in `apps/admin` → auditor assigned, requirements checklist created
3. **Organisation governs** in `apps/platform` → uploads evidence, logs decisions, reports incidents
4. **Engine analyses** via `apps/engine` → bias testing, fairness scoring, PII audit
5. **Score published** to `leaderboard` → integrity score visible globally
6. **Certification issued** → tier assigned (TIER_1 / TIER_2 / TIER_3)
7. **HQ monitors** in `apps/hq` → pipeline, revenue, regulatory compliance

---

## Key Concepts (Quick Reference)

| Term | Definition | See |
|------|-----------|-----|
| **Integrity Score** | 0–100 score calculated from verified audit requirements across the 5 rights | [[04-CERTIFICATION-FRAMEWORK]] |
| **Empathy Engine** | The highest-priority demo build — analyses rejection letters and automated comms for human dignity | [[10-STRATEGY]], [[05-FUNCTIONS-TO-BUILD]] |
| **AI Governance Index** | Public scoring of JSE Top 40 on AI governance — creates market pressure without regulation | [[10-STRATEGY]], [[11-REVENUE-MODEL]] |
| **Dual-Track** | Track 1: standard-setting (free) creates demand. Track 2: certification (paid) captures demand | [[11-REVENUE-MODEL]] |
| **Evidence Models** | 4 ways to audit without full system access — document review, output testing, sandbox, self-assessment | [[12-EVIDENCE-COLLECTION]] |
| **AIMS Readiness** | Algorithmic Impact Management System — readiness level 1–4 | [[03-ALGORITHMIC-RIGHTS]] |
| **Governance Block** | A modular unit in the workspace: text, file, model-card, or human-context | [[02-ARCHITECTURE]] |
| **Audit Ledger** | Cryptographic hash-chain of all audit events, immutable by design | [[06-DATABASE-SCHEMA]] |
| **TIER_1 / TIER_2 / TIER_3** | Human accountability tiers based on decision stakes | [[04-CERTIFICATION-FRAMEWORK]] |
| **RLS** | Row-Level Security — PostgreSQL policy ensuring orgs only see their own data | [[06-DATABASE-SCHEMA]] |

---

## Repository

`github.com/z-wilken/aic-platform` — Turborepo monorepo with npm workspaces.

```
apps/         ← 4 runnable applications (web, platform, engine, governance-agent)
              ← apps/admin, hq, internal, web-legacy DELETED Feb 26 2026
packages/     ← shared code (db, auth, ui, types, legal)
              ← packages/auth now includes real MFA + JTI revocation
scripts/      ← seed-capabilities.ts (RBAC seeding) + utility scripts
docs/         ← strategy, vision, and technical docs
db/           ← migration files
e2e/          ← Playwright end-to-end tests
```

---

---

## Document Groups (by Purpose)

**For investors and commercial conversations:** [[01-PLATFORM-OVERVIEW]] · [[11-REVENUE-MODEL]] · [[16-COMPETITIVE-ANALYSIS]] · AIC-Business-Model-Canvas.html · [[14-DELIVERABLES-LOG]]

**For legal and compliance review:** [[15-LEGAL-ANALYSIS]] · [[17-AIC-COMPLIANCE-OBLIGATIONS]] · [[03-ALGORITHMIC-RIGHTS]]

**For product and engineering:** [[AIC-Empathy-Engine-PRD]] · [[02-ARCHITECTURE]] · [[05-FUNCTIONS-TO-BUILD]] · [[06-DATABASE-SCHEMA]] · [[07-API-ROUTES]]

**For strategy and risk:** [[10-STRATEGY]] · [[AIC-Risk-Register]] · [[13-REVIEW-AND-OPINIONS]] · [[16-COMPETITIVE-ANALYSIS]]

**For auditors and delivery:** [[04-CERTIFICATION-FRAMEWORK]] · [[12-EVIDENCE-COLLECTION]] · [[08-HARDCODED-DATA]]

---

*Cross-references use Obsidian [[wikilink]] format. New to AIC? Start with [[01-PLATFORM-OVERVIEW]] → [[10-STRATEGY]] → [[11-REVENUE-MODEL]] → [[16-COMPETITIVE-ANALYSIS]] → [[05-FUNCTIONS-TO-BUILD]].*
