export interface Question {
  id: string;
  category: 'USAGE' | 'OVERSIGHT' | 'TRANSPARENCY' | 'INFRASTRUCTURE';
  text: string;
  options: { label: string; score: number }[];
}

export const questions: Question[] = [
  // USAGE
  {
    id: 'usage_1',
    category: 'USAGE',
    text: 'What types of decisions does your organisation make using automated or AI-assisted systems?',
    options: [
      { label: 'No automated decision-making in use', score: 4 },
      { label: 'Low-stakes decisions only (recommendations, content ranking)', score: 3 },
      { label: 'Moderate-stakes decisions (fraud scoring, customer segmentation)', score: 2 },
      { label: 'High-stakes decisions (credit, employment, healthcare, parole)', score: 1 },
    ],
  },
  {
    id: 'usage_2',
    category: 'USAGE',
    text: 'How many automated decision systems does your organisation currently operate?',
    options: [
      { label: 'None', score: 4 },
      { label: '1–5 systems', score: 3 },
      { label: '6–20 systems', score: 2 },
      { label: 'More than 20 systems', score: 1 },
    ],
  },
  {
    id: 'usage_3',
    category: 'USAGE',
    text: 'Have you conducted a formal AI risk classification exercise to determine applicable tiers?',
    options: [
      { label: 'Yes, fully documented and reviewed annually', score: 4 },
      { label: 'Yes, but not yet formalised or documented', score: 3 },
      { label: 'In progress', score: 2 },
      { label: 'Not yet started', score: 1 },
    ],
  },

  // OVERSIGHT
  {
    id: 'oversight_1',
    category: 'OVERSIGHT',
    text: 'Does your organisation have a designated accountability owner for AI governance (e.g. Chief AI Officer, AI Ethics Board)?',
    options: [
      { label: 'Yes, a dedicated role with board-level mandate', score: 4 },
      { label: 'Yes, assigned as part of an existing role', score: 3 },
      { label: 'Under discussion', score: 2 },
      { label: 'No designated owner', score: 1 },
    ],
  },
  {
    id: 'oversight_2',
    category: 'OVERSIGHT',
    text: 'For high-stakes automated decisions, can a qualified human review and override the system\'s output?',
    options: [
      { label: 'Yes, 100% of decisions are individually reviewed before action', score: 4 },
      { label: 'Yes, with statistical sampling and mandatory override for flagged cases', score: 3 },
      { label: 'Override is technically possible but not systematically applied', score: 2 },
      { label: 'No human override mechanism exists', score: 1 },
    ],
  },
  {
    id: 'oversight_3',
    category: 'OVERSIGHT',
    text: 'Does your organisation conduct regular bias testing on AI systems affecting individuals?',
    options: [
      { label: 'Yes, automated bias testing on every model cycle with documented results', score: 4 },
      { label: 'Yes, periodic manual testing at least annually', score: 3 },
      { label: 'Ad-hoc testing when issues are raised', score: 2 },
      { label: 'No bias testing in place', score: 1 },
    ],
  },
  {
    id: 'oversight_4',
    category: 'OVERSIGHT',
    text: 'Is there a formal process to monitor AI systems for performance drift or emerging bias post-deployment?',
    options: [
      { label: 'Yes, continuous automated monitoring with alerting thresholds', score: 4 },
      { label: 'Yes, periodic review at least quarterly', score: 3 },
      { label: 'Monitoring exists but is informal or irregular', score: 2 },
      { label: 'No post-deployment monitoring', score: 1 },
    ],
  },

  // TRANSPARENCY
  {
    id: 'transparency_1',
    category: 'TRANSPARENCY',
    text: 'When your systems make automated decisions about individuals, are those individuals informed that AI was involved?',
    options: [
      { label: 'Yes, proactively disclosed before the decision and in all communications', score: 4 },
      { label: 'Yes, disclosed at time of decision in writing', score: 3 },
      { label: 'Disclosed only upon request', score: 2 },
      { label: 'Not disclosed', score: 1 },
    ],
  },
  {
    id: 'transparency_2',
    category: 'TRANSPARENCY',
    text: 'Can your systems provide a meaningful explanation of how a specific automated decision was reached?',
    options: [
      { label: 'Yes, individual-level explanations (SHAP/LIME) available for every decision', score: 4 },
      { label: 'Yes, general model-level explanation of key factors', score: 3 },
      { label: 'Partial explanation available for some systems', score: 2 },
      { label: 'No explanation capability', score: 1 },
    ],
  },
  {
    id: 'transparency_3',
    category: 'TRANSPARENCY',
    text: 'Does your organisation publish an AI systems register or public disclosure of your automated decision systems?',
    options: [
      { label: 'Yes, public register with full details of systems, purpose, and risk tier', score: 4 },
      { label: 'Yes, internal register shared with regulators on request', score: 3 },
      { label: 'Register exists but is incomplete', score: 2 },
      { label: 'No AI systems register', score: 1 },
    ],
  },

  // INFRASTRUCTURE
  {
    id: 'infra_1',
    category: 'INFRASTRUCTURE',
    text: 'Does your organisation maintain immutable audit logs of automated decisions with cryptographic integrity guarantees?',
    options: [
      { label: 'Yes, SHA-256 hash chain or equivalent with external anchoring', score: 4 },
      { label: 'Yes, audit logs exist with access controls and tamper detection', score: 3 },
      { label: 'Basic logging exists but without integrity controls', score: 2 },
      { label: 'No audit logging of automated decisions', score: 1 },
    ],
  },
  {
    id: 'infra_2',
    category: 'INFRASTRUCTURE',
    text: 'Is there a documented, accessible appeals process for individuals who wish to contest an automated decision?',
    options: [
      { label: 'Yes, published, free of charge, with independent review and SLA', score: 4 },
      { label: 'Yes, internal process that affected individuals can access upon request', score: 3 },
      { label: 'Process exists but is not well publicised or accessible', score: 2 },
      { label: 'No formal appeals process', score: 1 },
    ],
  },
  {
    id: 'infra_3',
    category: 'INFRASTRUCTURE',
    text: 'Does your organisation have documented AI governance policies aligned to POPIA Section 71 or equivalent frameworks?',
    options: [
      { label: 'Yes, comprehensive policies reviewed annually with board sign-off', score: 4 },
      { label: 'Yes, documented policies but not yet formally reviewed', score: 3 },
      { label: 'Draft policies in development', score: 2 },
      { label: 'No AI governance policy', score: 1 },
    ],
  },
];
