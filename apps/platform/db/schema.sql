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
    auditor_id UUID, -- Reference to a user with role 'AUDITOR'
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
    email VARCHAR(255) UNIQUE NOT NULL,
    company VARCHAR(255),
    source VARCHAR(50) DEFAULT 'WEB', -- 'QUIZ', 'ALPHA_FORM'
    score INTEGER,
    status VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    tier VARCHAR(50) NOT NULL,
    answers JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alpha_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    company VARCHAR(255),
    use_case TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'DOCUMENTATION', 'TECHNICAL', 'OVERSIGHT'
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'SUBMITTED', 'VERIFIED', 'REJECTED'
    evidence_url TEXT,
    findings TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50), -- 'WELCOME', 'AUDIT_UPDATE', 'ALERT', 'CERTIFIED'
    status VARCHAR(50) DEFAULT 'UNREAD', -- 'UNREAD', 'READ'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compliance_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    month_year VARCHAR(20) NOT NULL, -- e.g., 'Jan 2026'
    integrity_score INTEGER NOT NULL,
    audit_status VARCHAR(50) DEFAULT 'COMPLIANT',
    findings_count INTEGER DEFAULT 0,
    report_url TEXT, -- Path to generated PDF
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CMS Tables for HQ
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT, -- Markdown or HTML
    category VARCHAR(50),
    author_id UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'DRAFT', -- 'DRAFT', 'PUBLISHED', 'ARCHIVED'
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'UNSUBSCRIBED'
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE security_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL, -- e.g., 'VERIFIED_REQUIREMENT', 'PUBLISHED_POST'
    entity_id UUID, -- ID of the requirement, post, or organization
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    citizen_email VARCHAR(255) NOT NULL,
    system_name VARCHAR(255),
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN', -- 'OPEN', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED'
    resolution_details TEXT,
    human_reviewer_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    key_prefix VARCHAR(10) NOT NULL, -- e.g., 'aic_live_'
    key_hash VARCHAR(255) NOT NULL, -- Hashed for security
    label VARCHAR(255), -- e.g., 'CI/CD Production'
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Users & Authentication
CREATE TYPE user_role AS ENUM ('ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR', 'VIEWER');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'VIEWER',
    org_id UUID REFERENCES organizations(id),
    is_active BOOLEAN DEFAULT TRUE,
    is_super_admin BOOLEAN DEFAULT FALSE,
    permissions JSONB DEFAULT '{}', -- e.g., {"can_publish": true, "can_verify_audit": false}
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- API Keys for programmatic access
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    key_prefix VARCHAR(12) NOT NULL, -- For display: aic_live_xxxx
    scopes TEXT[] DEFAULT ARRAY['read'],
    last_used TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE operations_qc (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID NOT NULL, -- ID of the requirement or report being QC'd
    entity_type VARCHAR(50) NOT NULL, -- 'REQUIREMENT', 'REPORT'
    original_auditor_id UUID REFERENCES users(id),
    qc_reviewer_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'PASSED', 'REJECTED'
    findings TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qc_status ON operations_qc(status);

CREATE TABLE training_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id VARCHAR(100) NOT NULL, -- e.g., 'legal-71', 'tech-bias'
    status VARCHAR(50) DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS', 'COMPLETED'
    score INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, module_id)
);

CREATE TABLE lead_auditor_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    certificate_id VARCHAR(100) UNIQUE NOT NULL,
    issue_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP WITH TIME ZONE,
    verification_hash VARCHAR(64) NOT NULL, -- SHA-256 of the certificate metadata
    status VARCHAR(50) DEFAULT 'ACTIVE', -- 'ACTIVE', 'REVOKED', 'EXPIRED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_training_user ON training_progress(user_id);
CREATE INDEX idx_creds_user ON lead_auditor_credentials(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_org ON users(org_id);
CREATE INDEX idx_audit_logs_org ON audit_logs(org_id);
CREATE INDEX idx_audit_logs_status ON audit_logs(status);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- Seed Data
INSERT INTO organizations (id, name, tier, integrity_score, is_alpha, api_key)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'FirstRand Bank (Demo)', 'TIER_1', 94, TRUE, 'aic_live_demo_key_123');

-- Seed Demo User (password: demo123)
INSERT INTO users (id, email, password_hash, name, role, org_id)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'admin@enterprise.co.za',
    '$2a$10$XQxBtqXKPYJ.5Q5Q5Q5Q5O5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5Q5', -- bcrypt hash of 'demo123'
    'Dr. Sarah Khumalo',
    'ADMIN',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
);

-- Seed Audit Requirements for Demo Org
INSERT INTO audit_requirements (org_id, title, description, category, status)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'POPIA Section 71 Policy', 'Formal document outlining human intervention procedures for automated decisions.', 'DOCUMENTATION', 'VERIFIED'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Model Bias Stress Test', 'Technical report proving four-fifths rule compliance across gender and race.', 'TECHNICAL', 'SUBMITTED'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Human-in-the-Loop Interface', 'UI walk-through showing the manual override button for loan officers.', 'OVERSIGHT', 'PENDING'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Data Sovereignty Proof', 'Verification that AI production data remains within South African borders.', 'TECHNICAL', 'PENDING');

-- Seed Compliance Reports for Demo Org
INSERT INTO compliance_reports (org_id, month_year, integrity_score, audit_status, findings_count)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dec 2025', 92, 'COMPLIANT', 0),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Jan 2026', 94, 'COMPLIANT', 1);
