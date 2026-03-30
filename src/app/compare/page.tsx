import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { comparisons } from './comparisons-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SnapOps vs Other SOP Tools | Compare SOP Software',
  description: 'Compare SnapOps to other SOP tools including Word templates, Google Docs, Notion, Process Street, Trainual, and SweetProcess. See why teams choose AI-powered SOP generation.',
  keywords: ['SOP software comparison', 'SOP tool comparison', 'SnapOps alternative', 'best SOP software', 'SOP generator comparison'],
  alternates: {
    canonical: 'https://snapops.app/compare',
  },
  openGraph: {
    title: 'SnapOps vs Other SOP Tools | Compare SOP Software',
    description: 'Compare SnapOps to other SOP tools. See why teams choose AI-powered SOP generation over manual methods.',
    url: 'https://snapops.app/compare',
    siteName: 'SnapOps',
    type: 'website',
  },
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SnapOps</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sop-templates" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Templates</Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          SnapOps vs Other SOP Tools
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          See how SnapOps compares to popular SOP creation methods and tools.
          Find the right solution for your team&apos;s procedure documentation needs.
        </p>
      </section>

      {/* Comparison Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                SnapOps vs {comp.competitorName}
              </h2>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {comp.heroSubtitle}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                Read comparison <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to try a faster way to create SOPs?</h2>
          <p className="text-blue-100 mb-8">Start free. Generate your first SOP in 30 seconds.</p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-gray-900">SnapOps</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/sop-templates" className="hover:text-gray-700">Templates</Link>
              <Link href="/compare" className="hover:text-gray-700">Compare</Link>
              <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
              <Link href="/disclaimer" className="hover:text-gray-700">Disclaimer</Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            SnapOps is an AI-powered tool that assists with SOP creation. Generated content should be reviewed by qualified personnel before implementation. SnapOps does not provide legal, safety, or compliance advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
