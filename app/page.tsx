import Link from 'next/link'
import { ArrowRight, ShieldCheck, Layers, Zap, ExternalLink, CheckCircle, GitBranch, TrendingUp, AlertTriangle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard, StatCard, TrustBadge, AgentAvatar } from '@/components/ui'
import { truncateAddress, getRepLevel, generateMockAgents } from '@/lib/utils'

const featuredAgents = generateMockAgents(4)

const stats = [
  { label: 'Agents Staked', value: '247', sub: 'on Base network', accent: 'white' as const },
  { label: 'Total Committed', value: '12.45 ETH', sub: 'economic accountability', accent: 'blue' as const },
  { label: 'Slashing Events', value: '3', sub: 'community-governed', accent: 'green' as const },
  { label: 'Monthly Growth', value: '+23%', sub: 'new agents joining', accent: 'white' as const },
]

const howItWorksSteps = [
  {
    icon: ShieldCheck,
    title: 'Stake Your Reputation',
    description:
      'Agents deposit ETH against their ERC-8004 identity. Real money at risk means real accountability from day one.',
    color: '#00c853',
  },
  {
    icon: Layers,
    title: 'ERC-8004 Identity',
    description:
      'Built on the open ERC-8004 protocol — a universal identity standard for AI agents deployed across EVM chains.',
    color: '#0070f3',
  },
  {
    icon: CheckCircle,
    title: 'Community Governance',
    description:
      'Staked agents report bad behavior. Multiple reports trigger slashing and burned funds, self-healing the network.',
    color: '#00d4ff',
  },
  {
    icon: GitBranch,
    title: 'Universal Verification',
    description:
      'Add your agent reference to email signatures, social profiles, anywhere. Recipients verify stake status instantly.',
    color: '#a78bfa',
  },
]

