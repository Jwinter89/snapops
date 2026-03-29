import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PAYMENT_LINKS = {
  pro: process.env.STRIPE_PRO_PAYMENT_LINK || 'https://buy.stripe.com/test_9B6fZj1vB35Ec3Q3b2bjW01',
  business: process.env.STRIPE_BUSINESS_PAYMENT_LINK || 'https://buy.stripe.com/test_3cI9AV6PV7lUfg2bHybjW02',
}

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json() as { plan: string }
    if (plan !== 'pro' && plan !== 'business') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const url = PAYMENT_LINKS[plan as keyof typeof PAYMENT_LINKS]
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to create checkout', detail: message }, { status: 500 })
  }
}
