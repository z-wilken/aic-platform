# AIC Product Specification

**Version:** 3.0
**Last Updated:** February 2026
**Status:** Active Development

---

## 1. Executive Summary

### Vision
AIC (AI Integrity Certification) is the world's first comprehensive accountability framework designed to ensure no final decision about a human being is made solely by a machine. We certify that human empathy, emotion, and accountability remain in the loop — everywhere, for every consequential automated system, not just AI. Starting with POPIA Section 71 alignment in South Africa, AIC is built from day one for global applicability.

### Core Principle
> "We certify that human empathy and accountability remain in the loop."

AIC certifies **human accountability** in automated decision systems — not the technology itself. The framework applies to AI, legacy algorithms, rules-based systems, and any other automated process that makes consequential decisions about human beings.

### The Problem
1. **Accountability Gap**: When automated systems fail — discriminating, excluding, or dehumanizing — there is no one accountable. 82% of Fortune 500 companies using AI-powered systems lack governance certification.
2. **Power Asymmetry**: Automated systems make decisions about loans, jobs, insurance, healthcare without genuine human oversight
3. **Dignity Gap**: No existing standard certifies whether automated interactions preserve human dignity — whether the *experience* of being processed by an algorithm treats you as a human being
4. **Proven Harm**: Mobley v. Workday (2025) established AI vendors can be liable; EEOC v. iTutorGroup ($365k settlement)
5. **Regulatory Mandate**: POPIA Section 71 (SA), EU AI Act, and emerging regulations globally require meaningful human oversight of automated decisions

---

## 2. The 5 Algorithmic Rights (Primary Framework)

The 5 Algorithmic Rights are AIC's foundational product — the Declaration from which all certifications, methodologies, and regulatory mappings derive. They are universal, jurisdiction-agnostic, and apply to all consequential automated decision systems.

| Right | Principle | Technical Implementation |
|-------|-----------|--------------------------|
| **1. Right to Human Agency** | No final decision affecting dignity, freedom, or livelihood shall be made solely by a machine | Bias detection, HITL rate measurement, override capability verification |
| **2. Right to Explanation** | Every person has the right to know *why* an automated decision was made | SHAP/LIME feature importance, decision explainability validation |
| **3. Right to Empathy** | Automated interactions must preserve human dignity; cold bureaucratic rejection is a design failure | TextBlob sentiment analysis of automated communications, dignity scoring |
| **4. Right to Correction** | Every system must provide a clear, human-staffed mechanism to correct errors and appeal unjust decisions | Appeal mechanism validation, correction request workflow verification |
| **5. Right to Truth** | Every person has the right to know if they are interacting with AI; deception is a violation | AI disclosure compliance checking |

**The Right to Empathy is AIC's singular contribution to the global governance discourse.** No other certification body — ISO 42001, the EU AI Act, Big 4 consulting, Credo AI, Fiddler AI — certifies whether automated interactions preserve human dignity. AIC does.

---

## 3. Three-Tier Certification Framework

| Tier | Name | Human Role | Examples | Requirements |
|------|------|------------|----------|--------------|
| **1** | Human-Approved | AI advises, human decides | Cancer diagnosis, parole decisions, major loans | 100% human review, quarterly re-cert, 24h incident reporting |
| **2** | Human-Supervised | AI executes, human oversees | Consumer loans, hiring, fraud detection | Explainable AI, human override, 72h incident reporting |
| **3** | Automated-Permissible | AI operates, periodic monitoring | Recommendations, spam filters, chatbots | Clear disclosure, annual attestation |

### Tier Assessment Algorithm
```
Score = Q1 + Q2 + Q3

Q1: Does AI make decisions affecting access to services, employment, credit, or legal rights?
    Yes (3) / Sometimes (2) / No (1)

Q2: Does AI process special personal information (health, biometric, children)?
    Yes (3) / Limited (2) / No (1)

Q3: What level of human oversight exists?
    Fully automated (3) / Human review for some (2) / Human final decision (1)

Total: 7-9 = TIER 1 | 4-6 = TIER 2 | 3 = TIER 3
```

