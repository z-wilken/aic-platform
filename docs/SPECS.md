# AIC Platform - Product Specification Document
## AI Integrity Certification: Human Accountability for the AI Age

**Version:** 2.0
**Last Updated:** February 1, 2026
**Status:** Active Development

---

## 1. Executive Summary

### Vision
AIC (AI Integrity Certification) is the world's first comprehensive accountability framework designed to prevent the abuse of AI by power-hungry individuals and organizations. Starting with POPIA Section 71 compliance in South Africa, AIC expands to address global AI governance requirements including the EU AI Act, US employment discrimination laws (EEOC/Title VII), and international standards (IEEE, ISO, NIST, OECD).

### Mission
To create a world where every AI decision that affects human lives is transparent, auditable, and accountable - ensuring that AI serves humanity, not the other way around.

### The Problem We Solve
1. **The Accountability Gap**: 73% of South African consumers are concerned about AI's impact on their personal data, while 68% of enterprises lack formal AI ethics policies.
2. **Power Asymmetry**: AI systems increasingly make decisions about loans, jobs, insurance, and healthcare without human oversight or recourse.
3. **Regulatory Fragmentation**: Organizations face a patchwork of regulations (POPIA, EU AI Act, CCPA, GDPR) with no unified compliance approach.
4. **Algorithmic Harm**: Biased AI systems perpetuate discrimination against protected groups, often invisibly.

---

## 2. Market Analysis

### Target Markets

#### Primary: South Africa
- **Regulatory Driver**: POPIA Section 71 - Automated Decision-Making
- **Penalty**: Up to ZAR 10 million / 10 years imprisonment
- **Market Size**: ~5,000 organizations using AI for decisions affecting individuals
- **Key Sectors**: Banking, Insurance, Healthcare, HR/Recruitment, Retail Credit

#### Secondary: European Union
- **Regulatory Driver**: EU AI Act (effective 2025-2026)
- **Requirements**: Risk classification, conformity assessment, human oversight
- **Market Size**: 450M+ citizens protected, millions of AI systems
- **Key Focus**: High-risk AI systems (employment, credit, education, law enforcement)

#### Tertiary: United States
- **Regulatory Driver**: EEOC Guidelines, Title VII, NYC Local Law 144
- **Requirements**: Bias audits for automated employment decision tools (AEDT)
- **Market Size**: Fortune 500 + mid-market enterprises
- **Key Focus**: HR/recruitment AI, lending algorithms

### Competitive Landscape

| Competitor | Focus | Gap AIC Fills |
|------------|-------|---------------|
| OneTrust | Privacy compliance | Limited AI-specific audit |
| IBM AI Fairness 360 | Technical toolkit | No certification/accountability |
| Fiddler AI | ML monitoring | No regulatory compliance focus |
| Holistic AI | EU-focused audits | No SA/POPIA specialization |

### AIC Differentiators
1. **First POPIA Section 71 certification** in South Africa
2. **Human accountability model** - not just technical compliance
3. **Risk-tiered approach** aligned with business reality
4. **Immutable audit trails** with SHA-256 integrity verification
5. **Multi-framework support** from single platform

---

## 3. User Personas

### Persona 1: The Compliance Officer
**Name:** Dr. Sarah Khumalo
**Title:** Chief Compliance Officer, FirstRand Bank
**Pain Points:**
- Board demands AI governance reports
- Regulators asking about algorithmic decision-making
- Can't explain how AI models make decisions
- Fear of reputational damage from biased AI

**Needs:**
- Dashboard showing compliance status at a glance
- Audit trails for regulatory submissions
- Bias detection alerts before incidents occur
- Certification to prove due diligence

### Persona 2: The Data Scientist
**Name:** Thabo Mokoena
**Title:** Senior ML Engineer, Discovery Health
**Pain Points:**
- Pressure to deploy models quickly
- Limited tools for bias testing
- No clear fairness metrics standards
- Compliance requirements unclear

