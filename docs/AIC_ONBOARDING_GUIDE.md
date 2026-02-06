# AIC Ecosystem: Newcomer's Onboarding Guide

Welcome to the **AI Integrity Certification (AIC)** platform. This document is a guided walkthrough of the architecture, data flow, and user experience.

## 1. High-Level Architecture
AIC is a **monorepo** using Next.js for the frontends and Python for the analytical engine.

*   **apps/web (Port 3000)**: Public-facing marketing site. Includes the "AI Risk Quiz" which acts as the lead generator.
*   **apps/platform (Port 3001)**: The Client Portal. This is where organizations upload logs, view their "Integrity Score," and manage compliance.
*   **apps/admin (Port 3002)**: The Auditor Portal. Third-party auditors use this to review evidence and grant certifications.
*   **apps/hq (Port 3004)**: Internal Command Center. Used by the AIC team for CRM (Leads), CMS (Blog/Newsletter), and Governance.
*   **apps/engine (Port 8000)**: Python/FastAPI service that performs the actual mathematical auditing of AI decisions.
*   **packages/ui**: Shared component library using Tailwind CSS and Framer Motion.

## 2. The User Journey (Follow this to test)

### Step 1: The Lead (Web)
1. Go to `http://localhost:3000`.
2. Take the **Risk Assessment Quiz**.
3. On completion, a "Lead" is created in the database.
4. **Code Reference**: `apps/web/app/quiz/page.tsx` -> `api/leads`

### Step 2: Internal Review (HQ)
1. Go to `http://localhost:3004/login`.
2. View the **Pipeline Volume**. Your quiz entry should appear in the CRM section.
3. **Code Reference**: `apps/hq/app/api/leads/route.ts`

### Step 3: Client Onboarding (Platform)
1. Go to `http://localhost:3001`.
2. This is the "Audit Dashboard." It fetches real-time scores based on `audit_requirements`.
3. **Code Reference**: `apps/platform/lib/auth.ts` (NextAuth v5) and `app/api/stats/route.ts`.

## 3. Data Schema Essentials
*   **Organizations**: The core entity. Every user and audit log belongs to one.
*   **Users**: Roles include `ADMIN`, `AUDITOR`, `COMPLIANCE_OFFICER`.
*   **Audit Requirements**: The checklist an org must complete to get certified.
*   **Integrity Score**: A weighted average (0-100) calculated in `apps/platform/app/api/stats/route.ts`.

## 4. Development Workflow
1. **Start all apps**: `npm run dev` from the root.
2. **Database**: Managed via Docker or local Postgres. Schema is in `apps/platform/db/schema.sql`.
3. **Styles**: We use a custom "Cyber-Luxury" aesthetic (Black, Gold, IBM Plex Mono).
