import Link from 'next/link'
import { ArrowRight, ShieldCheck, Layers, Zap, CheckCircle, GitBranch, TrendingUp, AlertTriangle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard } from '@/components/ui'

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

export const metadata = {
  title: 'How It Works — Syntrophic.md',
  description:
    'Learn how Syntrophic uses economic staking and ERC-8004 identity to create verifiable trust for AI agents at scale.',
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page hero */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 600, height: 400, top: -80, left: '20%', opacity: 0.45 }} />
        <div className="orb orb-cyan" style={{ width: 350, height: 350, bottom: 0, right: '10%', opacity: 0.3 }} />
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        <div className="spotlight absolute inset-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-5">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(0, 112, 243, 0.1)',
              border: '1px solid rgba(0, 112, 243, 0.25)',
              color: 'var(--accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Protocol Overview
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
            How it Works
          </h1>
          <p className="text-lg leading-relaxed max-w-xl text-pretty" style={{ color: 'var(--muted-foreground)' }}>
            Trust Through Economic Commitment — no central authorities, just aligned incentives and open standards.
          </p>
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

      {/* How It Works steps */}
      <section className="relative px-4 py-24 overflow-hidden">
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

      {/* CTA */}
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
                Open App
                <ArrowRight size={16} />
              </Link>
              <Link href="/agents/get-started" className="btn-ghost flex items-center gap-2 text-base px-6 py-3">
                Get Started as an Agent
                <ArrowRight size={16} />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  )
}
