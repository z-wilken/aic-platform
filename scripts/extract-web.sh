#!/usr/bin/env bash
# =============================================================================
# extract-web.sh — AIC Web Standalone Extraction
# =============================================================================
# Run this script from the MONOREPO ROOT on your Mac:
#
#   cd /Users/wilkenzander/AIC-Consolidation-Folder/AIC-platform
#   bash scripts/extract-web.sh
#
# What it does:
#   1. Copies apps/web into ~/aic-web-standalone/
#   2. Inlines packages/db (db.ts + schema.ts) as lib/db — no secrets, no minio
#   3. Patches the 6 API routes: @aic/db → @/lib/db
#   4. Writes a complete standalone package.json (next, react, drizzle-orm all included)
#   5. Writes .gitignore and .env.example
#   6. git init + initial commit
#
# After this runs, push with:
#   cd ~/aic-web-standalone
#   git remote add origin https://github.com/Zander-ztoaholdings/aic-web.git
#   git push -u origin main
# =============================================================================
set -euo pipefail

MONOREPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB_SRC="$MONOREPO_ROOT/apps/web"
DB_SRC="$MONOREPO_ROOT/packages/db/src"
DEST="$HOME/aic-web-standalone"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║    AIC Web — Standalone Extraction Script    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Source : $WEB_SRC"
echo "  Output : $DEST"
echo ""

# ── Preflight checks ──────────────────────────────────────────────────────────
if [ ! -d "$WEB_SRC" ]; then
  echo "✗ apps/web not found. Run this from the monorepo root." && exit 1
fi
if [ ! -f "$DB_SRC/db.ts" ] || [ ! -f "$DB_SRC/schema.ts" ]; then
  echo "✗ packages/db/src not found. Run this from the monorepo root." && exit 1
fi

if [ -d "$DEST" ]; then
  read -rp "  ⚠️  $DEST already exists. Delete and recreate? (y/N) " confirm
  [[ "$confirm" == "y" || "$confirm" == "Y" ]] || { echo "  Aborted."; exit 1; }
  rm -rf "$DEST"
fi

# ── Step 1: Copy the web app ──────────────────────────────────────────────────
echo "→ Copying apps/web..."
rsync -a \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.turbo \
  --exclude='*.log' \
  --exclude='.env' \
  --exclude='.env.local' \
  "$WEB_SRC/" "$DEST/"
echo "  ✓ Done"

# ── Step 2: Inline packages/db as lib/db (minimal — just db + schema) ────────
echo "→ Inlining packages/db as lib/db..."
mkdir -p "$DEST/lib/db"

# 2a. Copy schema.ts unchanged
cp "$DB_SRC/schema.ts" "$DEST/lib/db/schema.ts"

# 2b. Copy db.ts and fix the monorepo-relative dotenv path
cp "$DB_SRC/db.ts" "$DEST/lib/db/db.ts"
# Remove the monorepo-specific path import
sed -i '' "/import path from 'path';/d" "$DEST/lib/db/db.ts"
# Remove the comment line
sed -i '' "/\/\/ Load .env from monorepo root/d" "$DEST/lib/db/db.ts"
# Replace the path-based dotenv call with a simple dotenv.config()
sed -i '' "s/dotenv.config({.*});/dotenv.config();/" "$DEST/lib/db/db.ts"

# 2c. Create a minimal index.ts (no ioredis/minio — only what web needs)
cat > "$DEST/lib/db/index.ts" << 'EOF'
export * from './db';
export * from './schema';
EOF

echo "  ✓ lib/db created (db.ts + schema.ts + index.ts)"

# ── Step 3: Patch the 6 API routes ───────────────────────────────────────────
echo "→ Patching API route imports (@aic/db → @/lib/db)..."
for route in alpha appeal assessment blog health registry; do
  FILE="$DEST/app/api/$route/route.ts"
  if [ -f "$FILE" ]; then
    sed -i '' "s|from '@aic/db'|from '@/lib/db'|g" "$FILE"
    echo "  ✓ app/api/$route/route.ts"
  fi
