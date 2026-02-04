# GitHub Issues for AIC Platform

Copy these into GitHub Issues to track your progress.

---

## 🏷️ Labels to Create First

```
Priority: Critical    (red)
Priority: High        (orange)
Priority: Medium      (yellow)
Priority: Low         (gray)

Type: Feature         (blue)
Type: Bug             (red)
Type: Documentation   (green)
Type: Infrastructure  (purple)

Area: apps/web        (teal)
Area: apps/platform   (cyan)
Area: Business        (pink)
```

---

## Issue 1: Homepage Development

**Title:** `[apps/web] Build Homepage`

**Labels:** `Priority: Critical`, `Type: Feature`, `Area: apps/web`

**Description:**
```markdown
## Overview
Build the marketing homepage that establishes AIC's value proposition and drives visitors to take action.

## Requirements (from PRD)
- [ ] Hero section with POPIA Section 71 reference
- [ ] Trust-building statistic (Mobley lawsuit, 85.1% bias rate, or EEOC settlement)
- [ ] Two CTAs: "Join Alpha Program" and "Take Self-Assessment"
- [ ] Tier overview section with color-coded indicators
- [ ] Problem statement section with evidence-based statistics
- [ ] Alpha Program preview section
- [ ] Mobile responsive

## Design Reference
See `docs/design/tier-framework.html` for color system and typography.

## Acceptance Criteria
- [ ] Lighthouse performance score > 90
- [ ] All CTAs functional
- [ ] Mobile menu works
- [ ] Meta tags + OG image configured
```

---

## Issue 2: Tier Framework Page

**Title:** `[apps/web] Build Tier Framework Page`

**Labels:** `Priority: Critical`, `Type: Feature`, `Area: apps/web`

**Description:**
```markdown
## Overview
Deep-dive explanation of the 3-tier accountability framework.

## Requirements
- [ ] Tier 1 (Human-Approved) - full description + 4 examples
- [ ] Tier 2 (Human-Supervised) - full description + 4 examples  
- [ ] Tier 3 (Automated-Permissible) - full description + 4 examples
- [ ] Certification requirements for each tier
- [ ] Multi-tier organization case studies (3 minimum)
- [ ] CTA to Self-Assessment

## Content Source
- `docs/design/tier-framework.html` (can adapt directly)
- PRD Section 7: The Tier Framework

## Acceptance Criteria
- [ ] All three tiers clearly differentiated with color coding
- [ ] Real-world examples resonate with target industries
- [ ] CTA to assessment is prominent
```

---

## Issue 3: Contact Page + Form

**Title:** `[apps/web] Build Contact Page with Lead Capture Form`

**Labels:** `Priority: High`, `Type: Feature`, `Area: apps/web`

**Description:**
```markdown
## Overview
Contact page for general inquiries and lead capture.

## Requirements
- [ ] General inquiry form (name, email, company, message)
- [ ] Form validation (client-side)
- [ ] Honeypot field for spam prevention
- [ ] Success state after submission
- [ ] Form POSTs to configurable endpoint

## Form Backend Options
1. Netlify Forms (if deploying to Netlify)
2. Formspree (free tier)
3. Custom API endpoint (Phase 2)

## Acceptance Criteria
- [ ] Form submits successfully
- [ ] Email notification received
- [ ] Spam protection works
```

---

## Issue 4: Alpha Program Page

**Title:** `[apps/web] Build Alpha Program Application Page`

**Labels:** `Priority: Critical`, `Type: Feature`, `Area: apps/web`

**Description:**
```markdown
## Overview
Landing page for Alpha Program with application form.

## Requirements
- [ ] Program objectives and benefits
- [ ] Pricing (50% discount: ZAR 60K-120K)
- [ ] Duration (6 months)
- [ ] What participants receive
- [ ] Eligibility criteria
- [ ] Application form with fields:
  - Full name
  - Email
  - Job title
  - Organization name
  - Organization size (dropdown)
  - Industry sector (dropdown)
  - Current AI use cases (textarea)
  - Which tiers apply (checkboxes)
  - How they heard about AIC (dropdown)

## Acceptance Criteria
- [ ] Form collects all required information
- [ ] Confirmation message shown on submit
- [ ] Data stored/emailed for follow-up
```

---

## Issue 5: Self-Assessment Quiz

**Title:** `[apps/web] Build Self-Assessment Quiz Engine`

**Labels:** `Priority: High`, `Type: Feature`, `Area: apps/web`

**Description:**
```markdown
## Overview
20-question interactive quiz that generates Integrity Score and tier recommendation.

## Requirements
- [ ] 20 questions in 4 categories (5 each):
  - AI Usage Context
  - Human Oversight  
  - Transparency & Explainability
  - Accountability Infrastructure
- [ ] Progress indicator
- [ ] Email gate at question 15
- [ ] Results page with:
  - Integrity Score (0-100)
  - Tier recommendation
  - Category breakdown
  - 3 action recommendations
- [ ] PDF report download

## Technical Details
- Scoring algorithm in `utils/scoring.ts`
- Questions defined in `data/questions.ts`
- State management with React useState
- LocalStorage for progress persistence

## Acceptance Criteria
- [ ] Quiz completable in < 5 minutes
- [ ] Email gate captures leads
- [ ] Results are actionable and accurate
- [ ] PDF generates correctly
```

