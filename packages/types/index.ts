/**
 * AIC Pulse - Shared Type Definitions
 * Source of truth for institutional data models across the monorepo.
 */

export * from './errors';

export type CertificationTier = 'TIER_1' | 'TIER_2' | 'TIER_3';
export type AuditStatus = 'PENDING' | 'VERIFIED' | 'FLAGGED';
export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER';
export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED' | 'CLOSED';
export type ScheduledAuditStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type CorrectionStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';

export interface Organization {
  id: string;
  name: string;
  tier: CertificationTier;
  integrity_score: number;
  is_alpha: boolean;
  contact_email?: string | null;
  api_key?: string | null;
  auditor_id?: string | null;
  created_at: Date | string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  org_id?: string | null;
  is_active: boolean;
  email_verified: boolean;
  is_super_admin: boolean;
  permissions: Record<string, any>;
  last_login?: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface AuditLog {
  id: string;
  org_id: string;
  system_name: string;
  event_type: string;
  details: Record<string, any>;
  status: AuditStatus;
  metadata: Record<string, any>;
  integrity_hash: string;
  previous_hash?: string | null;
  sequence_number: number;
  signature?: string | null;
  created_at: Date | string;
}

export interface Incident {
  id: string;
  org_id: string;
  citizen_email: string;
  system_name?: string | null;
  description: string;
  status: IncidentStatus;
  resolution_details?: string | null;
  human_reviewer_id?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ScheduledAudit {
  id: string;
  org_id: string;
  auditor_id?: string | null;
  scheduled_at: Date | string;
  status: ScheduledAuditStatus;
  notes?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface ModelRegistryEntry {
  id: string;
  org_id: string;
  name: string;
  version: string;
  type: string;
  description?: string | null;
  metadata: Record<string, any>;
  is_active: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface CorrectionRequest {
  id: string;
  org_id: string;
  decision_id?: string | null;
  citizen_email: string;
  reason: string;
  supporting_evidence_url?: string | null;
  status: CorrectionStatus;
  resolution_details?: string | null;
  human_reviewer_id?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}
