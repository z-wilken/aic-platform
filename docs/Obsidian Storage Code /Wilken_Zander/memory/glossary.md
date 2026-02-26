# Glossary

| Term | Full Form | Context |
|------|-----------|---------|
| AIC | AI Integrity Certification | The company/platform |
| AIMS | AI Management System | Client's internal framework — audited against 5 rights |
| RBAC | Role-Based Access Control | WordPress-style capability slugs, `hasCapability(userId, slug)` |
| HITL | Human-in-the-Loop | Mandatory immutable log entry when admin manually reviews/overrides |
| RLS | Row-Level Security | PostgreSQL feature isolating tenant data |
| God Mode | SuperAdmin bypass | `isSuperAdmin: true` → `hasCapability()` always returns true |
| P0 | Priority 0 | Security critical — must fix before any launch |
| P1 | Priority 1 | Must ship this sprint |
| P2 | Priority 2 | Investor-ready feature |
| P3 | Priority 3 | Polish / nice-to-have |
| B0 | Business Critical | Investor-visible, revenue-critical items |
| BFG | BFG Repo Cleaner | Tool for removing secrets/files from git history |
| Dual-Face | Dual-Face Backend | Platform serves Admin Face (cert factory) + Client Face (SaaS) |
| JSE | Johannesburg Stock Exchange | South African stock exchange — target for AI Governance Index |
| POPIA | Protection of Personal Information Act | SA data privacy law. Section 71 = data subject rights |
| SADC | Southern African Development Community | 16-country regional bloc — future expansion target |
| SHA-256 | Secure Hash Algorithm 256 | Used for document integrity checksums in audit vault |
| JTI | JWT ID | Unique ID per JWT token — used for token revocation |
| TOTP | Time-based One-Time Password | MFA standard (Google Authenticator etc.) |
