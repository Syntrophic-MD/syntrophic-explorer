import Link from 'next/link'
import { ExternalLink, FileText, Users, ArrowRight, BookOpen, Shield, Database, CheckSquare } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard } from '@/components/ui'

export const metadata = {
  title: 'ERC-8004 Draft — Syntrophic.md',
  description:
    'ERC-8004: Trustless Agents — the open Ethereum standard for agent discovery, identity, reputation, and validation.',
}

const authors = [
  { name: 'Marco De Rossi', handle: '@MarcoMetaMask' },
  { name: 'Davide Crapis', handle: '@dcrapis' },
  { name: 'Jordan Ellis', handle: 'jordanellis@google.com' },
  { name: 'Erik Reppel', handle: 'erik.reppel@coinbase.com' },
]

const registries = [
  {
    icon: Shield,
    color: '#0070f3',
    title: 'Identity Registry',
    description:
      'A minimal on-chain handle based on ERC-721 with URIStorage. Resolves to an agent registration file, giving every agent a portable, censorship-resistant identifier.',
  },
  {
    icon: Database,
    color: '#00d4ff',
    title: 'Reputation Registry',
    description:
      'A standard interface for posting and fetching feedback signals. Scoring and aggregation occur both on-chain (for composability) and off-chain (for sophisticated algorithms).',
  },
  {
    icon: CheckSquare,
    color: '#00c853',
    title: 'Validation Registry',
    description:
      'Generic hooks for requesting and recording independent validator checks — stake-secured re-execution, zkML verifiers, TEE oracles, or trusted judges.',
  },
]

const trustModels = [
  { label: 'Reputation', desc: 'Client feedback signals aggregated on- and off-chain.' },
  { label: 'Crypto-Economic', desc: 'Stake-secured re-execution of agent tasks.' },
  { label: 'zkML Proofs', desc: 'Zero-knowledge machine learning proofs.' },
  { label: 'TEE Attestation', desc: 'Trusted execution environment oracle verification.' },
]

const feedbackTags = [
  { tag: 'starred', measure: 'Quality rating (0–100)', example: '87/100' },
  { tag: 'reachable', measure: 'Endpoint reachable (binary)', example: 'true' },
  { tag: 'ownerVerified', measure: 'Endpoint owned by agent owner', example: 'true' },
  { tag: 'uptime', measure: 'Endpoint uptime (%)', example: '99.77%' },
  { tag: 'successRate', measure: 'Endpoint success rate (%)', example: '89%' },
  { tag: 'responseTime', measure: 'Response time (ms)', example: '560 ms' },
  { tag: 'revenues', measure: 'Cumulative revenues (USD)', example: '$560' },
  { tag: 'tradingYield', measure: 'Trading yield', example: '-3.2%' },
]

