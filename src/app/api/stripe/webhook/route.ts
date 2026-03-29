import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!)
}

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

function resolvePlan(amountTotal: number | null): 'pro' | 'business' {
  // $49 = 4900 cents = business, everything else = pro
  if (amountTotal && amountTotal >= 4900) return 'business'
  return 'pro'
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  const stripe = getStripe()
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id || session.client_reference_id

      if (userId) {
        // Retrieve the full session with line items to determine plan
        let plan: 'pro' | 'business' = resolvePlan(session.amount_total)

        // Try to get exact price from line items via API
        try {
          const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items'],
          })
          const priceId = fullSession.line_items?.data?.[0]?.price?.id
          if (priceId === process.env.STRIPE_BUSINESS_PRICE_ID) {
            plan = 'business'
          } else if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
            plan = 'pro'
          }
        } catch {
          // Fallback to amount-based detection already set above
        }

        await supabase
          .from('profiles')
          .update({
            plan,
            stripe_subscription_id: (session.subscription as string) || null,
            stripe_customer_id: (session.customer as string) || null,
          })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (profile && subscription.status === 'active') {
        const priceId = subscription.items.data[0]?.price?.id
        const plan = priceId === process.env.STRIPE_BUSINESS_PRICE_ID ? 'business' : 'pro'
        await supabase
          .from('profiles')
          .update({ plan, stripe_subscription_id: subscription.id })
          .eq('id', profile.id)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await supabase
        .from('profiles')
        .update({ plan: 'free', stripe_subscription_id: null })
        .eq('stripe_customer_id', customerId)
      break
    }
  }

  return NextResponse.json({ received: true })
}
