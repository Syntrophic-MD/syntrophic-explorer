'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/agents/get-started', label: 'For Agents' },
  { href: '/erc-draft', label: 'ERC Draft' },
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(5, 12, 26, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
                opacity: 0.9,
              }}
            />
            <Zap className="relative z-10 text-white" size={15} strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-foreground tracking-tight text-[15px]">
            Syntrophic
            <span className="gradient-text-blue ml-0.5">.md</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = !link.external && link.href !== '/' && pathname?.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-foreground bg-white/[0.07]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/explore"
            className="btn-primary text-sm"
          >
            Open App
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/explore"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-sm mt-2 text-center"
          >
            Open App
          </Link>
        </div>
      )}
    </header>
  )
}
