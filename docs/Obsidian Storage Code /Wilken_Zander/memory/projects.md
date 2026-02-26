# Projects

## AIC Platform
**Status:** Active build — backend sprint week of Feb 26, 2026
**Repo:** https://github.com/z-wilken/aic-platform.git
**Local:** `apps/platform` (port 3001) + `apps/web` + `apps/engine`
**Architecture:** Turborepo monorepo. 2-app unified (consolidating from 5). Dual-Face: Admin (cert factory) + Client (tenant SaaS).
**DB:** PostgreSQL + Drizzle ORM. 35+ tables. RLS + `getTenantDb(orgId)` / `getSystemDb()`.
**Key docs:**
- Obsidian: `aic-obsidian/` — full technical knowledge base
- Spec for Gemini: `docs/UI_REDESIGN_SPEC.md`
- Roadmap: `AIC-Backend-Roadmap.html` (85 tasks)
- Weekly plan: `18-BACKEND-WEEKLY-PLAN.md`
**Immediate next step:** Push bb51a5a + implement UI_REDESIGN_SPEC.md with Gemini on desktop.

## AIC Empathy Engine
**Status:** Planned — Next phase after backend ships
**Priority:** B0-2
**Description:** Analyse rejection letters + automated comms for human dignity violations

## AI Governance Index
**Status:** Planned — Next phase
**Priority:** B0-3
**Description:** Score JSE Top 40 AI governance publicly — creates market pressure, media attention, inbound leads
