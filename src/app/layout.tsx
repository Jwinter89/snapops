import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SnapOps — AI-Powered Standard Operating Procedures',
  description: 'Turn messy notes into professional SOPs in seconds. AI-powered SOP generator for every industry.',
  keywords: ['SOP generator', 'standard operating procedures', 'AI SOP', 'SOP template', 'procedure writer'],
  openGraph: {
    title: 'SnapOps — AI-Powered Standard Operating Procedures',
    description: 'Turn messy notes into professional SOPs in seconds. Paste your bullet points, get a formatted SOP instantly.',
    url: 'https://snapops.app',
    siteName: 'SnapOps',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapOps — AI-Powered SOPs',
    description: 'Turn messy notes into professional SOPs in seconds.',
  },
  metadataBase: new URL('https://snapops.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
