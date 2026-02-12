# AIC Platform — Next Steps

> Generated 2026-02-11 after completing mock data replacement across all 4 apps.
> All 268 tests passing (127 TypeScript + 141 Python).

---

## Major Tasks (35)

### Authentication & Security

1. **Implement email verification** — Add email confirmation flow after `/signup` with token-based verification link
2. **Build password reset flow** — Forgot password page + reset token generation + `/api/auth/reset-password` endpoint
3. **Add multi-tenancy isolation** — Ensure all queries are strictly scoped to `org_id` from session; audit every API route
4. **Implement RBAC middleware on all admin/HQ routes** — Some API routes missing proper role checks; audit and enforce consistently
5. **Implement SSO/OAuth providers** — Add Google and Microsoft SSO for enterprise clients alongside password auth
6. **Implement rate limiting with Redis** — Replace in-memory rate limiting with Redis-backed for multi-instance deployments

### Core Workflow Features

7. **Build the scheduled audit workflow** — CRUD API for `scheduled_audits` table, UI on admin audits page with status transitions (SCHEDULED → IN_PROGRESS → COMPLETED)
8. **Implement the admin verification portal** — `/verification` page in admin app where auditors can review and approve/reject evidence submissions
9. **Build the decision records CRUD** — API + UI for `decision_records` table so organizations can log algorithmic decisions for audit trail
10. **Build the correction requests workflow** — API + UI for `correction_requests` table (citizen appeals: submit → review → resolve)
11. **Build incident management workflow** — Full CRUD + state machine (OPEN → INVESTIGATING → RESOLVED → CLOSED) for incidents
12. **Add user invitation flow** — Admin can invite team members by email; invitee gets link to create account within the org

### Platform Pages & UI

13. **Build the CRM page in HQ** — `/crm` route with lead pipeline management (currently just a link to nowhere)
14. **Build organization detail page in admin** — `/organizations/[id]` with full audit history, requirement status, and settings
15. **Add API key management UI** — Platform `/settings/keys` page for organizations to generate/revoke their own API keys
16. **Build the compliance calendar** — Visual calendar view showing scheduled audits, renewals, and deadlines
17. **Build admin user management page** — `/users` in admin with ability to create, deactivate, and change roles
18. **Build the assessment quiz engine** — Full self-assessment flow for the web app that feeds into `assessments` table
19. **Build the marketing site lead funnel** — Add self-assessment widget, pricing page, and demo request flow to web app

### Engine & Audit Intelligence

20. **Implement model registry integration** — API endpoint for orgs to register their AI/ML models with metadata
21. **Build automated bias monitoring** — Scheduled job that runs bias analysis against registered models and alerts on drift
22. **Implement audit log hash chain verification UI** — Page showing chain integrity status with ability to verify any individual log entry
23. **Implement audit log immutability verification** — Periodic automated check that confirms no tampering via hash chain + RSA signature validation
24. **Build comparison benchmarking** — Allow organizations to see how their integrity score compares to industry averages

### Reporting & Compliance

25. **Build PDF report generation on server** — Move from client-side jsPDF to server-side (puppeteer/playwright) for compliance reports with proper templates
26. **Add POPIA Section 71 report template** — Pre-formatted regulatory report that organizations can generate for the Information Regulator
27. **Add audit trail export** — CSV/JSON export of audit logs with hash chain verification metadata
28. **Implement data retention policies** — Automated cleanup of old audit logs per POPIA requirements + configurable retention periods

### Infrastructure & Operations

29. **Implement file upload for evidence** — Allow organizations to upload compliance documents (POPIA policies, bias reports) to S3/R2
30. **Add real-time WebSocket notifications** — Replace polling (30s interval) with WebSocket connection using `@aic/sockets` package
31. **Build the billing/subscription system** — Stripe integration for tiered pricing (Free trial → Standard → Enterprise)
32. **Implement database connection pooling** — Add PgBouncer or configure pool properly for production workloads
33. **Add end-to-end tests** — Playwright tests for critical user flows (signup → login → dashboard → audit → certificate)
34. **Build CI/CD pipeline for staging** — GitHub Actions workflow for auto-deploy to staging environment on PR merge
35. **Add i18n support** — Afrikaans and Zulu translations for the platform (South African market)

---

## Minor Tasks (20)

### UI Polish

1. **Add loading skeletons** — Replace spinner/text loading states with skeleton UI components across all pages
2. **Fix mobile responsiveness** — DashboardShell sidebar is hidden on mobile (`hidden md:flex`); add hamburger menu
3. **Add favicon and meta tags** — Proper Open Graph tags, favicon, and page titles across all 4 apps
4. **Add toast notifications** — Replace `alert()` calls with proper toast component (e.g. sonner/react-hot-toast)
5. **Add form validation UI** — Signup and settings forms should show inline field-level errors
6. **Add dark mode toggle** — Platform already has dark elements; add consistent theme switching
7. **Add breadcrumb navigation** — DashboardShell header shows basic breadcrumb; make it contextual per route

### Functionality Fixes

8. **Wire the search bar** — DashboardShell search input is visual only; implement real search across audit logs
9. **Add pagination to audit logs** — Currently limited to 5 items on Pulse, 25 on admin; add proper pagination
10. **Fix "Generate Snapshot" feedback** — Reports page `handleGenerateReport` shows alert; should use toast + refresh table
11. **Fix the roadmap page** — Platform `/roadmap` page should show audit requirements progress dynamically
12. **Add chart tooltips** — HQ monthly activity chart bars should show month label and exact count on hover
13. **Add error handling to all fetch calls** — Some pages silently fail; add user-facing error states

### Code Quality & DevOps

14. **Improve TypeScript types** — Replace `any` types in state hooks with proper interfaces
15. **Clean up seed data** — Replace "demo123" password with proper dev credentials; document clearly
16. **Add API response caching** — Cache `/api/stats` and `/api/pulse/metrics` for 30s to reduce DB queries
17. **Add environment variable validation** — Startup check that required env vars are set before app boots
18. **Add database health check endpoint** — `/api/health` on each app that verifies DB connectivity
19. **Optimize SQL queries** — Some dashboard queries could use materialized views or query optimization
20. **Add commit hooks** — ESLint + Prettier pre-commit hook to enforce code style consistency
