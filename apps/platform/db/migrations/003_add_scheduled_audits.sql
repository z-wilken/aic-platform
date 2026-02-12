-- Migration: Add scheduled_audits table
DO $$ BEGIN
    CREATE TYPE audit_scheduled_status AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS scheduled_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    auditor_id UUID REFERENCES users(id),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status audit_scheduled_status DEFAULT 'SCHEDULED',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_scheduled_audits_org ON scheduled_audits(org_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_audits_auditor ON scheduled_audits(auditor_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_audits_status ON scheduled_audits(status);
