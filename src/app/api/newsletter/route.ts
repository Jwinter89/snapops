import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 3 signups per hour per IP (persists with Redis)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const { success } = await rateLimit(`newsletter:${ip}`, 3, 3600000)
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const { email, source } = await req.json()
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Save to newsletter table (re-subscribe if previously unsubscribed)
    const { error } = await supabase
      .from('newsletter')
      .upsert({
        email: email.toLowerCase().trim(),
        source: source || 'website',
        unsubscribed: false,
        unsubscribed_at: null,
      }, { onConflict: 'email' })

    if (error) {
      console.error('Newsletter signup error:', error)
    }

    // Send immediate value — a free SOP tips email
    const resend = new Resend(process.env.RESEND_API_KEY!)
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'SnapOps <hello@snapops.app>',
      to: email,
      subject: '5 SOP tips that save operations teams hours every week',
      headers: {
        'List-Unsubscribe': `<https://snapops.app/api/unsubscribe?email=${encodeURIComponent(email)}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1a1a1a;">
  <div style="text-align:center;margin-bottom:24px;">
    <span style="font-size:24px;font-weight:bold;color:#2563eb;">SnapOps</span>
  </div>
  <h1 style="font-size:20px;font-weight:600;margin-bottom:16px;">5 SOP tips from the field</h1>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">Thanks for subscribing. Here are 5 things we've learned about writing SOPs that actually get followed:</p>
  <ol style="font-size:15px;line-height:2;color:#4a4a4a;padding-left:20px;">
    <li><strong>Put warnings BEFORE the step</strong> — not after. If someone reads the warning after they've already done the thing, it's too late.</li>
    <li><strong>Use specific numbers</strong> — "Tighten to 85 ft-lbs" beats "tighten firmly" every time.</li>
    <li><strong>One action per step</strong> — if a step has "and" in it, split it into two steps.</li>
    <li><strong>Write for the newest person on your team</strong> — if they can follow it without asking questions, it's good.</li>
    <li><strong>Review annually</strong> — equipment changes, regs update, people learn better methods. Stale SOPs are dangerous SOPs.</li>
  </ol>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">Want to skip the writing and let AI do it? SnapOps generates professional SOPs from your rough notes in 30 seconds.</p>
  <div style="text-align:center;margin:28px 0;">
    <a href="https://snapops.app" style="display:inline-block;background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:500;font-size:15px;">Try the AI Generator Free</a>
  </div>
  <p style="font-size:14px;color:#888;margin-top:32px;">— The SnapOps Team</p>
  <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
  <p style="font-size:12px;color:#aaa;text-align:center;">
    <a href="https://snapops.app" style="color:#aaa;">snapops.app</a> &middot;
    <a href="https://snapops.app/terms" style="color:#aaa;">Terms</a> &middot;
    <a href="https://snapops.app/privacy" style="color:#aaa;">Privacy</a>
  </p>
  <p style="font-size:11px;color:#bbb;text-align:center;margin-top:12px;">
    SnapOps &middot; Made by Winter Howlers<br>
    To stop receiving these emails, <a href="https://snapops.app/api/unsubscribe" style="color:#bbb;">unsubscribe here</a> or contact us at support@snapops.app.
  </p>
</body></html>`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
