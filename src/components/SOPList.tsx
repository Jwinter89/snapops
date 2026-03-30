'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { SOP } from '@/lib/types'
import ReactMarkdown from 'react-markdown'
import { ChevronDown, ChevronUp, Trash2, Search, FileDown, ArrowRight } from 'lucide-react'

export default function SOPList({ refreshKey }: { refreshKey: number }) {
  const [sops, setSops] = useState<SOP[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [upgradePromptId, setUpgradePromptId] = useState<string | null>(null)

  useEffect(() => {
    loadSOPs()
  }, [refreshKey])

  async function loadSOPs() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('sops')
      .select('*')
      .order('created_at', { ascending: false })

    setSops(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await supabase.from('sops').delete().eq('id', id)
    setSops(sops.filter(s => s.id !== id))
    setDeleteConfirm(null)
  }

  const filtered = sops.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.industry?.toLowerCase().includes(search.toLowerCase()) ||
    s.content.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="text-sm text-gray-500 py-8 text-center">Loading your SOPs...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your SOPs ({sops.length})</h2>
      </div>

      {sops.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SOPs..."
            className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-sm text-gray-500 py-8 text-center">
          {sops.length === 0 ? 'No SOPs yet. Generate your first one above.' : 'No SOPs match your search.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((sop) => (
            <div key={sop.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === sop.id ? null : sop.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">{sop.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {sop.industry && <span className="text-blue-600">{sop.industry}</span>}
                    {sop.industry && ' \u00b7 '}
                    {new Date(sop.created_at).toLocaleDateString()}
                  </p>
                </div>
                {expandedId === sop.id ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {expandedId === sop.id && (
                <div className="border-t border-gray-100 p-4">
                  <div className="prose prose-sm max-w-none text-gray-800 mb-4">
                    <ReactMarkdown>{sop.content}</ReactMarkdown>
                  </div>
                  {upgradePromptId === sop.id && (
                    <div className="mb-3 rounded-lg bg-blue-50 border border-blue-200 p-3 flex items-center justify-between">
                      <p className="text-sm text-blue-700">PDF export requires a Pro plan.</p>
                      <button
                        onClick={() => {
                          const upgradeEvent = new CustomEvent('snapops:upgrade', { detail: { plan: 'pro' } })
                          window.dispatchEvent(upgradeEvent)
                        }}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                      >
                        Upgrade to Pro <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      onClick={async () => {
                        setUpgradePromptId(null)
                        const { data: { session } } = await supabase.auth.getSession()
                        if (!session) return
                        const res = await fetch(`/api/export-pdf?id=${sop.id}`, {
                          headers: { 'Authorization': `Bearer ${session.access_token}` },
                        })
                        if (res.status === 403) {
                          setUpgradePromptId(sop.id)
                          return
                        }
                        const html = await res.text()
                        const win = window.open('', '_blank')
                        if (win) {
                          win.document.write(html)
                          win.document.close()
                          setTimeout(() => win.print(), 500)
                        }
                      }}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                    >
                      <FileDown className="h-3 w-3" />
                      Export PDF
                    </button>

                    {deleteConfirm === sop.id ? (
                      <span className="flex items-center gap-2 text-xs">
                        <span className="text-gray-600">Delete this SOP?</span>
                        <button onClick={() => handleDelete(sop.id)} className="text-red-600 font-medium hover:text-red-700">Yes, delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(sop.id)}
                        className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
