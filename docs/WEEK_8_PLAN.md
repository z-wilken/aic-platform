# Week 8: Alpha Launch Execution Plan

**Current Status:** System Logic Verified (Week 7 Complete)
**Goal:** Onboard first 5 paying Alpha participants and execute first real-world audits.

---

## 🚀 Phase 1: Infrastructure Hardening (Days 1-2)
- [ ] **Production Deployment:** Deploy `apps/platform` and `apps/engine` to secure production environment (e.g., AWS/GCP or Vercel/Render).
- [ ] **Database Migration:** Run the resolved `schema.sql` against the production PostgreSQL instance.
- [ ] **Key Rotation:** Rotate API keys and set strict `AUDIT_SIGNING_KEY` variables in production.
- [ ] **Load Testing:** Run `stress_test_engine.py` against production endpoints to ensure stability under load.

## 🤝 Phase 2: Alpha Onboarding (Days 3-5)
- [ ] **Invite Distribution:** Send secure invite links via `apps/admin` to the 5 committed Alpha partners (Banks/Insurers).
- [ ] **Initial Sync:** Verify that "Insurance ROI API" syncs correctly with partner systems (e.g., iTOO/Santam test endpoints).
- [ ] **Auditor Assignment:** Assign the first batch of "Lead Auditors" (from `apps/hq` Academy) to the new organizations.

## 🕵️ Phase 3: The First Audits (Days 6-7)
- [ ] **Data Ingestion:** Assist partners in uploading their first datasets via the `apps/platform` Audit interface.
- [ ] **Bias Analysis:** Run the "Intersectional Bias Audit" on real data and generate the first valid `integrity_hash`.
- [ ] **Report Generation:** Generate the first "Certificate of Integrity" PDF from `apps/platform`.

## 📊 Success Metrics
- 5 Organizations Active
- 50+ Audit Logs created with valid cryptographic signatures
- 0 Critical Failures in `apps/engine`
- 100% Uptime during business hours

---

**Next Steps:**
Execute `apps/engine/scripts/security_scan.sh` to verify final security posture before onboarding.
