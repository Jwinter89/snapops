'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { Loader2, ArrowRight, Sparkles, Mail, Check } from 'lucide-react'

const EXAMPLES = [
  'Before using the forklift, check tires and hydraulic fluid levels. Wear seatbelt at all times. Max speed 5mph inside warehouse. Report any damage to supervisor immediately.',
  'Wash hands before handling food. Check fridge temp is below 40F. Use separate cutting boards for meat and vegetables. Label all prep items with date and time.',
  'Lock out main breaker before opening electrical panel. Verify zero energy with multimeter on all phases. Apply personal lock and tag. Only the person who applied the lock may remove it.',
]

export default function LiveDemo() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remaining, setRemaining] = useState<number | null>(null)
  const [captureEmail, setCaptureEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)

  async function handleGenerate() {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setResult('')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.signup) {
          setError('signup')
        } else {
          setError(data.error || 'Something went wrong')
        }
        return
      }

      setResult(data.content)
      setRemaining(data.remaining ?? null)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-semibold">Try it now — no signup required</h3>
        </div>
        <p className="text-blue-100 text-sm mt-1">Paste your notes below or click an example. 2 free demos per hour.</p>
      </div>

      <div className="p-6 space-y-4">
        {!result && (
          <>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setInput(ex)}
                  className="text-xs rounded-full border border-gray-200 px-3 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {['Forklift safety', 'Food handling', 'Electrical LOTO'][i]}
                </button>
              ))}
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              placeholder="Paste your rough notes, bullet points, or process description here..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              maxLength={2000}
            />

            {error === 'signup' ? (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
                <p className="text-sm font-medium text-blue-900 mb-2">Demo limit reached</p>
                <p className="text-sm text-blue-700 mb-3">Sign up free to get 5 SOPs every month.</p>
                <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                  Sign Up Free <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : error ? (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
            ) : null}

            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating your SOP...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate SOP
                </>
              )}
            </button>
          </>
        )}

        {result && (
          <>
            <div className="prose prose-sm max-w-none text-gray-800 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
            {!emailSent ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Want to save this SOP?</p>
                <p className="text-xs text-blue-700 mb-3">Enter your email — we&apos;ll send you a link to save it and get 5 free SOPs every month.</p>
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  setSendingEmail(true)
                  try {
                    // Trigger magic link signup — welcome email will be sent via Supabase webhook
                    const { createClient } = await import('@supabase/supabase-js')
                    const sb = createClient(
                      process.env.NEXT_PUBLIC_SUPABASE_URL!,
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                    )
                    await sb.auth.signInWithOtp({
                      email: captureEmail,
                      options: { emailRedirectTo: window.location.origin + '/dashboard' },
                    })
                    setEmailSent(true)
                  } catch { /* ignore */ }
                  setSendingEmail(false)
                }} className="flex gap-2">
                  <input
                    type="email"
                    value={captureEmail}
                    onChange={(e) => setCaptureEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    className="flex-1 rounded-lg border border-blue-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={sendingEmail}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center gap-1"
                  >
                    {sendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-700 mb-1">
                  <Check className="h-4 w-4" />
                  <p className="text-sm font-medium">Check your email!</p>
                </div>
                <p className="text-xs text-green-600">We sent a sign-in link. Click it to save this SOP and access your dashboard.</p>
              </div>
            )}
            <button
              onClick={() => { setResult(''); setInput(''); setEmailSent(false); setCaptureEmail(''); }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {remaining !== null && remaining > 0 ? `Try another (${remaining} left)` : remaining === 0 ? 'Demo limit reached' : 'Try another'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
