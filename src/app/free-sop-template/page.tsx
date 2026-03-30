import Link from 'next/link'
import { FileText, ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free SOP Template — Download or Generate Instantly | SnapOps',
  description: 'Download a free SOP template or generate a custom one instantly with AI. Professional Standard Operating Procedure format with purpose, scope, procedures, and safety sections.',
  keywords: ['free SOP template', 'SOP template download', 'standard operating procedure template', 'SOP format', 'SOP example'],
  alternates: { canonical: 'https://snapops.app/free-sop-template' },
}

export default function FreeSOPTemplate() {
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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Free SOP Template
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Use this Standard Operating Procedure template as a starting point, or let SnapOps generate a custom one from your notes in 30 seconds.
        </p>

        {/* Template */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 mb-8 font-mono text-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1 font-sans">Standard Operating Procedure</h2>
          <p className="text-gray-500 mb-6 font-sans text-xs">Copy this template and fill in the brackets</p>

          <div className="space-y-4 text-gray-700">
            <p><strong>Title:</strong> [Procedure Name]</p>
            <p><strong>SOP Number:</strong> [SOP-XXX]</p>
            <p><strong>Effective Date:</strong> [Date]</p>
            <p><strong>Revision:</strong> [1.0]</p>
            <p><strong>Approved By:</strong> [Name, Title]</p>

            <hr className="border-gray-300" />

            <p><strong>1. Purpose</strong></p>
            <p className="pl-4">[Describe why this procedure exists and what it aims to achieve]</p>

            <p><strong>2. Scope</strong></p>
            <p className="pl-4">[Who does this apply to? What equipment, locations, or processes are covered?]</p>

            <p><strong>3. Responsibilities</strong></p>
            <p className="pl-4">[List each role and their specific responsibilities in this procedure]</p>

            <p><strong>4. Procedure</strong></p>
            <p className="pl-4">4.1 [First step — be specific and actionable]</p>
            <p className="pl-4">4.2 [Second step]</p>
            <p className="pl-4">4.3 [Third step]</p>
            <p className="pl-4">4.4 [Continue as needed]</p>

            <p><strong>5. Safety Considerations</strong></p>
            <p className="pl-4">[List all safety warnings, PPE requirements, and hazard controls]</p>

            <p><strong>6. References</strong></p>
            <p className="pl-4">[List related documents, standards, regulations, and manufacturer manuals]</p>

            <p><strong>7. Revision History</strong></p>
            <p className="pl-4">[Date | Version | Description of Change | Author]</p>
          </div>
        </div>

        {/* Why use SnapOps instead */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">Or skip the template entirely</h2>
          <p className="text-sm text-blue-800 mb-4">
            Instead of filling in a blank template, paste your rough notes into SnapOps and get a complete, professional SOP in 30 seconds. The AI fills in everything — purpose, scope, responsibilities, step-by-step procedures, safety warnings, and regulatory references.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-blue-800"><Check className="h-4 w-4 text-blue-600" /> Auto-formats your messy notes into professional structure</div>
            <div className="flex items-center gap-2 text-sm text-blue-800"><Check className="h-4 w-4 text-blue-600" /> Adds industry-specific terminology and standards</div>
            <div className="flex items-center gap-2 text-sm text-blue-800"><Check className="h-4 w-4 text-blue-600" /> Includes safety warnings you might miss</div>
            <div className="flex items-center gap-2 text-sm text-blue-800"><Check className="h-4 w-4 text-blue-600" /> 5 free SOPs every month, no credit card</div>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
            Try the AI Generator Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tips */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for writing effective SOPs</h2>
        <div className="space-y-3 mb-8">
          <p className="text-gray-600"><strong>Be specific.</strong> &ldquo;Tighten the bolt&rdquo; is vague. &ldquo;Tighten the M12 flange bolt to 85 ft-lbs using a calibrated torque wrench&rdquo; is actionable.</p>
          <p className="text-gray-600"><strong>Use active voice.</strong> &ldquo;The valve should be opened&rdquo; becomes &ldquo;Open the valve.&rdquo;</p>
          <p className="text-gray-600"><strong>Include safety first.</strong> Put warnings BEFORE the step they apply to, not after.</p>
          <p className="text-gray-600"><strong>Test with a new person.</strong> Have someone unfamiliar with the task follow the SOP. If they get stuck, the SOP needs more detail.</p>
          <p className="text-gray-600"><strong>Review annually.</strong> Equipment changes, regulations update, and people learn better methods. Keep SOPs current.</p>
        </div>

        <p className="text-xs text-gray-400 text-center">
          SnapOps is an AI-powered tool. Generated SOPs should be reviewed by qualified personnel before implementation.
          <Link href="/disclaimer" className="underline ml-1">Disclaimer</Link>
        </p>
      </main>
    </div>
  )
}
