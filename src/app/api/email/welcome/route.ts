import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendWelcomeEmail } from '@/lib/email'
import { timingSafeEqual } from 'crypto'

export const dynamic = 'force-dynamic'

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

// Called by Supabase webhook on new user signup
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') || ''
    const expected = `Bearer ${process.env.WEBHOOK_SECRET}`
    if (!safeCompare(authHeader, expected)) {
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
