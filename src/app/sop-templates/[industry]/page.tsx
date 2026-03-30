import Link from 'next/link'
import { FileText, ArrowRight, ClipboardList, BookOpen, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { industries } from '../industries-data'
import { notFound } from 'next/navigation'
import EmailCapture from '@/components/EmailCapture'

interface PageProps {
  params: { industry: string }
}

export function generateStaticParams() {
  return industries.map((ind) => ({
    industry: ind.slug,
  }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const data = industries.find((ind) => ind.slug === params.industry)
  if (!data) return {}

  return {
    title: `${data.name} SOP Templates | SnapOps - AI SOP Generator`,
    description: `Generate professional ${data.name} standard operating procedures instantly. ${data.metaDescription}`,
    keywords: [
      `${data.name} SOP template`,
      `${data.name} standard operating procedures`,
      `${data.name} SOP generator`,
      `${data.name} procedures`,
      `${data.name} operations manual`,
      'SOP template',
      'SOP generator',
    ],
    openGraph: {
      title: `${data.name} SOP Templates | SnapOps`,
      description: `Generate professional ${data.name} standard operating procedures instantly. ${data.metaDescription}`,
      url: `https://snapops.app/sop-templates/${data.slug}`,
      siteName: 'SnapOps',
      type: 'website',
    },
    alternates: {
      canonical: `https://snapops.app/sop-templates/${data.slug}`,
    },
  }
}

export default function IndustryPage({ params }: PageProps) {
  const data = industries.find((ind) => ind.slug === params.industry)
  if (!data) notFound()

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
            <Link href="/sop-templates" className="text-sm text-gray-600 hover:text-gray-900">All Templates</Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-6 py-3">
        <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/sop-templates" className="hover:text-gray-700">SOP Templates</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{data.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {data.name} SOP Templates
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          {data.heroText}
        </p>
        <div className="mt-6">
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Generate Your First SOP Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex gap-4 mb-6">
            <BookOpen className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
            <h2 className="text-2xl font-bold text-gray-900">Why {data.name} Needs Documented SOPs</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed">{data.paragraph1}</p>
            <p className="text-gray-600 leading-relaxed mt-4">{data.paragraph2}</p>
          </div>
        </div>
      </section>

      {/* Example SOPs */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex gap-4 mb-6">
          <ClipboardList className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
          <h2 className="text-2xl font-bold text-gray-900">Example {data.name} SOPs You Can Generate</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {data.exampleSops.map((sop, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{sop.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{sop.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{data.complianceHeading}</h2>
          <p className="text-gray-600 leading-relaxed">{data.paragraph3}</p>
          <p className="text-gray-600 leading-relaxed mt-4">{data.paragraph4}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Start Building Your {data.name} SOP Library
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Paste your notes, checklists, or rough procedures. SnapOps generates professional,
          formatted SOPs tailored to the {data.name.toLowerCase()} industry in seconds.
        </p>
        <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          Get Started Free &mdash; 5 SOPs/month <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-sm text-gray-500">No credit card required.</p>
      </section>

      {/* Footer */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <EmailCapture source={`sop-templates-${params.industry}`} />
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <span>SnapOps &mdash; AI-powered SOPs for every team.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <Link href="/sop-templates" className="hover:text-gray-700">All Templates</Link>
            <Link href="/login" className="hover:text-gray-700">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
