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
    api_key VARCHAR(255), -- Hashed in production
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    action VARCHAR(255) NOT NULL,
    input_type VARCHAR(255) NOT NULL,
    outcome VARCHAR(255) NOT NULL,
    status audit_status DEFAULT 'PENDING',
    metadata JSONB DEFAULT '{}',
    immutable_hash VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CRM Tables
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    source VARCHAR(50) DEFAULT 'WEB', -- 'QUIZ', 'ALPHA_FORM'
    score INTEGER,
    status VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient VARCHAR(255),
    type VARCHAR(50), -- 'WELCOME', 'REPORT', 'ALERT'
    status VARCHAR(50) DEFAULT 'SENT',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data
INSERT INTO organizations (id, name, tier, integrity_score, is_alpha, api_key)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'FirstRand Bank (Demo)', 'TIER_1', 94, TRUE, 'aic_live_demo_key_123');
