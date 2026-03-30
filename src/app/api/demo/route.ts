import { NextRequest, NextResponse } from 'next/server'
import { generateSOP } from '@/lib/anthropic'

export const dynamic = 'force-dynamic'

// Demo: 2 per hour per IP, no auth needed
const demoLimits = new Map<string, { count: number; resetTime: number }>()

// Global daily cap across all users - prevents runaway costs
// ~$0.01 per SOP generation, 500/day = $5/day max
let dailyDemoCount = 0
let dailyResetTime = Date.now() + 86400000

export async function POST(req: NextRequest) {
  try {
    const now = Date.now()

    // Global daily cap
    if (now > dailyResetTime) {
      dailyDemoCount = 0
      dailyResetTime = now + 86400000
    }
    if (dailyDemoCount >= 500) {
      return NextResponse.json({
        error: 'Demo is temporarily at capacity. Sign up free to generate SOPs anytime.',
        signup: true,
      }, { status: 429 })
    }

    // Per-IP rate limit
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const entry = demoLimits.get(ip)

    if (entry && now < entry.resetTime) {
      if (entry.count >= 2) {
        return NextResponse.json({
          error: 'Demo limit reached (2 per hour). Sign up free for 5 SOPs/month.',
          signup: true,
        }, { status: 429 })
      }
      entry.count++
    } else {
      demoLimits.set(ip, { count: 1, resetTime: now + 3600000 })
    }

    if (demoLimits.size > 5000) {
      demoLimits.forEach((v, k) => {
        if (now > v.resetTime) demoLimits.delete(k)
      })
    }

    const { input, industry } = await req.json()
    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 })
    }

    const trimmed = input.slice(0, 2000)
    const content = await generateSOP(trimmed, industry)
    dailyDemoCount++

    return NextResponse.json({ content, remaining: 2 - (entry ? entry.count : 1) })
  } catch {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
