import { NextRequest, NextResponse } from 'next/server'
import { generateSOP } from '@/lib/anthropic'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const ALLOWED_INDUSTRIES = new Set([
  'Oil & Gas', 'Construction', 'Manufacturing', 'Food Service',
  'Healthcare Admin', 'Retail', 'Logistics', 'Agriculture',
  'Auto Repair', 'Cleaning Services', 'Property Management', 'Warehousing',
  'Mining', 'Electrical', 'Plumbing', 'HVAC', 'Landscaping', 'Pest Control',
  'Roofing', 'Painting', 'Welding', 'Trucking', 'Aviation', 'Marine',
  'Forestry', 'Water Treatment', 'Waste Management', 'Solar Energy',
  'Wind Energy', 'Concrete', 'Demolition', 'Excavation', 'Fire Protection',
  'Security Services', 'Janitorial', 'Catering', 'Bakery', 'Brewery',
  'Distillery', 'Veterinary', 'Dental Office', 'Optometry', 'Pharmacy',
  'Car Wash', 'Dry Cleaning', 'Printing', 'Photography', 'Event Planning',
  'Moving Services', 'Storage Facilities', 'Other',
])

export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit: 2 per hour (persists across cold starts with Redis)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const { success } = await rateLimit(`demo:${ip}`, 2, 3600000)
    if (!success) {
      return NextResponse.json({
        error: 'Demo limit reached (2 per hour). Sign up free for 5 SOPs/month.',
        signup: true,
      }, { status: 429 })
    }

    // Global daily cap: 500/day (~$5/day max)
    const { success: globalOk } = await rateLimit('demo:global', 500, 86400000)
    if (!globalOk) {
      return NextResponse.json({
        error: 'Demo is temporarily at capacity. Sign up free to generate SOPs anytime.',
        signup: true,
      }, { status: 429 })
    }

    const { input, industry } = await req.json()
    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 })
    }

    const trimmed = input.slice(0, 2000)
    const validIndustry = industry && ALLOWED_INDUSTRIES.has(industry) ? industry : undefined
    const content = await generateSOP(trimmed, validIndustry)

    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
