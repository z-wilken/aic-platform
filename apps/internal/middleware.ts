import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * AIC Internal Portal Middleware (Closed by Default)
 */
const PUBLIC_ROUTES = [
  '/login',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/unauthorized'
]

// Elevated Internal Roles
const INTERNAL_ROLES = ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )
  
  if (isPublic) {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ENFORCE INTERNAL PORTAL ACCESS
  // Only users with elevated internal roles can access this application
  if (!INTERNAL_ROLES.includes(token.role as string)) {
    console.warn(`[SECURITY] Internal Portal access denied to ${token.email} (${token.role})`)
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
