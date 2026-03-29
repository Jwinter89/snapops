import Link from 'next/link'
import { FileText, Zap, Shield, Users, ArrowRight, Check } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SnapOps</span>
          </div>
          <div className="flex items-center gap-4">
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
          Turn messy notes into professional SOPs in seconds
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Paste your bullet points, voice notes, or rough process descriptions.
          SnapOps transforms them into clear, formatted Standard Operating Procedures — instantly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-gray-500">5 free SOPs/month. No credit card required.</span>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Paste your notes</h3>
              <p className="text-sm text-gray-600">Dump in your rough notes, bullet points, voice transcripts — whatever you have.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI generates your SOP</h3>
              <p className="text-sm text-gray-600">Our AI formats it into a professional, step-by-step SOP with all the right sections.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Save, search, share</h3>
              <p className="text-sm text-gray-600">Build your company&apos;s SOP library. Search instantly. Export to PDF. Share with your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <Zap className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant generation</h3>
              <p className="text-sm text-gray-600">Professional SOPs in under 30 seconds. No more spending hours formatting documents.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Shield className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Industry-aware</h3>
              <p className="text-sm text-gray-600">Select your industry and get SOPs with the right terminology, safety standards, and compliance language.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <FileText className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Searchable library</h3>
              <p className="text-sm text-gray-600">Every SOP is saved and searchable. Find any procedure in seconds, not hours.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Users className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Team sharing</h3>
              <p className="text-sm text-gray-600">Share SOPs with your whole team. Everyone on the same page, always up to date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Simple pricing</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Free</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">$0<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> 5 SOPs per month</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> SOP library</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Markdown export</li>
              </ul>
              <Link href="/login" className="mt-6 block text-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-xl border-2 border-blue-600 p-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">Popular</span>
              <h3 className="font-semibold text-gray-900">Pro</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">$19<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Unlimited SOPs</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Team sharing</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> PDF export</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Priority generation</li>
              </ul>
              <Link href="/login" className="mt-6 block text-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Start Pro
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Business</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">$49<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Everything in Pro</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Custom branding</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> API access</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500" /> Bulk import</li>
              </ul>
              <Link href="/login" className="mt-6 block text-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Start Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
          SnapOps — AI-powered SOPs for every team.
        </div>
      </footer>
    </div>
  )
}