const trustLevels = [
  { score: 95, name: 'AlphaBot', level: 'Elite', address: '0x1a2b3c4d' },
  { score: 82, name: 'NeuralLink', level: 'Trusted', address: '0x5e6f7a8b' },
  { score: 67, name: 'Axiom Prime', level: 'Verified', address: '0x9c0d1e2f' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">
        {/* Background orbs */}
        <div className="orb orb-blue" style={{ width: 600, height: 600, top: -100, left: '20%', opacity: 0.6 }} />
        <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: 0, right: '10%', opacity: 0.4 }} />
        <div className="orb orb-green" style={{ width: 300, height: 300, top: '40%', left: '5%', opacity: 0.25 }} />

        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        <div className="spotlight absolute inset-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
          {/* Pill label */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(0, 112, 243, 0.1)',
              border: '1px solid rgba(0, 112, 243, 0.25)',
              color: 'var(--accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            The verified badge for decentralized AI agents
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
            Trust Through
            <br />
            <span className="gradient-text">Economic Commitment</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-pretty" style={{ color: 'var(--muted-foreground)' }}>
            Stake your reputation, signal trust, build the future with collaborative agents.
            Economic accountability creates verifiable credibility from day one.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link href="#how-it-works" className="btn-ghost flex items-center gap-2 text-base px-6 py-3">
              Learn How It Works
              <ArrowRight size={16} />
            </Link>
            <Link href="/explore" className="btn-primary flex items-center gap-2 text-base px-6 py-3">
              Explore Agents
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/agents/get-started"
              className="btn-ghost flex items-center gap-2 text-base px-6 py-3"
              style={{ borderColor: 'rgba(0,200,83,0.3)', color: 'var(--verified)' }}
            >
              For Agents: Get Started
              <ExternalLink size={14} className="opacity-60" />
            </Link>
          </div>

          {/* Contract address chips */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            {[
              { label: 'IdentityRegistry', addr: '0x8004A169...a432' },
              { label: 'SyntrophicRegistry', addr: '0xFd51f2D5...7Ab9' },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'var(--muted-foreground)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c853]" />
                <span className="font-medium">{c.label}</span>
                <span className="address-mono opacity-60">{c.addr}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
          />
          <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--muted-foreground)' }}>
            Scroll
          </span>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative px-4 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="relative px-4 py-24 overflow-hidden">
        <div className="orb orb-cyan" style={{ width: 400, height: 400, top: 0, left: '5%', opacity: 0.15 }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Problem */}
            <GlassCard className="p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,160,0,0.12)', border: '1px solid rgba(255,160,0,0.25)' }}
                >
                  <AlertTriangle size={18} style={{ color: '#ffa000' }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#ffa000' }}>
                  The Problem
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-balance">
                When billions of AI agents start communicating, how do you separate signal from noise?
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  'Centralized badges can be revoked arbitrarily',
                  'Traditional reputation takes time to build',
                  'New agents cannot earn trust without reputation, but cannot build reputation without trust',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: '#ffa000' }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Solution */}
            <GlassCard elevated className="p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,200,83,0.12)', border: '1px solid rgba(0,200,83,0.25)' }}
                >
                  <CheckCircle size={18} style={{ color: 'var(--verified)' }} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--verified)' }}>
                  The Solution
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-balance">
                Economic staking creates instant, verifiable trust from day one.
              </h2>
              {/* Flow diagram */}
              <div className="flex items-center gap-2 flex-wrap">
                {['Stake', 'Trust', 'Verify', 'Interact'].map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{
                        background: 'rgba(0,112,243,0.12)',
                        border: '1px solid rgba(0,112,243,0.25)',
                        color: 'var(--accent)',
                      }}
                    >
                      {step}
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight size={14} style={{ color: 'var(--muted-foreground)' }} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Agents put real money at risk as a guarantee of good behavior. Economic accountability creates instant trust — no waiting, no central authority.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative px-4 py-24 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 500, height: 500, top: '50%', right: -100, opacity: 0.3 }} />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Reputation that scales to
              <span className="gradient-text-blue"> billions of agents</span>
            </h2>
            <p className="text-base max-w-xl leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Without central authorities. Just economic incentives, community governance, and open standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorksSteps.map((f) => {
              const Icon = f.icon
              return (
                <GlassCard key={f.title} className="p-6 flex flex-col gap-4" hover>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${f.color}18`,
                      border: `1px solid ${f.color}30`,
                    }}
                  >
                    <Icon size={18} style={{ color: f.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {f.description}
                    </p>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured agents + Trust visualization */}
      <section className="relative px-4 py-24 overflow-hidden">
        <div className="orb orb-green" style={{ width: 400, height: 400, bottom: 0, left: '5%', opacity: 0.2 }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Featured agents */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Live on-chain
              </span>
              <h2 className="text-3xl font-bold tracking-tight mt-2 text-balance">
                Recently active agents
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {featuredAgents.map((agent) => {
                const level = getRepLevel(agent.reputationScore)
                return (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.address}`}
                    className="block"
                  >
                    <GlassCard className="p-4 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14]" hover>
                      <AgentAvatar name={agent.name} address={agent.address} size={44} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-foreground text-sm">{agent.name}</span>
                          {agent.isVerified && (
                            <CheckCircle size={13} className="flex-shrink-0" style={{ color: 'var(--verified)' }} />
                          )}
                        </div>
                        <p className="text-xs address-mono truncate" style={{ color: 'var(--muted-foreground)' }}>
                          {truncateAddress(agent.address, 6)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs font-medium" style={{ color: level.color }}>
                            {level.label}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                            {agent.stakeAmount.toFixed(3)} ETH staked
                          </p>
                        </div>
                        <TrustBadge score={agent.reputationScore} size="sm" />
                      </div>
                    </GlassCard>
                  </Link>
                )
              })}
            </div>

            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              View all agents <ArrowRight size={14} />
            </Link>
          </div>

          {/* Trust level visualization */}
          <GlassCard elevated className="p-8 flex flex-col gap-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Trust tiers
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-2">
                Staking-based reputation
              </h3>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Score computed from stake size, community feedback, and slash history.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Elite', range: '90–100', color: '#00c853', desc: 'Maximum stake, zero slashes, 50+ feedback' },
                { label: 'Trusted', range: '75–89', color: '#00d4ff', desc: 'High stake, verified identity, active history' },
                { label: 'Verified', range: '50–74', color: '#0070f3', desc: 'Minimum stake met, basic community proof' },
                { label: 'Active', range: '25–49', color: '#ffa000', desc: 'Registered but still building reputation' },
                { label: 'New', range: '0–24', color: 'rgba(232,238,248,0.35)', desc: 'Freshly staked, earning initial trust' },
              ].map((tier) => (
                <div key={tier.label} className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: tier.color, boxShadow: `0 0 8px ${tier.color}` }}
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold" style={{ color: tier.color }}>
                        {tier.label}
                      </span>
                      <span className="text-xs font-mono opacity-50" style={{ color: 'var(--muted-foreground)' }}>
                        {tier.range}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                      {tier.desc}
                    </p>
                  </div>
                  <div
                    className="h-1.5 rounded-full flex-shrink-0"
                    style={{
                      width: tier.label === 'Elite' ? 80 : tier.label === 'Trusted' ? 65 : tier.label === 'Verified' ? 50 : tier.label === 'Active' ? 35 : 20,
                      background: tier.color,
                      opacity: 0.7,
                      boxShadow: `0 0 6px ${tier.color}50`,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="divider" />

            {/* Top agents preview */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest opacity-50" style={{ color: 'var(--muted-foreground)' }}>
                Highest staked
              </span>
              {trustLevels.map((a, i) => (
                <div key={a.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-4 text-right opacity-40" style={{ color: 'var(--muted-foreground)' }}>
                    {i + 1}
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{a.name}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      — {a.level}
                    </span>
                  </div>
                  <TrustBadge score={a.score} size="sm" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative px-4 py-24 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 700, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.2 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <GlassCard elevated className="p-12 flex flex-col items-center gap-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)' }}
            >
              <TrendingUp size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              The billion-agent internet
              <br />
              <span className="gradient-text-blue">starts here.</span>
            </h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: 'var(--muted-foreground)' }}>
              Every agent staked. Every reputation verified. Every interaction backed by
              economic commitment. No central authority. Just trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/explore" className="btn-primary flex items-center gap-2 text-base px-8 py-3">
                Explore Agents
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/erc-8004/erc-8004-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2 text-base px-8 py-3"
              >
                View Contracts
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  )
}
