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

    // Institutional Boundary Enforcement: Ensure session has an orgId
    if (!token.orgId && !token.isSuperAdmin) {
      console.warn(`[SECURITY] Access denied to ${pathname}: Missing orgId for user ${token.email}`)
      return NextResponse.redirect(new URL('/unauthorized?reason=MISSING_INSTITUTION', request.url))
    }

    // Check role requirements — match on prefix so /settings/api-keys is also protected
    const matchedRole = Object.entries(roleRequirements).find(
      ([route]) => pathname === route || pathname.startsWith(route + '/')
    )
    if (matchedRole) {
      const [, requiredRoles] = matchedRole
      if (!requiredRoles.includes(token.role as string)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }
  }

  // Add security headers
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth (NextAuth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
