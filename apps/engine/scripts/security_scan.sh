#!/bin/sh
set -e

echo "🔍 Running bandit security scan..."
bandit -r app/

echo "🛡️ Running pip-audit vulnerability scan..."
pip-audit -r requirements.txt

echo "✅ Security scans complete."
