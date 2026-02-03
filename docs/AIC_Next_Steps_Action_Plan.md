# AIC Next Steps Action Plan

**Created:** February 3, 2026  
**Current State:** 27 commits | apps/web in development | Alpha Program pending

---

## 🎯 Where You Are Now

| Component | Status | Priority |
|-----------|--------|----------|
| Repository structure | ✅ Complete | — |
| apps/web (marketing) | 🟡 Scaffolded | **HIGH** |
| apps/platform (dashboard) | ⚪ Scaffolded | LOW (Phase 4) |
| apps/admin (operations) | ⚪ Scaffolded | LOW (Phase 4) |
| apps/engine (bias audit) | ⚪ Scaffolded | LOW (Phase 4) |
| Documentation | ✅ Ready to merge | **HIGH** |
| Alpha Program | ⚪ Not started | **HIGH** |

---

## 📋 Immediate Actions (This Week)

### 1. Merge Documentation to Repository
```bash
# After downloading aic-docs.zip
cd aic-platform
unzip ~/Downloads/aic-docs.zip
mv aic-docs docs
git add docs/
git commit -m "Add consolidated documentation package"
git push origin main
```

### 2. Complete Marketing Website Core Pages

**Priority order for apps/web:**

| Page | Route | Purpose | Est. Time |
|------|-------|---------|-----------|
| Homepage | `/` | Value prop + CTAs | 4-6 hours |
| Tier Framework | `/tiers` | Explain 3-tier system | 3-4 hours |
| About | `/about` | Mission + credibility | 2-3 hours |
| Contact | `/contact` | Lead capture form | 2-3 hours |
| Alpha Program | `/alpha` | Application page | 3-4 hours |

**Total estimate:** 14-20 hours of focused development

### 3. Deploy to Vercel (Free Tier)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from apps/web
cd apps/web
vercel

# Follow prompts to connect to your GitHub repo
```

**Result:** Live URL at `aic-platform.vercel.app` (or custom domain)

---

## 📅 Week-by-Week Plan (Next 4 Weeks)

### Week 1: Website MVP
| Day | Task | Deliverable |
|-----|------|-------------|
| Mon | Homepage development | Hero, tier overview, problem statement |
| Tue | Tier Framework page | Full 3-tier explanation with examples |
| Wed | About + Contact pages | Mission statement, contact form |
| Thu | Alpha Program page | Application form, value proposition |
| Fri | Testing + deployment | Live on Vercel, mobile responsive |

### Week 2: Self-Assessment Quiz
| Day | Task | Deliverable |
|-----|------|-------------|
| Mon-Tue | Quiz engine (20 questions) | Question flow, progress bar |
| Wed | Email gate at Q15 | Form capture, partial results |
| Thu | Results page | Integrity Score, tier recommendation |
| Fri | PDF report generation | Downloadable assessment summary |

### Week 3: Alpha Outreach Begins
| Day | Task | Deliverable |
|-----|------|-------------|
| Mon | Build prospect list | 20 organizations (BFSI, Healthcare, Recruitment) |
| Tue | Draft outreach email | Personalized templates |
| Wed-Fri | Begin outreach | 10 conversations scheduled |

### Week 4: Refinement + Regulatory
| Day | Task | Deliverable |
|-----|------|-------------|
| Mon-Tue | Website polish based on feedback | UX improvements |
| Wed | Information Regulator outreach | Meeting request sent |
| Thu | SANAS research | Accreditation requirements documented |
| Fri | Week 1-4 retrospective | Adjust plan based on learnings |

---

## 🛠️ Technical Tasks for apps/web

### Components to Build

```
apps/web/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation, mobile menu
│   │   ├── Footer.tsx          # Links, contact info
│   │   └── Layout.tsx          # Wrapper component
│   ├── ui/
│   │   ├── Button.tsx          # Primary, secondary, tier variants
│   │   ├── Card.tsx            # Content cards
│   │   ├── TierBadge.tsx       # Tier 1/2/3 indicators
│   │   └── Input.tsx           # Form inputs
│   ├── sections/
│   │   ├── HeroSection.tsx     # Homepage hero
│   │   ├── TierOverview.tsx    # 3-tier summary
│   │   ├── ProblemStatement.tsx # Stats + evidence
│   │   └── AlphaPreview.tsx    # Alpha program CTA
│   ├── forms/
│   │   ├── ContactForm.tsx     # General inquiries
│   │   └── AlphaForm.tsx       # Alpha application
│   └── assessment/
│       ├── QuizEngine.tsx      # Question flow
│       ├── QuestionCard.tsx    # Single question
│       ├── EmailGate.tsx       # Email capture modal
│       └── ResultsPage.tsx     # Score + recommendations
├── pages/
│   ├── index.tsx               # Homepage
│   ├── tiers.tsx               # Tier Framework
│   ├── about.tsx               # About AIC
│   ├── contact.tsx             # Contact page
│   ├── alpha.tsx               # Alpha Program
│   └── assessment.tsx          # Self-Assessment Quiz
├── data/
│   ├── questions.ts            # 20 quiz questions
│   └── tiers.ts                # Tier definitions
├── utils/
│   ├── scoring.ts              # Integrity Score calculation
│   └── analytics.ts            # GA4 event tracking
└── styles/
    └── globals.css             # Design system (Tailwind)
