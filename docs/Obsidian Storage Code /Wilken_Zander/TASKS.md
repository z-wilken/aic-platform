# AIC — Task List
*Last synced: Feb 26, 2026 · Source: Claude Cowork session*

---

## 🔴 Active — This Week (Feb 26 – Mar 3)

### Backend Build Sprint

| # | Task | Owner | Due | Notes |
|---|------|-------|-----|-------|
| B-1 | `git push origin main` — push README rewrite (commit bb51a5a) | Zander | Thu Feb 27 | Run from desktop terminal |
| B-2 | Run DB migrations (7 new tables: roles, capabilities, hitl_logs, etc.) | Zander / Gemini | Fri Feb 27 | `npm run db:migrate` in apps/platform |
| B-3 | Seed default RBAC capabilities + roles | Zander / Gemini | Fri Feb 27 | Seed script in `scripts/seed-capabilities.ts` |
| B-4 | Wire `/api/v1/[[...route]]` gateway with real route dispatch | Gemini | Fri Feb 27 | See `UI_REDESIGN_SPEC.md` |
| B-5 | P0-5: Remove credentials from git history (BFG Repo Cleaner) | Zander | Fri Feb 27 | Security critical |
| B-6 | UI Redesign: implement `UI_REDESIGN_SPEC.md` | Gemini (desktop) | Sat Feb 28 | Full spec in `docs/UI_REDESIGN_SPEC.md` |
| B-7 | P0 security fixes (RLS bypass, JTI, lockout, MFA, audit ledger) | Gemini | Sat Feb 28 | See roadmap SEC-2 through SEC-8 |
| B-8 | Admin backend: wire state machine, HITL route, hq-stats | Gemini | Mon Mar 2 | See roadmap CERT-1/2/3, HQ-1/5 |
| B-9 | Client backend: readiness level, ledger health, leaderboard | Gemini | Mon Mar 2 | See roadmap CLIENT-1/2/3/7 |
| B-10 | End-to-end smoke test: Apply → Triage → Approve → Cert issued | Zander | Tue Mar 3 | Full flow verification |
| B-11 | Deploy apps/web to Vercel on aic.co.za | Zander | Tue Mar 3 | Investor demo requirement |
| B-12 | Begin investor outreach (see TARGET_PROSPECTS doc) | Zander | Tue Mar 3 | Requires backend connected + real data |

---

## 🟡 Next (Mar 4–17)

| # | Task | Notes |
|---|------|-------|
| N-1 | Empathy Engine demo (B0-2) | Analyse rejection letters for dignity violations |
| N-2 | AI Governance Index: score JSE Top 40 (B0-3) | Creates market pressure + media attention |
| N-3 | Mock Alpha Report PDF (B0-1) | First deliverable to pilot clients |
| N-4 | Async Celery migration for engine blocking endpoints | SHAP/LIME, intersectional fairness |
| N-5 | Email transactional notifications (cert approved, revision required) | `packages/notifications/` |
| N-6 | Stripe end-to-end checkout flow test | Payment → webhook → org tier update |
| N-7 | Analytics routes: corrections, incidents, decisions | See roadmap CLIENT-8/9/10 |
| N-8 | Remove deprecated apps (admin, hq, internal) from repo | After platform pivot verified |
| N-9 | Google OAuth SSO end-to-end test | GOOGLE_CLIENT_ID configured, not tested |

---

## 🔵 Someday / Later

| # | Task | Notes |
|---|------|-------|
| L-1 | Insurance risk score real implementation | Replace placeholder logic |
| L-2 | Read replica / PgBouncer for production load | Post-launch scale-up |
| L-3 | SADC expansion (beyond South Africa) | Post-investor, post-revenue |
| L-4 | Sector benchmarks for public registry | `/api/benchmarks` stub exists |
| L-5 | Model cache bounds in engine (OOM prevention) | After async migration done |

---

## ✅ Completed (Feb 26, 2026)

| Task | Completed |
|------|-----------|
| Review all commits + architecture pivot (5-app → 2-app) | Feb 26 |
| Update Obsidian: 02-ARCHITECTURE, 05-FUNCTIONS, 06-SCHEMA, 07-ROUTES | Feb 26 |
| Create Obsidian: 18-BACKEND-WEEKLY-PLAN | Feb 26 |
| Update Notion: Technical Infrastructure Deployment page | Feb 26 |
| Create Notion: ⚙️ Backend Build Plan — Week of Feb 26, 2026 | Feb 26 |
| Rewrite README.md — committed bb51a5a | Feb 26 |
| Build interactive Backend Roadmap Dashboard (85 tasks, 10 layers) | Feb 26 |
| Write `docs/UI_REDESIGN_SPEC.md` for Gemini desktop implementation | Feb 26 |
| Update 00-INDEX.md with roadmap + redesign spec entries | Feb 26 |

---

## 📖 Decode Reference

| Term | Meaning |
|------|---------|
| B0 | Business Critical priority (investor-visible) |
| P0 | Security Critical — must fix before launch |
| P1 | Must ship this week |
| RBAC | Role-Based Access Control (WordPress-style capabilities) |
| HITL | Human-in-the-Loop — mandatory audit log for manual reviewer actions |
| God Mode | SuperAdmin with `isSuperAdmin: true` — bypasses all capability checks |
| Dual-Face | Platform serves two audiences: Admin Face (cert factory) + Client Face (tenant SaaS) |
| BFG | BFG Repo Cleaner — tool to remove secrets from git history |
| AIMS | AI Management System — client's implementation of AIC framework |
| Obsidian | Local markdown knowledge base at `mnt/Obsidian Storage/Wilken_Zander/aic-obsidian/` |
