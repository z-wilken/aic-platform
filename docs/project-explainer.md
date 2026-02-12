# AIC Pulse - Project Explainer

## The Architecture of Accountability

AIC Pulse is built on a **Type-Safe Monorepo Architecture**, designed to scale from a single institution to a national certification standard.

### Core Components

1.  **SaaS Dashboard (`apps/platform`):** The primary interface for organizations to monitor their AI integrity, manage audit logs, and track compliance. Built with Next.js 16 and Drizzle ORM.
2.  **Audit Engine (`apps/engine`):** A high-performance Python microservice that performs rigorous statistical bias analysis, drift monitoring, and decision explanation.
3.  **Institutional Registry (`PostgreSQL`):** A secure, multi-tenant database where institutional telemetry is hardened via SHA-256 hash chains.
4.  **Internal Ops (`apps/admin` & `apps/hq`):** Tools for AIC Lead Auditors to verify evidence and manage the institutional certification pipeline.

### Foundational Principles

*   **Institutional Isolation:** Every data point is strictly scoped to an organization ID, enforced globally at the middleware level.
*   **Compile-time Safety:** We use Drizzle ORM and a shared `@aic/types` package to ensure that data flows predictably from the database to the user's screen.
*   **Immutability by Design:** Audit logs are linked in a cryptographic chain, ensuring that once a decision is recorded, it cannot be altered without detection.
*   **Automated Quality:** Our "Green-to-Merge" CI/CD pipeline ensures that every commit is build-tested and verified against our institutional standards.

### Technology Stack

*   **Frontend:** Next.js (App Router), React 19, Tailwind CSS 4, Framer Motion.
*   **Database:** PostgreSQL with Drizzle ORM.
*   **Monitoring:** Sentry for error tracking and performance.
*   **Security:** NextAuth.js with JWT and RSA-3072 signing.