---

## Issue 6: Vercel Deployment

**Title:** `[Infrastructure] Deploy apps/web to Vercel`

**Labels:** `Priority: Critical`, `Type: Infrastructure`, `Area: apps/web`

**Description:**
```markdown
## Overview
Deploy marketing site to production.

## Steps
1. [ ] Create Vercel account
2. [ ] Connect GitHub repository
3. [ ] Configure apps/web as root directory
4. [ ] Set environment variables
5. [ ] Deploy to production
6. [ ] Configure custom domain (optional)

## Environment Variables Needed
- `NEXT_PUBLIC_GA_ID` (Google Analytics)
- `NEXT_PUBLIC_FORM_ENDPOINT` (form backend URL)

## Acceptance Criteria
- [ ] Site accessible at public URL
- [ ] HTTPS enabled
- [ ] Build completes without errors
```

---

## Issue 7: Google Analytics Setup

**Title:** `[Infrastructure] Configure Google Analytics 4`

**Labels:** `Priority: Medium`, `Type: Infrastructure`, `Area: apps/web`

**Description:**
```markdown
## Overview
Set up analytics to track website performance and conversion funnel.

## Events to Track
- `assessment_started`
- `assessment_question_answered`
- `assessment_email_captured`
- `assessment_completed`
- `alpha_application_submitted`
- `contact_form_submitted`
- `cta_clicked`

## Steps
1. [ ] Create GA4 property
2. [ ] Add measurement ID to environment variables
3. [ ] Implement tracking in `utils/analytics.ts`
4. [ ] Add events to relevant components
5. [ ] Set up conversion goals

## Acceptance Criteria
- [ ] Pageviews tracking
- [ ] All events firing correctly
- [ ] Conversion funnel visible in GA4
```

---

## Issue 8: Merge Documentation

**Title:** `[Documentation] Add consolidated docs package to repository`

**Labels:** `Priority: High`, `Type: Documentation`

**Description:**
```markdown
## Overview
Merge the consolidated documentation package into the repository.

## Contents
- `docs/README.md` - Documentation overview
- `docs/vision/FOUNDERS_VISION.md` - North star document
- `docs/strategy/STRATEGIC_ROADMAP.md` - Unified execution plan
- `docs/business/BUSINESS_PLAN.md` - Investor memorandum
- `docs/business/PILOT_PROGRAM.md` - Alpha Program framework
- `docs/business/RISK_ANALYSIS.md` - Competitive analysis
- `docs/product/PRD.md` - Product requirements
- `docs/design/tier-framework.html` - Visual design reference

## Steps
1. [ ] Download aic-docs.zip
2. [ ] Extract and replace docs/ folder
3. [ ] Commit and push

## Acceptance Criteria
- [ ] All documents accessible in repository
- [ ] README links work correctly
```

---

## Issue 9: Alpha Prospect List

**Title:** `[Business] Build Alpha Program prospect list`

**Labels:** `Priority: Critical`, `Type: Business`, `Area: Business`

**Description:**
```markdown
## Overview
Identify 20 target organizations for Alpha Program outreach.

## Target Industries
- **Banking/FinTech (7):** Organizations using AI for credit scoring, fraud detection
- **Healthcare (5):** Organizations using AI for diagnosis, triage
- **Recruitment (5):** Organizations using AI for resume screening
- **Insurance (3):** Organizations using AI for underwriting

## Information to Gather
- Company name
- Industry
- Specific AI use case
- Decision maker name + title
- LinkedIn profile
- Email address
- Company size

## Target Companies (examples)
- Capitec, Discovery, Standard Bank, Investec
- Life Healthcare, Mediclinic, Netcare
- Pnet, CareerJunction, Hire Resolve
- Santam, Old Mutual, Hollard

## Acceptance Criteria
- [ ] 20 companies identified
- [ ] Contact information for decision maker at each
- [ ] AI use case documented for personalization
```

---

## Issue 10: Information Regulator Outreach

**Title:** `[Business] Schedule Information Regulator meeting`

**Labels:** `Priority: High`, `Type: Business`, `Area: Business`

**Description:**
```markdown
## Overview
Establish relationship with Information Regulator to discuss POPIA Section 71 alignment.

## Objectives
1. Introduce AIC framework
2. Discuss alignment with Section 71 requirements
3. Request letter of support (non-binding)
4. Understand regulatory priorities

## Preparation
- [ ] Draft introduction letter
- [ ] Prepare one-page framework summary
- [ ] Research current IR priorities and recent statements
- [ ] Identify appropriate contact person

## Acceptance Criteria
- [ ] Meeting request sent
- [ ] Meeting scheduled (or response received)
```

---

## Milestone: Website MVP

**Title:** `Website MVP - Ready for Alpha Outreach`

**Due Date:** 2 weeks from start

**Issues:**
- #1 Homepage Development
- #2 Tier Framework Page  
- #3 Contact Page + Form
- #4 Alpha Program Page
- #6 Vercel Deployment
- #8 Merge Documentation

---

## Milestone: Alpha Program Launch

**Title:** `Alpha Program Launch - First Participants Signed`

**Due Date:** 6 weeks from start

**Issues:**
- #5 Self-Assessment Quiz
- #7 Google Analytics Setup
- #9 Alpha Prospect List
- #10 Information Regulator Outreach