---

## 3. Product Architecture

### System Overview
```
aic-platform/
├── apps/
│   ├── web/           # Marketing site (port 3000)
│   ├── platform/      # AIC Pulse SaaS dashboard (port 3001)
│   ├── admin/         # Internal operations panel (port 3002)
│   ├── hq/            # Institutional governance (port 3004)
│   └── engine/        # Python audit engine (port 8000)
├── packages/
│   └── ui/            # Shared React components
└── docker-compose.yml # PostgreSQL + PgAdmin
```

### Application Breakdown

#### apps/web — Public Marketing
- **Purpose**: Lead generation, education, self-assessment
- **Features**: Landing page, Self-assessment quiz (20 questions, email gate at Q15), Alpha program signup, Resource library, Certification registry

#### apps/platform — Client Dashboard (AIC Pulse)
- **Purpose**: Compliance management for certified organizations
- **Features**: Real-time Integrity Score, Audit log viewer, Incident management, Certificate management, API key management, Compliance reports

#### apps/admin — Internal Operations
- **Purpose**: AIC staff certification management
- **Features**: Application review, Audit scheduling, Certification approval workflow, Lead management, Revenue tracking

#### apps/hq — Institutional Governance
- **Purpose**: Content management and strategic governance
- **Features**: CMS for posts/newsletters, CRM, Governance tools

#### apps/engine — Audit Engine (Python/FastAPI)
- **Purpose**: Algorithmic bias detection and analysis
- **Features**: Disparate impact (Four-Fifths Rule), Equalized odds, Intersectional analysis, Statistical significance testing, XAI explanation generation, Sentiment analysis for rejection messages

---

## 4. The 5 Algorithmic Rights

AIC's audit engine enforces these rights:

| Right | Description | Technical Implementation |
|-------|-------------|-------------------------|
| **Human Agency** | No unchecked algorithmic discrimination | Four-Fifths Rule, equalized odds testing |
| **Explanation** | Understandable reasons for decisions | XAI feature importance, decision narratives |
| **Empathy** | Respectful communication of adverse decisions | Sentiment analysis of rejection messages |
| **Correction** | Mechanism to challenge decisions | Appeal workflow validation |
| **Truth** | Clear disclosure of AI involvement | Disclosure compliance checking |

---

## 5. User Personas

### Primary: Compliance Officer
**Dr. Sarah Khumalo, CCO at FirstRand Bank**
- Needs: Dashboard showing compliance status, audit trails for regulators, bias detection alerts, certification proof
- Pain: Board demands AI governance reports; can't explain how models decide

### Secondary: Data Scientist
**Thabo Mokoena, ML Engineer at Discovery Health**
- Needs: API for bias checks in CI/CD, clear pass/fail metrics, automated testing
- Pain: Pressure to deploy fast; limited fairness tools

### Tertiary: Executive
**Pieter van der Merwe, CEO of Fintech Startup**
- Needs: Quick risk assessment, clear certification path, marketing badge
- Pain: Enterprise clients require AI governance proof

### Regulatory: Information Regulator
**Advocate Tshepo Boikanyo**
- Needs: Standard framework, third-party certification trust, industry metrics
- Pain: Limited visibility into AI deployment; resource constraints

---

## 6. Technical Specifications

### Database Schema (PostgreSQL)

| Table | Purpose |
|-------|---------|
| `organizations` | Certified companies with tier, integrity_score |
| `users` | Platform users with roles (ADMIN, COMPLIANCE_OFFICER, AUDITOR, VIEWER) |
| `audit_logs` | Immutable audit trail with SHA-256 hash chain |
| `assessments` | Self-assessment quiz results |
| `leads` | Lead tracking from marketing site |
| `alpha_applications` | Alpha program applications |
| `audit_requirements` | Certification checklist items |
| `compliance_reports` | Monthly compliance archives |
| `certificates` | Issued certifications |
| `api_keys` | Organization API access |