**Needs:**
- API for integrating bias checks into CI/CD
- Clear pass/fail metrics (Four-Fifths Rule)
- Automated testing before deployment
- Documentation for model cards

### Persona 3: The Executive
**Name:** Pieter van der Merwe
**Title:** CEO, Fintech Startup
**Pain Points:**
- Enterprise clients require AI governance proof
- Investors asking about responsible AI
- Competitive disadvantage without certification
- Don't know where to start

**Needs:**
- Quick assessment of AI risk level
- Clear certification path
- Marketing badge for trust
- Affordable entry point

### Persona 4: The Regulator
**Name:** Advocate Tshepo Boikanyo
**Title:** Executive Member, Information Regulator (SA)
**Pain Points:**
- Limited visibility into AI deployment
- No standardized audit methodology
- Resource constraints for enforcement
- Need industry self-regulation

**Needs:**
- Standard framework for assessment
- Third-party certification they can trust
- Incident reporting data
- Industry compliance metrics

---

## 4. Product Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AIC PLATFORM ECOSYSTEM                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │   WEB APP    │  │   PLATFORM   │  │    ADMIN     │               │
│  │  (Marketing) │  │  (Dashboard) │  │  (Internal)  │               │
│  │   Port 3000  │  │   Port 3001  │  │   Port 3002  │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                        │
│         └────────────────┼─────────────────┘                        │
│                          │                                           │
│                    ┌─────▼─────┐                                    │
│                    │  API GW   │                                    │
│                    │  (Next.js)│                                    │
│                    └─────┬─────┘                                    │
│                          │                                           │
│         ┌────────────────┼────────────────┐                         │
│         │                │                │                          │
│   ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐                    │
│   │  ENGINE   │   │ POSTGRES  │   │   REDIS   │                    │
│   │ (FastAPI) │   │    DB     │   │  (Cache)  │                    │
│   │ Port 8000 │   │ Port 5432 │   │ Port 6379 │                    │
│   └───────────┘   └───────────┘   └───────────┘                    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Application Breakdown

#### 1. Web App (Public Marketing)
- **Purpose**: Lead generation, education, self-assessment
- **Users**: Prospects, general public
- **Key Features**:
  - Landing page with value proposition
  - Interactive risk assessment quiz
  - Framework explainer (3-tier system)
  - Alpha program signup
  - Resource library (guides, whitepapers)
  - Pricing page
  - Contact/demo request

#### 2. Platform App (Client Dashboard)
- **Purpose**: Compliance management for certified organizations
- **Users**: Compliance officers, data scientists, executives
- **Key Features**:
  - Real-time integrity score dashboard
  - Audit log viewer with filtering
  - Incident management
  - Bias alert notifications
  - Certificate management
  - API key management
  - Settings & organization profile
  - Report generation

#### 3. Admin App (Internal Operations)
- **Purpose**: AIC staff certification management
- **Users**: AIC auditors, administrators
- **Key Features**:
  - Application review queue
  - Audit scheduling
  - Certification approval workflow
  - Organization management
  - Revenue/subscription tracking
  - System health monitoring
  - Regulatory reporting

#### 4. Engine (Audit Microservice)
- **Purpose**: Algorithmic bias detection and analysis
- **Users**: API consumers (Platform, Admin, external integrations)
- **Key Features**:
  - Disparate impact analysis (Four-Fifths Rule)
  - Equalized odds testing
  - Predictive parity analysis
  - Calibration assessment
  - Statistical significance testing
  - Multi-attribute intersectional analysis
  - Model card generation
  - Batch processing for large datasets

---

## 5. Feature Specifications

### 5.1 Risk Assessment & Tiering

#### Tier Classification System

