-- Spiral 1: The Foundation
-- Schema for AIC Pulse (POPIA Section 71 Compliance)

CREATE TYPE tier_enum AS ENUM ('TIER_1', 'TIER_2', 'TIER_3');
CREATE TYPE audit_status AS ENUM ('PENDING', 'VERIFIED', 'FLAGGED');

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    tier tier_enum DEFAULT 'TIER_3',
    integrity_score INTEGER DEFAULT 0 CHECK (integrity_score BETWEEN 0 AND 100),
    is_alpha BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    action VARCHAR(255) NOT NULL, -- e.g. "CREDIT_DECISION"
    input_type VARCHAR(255) NOT NULL, -- e.g. "APPLICATION_V2"
    outcome VARCHAR(255) NOT NULL, -- e.g. "DENIED"
    status audit_status DEFAULT 'PENDING',
    metadata JSONB DEFAULT '{}',
    immutable_hash VARCHAR(64), -- SHA-256 for tampering detection
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data for Demo
INSERT INTO organizations (id, name, tier, integrity_score, is_alpha)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'FirstRand Bank (Demo)', 'TIER_1', 94, TRUE);

INSERT INTO audit_logs (org_id, action, input_type, outcome, status, created_at)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'CREDIT_DECISION', 'Loan Application', 'DENIED', 'FLAGGED', NOW()),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'CREDIT_DECISION', 'Loan Application', 'APPROVED', 'VERIFIED', NOW() - INTERVAL '15 minutes');
