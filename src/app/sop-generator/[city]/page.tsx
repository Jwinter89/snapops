import Link from 'next/link'
import { FileText, ArrowRight, Check, MapPin } from 'lucide-react'
import { cities } from '../cities-data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { city: string }
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) return {}
  return {
    title: `SOP Generator for ${city.name}, ${city.state} | SnapOps`,
    description: `Generate professional Standard Operating Procedures for businesses in ${city.name}, ${city.state}. AI-powered SOP templates for ${city.industries.slice(0, 3).join(', ')}, and more. Free to start.`,
    openGraph: {
      title: `SOP Generator for ${city.name}, ${city.state}`,
      description: `AI-powered SOP generator for ${city.name} businesses. Create professional procedures in 30 seconds.`,
      url: `https://snapops.app/sop-generator/${city.slug}`,
    },
    alternates: { canonical: `https://snapops.app/sop-generator/${city.slug}` },
  }
}

export default function CityPage({ params }: Props) {
  const city = cities.find((c) => c.slug === params.city)
  if (!city) notFound()

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/sop-generator" className="hover:text-gray-700">SOP Generator</Link>
          <span>/</span>
          <span className="text-gray-900">{city.name}, {city.state}</span>
        </div>

        <div className="flex items-center gap-2 text-blue-600 mb-4">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-medium">{city.name}, {city.state}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          SOP Generator for {city.name}, {city.state} Businesses
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {city.name} businesses across {city.industries.slice(0, -1).join(', ')}, and {city.industries[city.industries.length - 1]} need
          documented Standard Operating Procedures to stay compliant, keep workers safe, and maintain quality.
          SnapOps generates professional SOPs from your rough notes in seconds — no formatting, no templates to fill out.
        </p>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Top industries we serve in {city.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {city.industries.map((ind) => (
              <div key={ind} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                {ind} SOPs
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Why {city.name} businesses use SnapOps</h2>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            Whether you&apos;re running a {city.industries[0].toLowerCase()} operation or managing a {city.industries[1].toLowerCase()} team
            in {city.name}, you know that undocumented procedures lead to inconsistency, safety incidents, and failed audits.
            Writing SOPs from scratch takes hours. SnapOps does it in 30 seconds.
          </p>
          <p className="text-gray-600">
            Paste your field notes, safety briefing bullet points, or verbal instructions into SnapOps. Our AI formats them
            into professional SOPs with proper structure — purpose, scope, responsibilities, step-by-step procedures,
            safety considerations, and regulatory references. All tailored to your industry.
          </p>
          <p className="text-gray-600">
            Your SOPs are stored in a searchable library. When an auditor shows up or a new hire needs training,
            you find the right procedure in seconds. Export to PDF, share with your team, keep everything up to date.
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">How it works</h2>
        <ol className="space-y-3 mb-8">
          <li className="flex gap-3 text-gray-600">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
            <span>Paste your rough notes, bullet points, or voice transcript</span>
          </li>
          <li className="flex gap-3 text-gray-600">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
            <span>Select your industry for {city.name}-relevant terminology and standards</span>
          </li>
          <li className="flex gap-3 text-gray-600">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">3</span>
            <span>Get a professional, formatted SOP in 30 seconds — ready to review and implement</span>
          </li>
        </ol>

        <div className="bg-blue-600 rounded-xl p-8 text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-3">Start generating SOPs for your {city.name} business</h2>
          <p className="text-blue-100 mb-6">5 free SOPs every month. No credit card required.</p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="text-xs text-gray-400 text-center">
          SnapOps is an AI-powered tool. Generated SOPs should be reviewed by qualified personnel before implementation.
          See our <Link href="/disclaimer" className="underline">disclaimer</Link>.
        </p>
      </main>
    </div>
  )
}