| Tier | Risk Level | Examples | Requirements |
|------|------------|----------|--------------|
| **TIER 1** | Critical | Credit decisions, employment screening, insurance underwriting, healthcare diagnosis | Full audit, human-in-loop mandatory, quarterly re-certification, incident reporting within 24h |
| **TIER 2** | Elevated | Customer segmentation, pricing optimization, fraud detection, content moderation | Annual audit, human review for edge cases, incident reporting within 72h |
| **TIER 3** | Standard | Recommendations, chatbots, internal process automation | Self-assessment, annual attestation, best practices guidance |

#### Assessment Algorithm
```
Score = Q1_weight * Q1_answer + Q2_weight * Q2_answer + Q3_weight * Q3_answer

Where:
- Q1: Does your AI make decisions that directly affect individuals' access to services, employment, credit, or legal rights?
  - Yes (3 points) / Sometimes (2 points) / No (1 point)

- Q2: Does your AI process special personal information (health, biometric, children, political, religious)?
  - Yes (3 points) / Limited (2 points) / No (1 point)

- Q3: What level of human oversight exists for AI decisions?
  - Fully automated (3 points) / Human review for some (2 points) / Human final decision (1 point)

Total Score:
- 7-9: TIER 1 (Critical)
- 4-6: TIER 2 (Elevated)
- 3: TIER 3 (Standard)
```

### 5.2 Bias Detection Engine

#### Supported Algorithms

**1. Disparate Impact Analysis (Four-Fifths Rule)**
```python
impact_ratio = minority_selection_rate / majority_selection_rate
status = "PASS" if impact_ratio >= 0.80 else "FAIL"
```

**2. Equalized Odds**
```
Measures whether true positive rates and false positive rates are equal across groups.
TPR_parity = |TPR_group_a - TPR_group_b| < threshold
FPR_parity = |FPR_group_a - FPR_group_b| < threshold
```

**3. Predictive Parity**
```
Measures whether precision (positive predictive value) is equal across groups.
PPV_parity = |PPV_group_a - PPV_group_b| < threshold
```

**4. Calibration**
```
Measures whether predicted probabilities match actual outcomes across groups.
calibration_error = Σ|predicted_prob - actual_rate| per group
```

**5. Counterfactual Fairness**
```
Would the decision change if the protected attribute were different?
counterfactual_test = predict(X) == predict(X_counterfactual)
```

#### Protected Attributes Supported
- Gender/Sex
- Race/Ethnicity
- Age
- Disability status
- Nationality
- Religion
- Sexual orientation
- Socioeconomic indicators (proxy detection)
- Intersectional combinations

### 5.3 Compliance Frameworks

#### POPIA Section 71 (South Africa)
- **Requirement**: Automated decisions must have human oversight
- **Data Subject Rights**: Right to make representations, right to explanation
- **AIC Implementation**:
  - Mandatory human-in-loop for Tier 1
  - Decision explanation generation
  - Appeal workflow tracking

#### EU AI Act
- **Risk Categories**: Unacceptable, High, Limited, Minimal
- **High-Risk Requirements**:
  - Risk management system
  - Data governance
  - Technical documentation
  - Human oversight measures
  - Accuracy, robustness, cybersecurity
- **AIC Implementation**:
  - Risk classification mapping
  - Conformity assessment support
  - Technical documentation generator
  - Incident reporting to authorities

#### EEOC/Title VII (United States)
- **Requirement**: Employment decisions cannot have disparate impact
- **Four-Fifths Rule**: Selection rate must be ≥80% of highest group
- **NYC Local Law 144**: Annual bias audits for AEDT
- **AIC Implementation**:
  - Adverse impact analysis
  - Annual audit scheduling
  - Public posting support

#### International Standards
- **IEEE 7000-2021**: Ethical system design
- **ISO/IEC 42001**: AI management system
- **NIST AI RMF**: Risk management framework
- **OECD AI Principles**: Responsible stewardship
- **AIC Implementation**: Framework mapping, gap analysis, certification preparation

### 5.4 Audit Trail System

