import Link from 'next/link'
import { FileText, ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What is a Standard Operating Procedure (SOP)? | Complete Guide',
  description: 'Learn what a standard operating procedure (SOP) is, why SOPs matter for your business, how to write one, and see examples across industries. Complete SOP guide.',
  keywords: [
    'what is an SOP',
    'what is a standard operating procedure',
    'SOP meaning',
    'SOP definition',
    'standard operating procedure example',
    'how to write an SOP',
    'SOP template',
  ],
  alternates: {
    canonical: 'https://snapops.app/what-is-sop',
  },
  openGraph: {
    title: 'What is a Standard Operating Procedure (SOP)? | Complete Guide',
    description: 'Learn what a standard operating procedure is, why SOPs matter, and how to create them efficiently. Comprehensive guide with examples.',
    url: 'https://snapops.app/what-is-sop',
    siteName: 'SnapOps',
    type: 'article',
  },
}

export default function WhatIsSopPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': 'What is a Standard Operating Procedure (SOP)?',
            'description': 'A comprehensive guide to standard operating procedures: what they are, why they matter, and how to create them.',
            'author': {
              '@type': 'Organization',
              'name': 'SnapOps',
              'url': 'https://snapops.app',
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'SnapOps',
              'url': 'https://snapops.app',
              'logo': 'https://snapops.app/icon.png',
            },
            'mainEntityOfPage': 'https://snapops.app/what-is-sop',
          }),
        }}
      />

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
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          What is a Standard Operating Procedure (SOP)?
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          A standard operating procedure is a documented set of step-by-step instructions that describes how to perform a routine activity. SOPs ensure that work is done consistently, safely, and in compliance with regulations — regardless of who performs the task.
        </p>
      </section>

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        {/* Definition Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">SOP Definition</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A <strong>Standard Operating Procedure (SOP)</strong> is a written document that provides clear, detailed instructions for performing a specific task or process within an organization. The term &ldquo;standard&rdquo; refers to the fact that the procedure is the agreed-upon, approved method for completing the task. &ldquo;Operating&rdquo; indicates that it relates to day-to-day operational activities. And &ldquo;procedure&rdquo; means it is a defined sequence of steps.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            SOPs are used across virtually every industry — from healthcare and manufacturing to food service, construction, oil and gas, and technology. Any organization that needs consistent, repeatable processes benefits from well-written SOPs.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The International Organization for Standardization (ISO), the Occupational Safety and Health Administration (OSHA), and the Environmental Protection Agency (EPA) all reference SOPs as essential components of quality management and workplace safety systems.
          </p>
        </section>

        {/* Why SOPs Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Are SOPs Important?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Standard operating procedures serve several critical functions within an organization. Without documented procedures, you rely on individual knowledge, verbal instructions, and institutional memory — all of which are unreliable and impossible to audit.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Consistency</p>
                <p className="text-sm text-gray-600">SOPs ensure that every employee performs a task the same way, every time. This reduces variability in output quality and minimizes errors that come from improvised or remembered instructions.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Safety</p>
                <p className="text-sm text-gray-600">In industries like oil and gas, construction, and manufacturing, SOPs include critical safety steps, required personal protective equipment (PPE), and hazard identification. Proper SOPs help prevent workplace injuries and incidents.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Regulatory Compliance</p>
                <p className="text-sm text-gray-600">Many regulatory bodies — including OSHA, the FDA, EPA, and ISO auditors — require documented procedures as part of compliance. Having up-to-date SOPs is often a requirement for certifications and inspections.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Training and Onboarding</p>
                <p className="text-sm text-gray-600">SOPs provide new employees with clear instructions for performing their duties. Instead of relying solely on shadowing or verbal training, new hires can reference documented procedures to learn tasks correctly from day one.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Knowledge Preservation</p>
                <p className="text-sm text-gray-600">When experienced employees leave, retire, or are unavailable, their knowledge goes with them — unless it has been documented. SOPs capture institutional knowledge in a form that outlasts any individual team member.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Accountability</p>
                <p className="text-sm text-gray-600">With documented procedures, there is a clear reference point for how work should be done. This makes it easier to identify where processes broke down when issues occur and to implement corrective actions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Should an SOP Include */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Should an SOP Include?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            While the exact format may vary by organization and industry, a well-structured SOP typically includes the following sections:
          </p>
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Section</th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-3 font-medium text-gray-900">Title</td>
                  <td className="px-6 py-3">A clear, descriptive name for the procedure</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Purpose</td>
                  <td className="px-6 py-3">Why this procedure exists and what it accomplishes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-3 font-medium text-gray-900">Scope</td>
                  <td className="px-6 py-3">Who the SOP applies to and under what conditions</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Responsibilities</td>
                  <td className="px-6 py-3">Who is responsible for each aspect of the procedure</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-3 font-medium text-gray-900">Safety Considerations</td>
                  <td className="px-6 py-3">Hazards, required PPE, and safety precautions</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">Equipment & Materials</td>
                  <td className="px-6 py-3">Tools, materials, and resources needed</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-3 font-medium text-gray-900">Step-by-Step Procedure</td>
                  <td className="px-6 py-3">Numbered, sequential instructions for completing the task</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">References</td>
                  <td className="px-6 py-3">Related regulations, standards, or documents (OSHA, ISO, etc.)</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-medium text-gray-900">Revision History</td>
                  <td className="px-6 py-3">Record of changes, dates, and approvals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Types of SOPs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of SOPs</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            SOPs come in several formats depending on the complexity of the process and the needs of the organization:
          </p>
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Step-by-Step SOPs</h3>
              <p className="text-sm text-gray-600">The most common format. A numbered list of sequential steps that must be followed in order. Best for linear processes where each step depends on the previous one. Example: equipment startup procedures, chemical mixing instructions.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Hierarchical SOPs</h3>
              <p className="text-sm text-gray-600">Steps are organized with sub-steps and nested instructions. Used for more complex procedures where individual steps contain multiple actions. Example: quality inspection procedures with branching criteria.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Flowchart SOPs</h3>
              <p className="text-sm text-gray-600">A visual representation of a process using decision points, branches, and flow arrows. Best for processes with multiple decision points or conditional paths. Example: troubleshooting guides, incident response procedures.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Checklist SOPs</h3>
              <p className="text-sm text-gray-600">A list of items or steps that must be verified or completed, without requiring a specific order. Common in inspection, safety, and audit contexts. Example: pre-shift safety inspection checklists.</p>
            </div>
          </div>
        </section>

        {/* Industries That Use SOPs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Industries That Rely on SOPs</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            While every industry benefits from documented procedures, some sectors have particularly strong requirements for SOPs due to safety, regulatory, or quality management needs:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'Oil & Gas', desc: 'Well operations, safety procedures, environmental compliance' },
              { name: 'Manufacturing', desc: 'Production processes, quality control, equipment maintenance' },
              { name: 'Healthcare', desc: 'Clinical procedures, infection control, medication administration' },
              { name: 'Food Service', desc: 'Food safety, preparation procedures, sanitation' },
              { name: 'Construction', desc: 'Safety procedures, equipment operation, site management' },
              { name: 'Pharmaceuticals', desc: 'GMP compliance, laboratory procedures, documentation' },
              { name: 'Agriculture', desc: 'Crop management, equipment operation, chemical handling' },
              { name: 'Technology', desc: 'Deployment procedures, incident response, security protocols' },
            ].map((industry) => (
              <div key={industry.name} className="rounded-lg bg-gray-50 px-4 py-3">
                <p className="font-medium text-gray-900 text-sm">{industry.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{industry.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            SnapOps supports <Link href="/sop-templates" className="text-blue-600 hover:underline">50+ industry-specific templates</Link> with appropriate terminology, safety language, and regulatory references for each sector.
          </p>
        </section>

        {/* How to Write an SOP */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Write an SOP</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Writing an effective SOP involves several key steps. The goal is to capture the process clearly enough that someone with basic knowledge of the role can follow it successfully.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Identify the process</h3>
                <p className="text-sm text-gray-600 mt-1">Choose a specific, repeatable task that needs documentation. Start with high-priority procedures — those related to safety, compliance, or frequently performed tasks where consistency matters most.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">Gather information from subject matter experts</h3>
                <p className="text-sm text-gray-600 mt-1">Talk to the people who actually perform the task. Observe the process being done. Collect rough notes, bullet points, and details about tools, materials, safety considerations, and common pitfalls.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">Structure the document</h3>
                <p className="text-sm text-gray-600 mt-1">Organize the information into standard SOP sections: title, purpose, scope, responsibilities, safety, equipment, procedures, and references. Use clear, concise language and numbered steps.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-gray-900">Review and validate</h3>
                <p className="text-sm text-gray-600 mt-1">Have the SOP reviewed by someone who performs the task, a supervisor, and if applicable, a safety or compliance officer. Test the procedure by having someone follow it step by step.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">5</div>
              <div>
                <h3 className="font-semibold text-gray-900">Publish and maintain</h3>
                <p className="text-sm text-gray-600 mt-1">Make the SOP accessible to everyone who needs it. Establish a review schedule (quarterly or annually) to keep procedures current. Track revisions with version numbers and dates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common SOP Mistakes to Avoid</h2>
          <div className="space-y-3">
            {[
              { mistake: 'Too vague', fix: 'Include specific details — measurements, tool names, exact sequences. Avoid phrases like "do it properly" or "as needed."' },
              { mistake: 'Too long', fix: 'Keep SOPs focused on a single task. If a procedure has more than 20-25 steps, consider breaking it into multiple SOPs.' },
              { mistake: 'Never updated', fix: 'Establish a regular review schedule. Outdated SOPs are worse than no SOPs because they create a false sense of compliance.' },
              { mistake: 'Written by the wrong person', fix: 'SOPs should be informed by the people who do the work, not just written by management or a documentation team unfamiliar with the process.' },
              { mistake: 'Not accessible', fix: 'If people cannot find the SOP when they need it, it might as well not exist. Use a searchable, centralized system.' },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <p className="font-medium text-gray-900 text-sm">{item.mistake}</p>
                <p className="text-sm text-gray-600 mt-1">{item.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How SnapOps Helps */}
        <section className="mb-12 rounded-xl bg-blue-50 border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create SOPs Faster with SnapOps</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The biggest barrier to having documented SOPs is the time it takes to write them. Most teams know they need better documentation, but the people with the knowledge rarely have hours to spend formatting documents.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            SnapOps solves this by letting you paste in rough notes, bullet points, or voice transcriptions, and generating a complete, professionally formatted SOP in about 30 seconds. The AI handles structure, formatting, safety language, and industry-appropriate terminology — you provide the process knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Try SnapOps Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/sop-templates" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Browse Industry Templates
            </Link>
          </div>
        </section>

        {/* FAQ Schema-targeted section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions About SOPs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">What does SOP stand for?</h3>
              <p className="text-sm text-gray-600">SOP stands for Standard Operating Procedure. It is a documented set of instructions that describes how to perform a routine activity within an organization.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">What is the difference between an SOP and a work instruction?</h3>
              <p className="text-sm text-gray-600">An SOP typically covers a broader process and includes context like purpose, scope, and safety considerations. A work instruction is usually more narrowly focused on the specific steps to complete a single task, often as part of a larger SOP.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">How often should SOPs be reviewed?</h3>
              <p className="text-sm text-gray-600">Most organizations review SOPs annually at minimum. High-risk or frequently changing procedures should be reviewed quarterly. SOPs should also be updated whenever processes, equipment, or regulations change.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Who is responsible for writing SOPs?</h3>
              <p className="text-sm text-gray-600">SOPs should be written with input from the people who perform the task (subject matter experts). They are typically reviewed by supervisors and, where applicable, safety or compliance officers. Management is responsible for ensuring SOPs exist and are maintained.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Are SOPs legally required?</h3>
              <p className="text-sm text-gray-600">Requirements vary by industry and jurisdiction. OSHA requires written procedures for certain hazardous operations. FDA-regulated industries require documented procedures under Good Manufacturing Practices (GMP). ISO certifications require documented processes. Even where not legally required, SOPs are considered a best practice for operational management.</p>
            </div>
          </div>
        </section>
      </article>

      {/* CTA */}
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
              <Link href="/compare" className="hover:text-gray-700">Compare</Link>
              <Link href="/what-is-sop" className="hover:text-gray-700">What is an SOP?</Link>
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