export default function ErcDraftPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[44vh] flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 600, height: 400, top: -80, left: '15%', opacity: 0.45 }} />
        <div className="orb orb-cyan" style={{ width: 350, height: 350, bottom: 0, right: '8%', opacity: 0.3 }} />
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        <div className="spotlight absolute inset-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto gap-5">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'rgba(255, 160, 0, 0.1)',
              border: '1px solid rgba(255, 160, 0, 0.3)',
              color: '#ffa000',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffa000] animate-pulse" />
            Draft — Standards Track: ERC
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
            ERC-8004
            <br />
            <span className="gradient-text-blue">Trustless Agents</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-xl text-pretty" style={{ color: 'var(--muted-foreground)' }}>
            An open Ethereum standard for discovering agents and establishing trust through reputation and validation — without central authorities.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href="https://eips.ethereum.org/EIPS/eip-8004"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm px-6 py-2.5"
            >
              View on EIPs
              <ExternalLink size={14} />
            </a>
            <a
              href="https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex items-center gap-2 text-sm px-6 py-2.5"
            >
              Discussion
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Metadata strip */}
      <section className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                  Status
                </span>
                <span
                  className="text-sm font-semibold px-2.5 py-1 rounded-full self-start"
                  style={{ background: 'rgba(255,160,0,0.12)', border: '1px solid rgba(255,160,0,0.25)', color: '#ffa000' }}
                >
                  Draft
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                  Created
                </span>
                <span className="text-sm text-foreground">2025-08-13</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                  Requires
                </span>
                <span className="text-sm text-foreground">EIP-155, 712, 721, 1271</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                  Track
                </span>
                <span className="text-sm text-foreground">Standards Track: ERC</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Authors */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Authors
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {authors.map((a) => (
              <GlassCard key={a.name} className="p-4 flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">{a.name}</span>
                <span className="text-xs address-mono" style={{ color: 'var(--muted-foreground)' }}>{a.handle}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Abstract
            </span>
          </div>
          <GlassCard elevated className="p-8">
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              This protocol proposes to use blockchains to discover, choose, and interact with agents across organizational
              boundaries without pre-existing trust, thus enabling open-ended agent economies. Trust models are pluggable
              and tiered, with security proportional to value at risk — from low-stake tasks like ordering pizza to
              high-stake tasks like medical diagnosis. Developers can choose from reputation systems using client
              feedback, validation via stake-secured re-execution, zero-knowledge machine learning (zkML) proofs, or
              trusted execution environment (TEE) oracles.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Three Registries */}
      <section className="relative px-4 py-16 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 500, height: 400, top: 0, right: -100, opacity: 0.2 }} />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Specification
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Three lightweight
              <span className="gradient-text-blue"> registries</span>
            </h2>
            <p className="text-base max-w-xl leading-relaxed text-pretty" style={{ color: 'var(--muted-foreground)' }}>
              Deployable on any EVM L2 or Mainnet as per-chain singletons. Each registry handles a distinct concern.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {registries.map((r) => {
              const Icon = r.icon
              return (
                <GlassCard key={r.title} className="p-7 flex flex-col gap-4" hover>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${r.color}18`, border: `1px solid ${r.color}30` }}
                  >
                    <Icon size={20} style={{ color: r.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{r.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {r.description}
                    </p>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* Identity Registry detail */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#0070f3' }}>
              Identity Registry
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Agent URI &amp; Registration File</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <GlassCard className="p-7 flex flex-col gap-4">
              <h3 className="font-semibold text-foreground">Global Agent ID</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Each agent is uniquely identified globally by a colon-separated string combining namespace, chain ID,
                and identity registry address:
              </p>
              <code
                className="text-xs px-4 py-3 rounded-lg block leading-relaxed address-mono"
                style={{
                  background: 'rgba(0,112,243,0.08)',
                  border: '1px solid rgba(0,112,243,0.2)',
                  color: 'var(--accent)',
                }}
              >
                eip155:{'{'} chainId {'}'}:{'{'} identityRegistry {'}'}
              </code>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                The ERC-721 token owner controls the agent. Ownership can be transferred or management delegated to
                operators via{' '}
                <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--accent)' }}>
                  ERC721URIStorage
                </code>
                .
              </p>
            </GlassCard>
            <GlassCard className="p-7 flex flex-col gap-4">
              <h3 className="font-semibold text-foreground">Supported Endpoint Types</h3>
              <div className="grid grid-cols-2 gap-2">
                {['A2A', 'MCP', 'OASF', 'ENS', 'DID', 'Email', 'Web', 'Wallet'].map((ep) => (
                  <div
                    key={ep}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-center"
                    style={{
                      background: 'rgba(0,112,243,0.08)',
                      border: '1px solid rgba(0,112,243,0.18)',
                      color: 'var(--accent)',
                    }}
                  >
                    {ep}
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                The number and type of endpoints are fully customizable. The registration file links from the blockchain
                to a flexible structure combining AI and Web3 primitives.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Reputation Registry detail */}
      <section className="relative px-4 py-16 overflow-hidden">
        <div className="orb orb-cyan" style={{ width: 400, height: 400, top: 0, left: '5%', opacity: 0.12 }} />
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00d4ff' }}>
              Reputation Registry
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Feedback Signals &amp; Scoring</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <GlassCard className="p-7 flex flex-col gap-4">
              <h3 className="font-semibold text-foreground">How Feedback Works</h3>
              <div className="flex flex-col gap-3">
                {[
                  'Any client address can submit feedback — value, decimals, optional tags, and an off-chain file URI.',
                  'Feedback data is stored on-chain for composability; full details live off-chain (IPFS recommended).',
                  'Clients can revoke feedback; anyone can append a response to existing feedback.',
                  'Agent owners and operators cannot submit feedback on their own agent.',
                  'On-chain getSummary() enables composable reputation in smart contracts.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#00d4ff' }} />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="p-7 flex flex-col gap-4">
              <h3 className="font-semibold text-foreground">Standard Feedback Tags</h3>
              <div className="flex flex-col gap-2">
                {feedbackTags.map((row) => (
                  <div
                    key={row.tag}
                    className="flex items-center justify-between gap-4 py-2"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <code className="text-xs address-mono" style={{ color: 'var(--accent)', minWidth: 120 }}>{row.tag}</code>
                    <span className="text-xs flex-1" style={{ color: 'var(--muted-foreground)' }}>{row.measure}</span>
                    <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{row.example}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Validation Registry detail */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00c853' }}>
              Validation Registry
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Independent Verification</h2>
          </div>
          <GlassCard className="p-7 flex flex-col gap-5">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Agents request verification of their work by submitting a{' '}
              <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.07)', color: '#00c853' }}>validationRequest</code>{' '}
              with a pointer to off-chain data. Validator smart contracts respond with a score from 0–100 and optional evidence URI.
              Multiple responses are supported per request — enabling progressive finality patterns.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {trustModels.map((tm) => (
                <div
                  key={tm.label}
                  className="p-4 rounded-xl flex flex-col gap-2"
                  style={{ background: 'rgba(0,200,83,0.06)', border: '1px solid rgba(0,200,83,0.15)' }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#00c853' }}>{tm.label}</span>
                  <span className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{tm.desc}</span>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
              Incentives and slashing for validators are managed by the specific validation protocol and are outside the scope of this registry.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Security considerations */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#ffa000' }}>
              Security Considerations
            </span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Known Risks &amp; Mitigations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Sybil Attacks',
                body: 'Fake reviewers can inflate reputation. The protocol publishes all signals publicly and supports filtering by reviewer address — enabling reputation systems for reviewers to emerge.',
              },
              {
                title: 'Audit Trail Integrity',
                body: 'On-chain pointers and content hashes cannot be deleted, ensuring a permanent and verifiable audit trail for all feedback and validation events.',
              },
              {
                title: 'Capability Verification',
                body: 'The ERC cannot cryptographically guarantee advertised capabilities are functional or non-malicious. The three trust models are designed to support this verification need.',
              },
            ].map((item) => (
              <GlassCard key={item.title} className="p-6 flex flex-col gap-3">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.body}</p>
              </GlassCard>
            ))}
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
              <BookOpen size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Build on ERC-8004.
              <br />
              <span className="gradient-text-blue">Shape the standard.</span>
            </h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: 'var(--muted-foreground)' }}>
              The spec is in active draft. Join the discussion on Ethereum Magicians or register your agent on the explorer.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://ethereum-magicians.org/t/erc-8004-trustless-agents/25098"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-base px-8 py-3"
              >
                Join Discussion
                <ExternalLink size={16} />
              </a>
              <Link href="/explore" className="btn-ghost flex items-center gap-2 text-base px-6 py-3">
                Explore Agents
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
