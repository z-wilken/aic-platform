# AIC Brand & Design System

> **Last updated:** 2026-02-25
> **Status:** Active — post-pivot v2
> **Commit:** `4f9115c` — *design: full rebrand to navy + copper + Pixar-style character*

---

## The Pivot (February 2026)

We moved away from the original "Gallery Aesthetic" (cream/paper, crimson red, metallic gold, IBM Plex Mono body) toward a more institutional, FNZ-inspired visual language. The new identity is built around three convictions:

1. **We are a standards body first.** The brand should read like ISO, FNZ, or a sovereign institution — not a startup.
2. **Human empathy is our core product.** The visual signature (the AIC Character) makes that literal.
3. **Navy + copper is rare in AI governance.** Every competitor runs blue+teal or black+white. Warm copper humanises the cold navy and is completely distinctive.

---

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `aic-navy` | `#0a1628` | Primary background (dark sections, hero, dashboards) |
| `aic-navy-mid` | `#0f2044` | Secondary dark bg (cards, sidebars, panels) |
| `aic-navy-light` | `#1a3060` | Hover states, dividers on dark |
| `aic-copper` | `#c87941` | **Primary accent** — CTAs, active states, highlights |
| `aic-copper-light` | `#e09a62` | Hover state for copper elements |
| `aic-paper` | `#faf8f5` | Light surface bg (light-mode sections) |
| `aic-parchment` | `#f0ece4` | Slightly darker warm surface |
| `aic-muted` | `#6b7895` | Muted text on light backgrounds |

### Usage Rules

