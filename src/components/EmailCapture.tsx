'use client'

import { useState } from 'react'
import { Mail, Check, Loader2 } from 'lucide-react'

export default function EmailCapture({ source = 'website' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      setSent(true)
    } catch { /* ignore */ }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-green-700 mb-1">
          <Check className="h-5 w-5" />
          <p className="font-medium">You&apos;re in!</p>
        </div>
        <p className="text-sm text-green-600">Check your email for 5 free SOP tips.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-1">Get 5 free SOP tips from the field</h3>
      <p className="text-gray-400 text-sm mb-4">Plus a free AI SOP generator. No spam, unsubscribe anytime.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@company.com"
          className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-600 transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          Send
        </button>
      </form>
    </div>
  )
}