#### Immutability Design
```sql
audit_logs (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  action VARCHAR(255) NOT NULL,
  input_hash VARCHAR(64) NOT NULL,  -- SHA-256 of input data
  output_hash VARCHAR(64) NOT NULL, -- SHA-256 of decision
  decision VARCHAR(255) NOT NULL,
  confidence DECIMAL(5,4),
  human_reviewer UUID,
  review_status ENUM('PENDING', 'VERIFIED', 'FLAGGED', 'OVERRIDDEN'),
  metadata JSONB DEFAULT '{}',
  previous_hash VARCHAR(64),        -- Chain link to previous log
  immutable_hash VARCHAR(64) NOT NULL -- SHA-256 of entire record
)
```

#### Hash Chain Verification
```
record_hash = SHA256(
  id + org_id + timestamp + action + input_hash +
  output_hash + decision + previous_hash
)
```

### 5.5 Certificate System

#### Certificate Levels
1. **AIC Certified** - Completed assessment, implemented controls
2. **AIC Verified** - Passed independent audit
3. **AIC Accredited** - Continuous monitoring, exemplary practices

#### Certificate Contents
- Organization name
- Tier classification
- Certification date
- Expiry date (1 year)
- Unique certificate ID
- QR code for verification
- Scope of certified AI systems
- Lead auditor signature

---

## 6. Technical Specifications

### 6.1 API Endpoints

#### Engine API (FastAPI)

```
POST /analyze
  - Disparate impact analysis
  - Request: { data: [], protected_attribute: string, outcome_variable: string }
  - Response: { status: string, methodology: string, flags: [], detailed_analysis: {} }

POST /analyze/equalized-odds
  - Equalized odds testing
  - Request: { data: [], protected_attribute: string, outcome: string, prediction: string }
  - Response: { tpr_parity: bool, fpr_parity: bool, details: {} }

POST /analyze/batch
  - Batch analysis for large datasets
  - Request: { file_url: string, config: {} }
  - Response: { job_id: string, status: string }

GET /analyze/batch/{job_id}
  - Check batch job status
  - Response: { status: string, progress: number, results?: {} }

POST /explain
  - Generate human-readable explanation for a decision
  - Request: { model_type: string, input_features: {}, decision: string }
  - Response: { explanation: string, feature_importance: [] }

GET /frameworks
  - List supported compliance frameworks
  - Response: { frameworks: [{ id, name, jurisdiction, requirements }] }

POST /assess
  - Run compliance assessment against framework
  - Request: { framework_id: string, organization_data: {} }
  - Response: { compliant: bool, gaps: [], recommendations: [] }
```

#### Platform API (Next.js)

```
Authentication:
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password

Organizations:
GET /api/organizations/:id
PUT /api/organizations/:id
GET /api/organizations/:id/stats
GET /api/organizations/:id/certificate

Audit Logs:
GET /api/audit-logs
POST /api/audit-logs
GET /api/audit-logs/:id
GET /api/audit-logs/export

Incidents:
GET /api/incidents
POST /api/incidents
PUT /api/incidents/:id
GET /api/incidents/:id/timeline

Settings:
GET /api/settings
PUT /api/settings
POST /api/settings/api-keys
DELETE /api/settings/api-keys/:id
```

### 6.2 Database Schema

```sql
-- Core Tables
organizations
users
audit_logs
incidents
certificates
api_keys

-- Relationship Tables
user_organizations (many-to-many)
certificate_scopes
incident_audit_logs

-- Lookup Tables
frameworks
framework_requirements
tier_definitions

-- Audit Tables
login_history
api_access_logs
data_exports
```

### 6.3 Security Requirements

1. **Authentication**: JWT with refresh tokens, MFA for Tier 1 orgs
2. **Authorization**: Role-based access control (RBAC)
3. **Encryption**: TLS 1.3 in transit, AES-256 at rest
4. **Data Residency**: South African hosting for POPIA compliance
5. **Audit Logging**: All access logged with tamper detection
6. **Penetration Testing**: Annual third-party assessment
7. **SOC 2 Type II**: Target certification for enterprise trust

