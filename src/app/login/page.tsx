'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { FileText, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [usePassword, setUsePassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email — we sent you a sign-in link. Click it and you are in.')
    }
    setLoading(false)
  }

  async function handlePasswordAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (error) {
        setError(error.message)
      } else {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          fetch('/api/email/send-welcome', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${session.access_token}` },
          }).catch(() => {})
          router.push('/dashboard')
        } else {
          router.push('/dashboard')
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <FileText className="h-6 w-6 text-blue-600" />
        <span className="font-bold text-xl text-gray-900">SnapOps</span>
      </Link>

      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900 mb-2 text-center">
          Get started in 10 seconds
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          No password needed. We&apos;ll email you a sign-in link.
        </p>

        {!usePassword ? (
          <>
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
              )}

              {message && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">{message}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : (
                  <>
                    <Mail className="h-4 w-4" />
                    Send me a sign-in link
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setUsePassword(true)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Or use email + password instead
              </button>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handlePasswordAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
              )}

              {message && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">{message}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              >
                {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage('') }}
                className="text-blue-600 hover:underline"
              >
                {isSignUp ? 'Log in' : 'Sign up'}
              </button>
            </p>

            <div className="mt-3 text-center">
              <button
                onClick={() => setUsePassword(false)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Use magic link instead (no password)
              </button>
            </div>
          </>
        )}
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center max-w-sm">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="underline">Terms of Service</Link> and{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
        <span>5 free SOPs/month</span>
        <span>No credit card</span>
        <span>Cancel anytime</span>
      </div>
    </div>
  )
}
