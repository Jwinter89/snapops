import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWelcomeEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

// Called by Supabase webhook on new user signup
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await req.json()
    const email = payload?.record?.email || payload?.email

    if (!email) {
      return NextResponse.json({ error: 'No email' }, { status: 400 })
    }

    await sendWelcomeEmail(email)

    // Track that welcome email was sent
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    await supabase
      .from('profiles')
      .update({ updated_at: new Date().toISOString() })
      .eq('email', email)

    return NextResponse.json({ sent: true })
  } catch (error) {
    console.error('Welcome email error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
