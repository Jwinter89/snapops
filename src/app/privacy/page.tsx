import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — SnapOps',
  description: 'SnapOps Privacy Policy. Learn how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-lg text-gray-900">SnapOps</span>
          </Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12 prose prose-sm prose-gray">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500">Last updated: March 29, 2026</p>

        <h2>1. Information We Collect</h2>
        <h3>Account Information</h3>
        <p>When you create an account, we collect your email address and an encrypted password. We do not store passwords in plain text.</p>

        <h3>SOP Content</h3>
        <p>We store the notes you input and the SOPs generated from them. This data is associated with your account and used solely to provide the Service.</p>

        <h3>Payment Information</h3>
        <p>Payment processing is handled entirely by Stripe. We do not store credit card numbers, CVVs, or full payment details on our servers. We receive only a Stripe customer ID and subscription status.</p>

        <h3>Usage Data</h3>
        <p>We collect anonymized usage analytics through Vercel Analytics, including page views, browser type, and general geographic region. This data does not identify individual users.</p>

        <h2>2. How We Use Your Data</h2>
        <ul>
          <li><strong>To provide the Service:</strong> Your input content is sent to an AI model to generate SOPs. Generated content is stored in your account.</li>
          <li><strong>To process payments:</strong> Subscription and billing data is managed through Stripe.</li>
          <li><strong>To improve the Service:</strong> Anonymized usage data helps us understand how the product is used.</li>
          <li><strong>To communicate with you:</strong> We may send transactional emails related to your account.</li>
        </ul>

        <h2>3. AI Processing</h2>
        <p>Your input content is processed by Anthropic&apos;s Claude AI to generate SOPs. This processing occurs via API calls. We do not use your content to train AI models. Anthropic&apos;s data processing is governed by their <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600">privacy policy</a>.</p>

        <h2>4. Data Security</h2>
        <ul>
          <li>All data is encrypted in transit using TLS 1.3</li>
          <li>Data at rest is encrypted on our database provider (Supabase)</li>
          <li>Row-level security ensures users can only access their own data</li>
          <li>API endpoints require authentication</li>
          <li>Rate limiting protects against abuse</li>
          <li>We use security headers including Content-Security-Policy and HSTS</li>
        </ul>

        <h2>5. Data Sharing</h2>
        <p>We do not sell, rent, or share your personal data with third parties except:</p>
        <ul>
          <li><strong>Stripe:</strong> For payment processing</li>
          <li><strong>Supabase:</strong> For data storage and authentication</li>
          <li><strong>Anthropic:</strong> For AI processing of SOP generation requests</li>
          <li><strong>Vercel:</strong> For hosting and anonymized analytics</li>
          <li><strong>Resend:</strong> For transactional and marketing email delivery</li>
          <li><strong>Law enforcement:</strong> If required by law or valid legal process</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>Your data is retained as long as your account is active. If you delete your account, your data will be permanently deleted within 30 days. Anonymized analytics data may be retained indefinitely.</p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your account and associated data</li>
          <li>Export your SOP data</li>
          <li>Opt out of non-essential communications</li>
        </ul>

        <h2>8. Cookies</h2>
        <p>We use essential cookies for authentication (session tokens). We do not use advertising or tracking cookies. Vercel Analytics uses privacy-friendly, cookie-less analytics.</p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>The Service is not intended for users under 18. We do not knowingly collect data from children.</p>

        <h2>10. International Data Transfers</h2>
        <p>Your data may be processed in the United States where our servers are located. By using the Service, you consent to this transfer.</p>

        <h2>11. European Users (GDPR)</h2>
        <p>If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, the following additional rights and disclosures apply:</p>
        <h3>Lawful Basis for Processing</h3>
        <ul>
          <li><strong>Contract performance:</strong> Processing your data to provide the Service (account creation, SOP generation, payment processing)</li>
          <li><strong>Legitimate interests:</strong> Improving the Service, preventing fraud, ensuring security</li>
          <li><strong>Consent:</strong> Marketing emails and optional analytics (you may withdraw consent at any time)</li>
        </ul>
        <h3>Additional Rights</h3>
        <p>In addition to the rights listed in Section 7, you have the right to:</p>
        <ul>
          <li><strong>Object to processing:</strong> You may object to processing based on legitimate interests</li>
          <li><strong>Restrict processing:</strong> You may request we limit how we use your data</li>
          <li><strong>Data portability:</strong> Receive your data in a structured, machine-readable format</li>
          <li><strong>Lodge a complaint:</strong> You may file a complaint with your local supervisory authority (data protection authority)</li>
        </ul>
        <h3>International Transfers</h3>
        <p>Data transferred outside the EEA is protected by Standard Contractual Clauses (SCCs) approved by the European Commission, or other appropriate safeguards as required by GDPR.</p>

        <h2>12. California Users (CCPA/CPRA)</h2>
        <p>If you are a California resident, the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) provide you with additional rights:</p>
        <h3>Categories of Personal Information Collected</h3>
        <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '14px'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #e5e7eb'}}>
              <th style={{textAlign: 'left', padding: '8px'}}>Category</th>
              <th style={{textAlign: 'left', padding: '8px'}}>Examples</th>
              <th style={{textAlign: 'left', padding: '8px'}}>Sold?</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{borderBottom: '1px solid #e5e7eb'}}>
              <td style={{padding: '8px'}}>Identifiers</td>
              <td style={{padding: '8px'}}>Email address</td>
              <td style={{padding: '8px'}}>No</td>
            </tr>
            <tr style={{borderBottom: '1px solid #e5e7eb'}}>
              <td style={{padding: '8px'}}>Commercial info</td>
              <td style={{padding: '8px'}}>Subscription plan, payment history</td>
              <td style={{padding: '8px'}}>No</td>
            </tr>
            <tr style={{borderBottom: '1px solid #e5e7eb'}}>
              <td style={{padding: '8px'}}>Internet activity</td>
              <td style={{padding: '8px'}}>Page views, feature usage</td>
              <td style={{padding: '8px'}}>No</td>
            </tr>
            <tr>
              <td style={{padding: '8px'}}>User content</td>
              <td style={{padding: '8px'}}>SOP inputs and outputs</td>
              <td style={{padding: '8px'}}>No</td>
            </tr>
          </tbody>
        </table>
        <h3>Your California Rights</h3>
        <ul>
          <li><strong>Right to know:</strong> Request what personal information we collect, use, and disclose</li>
          <li><strong>Right to delete:</strong> Request deletion of your personal information</li>
          <li><strong>Right to opt out of sale:</strong> We do not sell your personal information. No action is needed.</li>
          <li><strong>Right to non-discrimination:</strong> We will not discriminate against you for exercising your rights</li>
          <li><strong>Right to correct:</strong> Request correction of inaccurate personal information</li>
        </ul>
        <p>To exercise these rights, contact us at privacy@snapops.app. We will respond within 45 days as required by law.</p>

        <h2>13. Changes to This Policy</h2>
        <p>We may update this privacy policy. Material changes will be communicated via email. Continued use after changes constitutes acceptance.</p>

        <h2>14. Contact</h2>
        <p>For privacy-related questions or data requests, contact us at privacy@snapops.app.</p>
      </main>
    </div>
  )
}
