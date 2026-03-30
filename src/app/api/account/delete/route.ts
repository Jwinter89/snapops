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
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user }, error: authError } = await anonClient.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Cancel Stripe subscription if active
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_subscription_id')
      .eq('id', user.id)
      .single()

    if (profile?.stripe_subscription_id) {
      try {
        const Stripe = (await import('stripe')).default
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        await stripe.subscriptions.cancel(profile.stripe_subscription_id)
      } catch {
        // Continue with deletion even if Stripe cancel fails
      }
    }

    // Delete SOPs (cascade should handle this, but be explicit)
    await supabase.from('sops').delete().eq('user_id', user.id)

    // Delete profile
    await supabase.from('profiles').delete().eq('id', user.id)

    // Delete auth user (requires service role)
    await supabase.auth.admin.deleteUser(user.id)

    return NextResponse.json({ deleted: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 })
  }
}
