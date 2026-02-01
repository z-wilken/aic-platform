import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: UserRole
  orgId: string
  orgName: string
  tier: string
}

// Role hierarchy - higher index = more permissions
const ROLE_HIERARCHY: UserRole[] = ['VIEWER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN']

/**
 * Get the current session (server-side)
 */
export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Get current user or redirect to login
 */
export async function getCurrentUser(): Promise<SessionUser> {
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  return session.user as SessionUser
}

/**
 * Check if user has at least the specified role level
 */
export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole)
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole)
  return userLevel >= requiredLevel
}

/**
 * Check if user has specific permission
 */
export function hasPermission(userRole: UserRole, permission: string): boolean {
  const permissions: Record<string, UserRole[]> = {
    // Read permissions
    'read:dashboard': ['VIEWER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN'],
    'read:audit-logs': ['AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN'],
    'read:incidents': ['AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN'],
    'read:certificate': ['VIEWER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN'],

    // Write permissions
    'write:audit-logs': ['COMPLIANCE_OFFICER', 'ADMIN'],
    'write:incidents': ['COMPLIANCE_OFFICER', 'ADMIN'],
    'write:settings': ['ADMIN'],

    // Admin permissions
    'manage:users': ['ADMIN'],
    'manage:api-keys': ['ADMIN'],
    'manage:organization': ['ADMIN'],

    // Verification permissions
    'verify:decisions': ['AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN'],
    'approve:certifications': ['COMPLIANCE_OFFICER', 'ADMIN'],
  }

  const allowedRoles = permissions[permission] || []
  return allowedRoles.includes(userRole)
}

/**
 * Server action to check auth and role
 */
export async function requireAuth(minRole?: UserRole) {
  const user = await getCurrentUser()

  if (minRole && !hasRole(user.role, minRole)) {
    redirect('/unauthorized')
  }

  return user
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    ADMIN: 'Administrator',
    COMPLIANCE_OFFICER: 'Compliance Officer',
    AUDITOR: 'Auditor',
    VIEWER: 'Viewer'
  }
  return names[role] || role
}

/**
 * Get tier display info
 */
export function getTierInfo(tier: string) {
  const tiers = {
    TIER_1: {
      name: 'Critical',
      color: 'red',
      description: 'Human approval required for all decisions',
      badge: 'bg-red-500/20 text-red-400 border-red-500/30'
    },
    TIER_2: {
      name: 'Elevated',
      color: 'orange',
      description: 'Human supervision with override capability',
      badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    },
    TIER_3: {
      name: 'Standard',
      color: 'green',
      description: 'Automated with monitoring',
      badge: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }
  return tiers[tier as keyof typeof tiers] || tiers.TIER_3
}
