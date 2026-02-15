export * from "@aic/auth"
import { auth } from "@aic/auth"
import { redirect } from 'next/navigation'
import { AICSessionUser, UserRole, hasRole } from '@aic/types'

/**
 * Get the current session (server-side)
 */
export async function getSession() {
  return await auth()
}

/**
 * Get current user or redirect to login
 */
export async function getCurrentUser(): Promise<AICSessionUser> {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return session.user as unknown as AICSessionUser
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