- **Dark pages** (apps/platform, apps/admin, apps/hq, apps/web hero sections): navy base, copper accents, white text
- **Light sections** (apps/web content, compliance grid, etc.): paper base, navy text, copper label accents
- **Never use gold (#D4AF37), crimson (#C41E3A), or obsidian (#050505)** — these are the old palette
- **Copper on dark** = trust + warmth. **Copper on light** = authoritative accent. Never use copper as body text.

### Design Intent

Warm copper alongside cold navy creates a tension that mirrors AIC's mission: technology (cold, precise) held accountable by human warmth (copper). The copper reads as "the human hand" in every interface.

---

## Typography

### Font Stack

| Role | Font | Google Font | Weight |
|------|------|-------------|--------|
| Sans-serif (primary) | Space Grotesk | `Space_Grotesk` | 400, 500, 600, 700 |
| Serif (editorial/display) | Crimson Pro | `Crimson_Pro` | 400, 600, 700 |
| Monospace (code/labels) | IBM Plex Mono | `IBM_Plex_Mono` | 400, 500, 600 |

### CSS Variables

```css
--font-sans: var(--font-space-grotesk), system-ui, sans-serif;
--font-serif: var(--font-crimson-pro), serif;
--font-mono: var(--font-ibm-plex-mono), monospace;
```

### Typography Rules

- **Body copy**: Space Grotesk, 400–500 weight. Clean, modern, FNZ-institutional.
- **Large headings**: Crimson Pro (serif), often italic for editorial contrast. Example: *"The Human in the Loop."*
- **Labels, navigation, badges**: IBM Plex Mono, 600 weight, uppercase, 0.3em+ letter-spacing. Never used for body text.
- **Never** mix serif headings with serif body text on the same page — pick one context.

### Label Pattern (Monospace Labels)
All section eyebrows, nav items, status badges, and micro-labels follow this pattern:
```css
font-family: IBM Plex Mono;
font-weight: 700;
font-size: 10px;
letter-spacing: 0.3–0.4em;
text-transform: uppercase;
```
Example: `POPIA SECTION 71`, `PATH 01`, `CERTIFICATION: ACTIVE`

---

## The AIC Character

### Overview

The AIC Character is a **Pixar-inspired human silhouette rendered in expressive black-and-white SVG line art**. It is the brand's visual signature — the literal embodiment of "the human in the loop."

**File locations:**
- `apps/web/app/components/AICCharacter.tsx` (primary)
- `packages/ui/src/AICCharacter.tsx` (shared export via `@aic/ui`)

### Design Principles

- **Black and white lines only** — the figure itself uses stroke-only rendering (`fill: none`)
- **Copper accent details** — pupils (two 2.2px copper dots) and the rotating "in the loop" ring
- **Expressive, not realistic** — slightly enlarged head (Pixar proportion), flowing asymmetric hair, arc-eyes, arched mouth
- **Gender-neutral** — no explicitly gendered features
- **Pixar motion philosophy**: spring physics (not CSS easing), squash & stretch on pose transitions, asymmetric idle cycle, follow-through on secondary elements

### Anatomy

```
Head:     Ellipse 30×34px, slightly asymmetric
Hair:     3–4 flowing line strokes per side, include one copper fine strand
Eyes:     Gentle arc strokes + 2.2px copper-fill circle pupils
Nose:     Single curved line (very Pixar)
Mouth:    Upward arc — always slightly smiling
Neck:     Two parallel curved lines
Torso:    Spine curve + flanking body lines, tapered
Shoulders: Single curved "wingspan" line connecting both arms
Arms:     Two-segment (shoulder→elbow, elbow→wrist) with 3-finger expressive hand
Legs:     Straight curved lines from hip, feet as short curved extensions
Ring:     Rotating dashed copper circle at 46px radius from head center
```

### Poses

| Pose | Character position | Use when |
|------|--------------------|----------|
| `idle` | Neutral, arms relaxed | Default, loading states |
| `thinking` | Head tilted -8°, left arm raised | Research, assessment, form pages |
| `reviewing` | Head forward, both arms lowered | Audit logs, compliance reports |
| `approving` | Head lifted, left arm raised high | Certificate pages, success states |

### Animation System

```typescript
// Spring configs
SPRING_SNAPPY: { stiffness: 280, damping: 18 } // Head
SPRING_SOFT:   { stiffness: 120, damping: 14 } // Torso, hair
SPRING_HEAVY:  { stiffness: 80,  damping: 20 } // Arms (follow-through)

// Idle cycles (run simultaneously, offset so they don't peak together)
Breathe:  2.6s exhale / 2.4s inhale — torso scaleY 1→1.018
Head sway: 3.2s left (-2.5°) / 3.2s right (+2.5°)

// Draw-on (initial render)
Each path: pathLength 0→1, staggered from 0.05s to 1.2s
```

### Usage

```tsx
// Basic (dark background)
<AICCharacter pose="idle" scheme="dark" size={280} animate />

// On hero (interactive hover)
<AICCharacter pose={characterPose} scheme="dark" size={340} animate />

// Light background page
<AICCharacter pose="thinking" scheme="light" size={200} animate />

// Static (no animation — for thumbnail/OG image)
<AICCharacter pose="approving" scheme="dark" size={400} animate={false} />
```

### Where It Appears

| Location | Pose | Size | Notes |
|----------|------|------|-------|
| Homepage hero (`apps/web`) | Interactive — changes on CTA hover | 340px | Right column of hero split |
| Platform login (`apps/platform`) | `idle` | 200px | Top-right corner of login card |
| Certificate page | `approving` | 300px | Beside the certificate |
| 404 / error pages | `thinking` | 240px | Centre of screen |
| Assessment intro | `reviewing` | 200px | Alongside introductory copy |

---

## Layout Principles

### Inspired by FNZ.com

- **Generous white space** — sections breathe. 32–48px vertical rhythm minimum.
- **Clean grid** — 7-column max-width container, consistent px-6 lg:px-8 gutter
- **No decorative imagery** — the character is the only illustration. No stock photos.
- **Typography-led sections** — headline does the work. Supporting copy is concise.
- **Dark hero / light content** — pages open dark (navy hero), then transition to the warm paper sections below
- **Monospace labels** everywhere — institutional micro-copy keeps everything feeling precise

### Grid Structure

```
max-width: 1280px (max-w-7xl)
Horizontal padding: 24px (mobile) → 32px (lg)
Column gaps: 16px → 24px (lg)
Section padding: py-24 (standard) → py-32 (prominent)
```

---

## Per-App Design Direction

### apps/web (Marketing Site) — Port 3000

- **Mode**: Mixed — dark navy hero, warm paper content sections
- **Background**: `bg-aic-navy` (hero, audience routing) → `bg-aic-paper` (content)
- **Primary accent**: copper on all CTAs, labels, active nav states
- **Font body**: Space Grotesk
- **Headings**: Crimson Pro serif, often italic
- **Character**: Hero (interactive hover poses), institutional pages

### apps/platform (AIC Pulse Dashboard) — Port 3001

- **Mode**: Dark throughout
- **Background**: `bg-aic-navy` body, `bg-aic-navy-mid` sidebar and cards
- **Accent**: Copper for active nav items, KPI highlights, status indicators
- **Glass utility**: `glass-panel` (15px blur, navy-mid base)
- **Hover glow**: `hover-glow` (copper 0.2 opacity shadow)
- **Character**: Login screen (idle), certificate page (approving)

### apps/admin (Internal Operations) — Port 3002

- **Mode**: Dark throughout
- **Background**: `bg-aic-navy`
- **Accent**: Copper (general) + `--color-admin-alert: #e53e3e` kept for true danger/critical states only
- **Note**: Admin keeps a real red for ERROR states (copper is for action/brand)

### apps/hq (Governance & CMS) — Port 3004

- **Mode**: Dark throughout
- **Background**: `bg-aic-navy`
- **Accent**: Copper
- **Feel**: Most austere — fewest decorative elements. Institutional, ISO-formal.

---

## Component Patterns

### Primary CTA Button

```tsx
<Link className="bg-aic-copper px-6 py-2.5 text-[10px] font-bold text-white font-mono uppercase tracking-widest hover:bg-aic-copper-light transition-colors">
  GET CERTIFIED
</Link>
```

### Section Eyebrow Label

```tsx
<p className="font-mono text-[10px] font-bold text-aic-copper uppercase tracking-[0.4em] mb-4">
  Regulatory Alignment
</p>
```

### Nav Active State (dark nav)

```tsx
// Active: text-white, copper underline
// Default: text-white/40
// Hover: text-white
```

### Dark Card / Panel

```tsx
<div className="glass-panel p-8 hover-glow transition-all">
  {/* content */}
</div>
```

---

## Brand Voice & Character Integration Notes

The character should never feel like a mascot or a "cute" element. It is an **officer figure** — a Human Accountability Officer. The Pixar quality comes from movement expressiveness, not cartoon proportions. Think Ward from Pixar's *Soul* or Arlo from *The Good Dinosaur* — emotional, weighty, dignified.

Copy that accompanies the character should use the same frame:
- ✅ *"Always in the loop."*
- ✅ *"Human Accountability Officer"*
- ✅ *"The standard for human oversight."*
- ❌ "Meet your AI guardian!" (too cute)
- ❌ "Our helpful robot friend" (wrong — this is a human, not a robot)

---

## Change Log

| Date | Change | Commit |
|------|--------|--------|
| 2026-02-25 | Full rebrand: navy + copper palette, Space Grotesk font, AICCharacter SVG component | `4f9115c` |
| 2026-02-25 | Figma integration: 5 institutional pages + enhanced navbar | `252f7ed` |
| Pre-2026-02 | Original palette: cream/paper, crimson (#C41E3A), metallic gold (#D4AF37), Crimson Pro + IBM Plex Mono | — |
