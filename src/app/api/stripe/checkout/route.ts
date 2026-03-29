import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan } = await req.json() as { plan: string }
    if (plan !== 'pro' && plan !== 'business') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const links: Record<string, string | undefined> = {
      pro: process.env.STRIPE_PRO_PAYMENT_LINK,
      business: process.env.STRIPE_BUSINESS_PAYMENT_LINK,
    }

    const baseUrl = links[plan]
    if (!baseUrl) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
    }

    const url = `${baseUrl}?client_reference_id=${user.id}`
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}
