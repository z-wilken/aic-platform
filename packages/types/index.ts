/**
 * AIC Pulse - Shared Type Definitions
 * Source of truth for institutional data models across the monorepo.
 */

import { z } from 'zod';

export * from './errors';

export type CertificationTier = 'TIER_1' | 'TIER_2' | 'TIER_3';
export type AuditStatus = 'PENDING' | 'VERIFIED' | 'FLAGGED';
export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER';
export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED' | 'CLOSED';
export type ScheduledAuditStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type CorrectionStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';

export interface Permissions {
  can_publish: boolean;
  can_verify: boolean;
  can_manage_users: boolean;
  [key: string]: boolean;
}

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
  permissions: Permissions;
  last_login?: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

/**
 * Institutional Session User (Strictly Typed)
 */
export interface AICSessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  orgId: string;
  orgName: string;
  tier: CertificationTier;
  isSuperAdmin: boolean;
  permissions: Permissions;
}

// --- API Schemas (Directive A) ---

export const StatsResponseSchema = z.object({
  orgName: z.string(),
  orgId: z.string().uuid(),
  tier: z.string(), // Could be TIER_1 | TIER_2 | TIER_3
  score: z.number().min(0).max(100),
  openIncidents: z.number().min(0),
  totalRequirements: z.number().min(0),
  verifiedRequirements: z.number().min(0),
  velocityData: z.array(z.object({
    month: z.string(),
    score: z.number().min(0).max(100)
  })),
  radarData: z.array(z.object({
    subject: z.string(),
    A: z.number().min(0).max(100),
    fullMark: z.number()
  })),
  status: z.string()
});

export type StatsResponse = z.infer<typeof StatsResponseSchema>;

// --- Other Data Models ---

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
