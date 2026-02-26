# API Routes
*All endpoints across all AIC applications*

*Cross-references: [[02-ARCHITECTURE]] | [[05-FUNCTIONS-TO-BUILD]] | [[06-DATABASE-SCHEMA]] | [[00-INDEX]]*

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Implemented and working |
| ⚠️ | Implemented with known issues (see [[05-FUNCTIONS-TO-BUILD]] or [[08-HARDCODED-DATA]]) |
| 🔴 | Security issue — see [[05-FUNCTIONS-TO-BUILD]] P0 |
| 🚧 | Stub / placeholder — needs real implementation |
| 📋 | Needs to be built |

---

## apps/platform — Client SaaS (port 3001)

### Core Dashboard
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/stats` | ✅ | Org intelligence: score, tier, velocity, radar — real DB data |
| GET | `/api/dashboard` | ✅ | Extended dashboard with full 5-rights compliance data |

### AI Systems
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/ai-systems` | ✅ | List org's registered AI systems |
| POST | `/api/ai-systems` | ✅ | Register new AI system |
| GET | `/api/ai-systems/[id]` | ✅ | Get single system detail |
| PUT | `/api/ai-systems/[id]` | ✅ | Update system metadata |
| DELETE | `/api/ai-systems/[id]` | ✅ | Deregister system |

### Audit & Governance
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/audit-logs` | ✅ | Org's audit event log |
| POST | `/api/audit-logs` | 🔴 | Creates audit log entry — should enforce mandatory ledger write (see P0-6) |
| GET | `/api/workspace` | ✅ | Governance workspace blocks |
| POST | `/api/workspace` | ✅ | Create governance block |
| GET | `/api/workspace/export` | 🚧 | Export workspace data — stub |

### Incidents & Corrections
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/incidents` | ✅ | List org's incidents |
| POST | `/api/incidents` | ✅ | Raise new incident |
| GET | `/api/incidents/[id]` | ✅ | Single incident detail |
| PUT | `/api/incidents/[id]` | ✅ | Update incident status |
| POST | `/api/incidents/public` | 🔴 | PUBLIC endpoint — accepts orgId from body, RLS bypass, any org can be targeted |
| POST | `/api/incidents/escalate` | 🔴 | Reads ALL incidents — no tenant isolation |
| GET | `/api/corrections` | ✅ | List correction requests |
| POST | `/api/corrections` | ✅ | Submit correction request |
| GET | `/api/corrections/analytics` | 📋 | SLA metrics, response rates — **needs to be built** (P2-2) |

### Decisions & Explanations
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/decisions` | ✅ | Decision record history |
| POST | `/api/decisions` | ⚠️ | Create decision record — missing mandatory ledger entry (P0-6) |
| GET | `/api/decisions/analytics` | 📋 | Explanation coverage, feature importance — **needs to be built** (P2-4) |
| POST | `/api/explain` | ✅ | Forward to engine for SHAP/LIME — proxies to engine |
| POST | `/api/empathy` | 🚧 | Forward to engine for sentiment — partial implementation |

### Reports & Compliance
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/reports` | ✅ | List compliance reports |
| POST | `/api/reports` | ✅ | Generate new compliance report |
| POST | `/api/insurance/risk-score` | 🚧 | AI liability risk score — placeholder logic (see P2-7) |

### Users & Settings
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/users` | ✅ | Org's users |
| POST | `/api/users/invite` | ✅ | Invite new team member |
| GET | `/api/notifications` | ✅ | User notifications |
| GET | `/api/api-keys` | ✅ | Org's API keys |
| POST | `/api/api-keys` | ✅ | Create new API key |
| DELETE | `/api/api-keys/[id]` | ✅ | Revoke API key |

### Billing
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/billing/checkout` | ✅ | Create Stripe checkout session |
| POST | `/api/billing/webhook` | 🔴 | Stripe webhook — updates org tier without validating orgId (P0-1) |

