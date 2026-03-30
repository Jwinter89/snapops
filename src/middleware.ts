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

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/generate': { max: 10, windowMs: 60000 },
  '/api/demo': { max: 3, windowMs: 3600000 },
  '/api/stripe/checkout': { max: 5, windowMs: 60000 },
  '/api/auth': { max: 10, windowMs: 60000 },
}

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

  // Rate limiting on API routes
  for (const [prefix, limit] of Object.entries(LIMITS)) {
    if (path.startsWith(prefix)) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
      const key = `${ip}:${prefix}`
      const now = Date.now()
      const entry = rateLimitMap.get(key)

      if (entry && now < entry.resetTime) {
        if (entry.count >= limit.max) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          )
        }
        entry.count++
      } else {
        rateLimitMap.set(key, { count: 1, resetTime: now + limit.windowMs })
      }

      // Cleanup old entries periodically
      if (rateLimitMap.size > 10000) {
        rateLimitMap.forEach((v, k) => {
          if (now > v.resetTime) rateLimitMap.delete(k)
        })
      }
      break
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/login', '/dashboard'],
}
