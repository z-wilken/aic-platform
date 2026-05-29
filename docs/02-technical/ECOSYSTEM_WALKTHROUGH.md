# AIC Ecosystem Walkthrough: Integrated Platform

This guide walks through the operational flow of the AIC platform as it currently stands.

---

## 1. SECURITY & ACCESS CONTROL

Every app is protected by mandatory environment variables and role-based middleware.

- **Platform** (`localhost:3001/login`): Client organizations authenticate here. Users can only see their own organization's data (row-level security enforced).
- **Internal** (`localhost:3002/login`): AIC team operations portal. Requires `ADMIN` or `COMPLIANCE_OFFICER` role.
- **HQ** (`localhost:3004/login`): Governance and CMS. Only accounts with `is_super_admin = true` can access the `/governance` tab.

---

## 2. THE TECHNICAL AUDIT LOOP

### Step 1: The Bias Audit

1. Go to `localhost:3001/audits` (Platform — Client Portal).
2. Click **"RUN LIVE BIAS AUDIT"**.
3. Behind the scenes:
   - Next.js sends sample data to the Python FastAPI Engine (`localhost:8000`).
   - The Engine calculates EEOC Four-Fifths status, disparate impact, and statistical parity.
   - The result is saved to the database with a SHA-256 hash.
4. A new log appears in the audit table with a "VERIFIED" status and immutable integrity hash.

### Step 2: The Scoring Engine

1. Go to `localhost:3001` (Dashboard Overview).
2. The **Integrity Score** is calculated using the weighted formula:
   - Human Oversight: **35%**
   - Transparency: **25%**
   - Usage Context: **20%**
   - Infrastructure: **20%**
3. Score updates live as audit requirements are verified.

---

## 3. AUTOMATED VERIFICATION (The Trust Suite)

Vitest and pytest test suites ensure core logic is never compromised.

```bash
npm test                  # 127 TypeScript tests (Vitest)
npm run test:engine       # 141 Python tests (pytest)
npm run test:e2e          # Playwright end-to-end tests
```

The TypeScript suite covers:
- Weighted Integrity Scoring logic
- Auth and role enforcement
- Report generation

The Python suite covers:
- All engine services (bias, fairness, explainability, drift, scoring)
- API authentication (authenticated and unauthenticated fixtures)
- Hash chain integrity

---

## 4. THE OPERATIONAL HUB (Internal Portal)

`apps/internal` (port 3002) is the AIC team's operational hub.

- **Pipeline:** Manage incoming leads and track certification progress.
- **Billing:** Stripe integration for subscription management.
- **Operations:** Quality control, performance metrics, staff training.
- **Evidence:** Review uploaded evidence from client organizations.

---

## 5. THE COMMAND CENTER (HQ)

`apps/hq` (port 3004) handles governance and public content.

- **Growth:** Manage the outreach pipeline and target prospects.
- **Voice:** Manage public blog posts and newsletter subscribers via the built-in CMS.
- **Governance:** Manage team access and functional permissions.

---

## 6. CI/CD PIPELINE

Three GitHub Actions workflows keep the codebase verified:

| Workflow | Trigger | What It Checks |
|----------|---------|----------------|
| `foundation-checks.yml` | Push/PR to main | Lint, type-check, Vitest, build matrix |
| `engine-ci.yml` | Changes to `apps/engine/**` | pytest, Bandit, pip-audit, Docker build |
| `platform-ci.yml` | Push/PR to main | Tests + multi-app build |

---

*"We have moved from a promise of accountability to a platform of verification."*

*Updated: February 17, 2026*
