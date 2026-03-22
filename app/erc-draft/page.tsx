import Link from 'next/link'
import { ExternalLink, FileText, Users, ArrowRight, BookOpen, Shield, Database, CheckSquare, Layers, AlertTriangle, Code2 } from 'lucide-react'
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

      {/* ── ERC Extension: Syntrophic Bond Protocol ─────────────────────────── */}

      {/* SBP Hero divider */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 600, height: 350, top: 0, left: '20%', opacity: 0.25 }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest flex-shrink-0"
              style={{ background: 'rgba(0,112,243,0.1)', border: '1px solid rgba(0,112,243,0.3)', color: 'var(--accent)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              ERC Extension · Draft
            </div>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Syntrophic Bond Protocol
              <br />
              <span className="gradient-text-blue">for AI Agent Trust</span>
            </h2>
            <p className="text-base max-w-2xl leading-relaxed text-pretty" style={{ color: 'var(--muted-foreground)' }}>
              A decentralized performance bond system enabling verifiable trust for AI agents on social networks and
              communication platforms. Extends ERC-8004 with economic staking and TEE-based automated governance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {[
                { label: 'Status', value: 'Draft' },
                { label: 'Requires', value: 'ERC-8004' },
                { label: 'Created', value: '2026-03-21' },
                { label: 'Category', value: 'Standards Track: ERC' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span style={{ color: 'var(--muted-foreground)' }}>{m.label}:</span>
                  <span className="font-semibold text-foreground">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <Users size={12} />
              <span>Narek Kostanyan (@NarekKosm), Syntrophic Team — info@flagshipgamestudio.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* SBP Abstract */}
      <section className="px-4 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={16} style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Abstract</span>
          </div>
          <GlassCard elevated className="p-8">
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              The Syntrophic Bond Protocol (SBP) establishes a decentralized economic security layer for AI agents by
              introducing performance bonds as verifiable trust signals. By requiring agents to post{' '}
              <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,112,243,0.1)', color: 'var(--accent)' }}>0.001 ETH</code>{' '}
              collateral on Base L2, SBP solves the "Day-Zero Trust Gap" where new AI agents lack credibility. The protocol
              leverages Oasis ROFL (Runtime OFf-chain Logic) as a TEE-based verifiable judge to enforce a Closed-Loop
              Trust Model, where only feedback from other bonded peers influences an agent's standing. This creates a
              mathematically resistant system against Sybil attacks while providing human-readable trust badges for social
              platforms.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* SBP Motivation */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#ffa000' }}>Motivation</span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Three Core Problems</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                num: '01',
                title: 'Zero-Cost Identity Rotation',
                body: 'Creating an AI agent costs nothing, enabling scammers to abandon tarnished identities and create new ones indefinitely.',
              },
              {
                num: '02',
                title: 'Sybil Attack Vulnerability',
                body: 'Traditional reputation systems can be gamed by bot farms generating fake positive reviews or review-bombing competitors.',
              },
              {
                num: '03',
                title: 'Lack of Interoperability',
                body: 'Platform-specific badges (LinkedIn, X) don\'t transfer across ecosystems, forcing agents to rebuild trust on each platform.',
              },
            ].map((item) => (
              <GlassCard key={item.num} className="p-6 flex flex-col gap-3">
                <span className="text-3xl font-bold tracking-tight" style={{ color: 'rgba(255,160,0,0.25)' }}>{item.num}</span>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SBP Core Components */}
      <section className="relative px-4 py-16 overflow-hidden">
        <div className="orb orb-cyan" style={{ width: 400, height: 400, top: 0, right: '5%', opacity: 0.12 }} />
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Specification</span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Core Components</h2>
          </div>

          {/* SBP Vault Contract */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,112,243,0.12)', border: '1px solid rgba(0,112,243,0.25)' }}>
                <Shield size={14} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-semibold text-foreground">1. SBP Vault Contract</h3>
            </div>
            <GlassCard className="p-6">
              <pre className="text-xs leading-relaxed overflow-x-auto address-mono" style={{ color: 'var(--muted-foreground)' }}>{`interface ISBPVault {
    uint256 constant BOND_AMOUNT = 0.001 ether;

    event AgentBonded(address indexed agentId, uint256 stakeId, uint256 timestamp);
    event SlashExecuted(address indexed agentId, uint256 amount, bytes32 attestationHash);
    event UnstakeRequested(address indexed agentId, uint256 unlockBlock);
    event BondWithdrawn(address indexed agentId, uint256 amount);

    function bond(address agentId) external payable;
    function requestUnstake(address agentId) external;
    function executeSlash(address agentId, bytes calldata attestation) external;
    function withdraw(address agentId) external;
    function getBondStatus(address agentId) external view returns (BondStatus);
}

struct BondStatus {
    bool isBonded;
    uint256 bondAmount;
    uint256 bondedAt;
    uint256 score;
    uint256 reviewCount;
    uint256 unlockBlock;
}`}</pre>
            </GlassCard>
          </div>

          {/* ERC-8004 Extension */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.25)' }}>
                <Layers size={14} style={{ color: '#00d4ff' }} />
              </div>
              <h3 className="font-semibold text-foreground">2. ERC-8004 Metadata Extension</h3>
            </div>
            <GlassCard className="p-6">
              <pre className="text-xs leading-relaxed overflow-x-auto address-mono" style={{ color: 'var(--muted-foreground)' }}>{`struct SyntrophicMetadata {
    address validator;      // SBP Vault address
    uint256 score;          // 0-100 scale
    string[] tags;          // ["Bonded", "Syntrophic", "HighTrust"]
    uint256 bondTimestamp;  // Block timestamp of bonding
    uint256 slashCount;     // Number of times slashed
}`}</pre>
            </GlassCard>
          </div>

          {/* ROFL Attestation */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,200,83,0.12)', border: '1px solid rgba(0,200,83,0.25)' }}>
                <CheckSquare size={14} style={{ color: '#00c853' }} />
              </div>
              <h3 className="font-semibold text-foreground">3. ROFL Attestation Format (EIP-712)</h3>
            </div>
            <GlassCard className="p-6">
              <pre className="text-xs leading-relaxed overflow-x-auto address-mono" style={{ color: 'var(--muted-foreground)' }}>{`struct SlashAttestation {
    address agentId;
    uint256 currentScore;
    uint256 stakeId;
    uint256 timestamp;
    bytes32 evidenceHash;  // Hash of negative reviews
}`}</pre>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* SBP Protocol Flow */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00c853' }}>Protocol Flow</span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Four Phases</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                phase: 'Phase 1',
                title: 'Bonding',
                color: '#0070f3',
                steps: [
                  'Agent calls bond(agentId) with exactly 0.001 ETH.',
                  'Vault verifies: registered in ERC-8004, no active bond, not in 30-day cooldown.',
                  'Vault updates ERC-8004 metadata with VALIDATED status and Syntrophic_Bonded tag.',
                  'Agent receives on-chain badge visible to all platforms.',
                ],
              },
              {
                phase: 'Phase 2',
                title: 'Trust Accumulation',
                color: '#00d4ff',
                steps: [
                  'Only bonded agents can submit reviews (enforced by ROFL).',
                  'Score = Σ(Rating_i × Weight_i) / Σ(Weight_i), where Weight_i = min(1.0, BondAge_i / 30 days).',
                  '≥ 3 bonded reviews required for "Standard Trust" designation.',
                  '≥ 10 bonded reviews required for "High Trust" designation.',
                ],
              },
              {
                phase: 'Phase 3',
                title: 'Challenge Windows',
                color: '#a78bfa',
                steps: [
                  'High Trust (score > 80, reviews > 10): 0 blocks — instant withdrawal.',
                  'Standard (score > 50, 3–10 reviews): 300 blocks (~10 min).',
                  'New/Low (any score, < 3 reviews): 1800 blocks (~1 hour).',
                ],
              },
              {
                phase: 'Phase 4',
                title: 'Automated Slashing',
                color: '#ffa000',
                steps: [
                  'Triggered when Bonded_Score < 51.',
                  'ROFL monitors ERC-8004 events within TEE and calculates score.',
                  'ROFL generates EIP-712 attestation; anyone can call executeSlash().',
                  '100% of bond transfers to CommunityRewardsAddress. Agent marked SLASHED with 30-day cooldown.',
                ],
              },
            ].map((p) => (
              <GlassCard key={p.phase} className="p-7 flex flex-col gap-4" hover>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                  >
                    {p.phase}
                  </span>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {p.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ background: p.color }}
                      />
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{s}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Challenge window table */}
          <GlassCard className="p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-foreground text-sm">Unstaking Challenge Windows</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['Trust Tier', 'Score', 'Reviews', 'Challenge Window'].map((h) => (
                      <th
                        key={h}
                        className="text-left py-2 pr-6 text-xs font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tier: 'High Trust', score: '> 80', reviews: '> 10', window: '0 blocks (instant)' },
                    { tier: 'Standard', score: '> 50', reviews: '3–10', window: '300 blocks (~10 min)' },
                    { tier: 'New / Low', score: 'Any', reviews: '< 3', window: '1800 blocks (~1 hour)' },
                  ].map((row) => (
                    <tr key={row.tier} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-3 pr-6 font-semibold text-foreground address-mono text-xs">{row.tier}</td>
                      <td className="py-3 pr-6 text-xs" style={{ color: 'var(--muted-foreground)' }}>{row.score}</td>
                      <td className="py-3 pr-6 text-xs" style={{ color: 'var(--muted-foreground)' }}>{row.reviews}</td>
                      <td className="py-3 text-xs font-semibold" style={{ color: 'var(--accent)' }}>{row.window}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* SBP Rationale */}
      <section className="relative px-4 py-16 overflow-hidden">
        <div className="orb orb-blue" style={{ width: 400, height: 300, top: 0, left: '-5%', opacity: 0.15 }} />
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Rationale</span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Design Choices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: '0.001 ETH Bond Amount',
                color: '#0070f3',
                body: 'High enough to deter spam (1,000 fake accounts = 1 ETH), low enough for legitimate agents, and comparable to existing Web2 verification costs. 100% slash penalty ensures a clear binary trust signal with no partial gaming.',
              },
              {
                title: 'Closed-Loop Trust Model',
                color: '#00d4ff',
                body: 'By restricting feedback to bonded peers, Sybil attacks become economically prohibitive, review quality improves (reviewers risk their own bonds), and natural network effects emerge — more bonds means a stronger trust network.',
              },
              {
                title: 'TEE-Based Verification',
                color: '#00c853',
                body: 'Oasis ROFL provides verifiable computation without trusting operators, deterministic slashing rules enforced in hardware, and censorship resistance — no single entity controls the slashing decision.',
              },
            ].map((item) => (
              <GlassCard key={item.title} className="p-6 flex flex-col gap-3" hover>
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.body}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SBP Reference Implementation */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Code2 size={16} style={{ color: 'var(--accent)' }} />
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Reference Implementation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Solidity */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground text-sm">SBPVault — Solidity</h3>
              <GlassCard className="p-6 flex-1">
                <pre className="text-xs leading-relaxed overflow-x-auto address-mono" style={{ color: 'var(--muted-foreground)' }}>{`contract SBPVault is ISBPVault {
    IERC8004 public immutable registry;
    address  public immutable communityRewards;
    address  public immutable roflVerifier;

    mapping(address => BondInfo)  private bonds;
    mapping(address => uint256)   private cooldowns;

    function bond(address agentId) external payable {
        require(msg.value == BOND_AMOUNT, "Incorrect bond amount");
        require(!bonds[agentId].active,   "Already bonded");
        require(block.timestamp > cooldowns[agentId], "In cooldown");

        bonds[agentId] = BondInfo({
            active:   true,
            amount:   msg.value,
            bondedAt: block.timestamp,
            stakeId:  uint256(keccak256(
                          abi.encode(agentId, block.timestamp)))
        });

        registry.updateMetadata(agentId, abi.encode(
            SyntrophicMetadata({
                validator:     address(this),
                score:         100,
                tags:          ["Bonded", "Syntrophic"],
                bondTimestamp: block.timestamp,
                slashCount:    0
            })
        ));

        emit AgentBonded(
            agentId, bonds[agentId].stakeId, block.timestamp);
    }

    function executeSlash(
        address agentId,
        bytes calldata attestation
    ) external {
        SlashAttestation memory att =
            abi.decode(attestation, (SlashAttestation));
        require(verifyROFLSignature(attestation), "Invalid attestation");
        require(att.currentScore < 51, "Score above threshold");
        require(bonds[agentId].active,   "Not bonded");

        uint256 slashAmount = bonds[agentId].amount;
        bonds[agentId].active = false;
        cooldowns[agentId] = block.timestamp + 30 days;

        (bool ok,) = communityRewards.call{value: slashAmount}("");
        require(ok, "Transfer failed");

        emit SlashExecuted(
            agentId, slashAmount, keccak256(attestation));
    }
}`}</pre>
              </GlassCard>
            </div>

            {/* Rust */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-foreground text-sm">ROFL Verifier — Rust</h3>
              <GlassCard className="p-6 flex-1">
                <pre className="text-xs leading-relaxed overflow-x-auto address-mono" style={{ color: 'var(--muted-foreground)' }}>{`pub struct SyntrophicVerifier;

impl SyntrophicVerifier {
    pub fn calculate_bonded_score(
        &self,
        agent_id: Address,
        reviews:  Vec<Review>,
    ) -> Result<U256, Error> {
        // Filter to only bonded reviewers
        let bonded: Vec<Review> = reviews
            .into_iter()
            .filter(|r| self.is_bonded(r.reviewer))
            .collect();

        let total_weight: f64 = bonded
            .iter()
            .map(|r| self.weight(r))
            .sum();

        let weighted_sum: f64 = bonded
            .iter()
            .map(|r| r.score as f64 * self.weight(r))
            .sum();

        Ok(U256::from(
            (weighted_sum / total_weight) as u64
        ))
    }

    // weight = min(1.0, bond_age_days / 30)
    fn weight(&self, review: &Review) -> f64 {
        let age_days =
            (now() - review.bond_timestamp) / 86_400;
        f64::min(1.0, age_days as f64 / 30.0)
    }
}`}</pre>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* SBP Test Cases */}
      <section className="px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#00c853' }}>Test Cases</span>
            <h2 className="text-2xl font-bold tracking-tight mt-2 text-balance">Normative Tests</h2>
          </div>
          <div className="flex flex-col gap-5">
            {[
              {
                num: 'Test 1',
                title: 'Basic Bonding',
                code: `address agent = 0x123...;
vault.bond{value: 0.001 ether}(agent);

assert(vault.getBondStatus(agent).isBonded == true);
assert(erc8004.getMetadata(agent)
    .tags.contains("Syntrophic_Bonded"));`,
              },
              {
                num: 'Test 2',
                title: 'Sybil Attack Prevention',
                code: `// 10 unbonded accounts attempt review-bombing
address[] memory sybils = createSybilAccounts(10);
for (uint i = 0; i < 10; i++) {
    erc8004.submitReview(targetAgent, 1); // 1-star
}

// ROFL ignores all unbonded reviewers
uint256 score = rofl.calculateScore(targetAgent);
assert(score == 100); // unchanged`,
              },
              {
                num: 'Test 3',
                title: 'Slashing Execution',
                code: `submitBondedReview(agent, reviewer1, 20);
submitBondedReview(agent, reviewer2, 30);
submitBondedReview(agent, reviewer3, 40);

bytes memory att = rofl.generateSlashAttestation(agent);
uint256 before = communityRewards.balance;
vault.executeSlash(agent, att);

assert(vault.getBondStatus(agent).isBonded == false);
assert(communityRewards.balance == before + 0.001 ether);`,
              },
            ].map((t) => (
              <GlassCard key={t.num} className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.25)', color: '#00c853' }}
                  >
                    {t.num}
                  </span>
                  <h3 className="font-semibold text-foreground">{t.title}</h3>
                </div>
                <pre className="text-xs leading-relaxed overflow-x-auto address-mono p-4 rounded-lg" style={{ background: 'rgba(0,200,83,0.04)', border: '1px solid rgba(0,200,83,0.1)', color: 'var(--muted-foreground)' }}>{t.code}</pre>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* SBP Security Considerations */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <AlertTriangle size={16} style={{ color: '#ffa000' }} />
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#ffa000' }}>
                Security Considerations — SBP Extension
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                cat: 'Economic',
                title: 'Griefing Attacks',
                body: 'Malicious actors coordinate negative reviews. Mitigated by minimum 3 bonded reviewers, reviewers risking their own bonds, and ROFL detecting coordinated patterns via timing analysis.',
              },
              {
                cat: 'Economic',
                title: 'Flash Loan Attacks',
                body: 'Attackers temporarily acquire ETH to bond multiple accounts. Mitigated by 30-day weight scaling preventing instant influence, and bonds locked until withdrawal period completes.',
              },
              {
                cat: 'Economic',
                title: 'Exit Scams',
                body: 'Agents behave maliciously then withdraw before slashing. Mitigated by tiered challenge windows — instant withdrawals only for highly trusted agents with established history.',
              },
              {
                cat: 'Technical',
                title: 'TEE Compromise',
                body: 'If Oasis ROFL is compromised, false attestations could be generated. Mitigated by multi-TEE verification for high-value slashing, on-chain DAO appeals, and regular attestation audits.',
              },
              {
                cat: 'Technical',
                title: 'Front-Running',
                body: 'Malicious actors front-run withdrawal requests. Mitigated by a commit-reveal scheme for withdrawals and fixed gas pricing for slash transactions.',
              },
              {
                cat: 'Technical',
                title: 'Reentrancy',
                body: 'Standard reentrancy in fund transfers. Mitigated by ReentrancyGuard on all external calls and strict checks-effects-interactions pattern throughout.',
              },
            ].map((item) => (
              <GlassCard key={item.title} className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{
                      background: item.cat === 'Economic' ? 'rgba(255,160,0,0.1)' : 'rgba(0,112,243,0.1)',
                      border: `1px solid ${item.cat === 'Economic' ? 'rgba(255,160,0,0.25)' : 'rgba(0,112,243,0.25)'}`,
                      color: item.cat === 'Economic' ? '#ffa000' : 'var(--accent)',
                    }}
                  >
                    {item.cat}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.body}</p>
              </GlassCard>
            ))}
          </div>
          <GlassCard className="p-5">
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)', opacity: 0.8 }}>
              <strong className="text-foreground">Privacy:</strong> Agent addresses are pseudonymous but publicly visible.
              Review content is stored off-chain with only content hashes on-chain. ROFL computations reveal only final
              scores, not individual reviews.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Backwards Compatibility note */}
      <section className="px-4 pb-10">
        <div className="max-w-7xl mx-auto">
          <GlassCard elevated className="p-7 flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
              Backwards Compatibility
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              SBP extends ERC-8004 without breaking changes. Existing ERC-8004 agents can opt-in by bonding; non-bonded
              agents continue functioning normally. Metadata extensions use a reserved namespace to avoid conflicts.
              Cross-chain reputation bridging MAY be implemented using LayerZero or similar protocols on Base Mainnet and
              Base Sepolia (vault addresses TBD).
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { label: 'Email', desc: 'Bond status as signature badge' },
                { label: 'Social Media', desc: 'Verified checkmark with on-chain verification' },
                { label: 'APIs', desc: 'Simple isBonded(agentId) endpoint' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{ background: 'rgba(0,112,243,0.06)', border: '1px solid rgba(0,112,243,0.15)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--accent)' }}>{item.label}</span>
                  <span style={{ color: 'var(--muted-foreground)' }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
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
              Build on ERC-8004 &amp; SBP.
              <br />
              <span className="gradient-text-blue">Shape the standard.</span>
            </h2>
            <p className="text-base leading-relaxed max-w-lg" style={{ color: 'var(--muted-foreground)' }}>
              Both specs are in active draft. Join the discussion on Ethereum Magicians or register your agent on the explorer.
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
