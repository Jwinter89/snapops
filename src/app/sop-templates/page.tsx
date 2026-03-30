import Link from 'next/link'
import { FileText, ArrowRight, Search } from 'lucide-react'
import type { Metadata } from 'next'
import { industries } from './industries-data'
import EmailCapture from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'SOP Templates by Industry | SnapOps - AI SOP Generator',
  description: 'Browse 50+ industry-specific SOP templates. Generate professional standard operating procedures for oil & gas, construction, manufacturing, healthcare, and more.',
  keywords: [
    'SOP templates',
    'standard operating procedure templates',
    'SOP generator',
    'industry SOP',
    'free SOP template',
    'procedure template',
  ],
  openGraph: {
    title: 'SOP Templates by Industry | SnapOps',
    description: 'Browse 50+ industry-specific SOP templates. Generate professional standard operating procedures instantly.',
    url: 'https://snapops.app/sop-templates',
    siteName: 'SnapOps',
    type: 'website',
  },
  alternates: {
    canonical: 'https://snapops.app/sop-templates',
  },
}

const categories: { label: string; slugs: string[] }[] = [
  {
    label: 'Energy & Resources',
    slugs: ['oil-and-gas', 'mining', 'solar-energy', 'wind-energy', 'water-treatment', 'waste-management', 'forestry'],
  },
  {
    label: 'Construction & Trades',
    slugs: ['construction', 'electrical', 'plumbing', 'hvac', 'roofing', 'painting', 'welding', 'concrete', 'demolition', 'excavation', 'fire-protection'],
  },
  {
    label: 'Manufacturing & Warehousing',
    slugs: ['manufacturing', 'warehousing', 'printing'],
  },
  {
    label: 'Food & Beverage',
    slugs: ['food-service', 'catering', 'bakery', 'brewery', 'distillery'],
  },
  {
    label: 'Healthcare & Wellness',
    slugs: ['healthcare-admin', 'dental-office', 'optometry', 'pharmacy', 'veterinary'],
  },
  {
    label: 'Transportation & Logistics',
    slugs: ['logistics', 'trucking', 'aviation', 'marine', 'moving-services'],
  },
  {
    label: 'Property & Facilities',
    slugs: ['property-management', 'cleaning-services', 'janitorial', 'landscaping', 'security-services', 'storage-facilities'],
  },
  {
    label: 'Retail & Services',
    slugs: ['retail', 'auto-repair', 'car-wash', 'dry-cleaning', 'pest-control', 'photography', 'event-planning'],
  },
  {
    label: 'Agriculture',
    slugs: ['agriculture'],
  },
]

function getIndustryBySlug(slug: string) {
  return industries.find((ind) => ind.slug === slug)
}

export default function SopTemplatesIndex() {
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
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          SOP Templates by Industry
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Browse {industries.length} industry-specific SOP templates. Select your industry to see example procedures,
          compliance requirements, and generate your first SOP free.
        </p>
        <div className="mt-6">
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Generate Your First SOP Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Industry Categories */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {categories.map((category) => (
            <div key={category.label} className="mb-10 last:mb-0">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{category.label}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.slugs.map((slug) => {
                  const ind = getIndustryBySlug(slug)
                  if (!ind) return null
                  return (
                    <Link
                      key={slug}
                      href={`/sop-templates/${slug}`}
                      className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
                    >
                      <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-600 shrink-0" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{ind.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Email Capture */}
      <section className="max-w-xl mx-auto px-6 py-12">
        <EmailCapture source="sop-templates" />
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Don&apos;t see your industry?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          SnapOps works for any industry. Paste your notes and our AI will generate a professional SOP
          tailored to your specific operations, terminology, and compliance requirements.
        </p>
        <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          Try SnapOps Free <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <span>SnapOps &mdash; AI-powered SOPs for every team.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/sop-templates" className="hover:text-gray-700">All Templates</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-gray-700">Disclaimer</Link>
            <Link href="/login" className="hover:text-gray-700">Log in</Link>
          </div>
        </div>
        <p className="mt-4 max-w-5xl mx-auto px-6 text-center text-xs text-gray-400">
          SnapOps is an AI-powered tool that assists with SOP creation. Generated content should be reviewed by qualified personnel before implementation. SnapOps does not provide legal, safety, or compliance advice.
        </p>
      </footer>
    </div>
  )
}
