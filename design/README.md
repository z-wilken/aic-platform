# AIC Design Assets

This folder contains all design source files for the AIC platform.

---

## figma-export.zip

**What it is:** A Figma-generated React SPA export of the original AIC website design.
Exported by the founder as a reference for the intended visual direction.

**Contents when unzipped:**
```
src/
  App.tsx                  — React Router SPA entry point
  app/
    components/
      Layout.tsx           — Full nav + footer (the primary reference for IA)
      ui/                  — Full shadcn/ui component library
        button.tsx, card.tsx, badge.tsx, separator.tsx, table.tsx, ...
    pages/
      GovernanceHub.tsx    — Governance Hub page layout
      CorporatePortal.tsx  — Corporate/ISO 42001 page layout
      ProfessionalPortal.tsx
      AIGovernanceIndex.tsx
      Disclosures.tsx
      Home.tsx, About.tsx, ...
```

**Key design decisions captured in this file:**

1. **Navigation IA** — The institutional five-section nav:
   Governance Hub / Corporate Portal / Professional Portal / AI Governance Index / Disclosures.
   This is now implemented in `apps/web/app/components/Navbar.tsx`.

2. **Color scheme** — The Figma export uses `#0f1f3d` (navy) and `#c9920a` (gold). This was
   the starting point; the live platform now uses `#0a1628` (deeper navy) and `#c87941`
   (warm copper) per the Feb 2026 brand pivot. See `docs/BRAND_DESIGN_SYSTEM.md`.

3. **Component library** — Full shadcn/ui component set. Only radix-free components were
   ported to `apps/web` (card.tsx, table.tsx, separator.tsx). Components requiring
   `@radix-ui/*` (button, badge) need `@radix-ui/react-slot` installed first.

4. **No stock images** — The Figma export contained placeholder stock images. Per the
   brand pivot, images have been removed entirely. The AIC Character (`AICCharacter.tsx`)
   is the only illustration in the platform.

**How to reference it:**
```bash
# Unzip to inspect locally
cd design && unzip figma-export.zip -d figma-source/

# Or read individual files directly
unzip -p design/figma-export.zip "src/app/components/Layout.tsx"
```

**What was already integrated:**
- ✅ 5 institutional pages built in `apps/web/app/` (governance-hub, corporate-portal, etc.)
- ✅ Nav IA integrated into Navbar.tsx
- ✅ Card, table, separator UI components ported to `apps/web/app/components/ui/`
- ✅ Color direction informed the Feb 2026 brand pivot
- ⬜ shadcn/ui button.tsx + badge.tsx — pending `@radix-ui/react-slot` install in apps/web

---

## Brand System Reference

For the complete AIC design system specification (colors, typography, AIC Character, layout
principles, per-app direction), see:

```
docs/BRAND_DESIGN_SYSTEM.md
```

Also mirrored in Notion: "🎨 Brand & Design System — Feb 2026 Pivot"
(in the Documentation Hub).
