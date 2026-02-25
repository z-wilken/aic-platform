export type CertificationStatus = 'DRAFT' | 'PENDING_REVIEW' | 'REVISION_REQUIRED' | 'APPROVED' | 'CERTIFIED';

export const CERTIFICATION_LIFECYCLE: Record<CertificationStatus, CertificationStatus[]> = {
  'DRAFT': ['PENDING_REVIEW'],
  'PENDING_REVIEW': ['REVISION_REQUIRED', 'APPROVED'],
  'REVISION_REQUIRED': ['PENDING_REVIEW'],
  'APPROVED': ['CERTIFIED'],
  'CERTIFIED': [] // Terminal state
};

export function isValidTransition(current: CertificationStatus, next: CertificationStatus): boolean {
  const allowed = CERTIFICATION_LIFECYCLE[current];
  return allowed ? allowed.includes(next) : false;
}

export const STATUS_LABELS: Record<CertificationStatus, string> = {
  'DRAFT': 'Application In-Progress',
  'PENDING_REVIEW': 'Under Review by AIC',
  'REVISION_REQUIRED': 'Revisions Requested',
  'APPROVED': 'Awaiting Final Issuance',
  'CERTIFIED': 'Active Certification'
};
