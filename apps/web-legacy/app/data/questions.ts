// PRD Reference: FR-ASSESS-01 & FR-ASSESS-03

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

export const questions: Question[] = [
  // --- Category 1: AI Usage Context (20% Weight) ---
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
    text: 'Do any of your AI systems make decisions that produce legal effects (e.g. loan denial, hiring)?',
    options: [
      { label: 'No, purely advisory/internal', score: 4, tierSignal: [3] },
      { label: 'Yes, but humans review final output', score: 2, tierSignal: [2] },
      { label: 'Yes, fully automated decisioning', score: 0, tierSignal: [1] },
    ],
  },
  {
    id: 'q3',
    category: 'USAGE',
    text: 'Do your systems process special personal information (health, biometrics, children)?',
    options: [
      { label: 'No special data processed', score: 4, tierSignal: [3] },
      { label: 'Yes, incidental processing', score: 2, tierSignal: [2] },
      { label: 'Yes, core functionality relies on it', score: 0, tierSignal: [1] },
    ],
  },
  {
    id: 'q4',
    category: 'USAGE',
    text: 'What is the primary deployment environment?',
    options: [
      { label: 'Internal tools only (employee facing)', score: 4, tierSignal: [3] },
      { label: 'Customer facing (low stakes, e.g. chatbot)', score: 3, tierSignal: [3] },
      { label: 'Customer facing (high stakes, e.g. credit)', score: 1, tierSignal: [1] },
    ],
  },
  {
    id: 'q5',
    category: 'USAGE',
    text: 'How long have these systems been in production?',
    options: [
      { label: '< 6 months (Pilot)', score: 1 },
      { label: '6-12 months', score: 2 },
      { label: '1-3 years', score: 3 },
      { label: '> 3 years', score: 4 },
    ],
  },

  // --- Category 2: Human Oversight (35% Weight) ---
  {
    id: 'q6',
    category: 'OVERSIGHT',
    text: 'Is there a documented process for humans to intervene in AI decisions?',
    options: [
      { label: 'No formal process', score: 0 },
      { label: 'Ad-hoc intervention possible', score: 2 },
      { label: 'Formal review process for flagged cases', score: 3 },
      { label: 'Mandatory human sign-off on all critical outputs', score: 4 },
    ],
  },
  {
    id: 'q7',
    category: 'OVERSIGHT',
    text: 'Who is responsible for the AI system’s outcomes?',
    options: [
      { label: 'Unclear / IT Department', score: 0 },
      { label: 'Product Owner', score: 2 },
      { label: 'Designated Compliance Officer', score: 4 },
    ],
  },
  {
    id: 'q8',
    category: 'OVERSIGHT',
    text: 'Do you track the rate at which humans override AI recommendations?',
    options: [
      { label: 'No', score: 0 },
      { label: 'Yes, anecdotal monitoring', score: 2 },
      { label: 'Yes, formal metrics tracked monthly', score: 4 },
    ],
  },
  {
    id: 'q9',
    category: 'OVERSIGHT',
    text: 'Are decision-makers trained on the limitations of the AI model?',
    options: [
      { label: 'No specific training', score: 0 },
      { label: 'Basic onboarding', score: 2 },
      { label: 'Regular, documented training on bias/limits', score: 4 },
    ],
  },
  {
    id: 'q10',
    category: 'OVERSIGHT',
    text: 'Can a user appeal a decision made by the AI?',
    options: [
      { label: 'No appeal mechanism', score: 0 },
      { label: 'Manual support ticket', score: 2 },
      { label: 'Dedicated appeal workflow with human review', score: 4 },
    ],
  },

  // --- Category 3: Transparency (25% Weight) ---
  {
    id: 'q11',
    category: 'TRANSPARENCY',
    text: 'Do users know they are interacting with an AI?',
    options: [
      { label: 'Not explicitly disclosed', score: 0 },
      { label: 'Disclosed in Terms of Service', score: 2 },
      { label: 'Prominent disclosure at point of interaction', score: 4 },
    ],
  },
  {
    id: 'q12',
    category: 'TRANSPARENCY',
    text: 'Can you explain WHY the model reached a specific decision?',
    options: [
      { label: 'No, it is a "black box" (e.g. Deep Learning)', score: 0 },
      { label: 'Partially (feature importance)', score: 2 },
      { label: 'Yes, full decision logic is interpretable', score: 4 },
    ],
  },
  {
    id: 'q13',
    category: 'TRANSPARENCY',
    text: 'Is there a public-facing policy regarding AI ethics or accountability?',
    options: [
      { label: 'No policy exists', score: 0 },
      { label: 'Internal policy only', score: 2 },
      { label: 'Publicly accessible and regularly updated', score: 4 },
    ],
  },
  {
    id: 'q14',
    category: 'TRANSPARENCY',
    text: 'How are "false positives" or "false negatives" explained to affected users?',
    options: [
      { label: 'No explanation provided', score: 0 },
      { label: 'Generic error message', score: 1 },
      { label: 'Specific explanation of the error possibility and recourse', score: 4 },
    ],
  },
  {
    id: 'q15',
    category: 'TRANSPARENCY',
    text: 'Do you publish annual or periodic transparency reports on AI performance and bias?',
    options: [
      { label: 'No reports', score: 0 },
      { label: 'Internal reports only', score: 2 },
      { label: 'Public transparency reports', score: 4 },
    ],
  },

  // --- Category 4: Infrastructure & Data (20% Weight) ---
  {
    id: 'q16',
    category: 'INFRASTRUCTURE',
    text: 'Where is your AI training and production data stored?',
    options: [
      { label: 'International cloud (no local presence)', score: 1 },
      { label: 'International cloud with local region (e.g. AWS Cape Town)', score: 3 },
      { label: 'On-premise / South African sovereign cloud', score: 4 },
    ],
  },
  {
    id: 'q17',
    category: 'INFRASTRUCTURE',
    text: 'Do you maintain a formal "Model Registry" to track versions and deployments?',
    options: [
      { label: 'No formal tracking', score: 0 },
      { label: 'Basic version control (Git)', score: 2 },
      { label: 'Dedicated Model Management platform', score: 4 },
    ],
  },
  {
    id: 'q18',
    category: 'INFRASTRUCTURE',
    text: 'Are there automated alerts for model drift or performance degradation?',
    options: [
      { label: 'No monitoring', score: 0 },
      { label: 'Manual periodic checks', score: 2 },
      { label: 'Real-time automated alerting', score: 4 },
    ],
  },
  {
    id: 'q19',
    category: 'INFRASTRUCTURE',
    text: 'Is the AI system integrated with a centralized audit logging service?',
    options: [
      { label: 'Logs are scattered or non-existent', score: 0 },
      { label: 'Standard application logs', score: 2 },
      { label: 'Immutable, centralized audit logs for all AI decisions', score: 4 },
    ],
  },
  {
    id: 'q20',
    category: 'INFRASTRUCTURE',
    text: 'Does your Disaster Recovery plan include manual fallback for AI-driven processes?',
    options: [
      { label: 'No manual fallback exists', score: 0 },
      { label: 'Manual fallback exists but is untested', score: 2 },
      { label: 'Regularly tested manual fallback procedures', score: 4 },
    ],
  },
];
