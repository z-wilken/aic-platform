# AI Integrity Certification (AIC) Platform

The global benchmark for human accountability in automated systems.

## 🇿🇦 Strategic Focus: POPIA Section 71
AI Integrity Certification (Pty) Ltd is a South African startup building the certification standard for human accountability in AI. Our regulatory anchor is **POPIA Section 71**, ensuring that no final decision about a human being is made solely by a machine.

## 🏗️ Architecture
This is a monorepo managed with npm workspaces:
- `apps/web`: Marketing site (Next.js 16) - [aiccertified.cloud](https://aiccertified.cloud)
- `apps/platform`: Pulse SaaS Dashboard (Next.js 16) - [app.aiccertified.cloud](https://app.aiccertified.cloud)
- `apps/engine`: Audit Engine (FastAPI/Python) - [api.aiccertified.cloud](https://api.aiccertified.cloud)
- `packages/ui`: Shared React component library (Tailwind 4)
- `packages/db`: Shared Drizzle ORM schema & migrations
- `packages/auth`: Shared NextAuth.js logic with Token Revocation

## 🚀 Deployment (Coolify)
The platform is designed to be deployed on a VPS using **Coolify**.

### 1. Marketing Site (`apps/web`)
- **Base Directory:** `/`
- **Build Command:** `npm run build --workspace=web`
- **Start Command:** `npm run start --workspace=web`
- **FQDN:** `https://aiccertified.cloud`

### 2. Pulse Dashboard (`apps/platform`)
- **Base Directory:** `/`
- **Build Command:** `npm run build --workspace=platform`
- **Start Command:** `npm run start --workspace=platform`
- **FQDN:** `https://app.aiccertified.cloud`

## 🛡️ Security
- **Multi-tenant Isolation:** Enforced via `getTenantDb` at the API Gateway level.
- **Audit Integrity:** Every decision is RSA-3072 signed by the Python engine.
- **Token Revocation:** Redis-backed TRL (Token Revocation List) for instant logouts.

## 💼 Commercials
- **Founding Partner Program:** R 2,500/month (Limited to 5 slots).
- Includes free upgrade to SANAS-accredited certification upon roadmap completion.

---
© 2026 AI Integrity Certification (Pty) Ltd. Built in South Africa.