### Authentication
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/auth/[...nextauth]` | ✅ | NextAuth handler |
| POST | `/api/auth/mfa/setup` | 🚧 | MFA setup stub — service built (P0-2 ✅), needs wiring to this route |
| POST | `/api/auth/forgot-password` | ⚠️ | Reveals whether email exists — email enumeration risk (P3-7) |
| POST | `/api/auth/reset-password` | ⚠️ | Same email enumeration issue |
| POST | `/api/auth/verify-email` | ⚠️ | Global user lookup |
| POST | `/api/auth/onboard` | 📋 | Onboarding flow — **missing route, called from UI** |

---

---

## apps/platform — Unified API Gateway (NEW — Feb 26 2026)

> All internal operations are consolidating here from `apps/admin` and `apps/hq`. These routes use capability-based middleware. See `apps/platform/lib/rbac.ts`.

### v1 Gateway — Capability-Checked
| Method | Path | Capability Required | Description |
|--------|------|---------------------|-------------|
| ANY | `/api/v1/[[...route]]` | varies | Central auth + RBAC gateway |
| POST | `/api/v1/admin/approve` | `approve_certification` | Issue AIC certificate, update org status |
| POST | `/api/v1/admin/triage` | internal | Queue triage — review + assign applications |
| POST | `/api/v1/vault/upload` | — (org-scoped) | Document vault upload with SHA-256 checksum |
| POST | `/api/v1/stripe/webhook` | — (Stripe signature) | Stripe subscription events |

### Public Endpoints (No Auth)
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/public/certifications` | 🚧 | Public cert registry |
| GET | `/api/public/leaderboard` | ✅ | Public leaderboard |
| GET | `/api/public/exams` | 🚧 | Upcoming exams |
| GET | `/api/public/resources` | 🚧 | Downloadable resources |
| GET | `/api/public/standards` | 🚧 | Global regulatory standards |

### Certification State Machine
```
DRAFT → PENDING_REVIEW → APPROVED → CERTIFIED
              ↓
       REVISION_REQUIRED → PENDING_REVIEW (loop)
```
File: `apps/platform/app/lib/state-machine.ts`

---

## apps/platform — Admin + HQ Routes (Migrated — Post Feb 26 Deletion)

> `apps/admin` and `apps/hq` were deleted in commit `51806ed`. Their functionality is now in `apps/platform` behind RBAC capability gates. Routes listed below now live in `apps/platform/app/api/` or `apps/platform/app/(modules)/hq/api/`.

### Admin — Applications & Certification
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/applications` | 📋 | **MISSING** — called from admin queue UI, no route file found |
| GET | `/api/applications/[id]` | 📋 | **MISSING** — needs to be created |
| PUT | `/api/applications/[id]` | 📋 | **MISSING** — approve/reject |
| GET | `/api/auditors` | 📋 | **MISSING** — auditor team list, called from UI |
| GET | `/api/v1/admin/users` | 📋 | **MISSING** — called from admin user management UI |
| GET | `/api/v1/admin/organizations` | 📋 | **MISSING** — called from admin org management UI |

### Admin — Leads, Orgs, Users (Migrated from apps/admin)
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/leads` | ✅ | CRM leads (migrated) |
| POST | `/api/leads` | ✅ | Create lead |
| GET | `/api/organizations` | ✅ | All orgs (super-admin) |
| POST | `/api/organizations` | ✅ | Create org |
| PUT | `/api/organizations/[id]` | ✅ | Update org |
| GET | `/api/users` | 📋 | **Needs verification** — may be missing, called from UI |
| PUT | `/api/users/[id]` | ✅ | Update user role |

### HQ — Dashboard & Pipeline
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/hq-stats` | 📋 | HQ metrics — **needs to be built** (P1-5); currently hardcoded in component |
| GET | `/api/hq/revenue/velocity` | 📋 | Monthly revenue data — **needs to be built** (P2-5) |

### CMS (Migrated from apps/hq)
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/posts` | 📋 | **MISSING** — CMS articles, called from UI, no route file found |
| POST | `/api/posts` | 📋 | **MISSING** — create article |
| POST | `/api/subscribers` | 📋 | **MISSING** — newsletter signup, called from UI |

---

## apps/governance-agent — MCP Server (NEW — Feb 26, 2026)

> Not HTTP endpoints — MCP tools exposed via stdio transport to AI agents (Claude, GPT, etc.)

| Tool | Input | Description |
|------|-------|-------------|
| `get_org_integrity_score` | `{ orgId: string }` | Returns integrity score, tier, open incidents from system DB |
| `list_audit_requirements` | `{ orgId: string, status?: string }` | Returns audit requirements checklist |

---

## apps/web — Marketing & Public Portal (port 3000)

### Public Registry
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| GET | `/api/registry` | ⚠️ | Public org registry — queries DB but needs filtering for published-only (P1-8) |
| GET | `/api/benchmarks` | 📋 | Sector benchmarks — **needs to be built** (P3-3) |

