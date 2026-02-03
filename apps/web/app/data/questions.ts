// PRD Reference: FR-ASSESS-01 & FR-ASSESS-03
// 20 Questions across 4 categories with weighted scoring

export type Option = {
  label: string;
  score: number; // 0-4
  tierSignal?: number[]; // [1, 2, 3] indicating likely tier
};

export type Question = {
  id: string;
  category: 'USAGE' | 'OVERSIGHT' | 'TRANSPARENCY' | 'INFRASTRUCTURE';
  text: string;
  options: Option[];
};

// Category Weights:
// USAGE: 20% (5 questions)
// OVERSIGHT: 35% (7 questions)
// TRANSPARENCY: 25% (5 questions)
// INFRASTRUCTURE: 20% (3 questions)

export const questions: Question[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 1: AI USAGE CONTEXT (20% Weight) - Questions 1-5
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'q1',
    category: 'USAGE',
    text: 'How many AI-powered decision systems does your organisation currently operate?',
    options: [
      { label: 'None — we are evaluating AI adoption', score: 0, tierSignal: [3] },
      { label: '1–2 systems in production', score: 2, tierSignal: [3] },
      { label: '3–5 systems across departments', score: 3, tierSignal: [2, 3] },
      { label: '6+ systems, some in critical functions', score: 4, tierSignal: [1, 2] },
    ],
  },
  {
    id: 'q2',
    category: 'USAGE',
    text: 'Do any of your AI systems make decisions that produce legal effects (e.g. loan denial, hiring, medical diagnosis)?',
    options: [
      { label: 'No, purely advisory or internal use', score: 4, tierSignal: [3] },
      { label: 'Yes, but humans review all final outputs', score: 2, tierSignal: [2] },
      { label: 'Yes, some decisions are fully automated', score: 0, tierSignal: [1] },
    ],
  },
  {
    id: 'q3',
    category: 'USAGE',
    text: 'Do your systems process special personal information (health records, biometrics, children\'s data, criminal history)?',
    options: [
      { label: 'No special personal data is processed', score: 4, tierSignal: [3] },
      { label: 'Yes, but only incidentally', score: 2, tierSignal: [2] },
      { label: 'Yes, core functionality relies on special data', score: 0, tierSignal: [1] },
    ],
  },
  {
    id: 'q4',
    category: 'USAGE',
    text: 'What is the primary deployment environment of your AI systems?',
    options: [
      { label: 'Internal tools only (employee-facing)', score: 4, tierSignal: [3] },
      { label: 'Customer-facing, low stakes (e.g. chatbot, recommendations)', score: 3, tierSignal: [3] },
      { label: 'Customer-facing, high stakes (e.g. credit decisions, claims)', score: 1, tierSignal: [1, 2] },
      { label: 'Public sector / government services', score: 0, tierSignal: [1] },
    ],
  },
  {
    id: 'q5',
    category: 'USAGE',
    text: 'What volume of decisions does your AI system process monthly?',
    options: [
      { label: 'Less than 100 decisions', score: 4, tierSignal: [3] },
      { label: '100 – 1,000 decisions', score: 3, tierSignal: [2, 3] },
      { label: '1,000 – 10,000 decisions', score: 2, tierSignal: [2] },
      { label: 'More than 10,000 decisions', score: 1, tierSignal: [1, 2] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 2: HUMAN OVERSIGHT (35% Weight) - Questions 6-12
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'q6',
    category: 'OVERSIGHT',
    text: 'Is there a documented process for humans to intervene in AI decisions?',
    options: [
      { label: 'No formal intervention process exists', score: 0, tierSignal: [1] },
      { label: 'Ad-hoc intervention is possible but not documented', score: 1, tierSignal: [1, 2] },
      { label: 'Formal review process for flagged cases only', score: 3, tierSignal: [2] },
      { label: 'Mandatory human sign-off on all critical outputs', score: 4, tierSignal: [2, 3] },
    ],
  },
  {
    id: 'q7',
    category: 'OVERSIGHT',
    text: 'Who is accountable for the AI system\'s outcomes in your organisation?',
    options: [
      { label: 'Unclear or not assigned', score: 0, tierSignal: [1] },
      { label: 'IT Department or vendor', score: 1, tierSignal: [1, 2] },
      { label: 'Product Owner or Business Unit Head', score: 2, tierSignal: [2] },
      { label: 'Designated Compliance Officer or Executive', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q8',
    category: 'OVERSIGHT',
    text: 'Do you track the rate at which humans override AI recommendations?',
    options: [
      { label: 'No, we don\'t track overrides', score: 0, tierSignal: [1] },
      { label: 'Anecdotal monitoring only', score: 2, tierSignal: [2] },
      { label: 'Yes, formal metrics tracked and reviewed monthly', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q9',
    category: 'OVERSIGHT',
    text: 'Are decision-makers trained on the limitations and potential biases of the AI model?',
    options: [
      { label: 'No specific training provided', score: 0, tierSignal: [1] },
      { label: 'Basic onboarding includes AI overview', score: 2, tierSignal: [2] },
      { label: 'Regular, documented training on bias and limitations', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q10',
    category: 'OVERSIGHT',
    text: 'Can an affected person appeal a decision made or influenced by the AI?',
    options: [
      { label: 'No appeal mechanism exists', score: 0, tierSignal: [1] },
      { label: 'General support ticket (not AI-specific)', score: 1, tierSignal: [1, 2] },
      { label: 'Dedicated appeal workflow with guaranteed human review', score: 4, tierSignal: [2, 3] },
    ],
  },
  {
    id: 'q11',
    category: 'OVERSIGHT',
    text: 'How quickly can a human intervene to stop the AI from making further decisions?',
    options: [
      { label: 'Would require engineering/IT involvement', score: 0, tierSignal: [1] },
      { label: 'Within hours (requires escalation)', score: 2, tierSignal: [2] },
      { label: 'Immediately (kill switch accessible to operators)', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q12',
    category: 'OVERSIGHT',
    text: 'Do you have a policy for how long AI decisions can operate without human review?',
    options: [
      { label: 'No policy exists', score: 0, tierSignal: [1] },
      { label: 'Informal guidelines only', score: 2, tierSignal: [2] },
      { label: 'Formal policy with defined review intervals', score: 4, tierSignal: [3] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 3: TRANSPARENCY (25% Weight) - Questions 13-17
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'q13',
    category: 'TRANSPARENCY',
    text: 'Do users know they are interacting with an AI system?',
    options: [
      { label: 'Not explicitly disclosed', score: 0, tierSignal: [1] },
      { label: 'Mentioned in Terms of Service', score: 2, tierSignal: [2] },
      { label: 'Prominent disclosure at point of interaction', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q14',
    category: 'TRANSPARENCY',
    text: 'Can you explain WHY the model reached a specific decision to an affected person?',
    options: [
      { label: 'No, it is a "black box" model', score: 0, tierSignal: [1] },
      { label: 'Partially (feature importance scores available)', score: 2, tierSignal: [2] },
      { label: 'Yes, full decision logic is interpretable and documented', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q15',
    category: 'TRANSPARENCY',
    text: 'Is there documentation of how the AI model was trained and validated?',
    options: [
      { label: 'No documentation available', score: 0, tierSignal: [1] },
      { label: 'Vendor documentation only', score: 2, tierSignal: [2] },
      { label: 'Full internal documentation including data sources and validation', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q16',
    category: 'TRANSPARENCY',
    text: 'Have you tested the AI for bias across protected characteristics (race, gender, age)?',
    options: [
      { label: 'No bias testing performed', score: 0, tierSignal: [1] },
      { label: 'Initial testing during development only', score: 2, tierSignal: [2] },
      { label: 'Regular bias audits with documented results', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q17',
    category: 'TRANSPARENCY',
    text: 'Do you maintain records of individual AI decisions for audit purposes?',
    options: [
      { label: 'No decision logs maintained', score: 0, tierSignal: [1] },
      { label: 'Aggregate statistics only', score: 2, tierSignal: [2] },
      { label: 'Full decision audit trail with inputs and outputs', score: 4, tierSignal: [3] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CATEGORY 4: INFRASTRUCTURE & COMPLIANCE (20% Weight) - Questions 18-20
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'q18',
    category: 'INFRASTRUCTURE',
    text: 'Does your organisation have an AI governance policy or framework?',
    options: [
      { label: 'No AI-specific governance', score: 0, tierSignal: [1] },
      { label: 'General data governance applies', score: 2, tierSignal: [2] },
      { label: 'Dedicated AI governance framework with defined roles', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q19',
    category: 'INFRASTRUCTURE',
    text: 'How do you handle data privacy in your AI systems (POPIA compliance)?',
    options: [
      { label: 'Not specifically addressed for AI', score: 0, tierSignal: [1] },
      { label: 'Basic POPIA compliance measures in place', score: 2, tierSignal: [2] },
      { label: 'Comprehensive privacy impact assessment for AI systems', score: 4, tierSignal: [3] },
    ],
  },
  {
    id: 'q20',
    category: 'INFRASTRUCTURE',
    text: 'Do you have insurance coverage or legal protections for AI-related liability?',
    options: [
      { label: 'No specific coverage', score: 0, tierSignal: [1] },
      { label: 'General liability may apply', score: 2, tierSignal: [2] },
      { label: 'Specific AI/technology errors & omissions coverage', score: 4, tierSignal: [3] },
    ],
  },
];

// Category weights for final score calculation
export const categoryWeights = {
  USAGE: 0.20,
  OVERSIGHT: 0.35,
  TRANSPARENCY: 0.25,
  INFRASTRUCTURE: 0.20,
};

export type Category = keyof typeof categoryWeights;