---

## 7. Development Phases

### Phase 1: Foundation (Current Sprint)
**Goal**: Complete core infrastructure and documentation

- [x] Marketing website (functional prototype)
- [x] Dashboard UI (high-fidelity mockup)
- [x] Basic bias detection engine
- [x] Database schema design
- [ ] **SPECS.md documentation** ← Current
- [ ] Expand engine with multiple algorithms
- [ ] Connect database to API layer
- [ ] Environment configuration

### Phase 2: Core Features
**Goal**: Production-ready authentication and workflows

- [ ] JWT authentication system
- [ ] User management
- [ ] Admin certification workflow
- [ ] Incident reporting system
- [ ] Email notification service
- [ ] API key management

### Phase 3: Advanced Features
**Goal**: Complete platform functionality

- [ ] Real-time WebSocket dashboard
- [ ] Comprehensive audit log viewer
- [ ] Multi-framework compliance support
- [ ] Certificate generation (PDF)
- [ ] Batch processing
- [ ] Report generation

### Phase 4: Polish & Launch
**Goal**: Production deployment ready

- [ ] Performance optimization
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Security penetration testing
- [ ] Documentation completion
- [ ] Beta user onboarding
- [ ] Production infrastructure

---

## 8. Success Metrics

### Business Metrics
- **Alpha Signups**: 50 organizations in first 3 months
- **Paid Conversions**: 20% of alpha to paid
- **MRR Target**: R500k by end of year 1
- **Enterprise Logos**: 5 recognizable brands certified

### Product Metrics
- **Assessment Completion Rate**: >70%
- **Dashboard Daily Active Users**: >50% of customers
- **Incident Detection Rate**: <24h from decision to flag
- **False Positive Rate**: <5% for bias alerts

### Compliance Metrics
- **Audit Pass Rate**: >90% for Tier 1 organizations
- **Regulatory Inquiries Resolved**: 100% with AIC documentation
- **Certificate Renewals**: >80% annual renewal rate

---

## 9. Pricing Strategy

### Tier-Based Pricing

| Plan | Monthly (ZAR) | Annual (ZAR) | Includes |
|------|---------------|--------------|----------|
| **Starter** (Tier 3) | R5,000 | R50,000 | Self-assessment, basic dashboard, email support |
| **Professional** (Tier 2) | R15,000 | R150,000 | Annual audit, full dashboard, API access, priority support |
| **Enterprise** (Tier 1) | R50,000 | R500,000 | Quarterly audits, dedicated CSM, custom integrations, SLA |

### Add-Ons
- Additional AI system audit: R10,000/system
- Custom framework mapping: R25,000
- On-site training: R15,000/day
- Expedited certification: +50%

---

## 10. Appendices

### A. Glossary
- **POPIA**: Protection of Personal Information Act (South Africa)
- **Four-Fifths Rule**: Selection rate ≥80% to avoid disparate impact
- **Disparate Impact**: Unintentional discrimination through neutral policies
- **AEDT**: Automated Employment Decision Tool
- **TPR**: True Positive Rate
- **FPR**: False Positive Rate

### B. References
- [POPIA Section 71](https://popia.co.za/)
- [EU AI Act](https://artificialintelligenceact.eu/)
- [EEOC Technical Assistance](https://www.eeoc.gov/laws/guidance)
- [IEEE CertifAIEd](https://standards.ieee.org/products-programs/icap/ieee-certifaied/)
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)
- [ISO/IEC 42001](https://www.iso.org/standard/81230.html)

### C. Document History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-15 | Z. Wilken | Initial draft |
| 2.0 | 2026-02-01 | Claude AI | Comprehensive expansion |

---

*This document is confidential and proprietary to AIC South Africa.*
