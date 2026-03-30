import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateSOP } from '@/lib/anthropic'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const FREE_LIMIT = 5

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
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ).auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 10 per minute per user (persists with Redis)
    const { success: rateLimitOk } = await rateLimit(`generate:${user.id}`, 10, 60000)
    if (!rateLimitOk) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 })
    }

    const supabase = getServiceClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, sops_this_month')
      .eq('id', user.id)
      .single()

    if (profile?.plan === 'free' && (profile?.sops_this_month ?? 0) >= FREE_LIMIT) {
      return NextResponse.json({
        error: 'Monthly limit reached. Upgrade to Pro for unlimited SOPs.',
        upgrade: true,
      }, { status: 429 })
    }

    // Atomically increment count BEFORE generation to prevent race condition
    if (profile?.plan === 'free') {
      const { data: updated, error: incrError } = await supabase
        .from('profiles')
        .update({ sops_this_month: (profile?.sops_this_month ?? 0) + 1 })
        .eq('id', user.id)
        .lt('sops_this_month', FREE_LIMIT)
        .select('sops_this_month')
        .single()

      if (incrError || !updated) {
        return NextResponse.json({
          error: 'Monthly limit reached. Upgrade to Pro for unlimited SOPs.',
          upgrade: true,
        }, { status: 429 })
      }
    }

    const { input, industry } = await req.json()
    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 })
    }

    if (input.length > 10000) {
      return NextResponse.json({ error: 'Input too long (max 10,000 characters)' }, { status: 400 })
    }

    const validIndustry = industry && ALLOWED_INDUSTRIES.has(industry) ? industry : undefined
    const content = await generateSOP(input, validIndustry)

    const titleMatch = content.match(/\*\*Title\*\*:\s*(.+?)(?:\n|$)/) ||
                       content.match(/^#\s+(.+?)(?:\n|$)/m)
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled SOP'

    const { data: sop, error: insertError } = await supabase
      .from('sops')
      .insert({
        user_id: user.id,
        title,
        content,
        raw_input: input,
        industry: industry || null,
        tags: [],
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save SOP' }, { status: 500 })
    }

    return NextResponse.json({ sop })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: 'Failed to generate SOP' }, { status: 500 })
  }
}
