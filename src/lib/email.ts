import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

const FROM = process.env.EMAIL_FROM || 'SnapOps <hello@snapops.app>'

// CAN-SPAM compliant footer with unsubscribe and physical address
const EMAIL_FOOTER = `
  <hr style="border:none;border-top:1px solid #eee;margin:32px 0;">
  <p style="font-size:12px;color:#aaa;text-align:center;">
    <a href="https://snapops.app" style="color:#aaa;">snapops.app</a> &middot;
    <a href="https://snapops.app/terms" style="color:#aaa;">Terms</a> &middot;
    <a href="https://snapops.app/privacy" style="color:#aaa;">Privacy</a>
  </p>
  <p style="font-size:11px;color:#bbb;text-align:center;margin-top:12px;">
    SnapOps &middot; Made by Winter Howlers<br>
    To stop receiving these emails, reply with "unsubscribe" or contact us at support@snapops.app.
  </p>`

export async function sendWelcomeEmail(to: string) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Welcome to SnapOps — your first SOP is waiting',
    headers: {
      'List-Unsubscribe': '<mailto:support@snapops.app?subject=Unsubscribe>',
    },
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1a1a1a;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:24px;font-weight:bold;color:#2563eb;">SnapOps</span>
  </div>
  <h1 style="font-size:22px;font-weight:600;margin-bottom:16px;">Welcome to SnapOps</h1>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">You just made a smart move. Instead of spending hours formatting SOPs in Word, you can now generate professional procedures in seconds.</p>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;"><strong>Here's how to get started:</strong></p>
  <ol style="font-size:15px;line-height:1.8;color:#4a4a4a;padding-left:20px;">
    <li>Go to your <a href="https://snapops.app/dashboard" style="color:#2563eb;">dashboard</a></li>
    <li>Select your industry (or skip it)</li>
    <li>Paste your notes, bullet points, or rough description</li>
    <li>Click "Generate SOP" — done in 30 seconds</li>
  </ol>
  <div style="text-align:center;margin:32px 0;">
    <a href="https://snapops.app/dashboard" style="display:inline-block;background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:500;font-size:15px;">Generate Your First SOP</a>
  </div>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">You get <strong>5 free SOPs every month</strong>. If you need unlimited, <a href="https://snapops.app/dashboard" style="color:#2563eb;">Pro is $19/mo</a>.</p>
  <p style="font-size:14px;color:#888;margin-top:32px;">— The SnapOps Team</p>
  ${EMAIL_FOOTER}
</body></html>`,
  })
}

export async function sendDripDay3(to: string) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Pro tip: try selecting an industry for better SOPs',
    headers: {
      'List-Unsubscribe': '<mailto:support@snapops.app?subject=Unsubscribe>',
    },
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1a1a1a;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:24px;font-weight:bold;color:#2563eb;">SnapOps</span>
  </div>
  <h1 style="font-size:22px;font-weight:600;margin-bottom:16px;">Get better SOPs with one click</h1>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">Quick tip: when you generate an SOP, try selecting your <strong>industry</strong> from the dropdown. This tells the AI to use the right terminology, safety standards, and regulatory references for your field.</p>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">For example, selecting "Oil & Gas" will include OSHA and API references. "Food Service" will include HACCP and FDA Food Code standards.</p>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">We support <strong>50+ industries</strong> — <a href="https://snapops.app/sop-templates" style="color:#2563eb;">browse them here</a>.</p>
  <div style="text-align:center;margin:32px 0;">
    <a href="https://snapops.app/dashboard" style="display:inline-block;background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:500;font-size:15px;">Generate an SOP Now</a>
  </div>
  <p style="font-size:14px;color:#888;margin-top:32px;">— The SnapOps Team</p>
  ${EMAIL_FOOTER}
</body></html>`,
  })
}

export async function sendDripDay7(to: string) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to,
    subject: "You've been using SnapOps for a week — here's what Pro unlocks",
    headers: {
      'List-Unsubscribe': '<mailto:support@snapops.app?subject=Unsubscribe>',
    },
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;color:#1a1a1a;">
  <div style="text-align:center;margin-bottom:32px;">
    <span style="font-size:24px;font-weight:bold;color:#2563eb;">SnapOps</span>
  </div>
  <h1 style="font-size:22px;font-weight:600;margin-bottom:16px;">Ready for unlimited SOPs?</h1>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">You've been using SnapOps for a week now. If you've been hitting the 5 SOP/month limit, Pro might be a good fit.</p>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;"><strong>What you get with Pro ($19/mo):</strong></p>
  <ul style="font-size:15px;line-height:1.8;color:#4a4a4a;padding-left:20px;">
    <li>Unlimited SOP generation</li>
    <li>PDF export for printing and sharing</li>
    <li>Team sharing — give your whole crew access</li>
    <li>Priority generation speed</li>
    <li>Cancel anytime, no questions asked</li>
  </ul>
  <p style="font-size:15px;line-height:1.6;color:#4a4a4a;">That's less than the cost of one hour of an employee's time — and SnapOps saves you dozens of hours every month.</p>
  <div style="text-align:center;margin:32px 0;">
    <a href="https://snapops.app/dashboard" style="display:inline-block;background:#2563eb;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:500;font-size:15px;">Upgrade to Pro</a>
  </div>
  <p style="font-size:14px;color:#888;margin-top:32px;">— The SnapOps Team</p>
  ${EMAIL_FOOTER}
</body></html>`,
  })
}
