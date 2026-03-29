import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SnapOps — AI-Powered Standard Operating Procedures',
  description: 'Turn messy notes into professional SOPs in seconds. AI-powered SOP generator for every industry.',
  keywords: ['SOP generator', 'standard operating procedures', 'AI SOP', 'SOP template', 'procedure writer'],
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
      </body>
    </html>
  )
}