### Audit Log Immutability
```sql
audit_logs (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  action VARCHAR(255) NOT NULL,
  input_hash VARCHAR(64) NOT NULL,   -- SHA-256 of input
  output_hash VARCHAR(64) NOT NULL,  -- SHA-256 of decision
  decision VARCHAR(255) NOT NULL,
  human_reviewer UUID,
  review_status ENUM('PENDING', 'VERIFIED', 'FLAGGED', 'OVERRIDDEN'),
  previous_hash VARCHAR(64),         -- Chain link
  immutable_hash VARCHAR(64) NOT NULL
)
```

### Engine API (FastAPI)

```
POST /api/v1/analysis
  - Disparate impact analysis (Four-Fifths Rule)
  - Request: { data: [], protected_attribute: string, outcome_variable: string }
  - Response: { status, methodology, flags, detailed_analysis }

POST /api/v1/explain
  - Generate human-readable decision explanation
  - Request: { model_type, input_features, decision }
  - Response: { explanation, feature_importance }

POST /api/v1/assess
  - Run compliance assessment
  - Request: { framework_id, organization_data }
  - Response: { compliant, gaps, recommendations }
```

---

## 7. Compliance Frameworks

### POPIA Section 71 (South Africa)
- Automated decisions must have human oversight
- Data subject rights: explanation, representation
- AIC: Mandatory human-in-loop for Tier 1, decision explanation, appeal tracking

### EU AI Act
- Risk categories: Unacceptable, High, Limited, Minimal
- AIC: Risk classification mapping, conformity assessment, incident reporting

### EEOC/Title VII (United States)
- Employment decisions cannot have disparate impact
- Four-Fifths Rule: Selection rate must be ≥80% of highest group
- AIC: Adverse impact analysis, annual audit scheduling

---

## 8. Pricing Strategy

### Certification Pricing (Initial + Annual Renewal)

| Size | Initial (ZAR) | Annual Renewal | Audit Days |
|------|---------------|----------------|------------|
| Small (<50 employees) | 120,000 | 60,000 | 2-3 |
| Medium (50-500) | 240,000 | 120,000 | 4-6 |
| Large (>500) | 360,000+ | 180,000+ | 7-10 |

### AIC Pulse SaaS (Monthly Monitoring)

| Plan | Monthly (ZAR) | Annual (ZAR) | Features |
|------|---------------|--------------|----------|
| Starter (Tier 3) | 5,000 | 50,000 | Self-assessment, basic dashboard |
| Professional (Tier 2) | 15,000 | 150,000 | Full dashboard, API access |
| Enterprise (Tier 1) | 50,000 | 500,000 | Quarterly audits, dedicated CSM |

---

## 9. Success Metrics

### Business
- Alpha Signups: 5-7 organizations in first 2 months
- Paid Conversions: 20% of alpha to full price
- Year 2 Revenue: ZAR 19M (90 certifications)

### Product
- Assessment Completion Rate: >70%
- Dashboard Daily Active Users: >50% of customers
- Incident Detection: <24h from decision to flag

### Compliance
- Audit Pass Rate: >90% for Tier 1
- Certificate Renewals: >80% annual

---

## 10. Development Phases

### Phase 0: Foundation (Current)
- [x] Marketing website MVP
- [x] Self-assessment quiz
- [x] Alpha program page
- [x] Basic audit engine

### Phase 1: Demand Validation (Months 1-2)
- [ ] Recruit 5-7 Alpha participants
- [ ] Information Regulator meeting
- [ ] SANAS consultation

### Phase 2: Alpha Execution (Months 3-4)
- [ ] Execute 5-10 certifications
- [ ] Refine methodology
- [ ] Insurance partnership conversations

### Phase 3: Investment Ready (Months 5-6)
- [ ] Case studies
- [ ] SANAS application
- [ ] Raise ZAR 10M

### Phase 4: Scale (Post-Investment)
- [ ] Full team (5+ people)
- [ ] Complete platform build
- [ ] SANAS accreditation
- [ ] 90+ certifications

---

*AI Integrity Certification | Product Specification v3.0 | CONFIDENTIAL*