### Lead Capture & Assessment
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/contact` | ✅ | Contact form → leads table |
| POST | `/api/alpha-apply` | ✅ | Alpha application → alphaApplications table |
| POST | `/api/assessment/score` | ⚠️ | Assessment quiz scoring — hardcoded weights (see [[08-HARDCODED-DATA]]) |
| GET | `/api/report` | 🚧 | Generate assessment report — partial |

### Citizens
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/citizens/appeal` | 🚧 | Submit algorithmic appeal — form exists, needs full correctionRequests integration (P3-5) |
| GET | `/api/citizens/rights` | 📋 | Public rights information endpoint |

---

## apps/engine — AI Analysis Engine (port 8000)

### Bias & Fairness Analysis
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/v1/analyze` | ⚠️ | Disparate impact (4/5ths rule) — synchronous, blocks under load (P1-6) |
| POST | `/api/v1/analyze/equalized-odds` | ⚠️ | Equalized odds — synchronous (P1-6) |
| POST | `/api/v1/analyze/intersectional` | ⚠️ | Multi-attribute fairness — synchronous + most CPU-intensive (P1-6) |

### Explainability
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/v1/explain` | ⚠️ | SHAP/LIME explanation — 30-120s, blocks workers, needs Celery migration (P1-6) |

### Privacy & Labour
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/v1/privacy-audit` | ✅ | PII detection analysis |
| POST | `/api/v1/labor-audit` | ✅ | Human oversight ratio verification |

### Monitoring
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/api/v1/drift` | ✅ | Model drift detection |

### Async Task System
| Method | Path | Status | Description |
|--------|------|--------|-------------|
| POST | `/analyze/async` | ✅ | Async disparate impact via Celery |
| GET | `/tasks/{task_id}` | ✅ | Poll async task status |

---

## Endpoints Needed But Not Yet Created

### From Feature Build Plan
| App | Method | Path | Linked to |
|-----|--------|------|-----------|
| platform | GET | `/api/incidents/analytics` | [[05-FUNCTIONS-TO-BUILD]] P2-1 |
| platform | GET | `/api/corrections/analytics` | [[05-FUNCTIONS-TO-BUILD]] P2-2 |
| platform | GET | `/api/decisions/analytics` | [[05-FUNCTIONS-TO-BUILD]] P2-4 |
| platform | GET | `/api/leaderboard` | [[05-FUNCTIONS-TO-BUILD]] P2-3 |
| platform | GET | `/api/hq-stats` | [[05-FUNCTIONS-TO-BUILD]] P1-5 |
| platform | GET | `/api/hq/revenue/velocity` | [[05-FUNCTIONS-TO-BUILD]] P2-5 |
| web | GET | `/api/benchmarks` | [[05-FUNCTIONS-TO-BUILD]] P3-3 |
| web | POST | `/api/citizens/appeal` | [[05-FUNCTIONS-TO-BUILD]] P3-5 |
| engine | POST | `/api/v1/empathy` | [[05-FUNCTIONS-TO-BUILD]] B0-2 (formalise endpoint) |
| engine | POST | `/api/v1/ai-disclosure` | [[05-FUNCTIONS-TO-BUILD]] P2 (Right 5: Truth) |

### From Frontend Button Audit (Feb 26 — P0-7)
| App | Method | Path | Urgency |
|-----|--------|------|---------|
| platform | GET | `/api/applications` | 🔴 UI buttons broken |
| platform | GET | `/api/applications/[id]` | 🔴 UI buttons broken |
| platform | GET | `/api/auditors` | 🔴 UI buttons broken |
| platform | GET | `/api/v1/admin/users` | 🔴 UI buttons broken |
| platform | GET | `/api/v1/admin/organizations` | 🔴 UI buttons broken |
| platform | GET/POST | `/api/posts` | 🔴 CMS buttons broken |
| platform | POST | `/api/subscribers` | 🔴 Newsletter broken |
| platform | POST | `/api/auth/onboard` | 🔴 Onboarding broken |

### Broken Navigation Links (not API — frontend fix)
| Current Link | Correct URL | File |
|-------------|-------------|------|
| `/intelligence/engine` | `/hq/intelligence/engine` | navigation.ts or sidebar |
| `/crm` | `/hq/crm` | navigation.ts or sidebar |

---

*Next: [[08-HARDCODED-DATA]] — exact locations of all static/hardcoded values and what they need to be replaced with.*
