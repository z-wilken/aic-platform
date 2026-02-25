# Development Changelog

## [2026-02-25] - Full Brand Redesign — Navy + Copper + AIC Character
**Developer**: Claude (via Cowork)
**Type**: Design / Brand pivot
**Commits**: `252f7ed`, `4f9115c`
**Description**:
- Pivoted from original "Gallery Aesthetic" (cream, crimson, metallic gold) to FNZ-inspired institutional identity
- New color palette: deep navy `#0a1628` + warm copper `#c87941` across all 4 apps
- Added Space Grotesk as primary sans-serif body font (replacing IBM Plex Mono in that role)
- Created `AICCharacter.tsx` — Pixar-inspired SVG human silhouette with Framer Motion spring animations (breathing, head sway, 4 poses: idle/thinking/reviewing/approving)
- Character exported to `@aic/ui` for use across all apps
- Hero section rebuilt around character; hover over CTAs triggers pose changes
- Updated globals.css, layout.tsx, Navbar, HeroSection, page.tsx (apps/web)
- Updated DashboardSidebar, DashboardShell (apps/platform)
- Updated AdminShell, HQShell (apps/admin, apps/hq)
- Figma institutional pages integrated: Governance Hub, Corporate Portal, Professional Portal, AI Governance Index, Disclosures
- Created `docs/BRAND_DESIGN_SYSTEM.md` — full brand spec (Obsidian)
- Created Notion page: "🎨 Brand & Design System — Feb 2026 Pivot" in Documentation Hub

**Files Modified**:
- `apps/web/app/globals.css`, `layout.tsx`, `page.tsx`
- `apps/web/app/components/Navbar.tsx`, `HeroSection.tsx`
- `apps/web/app/components/AICCharacter.tsx` (new)
- `apps/web/app/governance-hub/page.tsx`, `corporate-portal/page.tsx`, `professional-portal/page.tsx`, `ai-governance-index/page.tsx`, `disclosures/page.tsx` (new)
- `apps/platform/app/globals.css`, `layout.tsx`
- `apps/platform/app/components/DashboardShell.tsx`, `dashboard/DashboardSidebar.tsx`
- `apps/admin/app/globals.css`, `layout.tsx`, `components/AdminShell.tsx`
- `apps/hq/app/globals.css`, `layout.tsx`, `components/HQShell.tsx`
- `packages/ui/src/AICCharacter.tsx` (new), `index.ts`
- `docs/BRAND_DESIGN_SYSTEM.md` (new)

---

## [2026-02-01] - Project Initialization
**Developer**: Claude (via Clawdbot)
**Type**: Setup
**Description**: 
- Initialized `aic-platform` monorepo structure.
- Connected to GitHub remote: `https://github.com/z-wilken/aic-platform`.
- Bootstraped `apps/web` using `create-next-app` (Next.js 15, Tailwind, TypeScript).
- Created Docker foundation for future platform apps.

**Files Modified**:
- `README.md`
- `CHANGELOG.md`
- `apps/web/*` (Initial Next.js scaffold)
