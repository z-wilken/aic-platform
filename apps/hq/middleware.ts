import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Public routes (no auth required)
const publicRoutes = [
  '/login',
  '/api/auth',
  '/favicon.ico'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const token: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // Not authenticated - redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Basic HQ Access: Must be ADMIN or AUDITOR
  if (token.role !== 'ADMIN' && token.role !== 'AUDITOR') {
    // We'll redirect to a special unauthorized page or just login
    return NextResponse.redirect(new URL('/login?error=Unauthorized', request.url))
  }

  // Super-Admin Only routes
  if (pathname.startsWith('/governance') && !token.isSuperAdmin) {
    return NextResponse.redirect(new URL('/?error=Restricted', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
