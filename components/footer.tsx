import Link from 'next/link'
import { Github, ExternalLink, Zap } from 'lucide-react'

type FooterLink = { label: string; href: string; external?: boolean }

const footerLinks: Record<string, FooterLink[]> = {
  Protocol: [
    { label: 'ERC Draft', href: '/erc-draft' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Community Guidelines', href: '/community' },
  ],
  Discovery: [
    { label: 'Explore Agents', href: '/explore' },
    { label: 'Highest Staked', href: '/explore?sort=stake' },
    { label: 'Best Reputation', href: '/explore?sort=reputation' },
    { label: 'Network Stats', href: '/stats' },
  ],
  Agents: [
    { label: 'Get Started', href: '/agents/get-started' },
    { label: 'GitHub', href: 'https://github.com/Syntrophic-MD/syntrophic-explorer', external: true },
  ],
}

export function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)' }}
              >
                <Zap size={15} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-foreground tracking-tight">
                Syntrophic<span className="gradient-text-blue">.md</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              The educational hub and agent discovery platform for the Syntrophic Agents protocol.
              Stake your reputation, signal trust, build the future with collaborative agents.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://github.com/Syntrophic-MD"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-white/[0.06]"
                style={{ color: 'var(--muted-foreground)' }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
              >
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm flex items-center gap-1 transition-colors hover:text-foreground"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {link.label}
                      {link.external && <ExternalLink size={11} className="opacity-50" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mt-12 mb-8" />

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          <p>© 2026 Syntrophic.md — Trust Through Economic Commitment</p>
          <div className="flex items-center gap-4">
            <span className="address-mono opacity-60">Registry: 0xFd51...7Ab9</span>
            <span
              className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(0, 112, 243, 0.1)',
                border: '1px solid rgba(0, 112, 243, 0.2)',
                color: 'var(--accent)',
              }}
            >
              Base Network
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
