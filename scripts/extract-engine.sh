#!/usr/bin/env bash
# =============================================================================
# extract-engine.sh — AIC Engine Standalone Extraction
# =============================================================================
# Run from the MONOREPO ROOT on your Mac:
#
#   cd /Users/wilkenzander/AIC-Consolidation-Folder/AIC-platform
#   bash scripts/extract-engine.sh
#
# The engine is pure Python (FastAPI) with no shared packages.
# This is a straight copy — nothing needs patching.
#
# After this runs, push with:
#   cd ~/aic-engine-standalone
#   git remote add origin git@github.com:Zander-ztoaholdings/aic-engine.git
#   git push -u origin main
# =============================================================================
set -euo pipefail

MONOREPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENGINE_SRC="$MONOREPO_ROOT/apps/engine"
DEST="$HOME/aic-engine-standalone"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   AIC Engine — Standalone Extraction Script  ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Source : $ENGINE_SRC"
echo "  Output : $DEST"
echo ""

# ── Preflight ─────────────────────────────────────────────────────────────────
if [ ! -d "$ENGINE_SRC/app" ]; then
  echo "✗ apps/engine not found. Run this from the monorepo root." && exit 1
fi

if [ -d "$DEST" ]; then
  read -rp "  ⚠️  $DEST already exists. Delete and recreate? (y/N) " confirm
  [[ "$confirm" == "y" || "$confirm" == "Y" ]] || { echo "  Aborted."; exit 1; }
  rm -rf "$DEST"
fi

# ── Step 1: Copy the engine ───────────────────────────────────────────────────
echo "→ Copying apps/engine..."
rsync -a \
  --exclude=__pycache__ \
  --exclude='*.pyc' \
  --exclude='.pytest_cache' \
  --exclude='.env' \
  --exclude='*.egg-info' \
  --exclude='.venv' \
  --exclude='venv' \
  "$ENGINE_SRC/" "$DEST/"
echo "  ✓ Done"

# ── Step 2: Write .gitignore ──────────────────────────────────────────────────
echo "→ Writing .gitignore..."
cat > "$DEST/.gitignore" << 'GITIGNORE'
# Python
__pycache__/
*.py[cod]
*.egg-info/
dist/
build/
.eggs/

# Virtual environments
.venv/
venv/
env/

# Testing
.pytest_cache/
.coverage
htmlcov/
coverage.xml

# Environment
.env
.env.local
.env.*.local

# Logs
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
GITIGNORE
echo "  ✓ .gitignore written"

# ── Step 3: Write .env.example ────────────────────────────────────────────────
echo "→ Writing .env.example..."
cat > "$DEST/.env.example" << 'ENVEXAMPLE'
# ── Server ────────────────────────────────────────────────────────────────────
PORT=8000
ENVIRONMENT=development

# ── Security ──────────────────────────────────────────────────────────────────
ENGINE_API_KEY=                  # shared with aic-platform
AUDIT_SIGNING_KEY=               # RSA-3072 private key (PEM)
AUDIT_VERIFY_KEY=                # RSA-3072 public key (PEM)

# ── Redis (task queue) ────────────────────────────────────────────────────────
REDIS_URL=redis://localhost:6379/0

# ── CORS ──────────────────────────────────────────────────────────────────────
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# ── Sentry ────────────────────────────────────────────────────────────────────
SENTRY_DSN=
ENVEXAMPLE
echo "  ✓ .env.example written"

# ── Step 4: Git init and commit ───────────────────────────────────────────────
echo "→ Initializing git repository..."
cd "$DEST"
git init -b main
git add .
git commit -m "feat: initial standalone aic-engine

Extracted from aic-platform monorepo.
Pure Python FastAPI audit engine — no shared package dependencies.
Clean git history — no monorepo secrets in this history."

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║         ✅  Extraction Complete!            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Standalone repo: $DEST"
echo ""
echo "  1. Create the repo on GitHub (private):"
echo "     https://github.com/organizations/Zander-ztoaholdings/repositories/new"
echo "     Name: aic-engine"
echo ""
echo "  2. Push:"
echo "     cd $DEST"
echo "     git remote add origin git@github.com:Zander-ztoaholdings/aic-engine.git"
echo "     git push -u origin main"
echo ""
echo "  ─────────────────────────────────────────────"
echo "  ⚠️  BEFORE going live:"
echo "     1. Copy .env.example → .env and fill in values"
echo "     2. Start Redis: docker run -p 6379:6379 redis:7-alpine"
echo "     3. Run: pip install -r requirements.txt"
echo "     4. Run: uvicorn app.main:app --reload --port 8000"
echo "  ─────────────────────────────────────────────"
echo ""
