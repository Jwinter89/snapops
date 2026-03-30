import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introducing SnapOps — AI-Powered SOP Generator for Every Industry',
  description: 'SnapOps turns your messy notes into professional Standard Operating Procedures in 30 seconds. Free for 5 SOPs/month. Built for safety managers, operations directors, and small business owners.',
  openGraph: {
    title: 'Introducing SnapOps — Generate Professional SOPs in 30 Seconds',
    description: 'Stop spending hours formatting SOPs in Word. Paste your notes, get a professional procedure instantly.',
    url: 'https://snapops.app/blog/launch',
    type: 'article',
  },
  alternates: { canonical: 'https://snapops.app/blog/launch' },
}

export default function LaunchPost() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SnapOps</span>
          </Link>
          <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Try Free
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <time className="text-sm text-gray-500">March 29, 2026</time>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
          We built an AI that writes your SOPs for you
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed">
            Every business needs Standard Operating Procedures. Nobody wants to write them. That&apos;s why most companies have outdated SOPs gathering dust in a binder somewhere — or worse, no documented procedures at all.
          </p>

          <h2>The problem</h2>
          <p>
            Writing a single SOP takes 2-4 hours. You need to organize your thoughts, format the document, add the right sections (purpose, scope, responsibilities, step-by-step procedures, safety warnings), reference applicable regulations, and make it clear enough for anyone to follow.
          </p>
          <p>
            Most safety managers and operations directors know their procedures cold — they just don&apos;t have time to sit down and write them out properly. So the knowledge stays in their heads, and when they&apos;re not around, things go wrong.
          </p>

          <h2>The solution</h2>
          <p>
            <strong>SnapOps</strong> takes your rough notes — bullet points, voice transcripts, even stream-of-consciousness descriptions — and transforms them into professionally formatted SOPs in about 30 seconds.
          </p>
          <p>
            Select your industry, and the AI uses the right terminology, safety standards, and regulatory references. An oil &amp; gas SOP references OSHA and API standards. A food service SOP references HACCP and FDA Food Code. A construction SOP includes fall protection and confined space requirements.
          </p>

          <h2>How it works</h2>
          <ol>
            <li><strong>Paste your notes</strong> — whatever format, however messy</li>
            <li><strong>Select your industry</strong> — we support 50+ industries</li>
            <li><strong>Get your SOP</strong> — professional format in 30 seconds</li>
            <li><strong>Save and organize</strong> — build a searchable SOP library your whole team can access</li>
          </ol>

          <h2>Who is this for?</h2>
          <ul>
            <li><strong>Safety managers</strong> who need to document procedures but don&apos;t have time</li>
            <li><strong>Operations directors</strong> preparing for ISO audits or regulatory inspections</li>
            <li><strong>Small business owners</strong> who need to get procedures out of their head and into writing</li>
            <li><strong>Compliance officers</strong> building or updating their procedure library</li>
            <li><strong>Training coordinators</strong> creating onboarding materials for new hires</li>
          </ul>

          <h2>Pricing</h2>
          <p>
            <strong>Free:</strong> 5 SOPs per month. No credit card required. Just sign up and start generating.
          </p>
          <p>
            <strong>Pro ($19/mo):</strong> Unlimited SOPs, team sharing, PDF export. Cancel anytime.
          </p>
          <p>
            <strong>Business ($49/mo):</strong> Everything in Pro plus custom branding, API access, and bulk import.
          </p>

          <h2>Try it now</h2>
          <p>
            Go to <Link href="/" className="text-blue-600 font-medium">snapops.app</Link>, sign up in 10 seconds, and generate your first SOP. You&apos;ll wonder why you ever spent hours doing it manually.
          </p>
        </div>

        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-3">Ready to stop writing SOPs from scratch?</h2>
          <p className="text-blue-100 mb-6">5 free SOPs every month. No credit card required.</p>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          SnapOps is an AI-powered tool. Generated SOPs should be reviewed by qualified personnel before implementation. SnapOps does not provide legal, safety, or compliance advice.
          {' '}<Link href="/terms" className="underline">Terms</Link> · <Link href="/privacy" className="underline">Privacy</Link> · <Link href="/disclaimer" className="underline">Disclaimer</Link>
        </p>
      </article>
    </div>
  )
}
