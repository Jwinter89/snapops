import Link from 'next/link'
import { FileText, Zap, Shield, ArrowRight, Check, Lock, Clock, Star, Building2 } from 'lucide-react'
import LiveDemo from '@/components/LiveDemo'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SnapOps",
              "url": "https://snapops.app",
              "description": "AI-powered SOP generator that turns messy notes into professional Standard Operating Procedures in 30 seconds",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": [
                {
                  "@type": "Offer",
                  "name": "Free",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                {
                  "@type": "Offer",
                  "name": "Pro",
                  "price": "19",
                  "priceCurrency": "USD",
                  "billingIncrement": 1,
                  "unitCode": "MON"
                },
                {
                  "@type": "Offer",
                  "name": "Business",
                  "price": "49",
                  "priceCurrency": "USD",
                  "billingIncrement": 1,
                  "unitCode": "MON"
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is the AI-generated content accurate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SnapOps generates professional SOP formatting and structure. You should always review and customize the output for your specific workplace conditions, equipment, and regulations. The AI provides an excellent starting point that saves hours of formatting work."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my data secure?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. All data is encrypted in transit (TLS 1.3) and at rest. We use Supabase with row-level security, meaning your SOPs are only accessible by your account. We never share your data with third parties. Payments are processed securely through Stripe."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I cancel anytime?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. You can cancel your subscription at any time from your billing dashboard. Your access continues until the end of your billing period. No cancellation fees, no questions asked."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries do you support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SnapOps supports 50+ industries including oil & gas, construction, manufacturing, healthcare, food service, and many more. See all industry templates at https://snapops.app/sop-templates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do the SOPs meet regulatory standards?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SnapOps generates SOPs with industry-appropriate structure including safety considerations, references to standards (OSHA, EPA, ISO, etc.), and proper formatting. However, you are responsible for ensuring your SOPs meet your specific regulatory requirements. Always have qualified personnel review SOPs before implementation."
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SnapOps",
              "url": "https://snapops.app",
              "description": "AI-powered SOP generator that turns messy notes into professional Standard Operating Procedures in 30 seconds",
              "logo": "https://snapops.app/icon.png"
            }
          ])
        }}
      />
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">SnapOps</span>
          </div>
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
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-sm text-orange-700 mb-6">
          <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
          AI-Powered SOPs for Blue-Collar Workers
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
          Turn messy notes into professional SOPs in seconds
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Paste your bullet points, voice notes, or rough process descriptions.
          SnapOps transforms them into clear, formatted Standard Operating Procedures — instantly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
            Start Free — No Credit Card <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> 256-bit encryption</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> SOPs in 30 seconds</span>
          <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> SOC 2 compliant infra</span>
        </div>
      </section>

      {/* Live Demo */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <LiveDemo />
      </section>

      {/* Social Proof / Stats */}
      <section className="border-t border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-500 mt-1">Industries supported</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">30s</p>
              <p className="text-sm text-gray-500 mt-1">Average generation time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">OSHA</p>
              <p className="text-sm text-gray-500 mt-1">Compliance-ready format</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">Free</p>
              <p className="text-sm text-gray-500 mt-1">5 SOPs every month</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
            <h3 className="font-semibold text-gray-900 mb-2">Paste your notes</h3>
            <p className="text-sm text-gray-600">Dump in your rough notes, bullet points, voice transcripts — whatever you have. No formatting needed.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
            <h3 className="font-semibold text-gray-900 mb-2">AI generates your SOP</h3>
            <p className="text-sm text-gray-600">Our AI formats it into a professional, step-by-step SOP with purpose, scope, safety warnings, and numbered procedures.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
            <h3 className="font-semibold text-gray-900 mb-2">Save, search, share</h3>
            <p className="text-sm text-gray-600">Build your company&apos;s SOP library. Search instantly. Export to PDF. Share with your team.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Built for real operations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 bg-white rounded-xl p-5 border border-gray-200">
              <Zap className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Instant generation</h3>
                <p className="text-sm text-gray-600">Professional SOPs in under 30 seconds. No more spending hours formatting documents in Word.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-5 border border-gray-200">
              <Building2 className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Industry-aware</h3>
                <p className="text-sm text-gray-600">Select your industry and get SOPs with the right terminology, safety standards, and compliance language.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-5 border border-gray-200">
              <FileText className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Searchable library</h3>
                <p className="text-sm text-gray-600">Every SOP is saved and searchable. Find any procedure instantly when an auditor asks.</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white rounded-xl p-5 border border-gray-200">
              <Lock className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure by default</h3>
                <p className="text-sm text-gray-600">Your data is encrypted in transit and at rest. Row-level security ensures only your team sees your SOPs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Built for people who know the work but hate the paperwork</h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">If you&apos;ve ever thought &ldquo;I know this procedure cold, I just don&apos;t have time to write it out&rdquo; — SnapOps is for you.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-2">Safety Managers</p>
            <p className="text-sm text-gray-600">Turn field notes and JSAs into formatted SOPs with proper safety warnings and regulatory references. Stop spending hours in Word.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-2">Operations Directors</p>
            <p className="text-sm text-gray-600">Build your company&apos;s SOP library fast. Go from a handful of documented procedures to full coverage. Be ready when the auditor walks in.</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-2">Small Business Owners</p>
            <p className="text-sm text-gray-600">Get procedures out of your head and into a format your team can follow. Train new hires faster. Reduce mistakes when you&apos;re not there.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Simple, transparent pricing</h2>
          <p className="text-center text-gray-600 mb-12">Start free. Upgrade when you need more.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Free</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">$0<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <p className="text-xs text-gray-500 mt-1">No credit card required</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> 5 SOPs per month</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> SOP library</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Markdown export</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> 12 industry templates</li>
              </ul>
              <Link href="/login" className="mt-6 block text-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-xl border-2 border-blue-600 p-6 relative shadow-md">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</span>
              <h3 className="font-semibold text-gray-900">Pro</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">$19<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <p className="text-xs text-gray-500 mt-1">Cancel anytime</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Unlimited SOPs</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Team sharing</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> PDF export</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Priority generation</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Email support</li>
              </ul>
              <Link href="/login" className="mt-6 block text-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                Start Pro
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900">Business</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">$49<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <p className="text-xs text-gray-500 mt-1">For larger teams</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Everything in Pro</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Custom branding</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> API access</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Bulk import</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><Check className="h-4 w-4 text-green-500 shrink-0" /> Dedicated support</li>
              </ul>
              <Link href="/login" className="mt-6 block text-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Start Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Is the AI-generated content accurate?</h3>
            <p className="text-sm text-gray-600">SnapOps generates professional SOP formatting and structure. You should always review and customize the output for your specific workplace conditions, equipment, and regulations. The AI provides an excellent starting point that saves hours of formatting work.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Is my data secure?</h3>
            <p className="text-sm text-gray-600">Yes. All data is encrypted in transit (TLS 1.3) and at rest. We use Supabase with row-level security, meaning your SOPs are only accessible by your account. We never share your data with third parties. Payments are processed securely through Stripe.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Can I cancel anytime?</h3>
            <p className="text-sm text-gray-600">Yes. You can cancel your subscription at any time from your billing dashboard. Your access continues until the end of your billing period. No cancellation fees, no questions asked.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">What industries do you support?</h3>
            <p className="text-sm text-gray-600">SnapOps supports 50+ industries including oil &amp; gas, construction, manufacturing, healthcare, food service, and many more. <Link href="/sop-templates" className="text-blue-600 hover:underline">See all industry templates</Link>.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Do the SOPs meet regulatory standards?</h3>
            <p className="text-sm text-gray-600">SnapOps generates SOPs with industry-appropriate structure including safety considerations, references to standards (OSHA, EPA, ISO, etc.), and proper formatting. However, you are responsible for ensuring your SOPs meet your specific regulatory requirements. Always have qualified personnel review SOPs before implementation.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-100 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stop writing SOPs from scratch</h2>
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
              <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
              <Link href="/disclaimer" className="hover:text-gray-700">Disclaimer</Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            SnapOps is an AI-powered tool that assists with SOP creation. Generated content should be reviewed by qualified personnel before implementation. SnapOps does not provide legal, safety, or compliance advice.
          </p>
          <p className="mt-2 text-center text-xs text-gray-400">
            Developed by <a href="https://www.winterhowlers.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600 underline">Winter Howlers</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
