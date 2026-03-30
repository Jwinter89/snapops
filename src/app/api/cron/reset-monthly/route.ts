import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { timingSafeEqual } from 'crypto'

export const dynamic = 'force-dynamic'

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  return timingSafeEqual(Buffer.from(a), Buffer.from(b))
}

// Runs on the 1st of every month at midnight UTC
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || ''
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!safeCompare(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from('profiles')
    .update({ sops_this_month: 0 })
    .gte('sops_this_month', 1)

  if (error) {
    console.error('Monthly reset error:', error)
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 })
  }

  return NextResponse.json({ reset: true })
}
