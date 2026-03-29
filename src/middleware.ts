import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/generate': { max: 10, windowMs: 60000 },
  '/api/stripe/checkout': { max: 5, windowMs: 60000 },
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

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
  matcher: '/api/:path*',
}
