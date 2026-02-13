export * from "@aic/auth"
import { auth } from "@aic/auth"
import { redirect } from 'next/navigation'
import { Permissions } from '@aic/types'

export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: UserRole
  orgId: string
  orgName: string
  tier: string
  isSuperAdmin: boolean
  permissions: Permissions
}

const ROLE_HIERARCHY: UserRole[] = ['VIEWER', 'AUDITOR', 'COMPLIANCE_OFFICER', 'ADMIN']

/**
 * Get the current session (server-side)
 */
export async function getSession() {
  return await auth()
}

/**
 * Get current user or redirect to login
 */
export async function getCurrentUser(): Promise<SessionUser> {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return session.user as unknown as SessionUser
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
 * Server action to check auth and role
 */
export async function requireAuth(minRole?: UserRole) {
  const user = await getCurrentUser()

  if (minRole && !hasRole(user.role, minRole)) {
    redirect('/unauthorized')
  }

  return user
}
