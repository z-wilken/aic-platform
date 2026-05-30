#!/usr/bin/env bash
# =============================================================================
# extract-platform.sh — AIC Platform Standalone Extraction
# =============================================================================
# Run from the MONOREPO ROOT on your Mac:
#
#   cd /Users/wilkenzander/AIC-Consolidation-Folder/AIC-platform
#   bash scripts/extract-platform.sh
#
# Strategy: Keep the internal workspace structure intact.
#   No import path changes — @aic/db, @aic/auth, etc. all resolve through
#   the packages/ directory exactly as before. We just strip out apps/web,
#   apps/engine, and apps/governance-agent.
#
# Output structure:
#   ~/aic-platform-standalone/
#   ├── apps/platform/
#   ├── packages/  (auth, db, legal, middleware, notifications, types, ui)
#   ├── package.json   (workspace: platform + packages only)
#   ├── turbo.json
#   ├── drizzle.config.ts
#   ├── docker-compose.yml
#   └── tsconfig.json
#
# After this runs, push with:
#   cd ~/aic-platform-standalone
#   git remote add origin git@github.com:Zander-ztoaholdings/aic-platform.git
#   git push -u origin main
# =============================================================================
set -euo pipefail

MONOREPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$HOME/aic-platform-standalone"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   AIC Platform — Standalone Extraction Script   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "  Source : $MONOREPO_ROOT"
echo "  Output : $DEST"
echo ""

# ── Preflight checks ──────────────────────────────────────────────────────────
if [ ! -d "$MONOREPO_ROOT/apps/platform" ]; then
  echo "✗ apps/platform not found. Run this from the monorepo root." && exit 1
fi
if [ ! -d "$MONOREPO_ROOT/packages/db" ]; then
  echo "✗ packages/ not found. Run this from the monorepo root." && exit 1
fi

if [ -d "$DEST" ]; then
  read -rp "  ⚠️  $DEST already exists. Delete and recreate? (y/N) " confirm
  [[ "$confirm" == "y" || "$confirm" == "Y" ]] || { echo "  Aborted."; exit 1; }
  rm -rf "$DEST"
fi

mkdir -p "$DEST"

# ── Step 1: Copy apps/platform ────────────────────────────────────────────────
echo "→ Copying apps/platform..."
mkdir -p "$DEST/apps"
rsync -a \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.turbo \
  --exclude='*.log' \
  --exclude='.env' \
  --exclude='.env.local' \
  "$MONOREPO_ROOT/apps/platform/" "$DEST/apps/platform/"
echo "  ✓ Done"

# ── Step 2: Copy all packages ─────────────────────────────────────────────────
echo "→ Copying packages (auth, db, legal, middleware, notifications, types, ui)..."
mkdir -p "$DEST/packages"
for pkg in auth db legal middleware notifications types ui; do
  if [ -d "$MONOREPO_ROOT/packages/$pkg" ]; then
    rsync -a \
      --exclude=node_modules \
      --exclude=dist \
      --exclude=.turbo \
      "$MONOREPO_ROOT/packages/$pkg/" "$DEST/packages/$pkg/"
    echo "  ✓ packages/$pkg"
  fi
done

# ── Step 3: Copy root config files ───────────────────────────────────────────
echo "→ Copying root config files..."
cp "$MONOREPO_ROOT/turbo.json"       "$DEST/turbo.json"
cp "$MONOREPO_ROOT/drizzle.config.ts" "$DEST/drizzle.config.ts"
cp "$MONOREPO_ROOT/tsconfig.json"    "$DEST/tsconfig.json"
cp "$MONOREPO_ROOT/eslint.base.mjs"  "$DEST/eslint.base.mjs"
cp "$MONOREPO_ROOT/eslint.config.mjs" "$DEST/eslint.config.mjs"
cp "$MONOREPO_ROOT/vitest.config.ts" "$DEST/vitest.config.ts"
cp "$MONOREPO_ROOT/vitest.setup.ts"  "$DEST/vitest.setup.ts"
[ -f "$MONOREPO_ROOT/CLAUDE.md" ] && cp "$MONOREPO_ROOT/CLAUDE.md" "$DEST/CLAUDE.md"
echo "  ✓ Done"

# ── Step 4: Write slim docker-compose.yml (db + redis only) ──────────────────
echo "→ Writing docker-compose.yml (db + redis only)..."
cat > "$DEST/docker-compose.yml" << 'DOCKEREOF'
services:
  db:
    image: postgres:15-alpine
    container_name: aic_db
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-aic_admin} -d ${POSTGRES_DB:-aic_platform}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: aic_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: aic_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_EMAIL:-admin@aic.local}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_PASSWORD:-admin}
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  postgres_data:
  redis_data:
DOCKEREOF
echo "  ✓ docker-compose.yml written"

