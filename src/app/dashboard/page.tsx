'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import SOPGenerator from '@/components/SOPGenerator'
import SOPList from '@/components/SOPList'
import { FileText, LogOut, CreditCard } from 'lucide-react'
import type { UserProfile } from '@/lib/types'

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [upgrading, setUpgrading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const { data: { user: authUser }, error } = await supabase.auth.getUser()
      if (error || !authUser) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single()

      setUser(profile)
      setLoading(false)
    }
    loadUser()
  }, [router])

  async function getAccessToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ?? null
  }

  async function handleUpgrade(plan: 'pro' | 'business') {
    setUpgrading(true)
    const token = await getAccessToken()
    if (!token) return

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setUpgrading(false)
    }
  }

  async function handleManageBilling() {
    const token = await getAccessToken()
    if (!token) return

    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    const token = await getAccessToken()
    if (!token) { setDeleting(false); return }

    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (res.ok) {
        await supabase.auth.signOut()
        router.push('/')
      }
    } catch {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-lg text-gray-900">SnapOps</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              {user?.plan === 'free' ? `${user.sops_this_month}/5 free SOPs used` : `${user?.plan} plan`}
            </span>
            {user?.plan === 'free' ? (
              <button
                onClick={() => handleUpgrade('pro')}
                disabled={upgrading}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              >
                {upgrading ? 'Loading...' : 'Upgrade to Pro'}
              </button>
            ) : (
              <button
                onClick={handleManageBilling}
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <CreditCard className="h-3 w-3" />
                Billing
              </button>
            )}
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {user?.plan === 'free' && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Monthly usage</span>
              <span className="text-xs text-gray-500">{user.sops_this_month}/5 SOPs</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${(user.sops_this_month ?? 0) >= 4 ? 'bg-orange-500' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(((user.sops_this_month ?? 0) / 5) * 100, 100)}%` }}
              />
            </div>
            {(user.sops_this_month ?? 0) >= 4 && (
              <p className="text-xs text-orange-600 mt-2">
                {user.sops_this_month >= 5 ? 'Limit reached. ' : 'Almost at your limit. '}
                <button onClick={() => handleUpgrade('pro')} className="underline font-medium">Upgrade to Pro</button> for unlimited SOPs.
              </p>
            )}
          </div>
        )}

        <SOPGenerator onGenerated={() => setRefreshKey(k => k + 1)} />
        <SOPList refreshKey={refreshKey} />
      </main>

      <footer className="border-t border-gray-100 py-6 mt-8">
        <p className="text-center text-xs text-gray-400">
          AI-generated SOPs should be reviewed by qualified personnel before implementation. SnapOps does not provide legal, safety, or compliance advice.
          {' '}<a href="/terms" className="underline">Terms</a> · <a href="/privacy" className="underline">Privacy</a> · <a href="/disclaimer" className="underline">Disclaimer</a>
        </p>
        <p className="mt-2 text-center text-xs text-gray-400">
          Developed by <a href="https://www.winterhowlers.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 underline">Winter Howlers</a>
        </p>
        <div className="mt-4 text-center">
          {showDeleteConfirm ? (
            <div className="inline-flex items-center gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-2">
              <span className="text-xs text-red-700">Permanently delete your account and all SOPs?</span>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="text-xs font-medium text-red-600 hover:text-red-700 disabled:text-red-300"
              >
                {deleting ? 'Deleting...' : 'Yes, delete everything'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Delete account
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