```

### Design System (from PRD)

```css
/* Colors */
--primary-black: #1A1A1A;
--background: #FAF8F4;
--tier-1: #C41E3A;      /* Critical - Red */
--tier-2: #FF8C42;      /* Supervised - Orange */
--tier-3: #2C5F2D;      /* Automated - Green */
--accent-gold: #D4AF37;
--gray-text: #666666;

/* Typography */
--font-heading: 'Crimson Pro', serif;
--font-body: 'IBM Plex Mono', monospace;
```

---

## 📞 Alpha Program Outreach Script

### Email Template

```
Subject: AI Accountability Certification - Alpha Program Invitation

Hi [Name],

I noticed [Company] uses AI for [credit scoring/hiring/diagnosis]. 

With the Mobley v. Workday ruling and POPIA Section 71 requirements, 
organizations using AI in consequential decisions face increasing 
compliance pressure.

We're launching an Alpha Program for our AI Accountability Certification 
framework - the first POPIA-native standard for human oversight of AI systems.

Alpha participants receive:
• 50% discount on certification (ZAR 60-120K vs. full price)
• Free upgrade to SANAS-accredited certification when available
• Input into shaping the certification standard
• Case study inclusion (optional)

Would you be open to a 20-minute call to discuss whether this applies 
to your AI systems?

Best,
Zander Wilken
Founder, AI Integrity Certification
```

### Target List Template

| Company | Industry | AI Use Case | Contact | Title | Status |
|---------|----------|-------------|---------|-------|--------|
| Capitec | Banking | Credit scoring | | CRO | ⚪ Not contacted |
| Discovery | Insurance | Underwriting AI | | CCO | ⚪ Not contacted |
| Life Healthcare | Healthcare | Diagnostic AI | | Compliance | ⚪ Not contacted |
| Pnet | Recruitment | Resume screening | | Head of Product | ⚪ Not contacted |

---

## 📊 Success Metrics (30 Days)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Website live | ✅ Deployed | Vercel dashboard |
| Unique visitors | 200+ | Google Analytics |
| Assessment starts | 20+ | GA4 events |
| Assessment completions | 10+ | GA4 events |
| Email captures | 8+ | Form submissions |
| Alpha applications | 3+ | Form submissions |
| Outreach conversations | 10+ | Manual tracking |

---

## ⚠️ Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Website takes too long | Use existing Tailwind UI components; ship imperfect |
| Low outreach response rate | Personalize heavily; leverage any warm intros |
| Quiz abandonment | Test with 3 people before launch; simplify if needed |
| No Alpha sign-ups | Adjust pricing (deeper discount) or targeting |

---

## 🔄 Decision Points

### Decision 1: Domain Name
- [ ] Purchase `aic.co.za` or `aicert.co.za`
- [ ] Or use `aic-platform.vercel.app` for now

### Decision 2: Form Backend
- [ ] Netlify Forms (free, simple)
- [ ] Formspree (free tier)
- [ ] Build custom API endpoint

### Decision 3: Analytics
- [ ] Google Analytics 4 (standard)
- [ ] Plausible (privacy-focused)
- [ ] Both

---

## ✅ Today's Checklist

- [ ] Download and merge documentation package to GitHub
- [ ] Review apps/web current state
- [ ] Set up Vercel account (if not done)
- [ ] Create homepage outline (content, not code)
- [ ] Draft first 5 outreach emails
- [ ] Register domain (if decided)

---

## 📎 Quick Links

| Resource | Location |
|----------|----------|
| PRD | `docs/product/PRD.md` |
| Tier Framework HTML | `docs/design/tier-framework.html` |
| Business Plan | `docs/business/BUSINESS_PLAN.md` |
| Pilot Program | `docs/business/PILOT_PROGRAM.md` |
| Founder's Vision | `docs/vision/FOUNDERS_VISION.md` |

---

> **Remember:** The goal is not a perfect website. The goal is to start conversations with potential Alpha participants. Ship fast, iterate based on feedback.

*"Momentum matters more than polish."*
