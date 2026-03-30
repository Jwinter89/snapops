import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// GET: one-click unsubscribe from List-Unsubscribe header
// POST: form-based unsubscribe
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) {
    return new NextResponse(unsubscribePage(''), { headers: { 'Content-Type': 'text/html' } })
  }
  return handleUnsubscribe(email)
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let email: string | null = null

    if (contentType.includes('application/json')) {
      const body = await req.json()
      email = body.email
    } else {
      const formData = await req.formData()
      email = formData.get('email') as string
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    return handleUnsubscribe(email)
  } catch {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}

async function handleUnsubscribe(email: string) {
  const supabase = getServiceClient()

  // Mark as unsubscribed in newsletter table
  await supabase
    .from('newsletter')
    .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
    .eq('email', email.toLowerCase().trim())

  // Also set flag on profiles table if the user has an account
  await supabase
    .from('profiles')
    .update({ email_opt_out: true })
    .eq('email', email.toLowerCase().trim())

  return new NextResponse(unsubscribePage(email, true), {
    headers: { 'Content-Type': 'text/html' },
  })
}

function unsubscribePage(email: string, success = false) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsubscribe — SnapOps</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:480px;margin:0 auto;padding:60px 20px;text-align:center;color:#1a1a1a;">
  <a href="https://snapops.app" style="font-size:24px;font-weight:bold;color:#2563eb;text-decoration:none;">SnapOps</a>
  ${success ? `
    <h1 style="font-size:20px;margin-top:32px;">You've been unsubscribed</h1>
    <p style="color:#666;font-size:15px;">We've removed <strong>${email}</strong> from our mailing list. You won't receive any more marketing emails from us.</p>
    <p style="color:#999;font-size:13px;margin-top:24px;">You'll still receive essential account emails (password resets, payment confirmations).</p>
  ` : `
    <h1 style="font-size:20px;margin-top:32px;">Unsubscribe</h1>
    <p style="color:#666;font-size:15px;">Enter your email to unsubscribe from SnapOps emails.</p>
    <form method="POST" action="/api/unsubscribe" style="margin-top:24px;">
      <input type="email" name="email" required placeholder="you@company.com"
        style="width:100%;padding:10px 14px;border:1px solid #ddd;border-radius:8px;font-size:15px;box-sizing:border-box;">
      <button type="submit"
        style="margin-top:12px;width:100%;padding:10px;background:#2563eb;color:white;border:none;border-radius:8px;font-size:15px;font-weight:500;cursor:pointer;">
        Unsubscribe
      </button>
    </form>
  `}
  <p style="margin-top:48px;font-size:12px;color:#aaa;">
    <a href="https://snapops.app" style="color:#aaa;">snapops.app</a> &middot;
    <a href="https://snapops.app/terms" style="color:#aaa;">Terms</a> &middot;
    <a href="https://snapops.app/privacy" style="color:#aaa;">Privacy</a>
  </p>
</body></html>`
}
