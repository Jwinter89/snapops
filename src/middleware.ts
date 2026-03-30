import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// High-fraud countries - block API access (signups, generation, checkout)
// Still allows viewing landing/SEO pages (good for SEO, no abuse risk)
const BLOCKED_COUNTRIES = new Set([
  'NG', // Nigeria
  'GH', // Ghana
  'CM', // Cameroon
  'CI', // Ivory Coast
  'KE', // Kenya (high fraud rate)
  'PH', // Philippines (high fraud rate)
  'RU', // Russia
  'CN', // China
  'KP', // North Korea
  'IR', // Iran
])

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Geo-blocking on API routes (signup, generate, checkout)
  if (path.startsWith('/api/') || path === '/login' || path === '/dashboard') {
    const country = request.geo?.country || request.headers.get('x-vercel-ip-country') || ''
    if (BLOCKED_COUNTRIES.has(country)) {
      if (path.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Service not available in your region' },
          { status: 403 }
        )
      }
      // For login/dashboard pages, redirect to home
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Rate limiting is handled per-route using Upstash Redis (see src/lib/rate-limit.ts).
  // Middleware only handles geo-blocking since Edge runtime can't use dynamic imports
  // required by Upstash SDK.

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/login', '/dashboard'],
}
