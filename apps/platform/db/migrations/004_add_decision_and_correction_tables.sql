-- Migration: Add decision_records and correction_requests
CREATE TABLE IF NOT EXISTS decision_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    system_name VARCHAR(255) NOT NULL,
    input_params JSONB NOT NULL,
    outcome JSONB NOT NULL,
    explanation TEXT,
    integrity_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DO $$ BEGIN
    CREATE TYPE correction_status AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS correction_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    decision_id UUID REFERENCES decision_records(id),
    citizen_email VARCHAR(255) NOT NULL,
    reason TEXT NOT NULL,
    supporting_evidence_url TEXT,
    status correction_status DEFAULT 'SUBMITTED',
    resolution_details TEXT,
    human_reviewer_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_decision_records_org ON decision_records(org_id);
CREATE INDEX IF NOT EXISTS idx_correction_requests_org ON correction_requests(org_id);
CREATE INDEX IF NOT EXISTS idx_correction_requests_decision ON correction_requests(decision_id);
