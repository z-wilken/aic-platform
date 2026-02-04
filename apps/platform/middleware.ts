import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/certificate',
  '/audit-logs',
  '/incidents'
]

// Routes that require specific roles
const roleRequirements: Record<string, string[]> = {
  '/settings': ['ADMIN', 'COMPLIANCE_OFFICER'],
  '/audit-logs': ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR'],
  '/incidents': ['ADMIN', 'COMPLIANCE_OFFICER', 'AUDITOR']
}

// Public routes (no auth required)
const publicRoutes = [
  '/login',
  '/api/auth',
  '/_next',
  '/favicon.ico'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if route requires auth
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    // Not authenticated - redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check role requirements
    const requiredRoles = roleRequirements[pathname]
    if (requiredRoles && !requiredRoles.includes(token.role as string)) {
      // Insufficient permissions
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  // Add security headers
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes that handle their own auth
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
