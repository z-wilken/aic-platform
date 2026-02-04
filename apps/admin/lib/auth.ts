import { auth } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export type UserRole = 'ADMIN' | 'COMPLIANCE_OFFICER' | 'AUDITOR' | 'VIEWER'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: UserRole
  orgId: string
}

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
  const session = await getSession()

  if (!session?.user) {
    redirect('/login')
  }

  return session.user as unknown as SessionUser
}

/**
 * Server action to check auth and strict role
 */
export async function requireAdminAuth() {
  const user = await getCurrentUser()

  if (user.role !== 'ADMIN' && user.role !== 'AUDITOR') {
    redirect('/unauthorized')
  }

  return user
}
