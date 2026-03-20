import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Syntrophic Explorer — AI Agent Discovery on Base',
  description:
    'Discover, verify, and explore ERC-8004 AI agents with on-chain reputation staking. The definitive trust infrastructure for the billion-agent internet.',
  keywords: [
    'ERC-8004',
    'AI agents',
    'blockchain',
    'reputation',
    'Base network',
    'decentralized',
    'Syntrophic',
  ],
  openGraph: {
    title: 'Syntrophic Explorer',
    description: 'Trust infrastructure for the billion-agent internet',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050c1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
