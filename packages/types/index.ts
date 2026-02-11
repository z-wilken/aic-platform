/**
 * AIC Platform — Shared TypeScript Types
 *
 * Generated from apps/platform/db/schema.sql.
 * Keep in sync with the database schema.
 */

// ─── Enums ───────────────────────────────────────────────────────────

export type CertificationTier = 'TIER_1' | 'TIER_2' | 'TIER_3';

export type AuditStatus = 'PENDING' | 'VERIFIED' | 'FLAGGED';

export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER';

export type IncidentStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED';

export type RequirementStatus = 'PENDING' | 'SUBMITTED' | 'VERIFIED' | 'REJECTED' | 'FLAGGED';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type NotificationType = 'WELCOME' | 'AUDIT_UPDATE' | 'ALERT' | 'CERTIFIED';

// ─── Core Tables ─────────────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  tier: CertificationTier;
  integrity_score: number;
  is_alpha: boolean;
  api_key?: string;
  auditor_id?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  org_id?: string;
  is_active: boolean;
  is_super_admin: boolean;
  permissions: Record<string, boolean>;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

/** User without sensitive fields (for API responses) */
export type SafeUser = Omit<User, 'password_hash'>;

export interface AuditLog {
  id: string;
  org_id: string;
  system_name?: string;
  event_type?: string;
  details: Record<string, unknown>;
  status: AuditStatus;
  metadata: Record<string, unknown>;
  integrity_hash?: string;
  previous_hash?: string;
  signature?: string;
  sequence_number?: number;
  created_at: string;
}

// ─── CRM Tables ──────────────────────────────────────────────────────

export interface Lead {
  id: string;
  email: string;
  company?: string;
  source: string;
  score?: number;
  status: string;
  created_at: string;
}

export interface Assessment {
  id: string;
  email: string;
  score: number;
  tier: string;
  answers: Record<string, unknown>;
  created_at: string;
}

export interface AlphaApplication {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  use_case?: string;
  created_at: string;
}

// ─── Compliance & Audit ──────────────────────────────────────────────

export interface AuditRequirement {
  id: string;
  org_id: string;
  title: string;
  description?: string;
  category?: string;
  status: RequirementStatus;
  evidence_url?: string;
  findings?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  org_id: string;
  title?: string;
  message?: string;
  type?: NotificationType;
  status: 'UNREAD' | 'READ';
  created_at: string;
}

export interface ComplianceReport {
  id: string;
  org_id: string;
  month_year: string;
  integrity_score: number;
  audit_status: string;
  findings_count: number;
  report_url?: string;
  created_at: string;
}

export interface Incident {
  id: string;
  org_id: string;
  citizen_email: string;
  system_name?: string;
  description: string;
  status: IncidentStatus;
  resolution_details?: string;
  human_reviewer_id?: string;
  created_at: string;
  updated_at: string;
}

// ─── CMS Tables ──────────────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author_id?: string;
  status: PostStatus;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
  subscribed_at: string;
}

// ─── Security & Auth ─────────────────────────────────────────────────

export interface ApiKey {
  id: string;
  org_id: string;
  name: string;
  key_hash: string;
  key_prefix: string;
  label?: string;
  scopes: string[];
  last_used_at?: string;
  expires_at?: string;
  is_active: boolean;
  created_at: string;
}

export interface SecurityLog {
  id: string;
  actor_id?: string;
  action: string;
  entity_id?: string;
  details?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

// ─── Internal Operations ─────────────────────────────────────────────

export interface PerformanceMetrics {
  id: string;
  user_id: string;
  audits_completed: number;
  qc_pass_rate: number;
  average_response_time?: number;
  institutional_score: number;
  updated_at: string;
}

export interface OperationsQC {
  id: string;
  entity_id: string;
  entity_type: string;
  original_auditor_id?: string;
  qc_reviewer_id?: string;
  status: 'PENDING' | 'PASSED' | 'REJECTED';
  findings?: string;
  created_at: string;
  updated_at: string;
}

export interface TrainingProgress {
  id: string;
  user_id: string;
  module_id: string;
  status: 'IN_PROGRESS' | 'COMPLETED';
  score?: number;
  completed_at?: string;
  updated_at: string;
}

export interface LeadAuditorCredential {
  id: string;
  user_id: string;
  certificate_id: string;
  issue_date: string;
  expiry_date?: string;
  verification_hash: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  created_at: string;
}

// ─── Engine API Types ────────────────────────────────────────────────

export interface EngineAnalysisResult {
  audit_hash: string;
  signature?: string;
  status: string;
  overall_status?: string;
  metrics: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface EngineHealthResponse {
  status: 'healthy' | 'degraded';
  version: string;
  timestamp: string;
  uptime_seconds: number;
  checks: Record<string, { status: string; detail?: string }>;
  capabilities: string[];
}