# ── Step 5: Write standalone root package.json ────────────────────────────────
echo "→ Writing root package.json..."
cat > "$DEST/package.json" << 'PKGJSON'
{
  "name": "aic-platform",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=18.17.0",
    "npm": ">=10.0.0"
  },
  "packageManager": "npm@10.9.0",
  "workspaces": [
    "apps/platform",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev --filter=platform",
    "build": "turbo build --filter=platform",
    "lint": "turbo lint --filter=platform",
    "type-check": "turbo type-check --filter=platform",
    "test": "turbo test",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:migrate": "npm run db:migrate --workspace @aic/db",
    "prepare": "husky"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.1.0",
    "@eslint/js": "^9.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^16.0.0",
    "@types/pg": "^8.16.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@vitest/coverage-v8": "^1.3.0",
    "drizzle-kit": "^0.31.9",
    "husky": "^9.1.7",
    "jsdom": "^24.0.0",
    "lint-staged": "^16.2.7",
    "turbo": "^2.8.7",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.58.1",
    "vitest": "^1.3.0"
  },
  "dependencies": {
    "dotenv": "^17.3.1",
    "drizzle-orm": "^0.45.1",
    "next": "15.5.15",
    "next-auth": "5.0.0-beta.30",
    "pg": "^8.18.0",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "vitest related --run"
    ]
  }
}
PKGJSON
echo "  ✓ package.json written"

# ── Step 6: Write .gitignore ──────────────────────────────────────────────────
echo "→ Writing .gitignore..."
cat > "$DEST/.gitignore" << 'GITIGNORE'
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/
build/
dist/

# Turbo
.turbo/

# Environment — NEVER commit these
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp

# DB migrations (generated — commit selectively)
# db/migrations/

# Build info
*.tsbuildinfo

# Sentry
.sentryclirc
GITIGNORE
echo "  ✓ .gitignore written"

# ── Step 7: Write .env.example ────────────────────────────────────────────────
echo "→ Writing .env.example..."
cat > "$DEST/.env.example" << 'ENVEXAMPLE'
# ── Database ──────────────────────────────────────────────────────────────────
DATABASE_URL=postgres://aic_admin:password@localhost:5432/aic_platform
POSTGRES_USER=aic_admin
POSTGRES_PASSWORD=password
POSTGRES_DB=aic_platform
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# ── Auth (NextAuth v5) ────────────────────────────────────────────────────────
AUTH_SECRET=                     # generate: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=                 # same as AUTH_SECRET

# ── Encryption ────────────────────────────────────────────────────────────────
ENCRYPTION_KEY=                  # generate: openssl rand -base64 32

# ── Redis ─────────────────────────────────────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ── AWS S3 (document storage) ─────────────────────────────────────────────────
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=af-south-1
AWS_S3_BUCKET=

# ── Stripe (billing) ──────────────────────────────────────────────────────────
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# ── Sentry (error tracking) ───────────────────────────────────────────────────
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# ── Engine (Python audit microservice) ────────────────────────────────────────
ENGINE_URL=http://localhost:8000
ENGINE_API_KEY=

# ── URLs ──────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_WEB_URL=http://localhost:3000
ENVEXAMPLE
echo "  ✓ .env.example written"

# ── Step 8: Copy db migrations if they exist ─────────────────────────────────
if [ -d "$MONOREPO_ROOT/db/migrations" ]; then
  echo "→ Copying DB migrations..."
  mkdir -p "$DEST/db"
  rsync -a "$MONOREPO_ROOT/db/migrations/" "$DEST/db/migrations/"
  echo "  ✓ DB migrations copied"
fi

# ── Step 9: Git init and commit ───────────────────────────────────────────────
echo "→ Initializing git repository..."
cd "$DEST"
git init -b main
git add .
git commit -m "feat: initial standalone aic-platform

Extracted from aic-platform monorepo.
- apps/platform + all 7 packages (auth, db, legal, middleware, notifications, types, ui)
- Workspace structure preserved — all @aic/* imports work unchanged
- apps/web, apps/engine, apps/governance-agent moved to their own repos
- Clean git history — no monorepo secrets in this history"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║           ✅  Extraction Complete!              ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
echo "  Standalone repo: $DEST"
echo ""
echo "  Push to GitHub:"
echo ""
echo "    cd $DEST"
echo "    git remote add origin git@github.com:Zander-ztoaholdings/aic-platform.git"
echo "    git push -u origin main"
echo ""
echo "  ─────────────────────────────────────────────────"
echo "  ⚠️  BEFORE going live:"
echo "     1. Copy .env.example → .env and fill in all values"
echo "     2. Run: docker-compose up -d  (starts postgres + redis)"
echo "     3. Run: npm install && npm run db:push"
echo "     4. Run: npm run dev"
echo "  ─────────────────────────────────────────────────"
echo ""
