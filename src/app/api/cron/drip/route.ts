import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendDripDay3, sendDripDay7 } from '@/lib/email'
import { timingSafeEqual } from 'crypto'

export const dynamic = 'force-dynamic'

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

// Vercel Cron - runs daily at 9am UTC
export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization') || ''
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!safeCompare(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const now = new Date()
  const day3Ago = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
  const day3Window = new Date(now.getTime() - 3.5 * 24 * 60 * 60 * 1000).toISOString()
  const day7Ago = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const day7Window = new Date(now.getTime() - 7.5 * 24 * 60 * 60 * 1000).toISOString()

  let sent = 0

  // Day 3 drip: users who signed up ~3 days ago and are still on free
  const { data: day3Users } = await supabase
    .from('profiles')
    .select('email')
    .eq('plan', 'free')
    .gte('created_at', day3Window)
    .lte('created_at', day3Ago)

  if (day3Users) {
    for (const user of day3Users) {
      try {
        await sendDripDay3(user.email)
        sent++
      } catch (e) {
        console.error('Drip day3 error:', e)
      }
    }
  }

  // Day 7 drip: users who signed up ~7 days ago and are still on free
  const { data: day7Users } = await supabase
    .from('profiles')
    .select('email')
    .eq('plan', 'free')
    .gte('created_at', day7Window)
    .lte('created_at', day7Ago)

  if (day7Users) {
    for (const user of day7Users) {
      try {
        await sendDripDay7(user.email)
        sent++
      } catch (e) {
        console.error('Drip day7 error:', e)
      }
    }
  }

  return NextResponse.json({ sent, day3: day3Users?.length || 0, day7: day7Users?.length || 0 })
}
