import Link from 'next/link'
import { FileText, MapPin, ArrowRight } from 'lucide-react'
import { cities } from './cities-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SOP Generator by City | SnapOps',
  description: 'Find AI-powered SOP generation for your city. SnapOps serves businesses in 40+ major US cities across every industry.',
  alternates: { canonical: 'https://snapops.app/sop-generator' },
}

export default function SOPGeneratorIndex() {
  const byState = cities.reduce((acc, city) => {
    if (!acc[city.state]) acc[city.state] = []
    acc[city.state].push(city)
    return acc
  }, {} as Record<string, typeof cities>)

  const sortedStates = Object.keys(byState).sort()

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SnapOps</span>
          </Link>
          <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Get Started Free
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SOP Generator — Available Nationwide</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          SnapOps generates professional Standard Operating Procedures for businesses in every major US city.
          Find your city below or <Link href="/login" className="text-blue-600 hover:underline">get started now</Link>.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedStates.map((state) => (
            <div key={state}>
              <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">{state}</h2>
              <ul className="space-y-2">
                {byState[state].map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/sop-generator/${city.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Don&apos;t see your city? We still serve you.</h2>
          <p className="text-blue-100 mb-6">SnapOps works for any business, anywhere. 5 free SOPs/month.</p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-8 text-xs text-gray-400 text-center">
          SnapOps is an AI-powered tool that assists with SOP creation. Generated content should be reviewed by qualified personnel before implementation.
          {' '}<Link href="/terms" className="underline">Terms</Link> · <Link href="/privacy" className="underline">Privacy</Link> · <Link href="/disclaimer" className="underline">Disclaimer</Link>
        </p>
      </main>
    </div>
  )
}
