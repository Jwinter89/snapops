import Link from 'next/link'
import { FileText, ArrowRight, Check } from 'lucide-react'
import { comparisons } from '../comparisons-data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const comparison = comparisons.find((c) => c.slug === params.slug)
  if (!comparison) return {}

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    keywords: [
      `${comparison.competitorName} alternative`,
      `SnapOps vs ${comparison.competitorName}`,
      'SOP software',
      'SOP generator',
      'best SOP tool',
    ],
    alternates: {
      canonical: `https://snapops.app/compare/${comparison.slug}`,
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `https://snapops.app/compare/${comparison.slug}`,
      siteName: 'SnapOps',
      type: 'article',
    },
  }
}

export default function ComparisonPage({ params }: PageProps) {
  const comparison = comparisons.find((c) => c.slug === params.slug)

  if (!comparison) {
    notFound()
  }

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

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <nav className="text-sm text-gray-500">
          <Link href="/compare" className="hover:text-blue-600">Compare</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">SnapOps vs {comparison.competitorName}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          SnapOps vs {comparison.competitorName} for SOPs
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          {comparison.heroSubtitle}
        </p>
        <div className="mt-8">
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Try SnapOps Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-900 px-6 py-4">Feature</th>
                  <th className="text-left text-sm font-semibold text-blue-600 px-6 py-4">SnapOps</th>
                  <th className="text-left text-sm font-semibold text-gray-500 px-6 py-4">{comparison.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.features.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="text-sm text-gray-900 font-medium px-6 py-4">{row.feature}</td>
                    <td className="text-sm text-gray-700 px-6 py-4">
                      <span className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {row.snapops}
                      </span>
                    </td>
                    <td className="text-sm text-gray-500 px-6 py-4">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Detailed Comparison: SnapOps vs {comparison.competitorName}
        </h2>
        <div className="space-y-6">
          {comparison.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Quick Summary */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Why teams choose SnapOps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">30s</p>
              <p className="text-sm text-gray-600 mt-2">Average time to generate a complete SOP from rough notes</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">50+</p>
              <p className="text-sm text-gray-600 mt-2">Industry-specific templates with safety and compliance language</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">Free</p>
              <p className="text-sm text-gray-600 mt-2">Get started with 5 SOPs per month, no credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Comparisons */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Other comparisons</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {comparisons
            .filter((c) => c.slug !== comparison.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                vs {c.competitorName}
              </Link>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to create SOPs faster?</h2>
          <p className="text-blue-100 mb-8">Join teams across 50+ industries who generate professional SOPs in seconds, not hours.</p>
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