done

# Remove legacy lib/db.ts — it shadows lib/db/ directory and would break module resolution
if [ -f "$DEST/lib/db.ts" ]; then
  rm "$DEST/lib/db.ts"
  echo "  ✓ Removed legacy lib/db.ts (shadowed lib/db/ directory)"
fi

# ── Step 4: Write standalone package.json ─────────────────────────────────────
echo "→ Writing standalone package.json..."
cat > "$DEST/package.json" << 'PKGJSON'
{
  "name": "aic-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "@notionhq/client": "^2.2.16",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^2.30.0",
    "dotenv": "^17.3.1",
    "drizzle-orm": "^0.45.1",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.38.0",
    "input-otp": "^1.4.2",
    "jspdf": "^4.1.0",
    "lucide-react": "^0.575.0",
    "next": "15.5.15",
    "next-themes": "^0.4.6",
    "notion-to-md": "^3.1.1",
    "pg": "^8.18.0",
    "react": "19.0.0",
    "react-day-picker": "^9.13.2",
    "react-dom": "19.0.0",
    "react-hook-form": "^7.71.2",
    "react-markdown": "^9.0.1",
    "react-resizable-panels": "^4.6.5",
    "recharts": "^3.7.0",
    "remark-gfm": "^4.0.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
    "vaul": "^1.1.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/jspdf": "^1.3.3",
    "@types/node": "^20",
    "@types/pg": "^8.16.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^4.7.0",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "tailwindcss": "^4",
    "typescript": "^5.7.3",
    "vitest": "^1.6.1"
  }
}
PKGJSON
echo "  ✓ package.json written"

# ── Step 5: Write .gitignore ──────────────────────────────────────────────────
echo "→ Writing .gitignore..."
cat > "$DEST/.gitignore" << 'GITIGNORE'
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js build output
.next/
out/
build/

# Turbo cache
.turbo/

# Environment — NEVER commit these
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
GITIGNORE
echo "  ✓ .gitignore written"

# ── Step 6: Write .env.example ────────────────────────────────────────────────
echo "→ Writing .env.example..."
cat > "$DEST/.env.example" << 'ENVEXAMPLE'
# ── Database ──────────────────────────────────────────────────────────────────
DATABASE_URL=postgres://user:password@localhost:5432/aic

# ── Encryption ────────────────────────────────────────────────────────────────
# Generate with: openssl rand -base64 32
ENCRYPTION_KEY=

# ── Notion CMS ────────────────────────────────────────────────────────────────
NOTION_API_KEY=
NOTION_DATABASE_ID=

# ── Platform App URL (where aic-platform is hosted) ──────────────────────────
NEXT_PUBLIC_PLATFORM_URL=https://app.aiccertified.cloud
ENVEXAMPLE
echo "  ✓ .env.example written"

# ── Step 7: Git init and commit ───────────────────────────────────────────────
echo "→ Initializing git repository..."
cd "$DEST"
git init -b main
git add .
git commit -m "feat: initial standalone aic-web

Extracted from aic-platform monorepo.
- packages/db inlined as lib/db (db.ts + schema.ts only)
- 6 API routes updated: @aic/db → @/lib/db
- All workspace dependencies replaced with direct versions
- Clean git history — no monorepo secrets in this history"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║           ✅  Extraction Complete!           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Standalone repo: $DEST"
echo ""
echo "  Push to GitHub:"
echo ""
echo "    cd $DEST"
echo "    git remote add origin https://github.com/Zander-ztoaholdings/aic-web.git"
echo "    git push -u origin main"
echo ""
echo "  (Use your Personal Access Token as the password)"
echo ""
echo "  ─────────────────────────────────────────────"
echo "  ⚠️  BEFORE going live: create a .env file"
echo "     by copying .env.example and filling in"
echo "     your DATABASE_URL, ENCRYPTION_KEY, and"
echo "     NOTION_API_KEY — never commit it."
echo "  ─────────────────────────────────────────────"
echo ""
