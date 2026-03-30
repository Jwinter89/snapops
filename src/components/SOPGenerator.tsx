'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import ReactMarkdown from 'react-markdown'
import { Loader2, Copy, Download, Check, Share2, ArrowRight } from 'lucide-react'

const INDUSTRIES = [
  'Oil & Gas', 'Construction', 'Manufacturing', 'Food Service',
  'Healthcare Admin', 'Retail', 'Logistics', 'Agriculture',
  'Auto Repair', 'Cleaning Services', 'Property Management', 'Warehousing',
  'Mining', 'Electrical', 'Plumbing', 'HVAC', 'Landscaping', 'Pest Control',
  'Roofing', 'Painting', 'Welding', 'Trucking', 'Aviation', 'Marine',
  'Forestry', 'Water Treatment', 'Waste Management', 'Solar Energy',
  'Wind Energy', 'Concrete', 'Demolition', 'Excavation', 'Fire Protection',
  'Security Services', 'Janitorial', 'Catering', 'Bakery', 'Brewery',
  'Distillery', 'Veterinary', 'Dental Office', 'Optometry', 'Pharmacy',
  'Car Wash', 'Dry Cleaning', 'Printing', 'Photography', 'Event Planning',
  'Moving Services', 'Storage Facilities', 'Other',
]

export default function SOPGenerator({ onGenerated }: { onGenerated?: () => void }) {
  const [input, setInput] = useState('')
  const [industry, setIndustry] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  async function handleGenerate() {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setResult('')

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setError('Please log in to generate SOPs.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ input, industry: industry || undefined }),
      })

      const data = await res.json()
      if (!res.ok) {
        if (data.upgrade) {
          setShowUpgrade(true)
        } else {
          setError(data.error || 'Failed to generate SOP')
        }
        return
      }

      setResult(data.sop.content)
      setInput('')
      onGenerated?.()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const disclaimer = '\n\n---\n\n*This SOP was generated using AI (SnapOps) and is provided as a draft only. It must be reviewed, validated, and approved by qualified personnel before implementation. SnapOps does not provide legal, safety, or compliance advice.*\n'
    const blob = new Blob([result + disclaimer], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sop.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate a new SOP</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry (optional)</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paste your notes, bullet points, or process description
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="e.g., Before starting the pump, check oil level. Make sure pressure is below 150 PSI. If alarm sounds, shut down immediately and call supervisor..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            maxLength={10000}
          />
          <p className="mt-1 text-xs text-gray-500">{input.length}/10,000 characters</p>
        </div>

        {showUpgrade && (
          <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
            <p className="text-sm font-medium text-blue-900 mb-1">Monthly limit reached</p>
            <p className="text-sm text-blue-700 mb-3">You&apos;ve used all 5 free SOPs this month. Upgrade to Pro for unlimited generation.</p>
            <button
              onClick={() => {
                const upgradeEvent = new CustomEvent('snapops:upgrade', { detail: { plan: 'pro' } })
                window.dispatchEvent(upgradeEvent)
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Upgrade to Pro — $19/mo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && !showUpgrade && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating SOP...
            </>
          ) : (
            'Generate SOP'
          )}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Generated SOP</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
          <div className="prose prose-sm max-w-none text-gray-800">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">Made with SnapOps</p>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'SnapOps - AI SOP Generator', text: 'I just generated a professional SOP in 30 seconds with SnapOps. Try it free:', url: 'https://snapops.app' })
                } else {
                  navigator.clipboard.writeText('I just generated a professional SOP in 30 seconds with SnapOps. Try it free: https://snapops.app')
                  alert('Share link copied!')
                }
              }}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
            >
              <Share2 className="h-3 w-3" />
              Share SnapOps
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
