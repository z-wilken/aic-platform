#!/usr/bin/env bash
#
# AIC Platform — Database Migration Runner
#
# Usage:
#   ./migrate.sh                  # Apply schema.sql to local database
#   ./migrate.sh --check          # Dry-run: print SQL without executing
#   ./migrate.sh --seed-only      # Run only the seed data inserts
#
# Requires: psql, .env file in project root (or env vars set directly)
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
SCHEMA_FILE="$SCRIPT_DIR/schema.sql"

# Load .env from project root if it exists
if [ -f "$ROOT_DIR/.env" ]; then
  set -a
  source "$ROOT_DIR/.env"
  set +a
fi

DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_USER="${POSTGRES_USER:-aic_admin}"
DB_PASS="${POSTGRES_PASSWORD:-aic_password_secure}"
DB_NAME="${POSTGRES_DB:-aic_platform}"

export PGPASSWORD="$DB_PASS"

echo "=== AIC Database Migration ==="
echo "Host: $DB_HOST:$DB_PORT"
echo "Database: $DB_NAME"
echo "Schema: $SCHEMA_FILE"
echo ""

if [ "${1:-}" = "--check" ]; then
  echo "[DRY RUN] Would execute:"
  echo "---"
  cat "$SCHEMA_FILE"
  echo "---"
  echo "No changes made."
  exit 0
fi

if [ "${1:-}" = "--seed-only" ]; then
  echo "Running seed data only..."
  # Extract INSERT statements from schema
  grep -E "^INSERT" "$SCHEMA_FILE" | psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1
  echo "Seed data applied."
  exit 0
fi

echo "Applying full schema..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 -f "$SCHEMA_FILE"

echo ""
echo "Migration complete."
echo "Tables created:"
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "\dt" 2>/dev/null || echo "(Could not list tables)"
