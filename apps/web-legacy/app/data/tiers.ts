export const tiers = [
  {
    id: 1,
    name: 'Tier 1: Human-Approved',
    color: 'text-aic-red',
    borderColor: 'border-aic-red/20',
    bgColor: 'bg-aic-red/5',
    tagline: 'Critical decisions. Irreversible consequences. 100% human review.',
    description: 'AI operates in an advisory capacity only. Every decision that produces a legal effect, significantly affects a person’s rights, or cannot be easily reversed must be reviewed and explicitly approved by a qualified human before it takes effect.',
    examples: [
        'Cancer treatment planning', 
        'Parole & bail decisions', 
        'Major commercial loan approvals (>ZAR 50M)', 
        'Child welfare interventions',
        'Applicant tracking for high-stakes roles'
    ],
    requirements: [
        '100% documented human sign-off', 
        'Professional liability insurance for reviewers', 
        'AI restricted to advisory role', 
        'Full audit trails of intervention',
        'Bi-annual ethics board review'
    ],
  },
  {
    id: 2,
    name: 'Tier 2: Human-Supervised',
    color: 'text-aic-orange',
    borderColor: 'border-aic-orange/20',
    bgColor: 'bg-aic-orange/5',
    tagline: 'Consequential but reversible. AI executes under oversight.',
    description: 'AI can execute decisions, but humans must retain the ability to intervene, override, and explain every outcome. This tier applies where efficiency is valuable but consequences warrant ongoing human oversight.',
    examples: [
        'Consumer loan approvals', 
        'General resume screening', 
        'Insurance underwriting', 
        'Fraud detection & investigation',
        'Healthcare patient triage'
    ],
    requirements: [
        'Explainable AI (XAI) implementation', 
        'Documented override mechanisms', 
        'Quarterly statistical bias testing',
        'Continuous drift detection monitoring',
        '72-hour human review turnaround'
    ],
  },
  {
    id: 3,
    name: 'Tier 3: Automated',
    color: 'text-aic-green',
    borderColor: 'border-aic-green/20',
    bgColor: 'bg-aic-green/5',
    tagline: 'Low-stakes decisions. Easily reversible. Periodic oversight.',
    description: 'AI operates autonomously for routine, low-consequence decisions where the outcome can be easily reversed or corrected. Human oversight occurs at the system level rather than the individual decision level.',
    examples: [
        'Product recommendations', 
        'Email & spam filtering', 
        'Routine customer service bots', 
        'Inventory & supply chain optimization',
        'Appointment scheduling'
    ],
    requirements: [
        'Clear AI disclosure to users', 
        'Semi-annual bias audits', 
        'User opt-out mechanisms',
        'POPIA data minimization compliance',
        'Right to explanation process'
    ],
  },
];

export const caseStudies = [
    {
        organization: 'National Bank Group',
        tier1: 'Commercial Loans > R50M',
        tier2: 'Retail Credit & Mortgages',
        tier3: 'Marketing Personalization'
    },
    {
        organization: 'Private Hospital Network',
        tier1: 'Clinical Treatment Plans',
        tier2: 'Radiology Triage',
        tier3: 'Facility Management'
    },
    {
        organization: 'Regional E-Commerce',
        tier1: 'N/A',
        tier2: 'Seller Verification',
        tier3: 'Dynamic Pricing & Search'
    }
];
