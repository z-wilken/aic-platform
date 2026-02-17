-- Enable RLS on all tenant-specific tables
ALTER TABLE "organizations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "incidents" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "scheduled_audits" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "models" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_requirements" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "compliance_reports" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "decision_records" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "correction_requests" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "api_keys" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_signatures" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "system_ledger" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "password_reset_tokens" ENABLE ROW LEVEL SECURITY;

-- 1. Organizations Policy: Can only see your own organization
CREATE POLICY organization_isolation_policy ON "organizations"
USING (id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

-- 2. Users Policy: Can only see users in your organization
CREATE POLICY user_isolation_policy ON "users"
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

-- 3. Generic Tenant Isolation Policy for all other tables
-- We apply this to all tables that have an org_id column
CREATE POLICY audit_logs_isolation_policy ON "audit_logs" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY incidents_isolation_policy ON "incidents" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY scheduled_audits_isolation_policy ON "scheduled_audits" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY models_isolation_policy ON "models" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY audit_requirements_isolation_policy ON "audit_requirements" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY notifications_isolation_policy ON "notifications" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY compliance_reports_isolation_policy ON "compliance_reports" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY decision_records_isolation_policy ON "decision_records" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY correction_requests_isolation_policy ON "correction_requests" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

CREATE POLICY api_keys_isolation_policy ON "api_keys" 
USING (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid)
WITH CHECK (org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid);

-- 4. Indirect Tenant Isolation (via joins)
CREATE POLICY audit_signatures_isolation_policy ON "audit_signatures"
USING (report_id IN (SELECT id FROM compliance_reports WHERE org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid));

CREATE POLICY system_ledger_isolation_policy ON "system_ledger"
USING (actor_id IN (SELECT id FROM users WHERE org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid));

CREATE POLICY password_reset_tokens_isolation_policy ON "password_reset_tokens"
USING (user_id IN (SELECT id FROM users WHERE org_id = NULLIF(current_setting('app.current_org_id', TRUE), '')::uuid));

-- 5. Super Admin Bypass (Crucial for system operations)
-- In a real production environment, we would use a specific 'system' role,
-- but for this MVP-to-Institutional transition, we allow the 'aic_admin' role to bypass RLS.
-- This is handled by default for the table owner/superuser.
