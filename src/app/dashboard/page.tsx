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
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      setUser(profile)
      setLoading(false)
    }
    loadUser()
  }, [router])

  async function handleUpgrade(plan: 'pro' | 'business') {
    setUpgrading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
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
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
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
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <SOPGenerator onGenerated={() => setRefreshKey(k => k + 1)} />
        <SOPList refreshKey={refreshKey} />
      </main>
    </div>
  )
}
