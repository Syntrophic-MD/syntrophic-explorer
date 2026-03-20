import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Activity,
  ExternalLink,
  Copy,
  Clock,
  AlertTriangle,
  FileCheck,
  Coins,
  Network,
  Star,
  MessageSquare,
  Flag,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard, TrustBadge, AgentAvatar } from '@/components/ui'
import { truncateAddress, getRepLevel, generateMockAgents, formatDate, seedRandom } from '@/lib/utils'

// Generate mock community feedback for a given agent
function generateFeedback(agentAddress: string, count = 5) {
  const rng = seedRandom(parseInt(agentAddress.slice(2, 10), 16))
  const positiveMessages = [
    'Excellent service, very reliable and professional',
    'Fast execution, good communication throughout',
    'Professional service, as advertised',
    'Highly recommended, zero issues',
    'Outstanding performance, will use again',
  ]
  const neutralMessages = [
    'Satisfactory, met expectations',
    'Average service, nothing exceptional',
  ]
  return Array.from({ length: count }, (_, i) => {
    const score = rng() > 0.8 ? Math.floor(rng() * 2) + 3 : Math.floor(rng() * 2) + 4
    const isPositive = score >= 4
    return {
      id: i,
      message: isPositive
        ? positiveMessages[Math.floor(rng() * positiveMessages.length)]
        : neutralMessages[Math.floor(rng() * neutralMessages.length)],
      score,
      from: `@${['trader', 'defi_user', 'crypto_fund', 'agent_bot', 'web3_dev'][Math.floor(rng() * 5)]}${Math.floor(rng() * 99) + 1}`,
      timestamp: new Date(Date.now() - rng() * 30 * 86400000).toISOString(),
      positive: score >= 4,
    }
  })
}

// Reputation history for chart (last 30 days)
function generateRepHistory(seed: number, finalScore: number) {
  const rng = seedRandom(seed)
  const points = []
  let score = Math.max(10, finalScore - Math.floor(rng() * 30))
  for (let i = 29; i >= 0; i--) {
    score = Math.min(100, Math.max(0, score + (rng() - 0.45) * 5))
    points.push({ day: i, score: Math.round(score) })
  }
  points[0] = { day: 29, score: finalScore }
  return points
}

export async function generateStaticParams() {
  return generateMockAgents(20).map((a) => ({ address: a.address }))
}

export default async function AgentPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params
  const agents = generateMockAgents(20)
  const agent = agents.find((a) => a.address === address) ?? agents[0]

  if (!agent) notFound()

  const level = getRepLevel(agent.reputationScore)
  const feedback = generateFeedback(agent.address)
  const repHistory = generateRepHistory(parseInt(agent.address.slice(2, 8), 16), agent.reputationScore)

  const positiveCount = feedback.filter((f) => f.score >= 4).length
  const neutralCount = feedback.filter((f) => f.score === 3).length
  const negativeCount = feedback.filter((f) => f.score <= 2).length

  // SVG sparkline
  const maxScore = Math.max(...repHistory.map((p) => p.score))
  const minScore = Math.min(...repHistory.map((p) => p.score))
  const sparkW = 240
  const sparkH = 60
  const points = repHistory
    .map((p, i) => {
      const x = (i / (repHistory.length - 1)) * sparkW
      const y = sparkH - ((p.score - minScore) / (maxScore - minScore + 1)) * (sparkH - 8) - 4
      return `${x},${y}`
    })
    .join(' ')

  const gradientId = `spark-gradient-${agent.id}`

  // Construct agent reference in the spec format
  const agentReference = `eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432:${agent.id}`

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Back */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-foreground"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <ArrowLeft size={15} />
            Back to Explorer
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex flex-col gap-6">
          {/* Hero card */}
          <GlassCard elevated className="p-6 md:p-8 relative overflow-hidden">
            <div className="orb orb-blue" style={{ width: 300, height: 300, top: -80, right: -80, opacity: 0.2 }} />
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar + identity */}
              <AgentAvatar name={agent.name} address={agent.address} size={72} />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {agent.name}
                  </h1>
                  {agent.isVerified && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(0,200,83,0.12)',
                        border: '1px solid rgba(0,200,83,0.25)',
                        color: 'var(--verified)',
                      }}
                    >
                      <CheckCircle size={12} />
                      Verified Agent
                    </div>
                  )}
                  {agent.isStaked && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(0,112,243,0.12)',
                        border: '1px solid rgba(0,112,243,0.25)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Shield size={12} />
                      Staked
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <code
                    className="address-mono text-sm px-2 py-1 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted-foreground)' }}
                  >
                    {truncateAddress(agent.address, 8)}
                  </code>
                  <button
                    className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                    style={{ color: 'var(--muted-foreground)' }}
                    aria-label="Copy address"
                    title="Copy address"
                  >
                    <Copy size={13} />
                  </button>
                  <a
                    href={`https://basescan.org/address/${agent.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                    style={{ color: 'var(--muted-foreground)' }}
                    aria-label="View on Basescan"
                    title="View on Basescan"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--muted-foreground)' }}>
                  {agent.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {agent.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: 'rgba(0,112,243,0.1)',
                        border: '1px solid rgba(0,112,243,0.2)',
                        color: 'var(--accent)',
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust score */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <TrustBadge score={agent.reputationScore} size="lg" />
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: level.color }}>
                    {level.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Trust Tier
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Coins,
                label: 'Current Stake',
                value: `${agent.stakeAmount.toFixed(4)} ETH`,
                color: 'var(--accent)',
              },
              {
                icon: Star,
                label: 'Community Reputation',
                value: `${agent.reputationScore}/100`,
                color: level.color,
              },
              {
                icon: AlertTriangle,
                label: 'Slash History',
                value: agent.slashCount === 0 ? '0 events' : `${agent.slashCount} events`,
                color: agent.slashCount > 0 ? '#ffa000' : 'var(--verified)',
              },
              {
                icon: Network,
                label: 'Network',
                value: 'Base (Chain 8453)',
                color: 'var(--foreground)',
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <GlassCard key={stat.label} className="p-5" hover>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={14} style={{ color: stat.color }} />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      {stat.label}
                    </span>
                  </div>
                  <p className="stat-number text-xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                </GlassCard>
              )
            })}
          </div>

          {/* Main content: two-column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: reputation history + technical info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Reputation chart */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      Reputation History
                    </p>
                    <h3 className="font-semibold text-foreground">Score over 30 days</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={15} style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                      {agent.reputationScore}/100
                    </span>
                  </div>
                </div>

                <div className="w-full overflow-hidden rounded-lg" style={{ background: 'rgba(0,112,243,0.04)', border: '1px solid rgba(0,112,243,0.08)' }}>
                  <svg
                    viewBox={`0 0 ${sparkW} ${sparkH}`}
                    className="w-full"
                    style={{ height: 120 }}
                    aria-label="Reputation score history chart"
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={level.color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={level.color} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <polygon
                      points={`0,${sparkH} ${points} ${sparkW},${sparkH}`}
                      fill={`url(#${gradientId})`}
                    />
                    {/* Line */}
                    <polyline
                      points={points}
                      fill="none"
                      stroke={level.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: `drop-shadow(0 0 3px ${level.color})` }}
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between mt-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  <span>30 days ago</span>
                  <span>Today</span>
                </div>
              </GlassCard>

              {/* Community Reputation & Feedback */}
              <GlassCard className="p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      Community
                    </p>
                    <h3 className="font-semibold text-foreground">Reputation {'&'} Feedback</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{
                      background: `${level.color}12`,
                      border: `1px solid ${level.color}25`,
                      color: level.color,
                    }}
                  >
                    <Star size={11} />
                    {agent.reputationScore}/100
                  </div>
                </div>

                {/* Feedback summary */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Positive', count: positiveCount, color: 'var(--verified)' },
                    { label: 'Neutral', count: neutralCount, color: '#ffa000' },
                    { label: 'Negative', count: negativeCount, color: '#ff5252' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center p-3 rounded-lg gap-1"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-lg font-bold stat-number" style={{ color: item.color }}>
                        {item.count}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="divider" />

                {/* Recent feedback */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                    Recent Feedback
                  </p>
                  <div className="flex flex-col gap-2">
                    {feedback.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: f.positive ? 'rgba(0,200,83,0.15)' : 'rgba(255,160,0,0.15)',
                          }}
                        >
                          <MessageSquare size={11} style={{ color: f.positive ? 'var(--verified)' : '#ffa000' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground leading-relaxed">{`"${f.message}"`}</p>
                          <p className="text-[10px] mt-1" style={{ color: 'var(--muted-foreground)' }}>
                            +{f.score} &middot; {f.from} &middot; {formatDate(f.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Technical Information */}
              <GlassCard className="p-6 flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                    Technical Information
                  </p>
                  <h3 className="font-semibold text-foreground">ERC-8004 Identity</h3>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Agent ID', value: agent.id.toString(), mono: false },
                    { label: 'ERC-8004 Registry', value: '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432', mono: true, copy: true },
                    { label: 'Network', value: `Base (Chain ID: 8453)`, mono: false },
                    { label: 'Agent Address', value: agent.address, mono: true, copy: true },
                    { label: 'Registered', value: formatDate(agent.registeredAt), mono: false },
                    { label: 'Last Active', value: formatDate(agent.lastActive), mono: false },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                        {row.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={row.mono ? 'address-mono text-xs' : 'text-sm font-medium text-foreground'}
                          style={row.mono ? { color: 'var(--muted-foreground)' } : {}}
                        >
                          {row.mono ? truncateAddress(row.value, 8) : row.value}
                        </span>
                        {row.copy && (
                          <button
                            className="p-1 rounded transition-colors hover:bg-white/[0.06]"
                            style={{ color: 'var(--muted-foreground)' }}
                            aria-label="Copy"
                          >
                            <Copy size={11} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agent Reference */}
                <div
                  className="rounded-xl p-4 flex flex-col gap-2"
                  style={{ background: 'rgba(0,112,243,0.06)', border: '1px solid rgba(0,112,243,0.15)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                    Agent Reference
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <code
                      className="address-mono text-xs break-all"
                      style={{ color: 'var(--accent)' }}
                    >
                      {agentReference}
                    </code>
                    <button
                      className="p-1 rounded transition-colors hover:bg-white/[0.06] flex-shrink-0"
                      style={{ color: 'var(--muted-foreground)' }}
                      aria-label="Copy agent reference"
                    >
                      <Copy size={11} />
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    Add this reference to email signatures, social profiles, or anywhere to signal your verified stake.
                  </p>
                </div>
              </GlassCard>
            </div>

            {/* Right: staking status + verification tools */}
            <div className="flex flex-col gap-6">
              {/* Staking Status */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Shield size={16} style={{ color: 'var(--primary)' }} />
                  <h3 className="font-semibold text-foreground">Staking Status</h3>
                </div>

                <div
                  className="rounded-xl p-5 flex flex-col gap-2 mb-5"
                  style={{
                    background: `${level.color}10`,
                    border: `1px solid ${level.color}20`,
                  }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: level.color, opacity: 0.8 }}>
                    Current Stake
                  </span>
                  <span className="stat-number text-3xl font-bold" style={{ color: level.color }}>
                    {agent.stakeAmount.toFixed(4)}
                    <span className="text-lg ml-1 font-medium">ETH</span>
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    ≈ ${(agent.stakeAmount * 3200).toFixed(2)} USD
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    {
                      label: 'Staked Since',
                      value: formatDate(agent.registeredAt),
                      met: true,
                      showDot: false,
                    },
                    {
                      label: 'Slash History',
                      value: `${agent.slashCount} events`,
                      met: agent.slashCount === 0,
                      showDot: true,
                    },
                    {
                      label: 'Status',
                      value: agent.isStaked ? 'Active & Trusted' : 'Inactive',
                      met: agent.isStaked,
                      showDot: true,
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{row.label}</span>
                      <span
                        className="text-xs font-semibold flex items-center gap-1.5"
                        style={{ color: row.showDot ? (row.met ? 'var(--verified)' : '#ffa000') : 'var(--foreground)' }}
                      >
                        {row.showDot && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: row.met ? 'var(--verified)' : '#ffa000' }}
                          />
                        )}
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Verification Tools */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                    Verification
                  </p>
                  <h3 className="font-semibold text-foreground">Tools</h3>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    {
                      icon: CheckCircle,
                      label: 'Verify Stake',
                      sub: 'Check on blockchain',
                      href: `https://basescan.org/address/${agent.address}`,
                      color: 'var(--verified)',
                    },
                    {
                      icon: FileCheck,
                      label: 'Full Reputation',
                      sub: 'ERC-8004 Explorer',
                      href: `https://basescan.org/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`,
                      color: 'var(--accent)',
                    },
                    {
                      icon: MessageSquare,
                      label: 'Submit Feedback',
                      sub: 'Community rating form',
                      href: '#',
                      color: '#a78bfa',
                    },
                    {
                      icon: Flag,
                      label: 'Report Issues',
                      sub: 'Dispute / slashing process',
                      href: '#',
                      color: '#ffa000',
                    },
                  ].map((tool) => {
                    const Icon = tool.icon
                    return (
                      <a
                        key={tool.label}
                        href={tool.href}
                        target={tool.href.startsWith('http') ? '_blank' : undefined}
                        rel={tool.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-3 p-3 rounded-lg transition-all hover:border-white/[0.14]"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}25` }}
                        >
                          <Icon size={14} style={{ color: tool.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground">{tool.label}</p>
                          <p className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>{tool.sub}</p>
                        </div>
                        <ExternalLink size={12} style={{ color: 'var(--muted-foreground)', opacity: 0.5 }} />
                      </a>
                    )
                  })}
                </div>
              </GlassCard>

              {/* Recent attestations (compact) */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Recent Attestations</h3>
                  <span className="badge-staked">{agent.attestationCount}</span>
                </div>

                <div className="flex flex-col gap-2">
                  {['StakeConfirmation', 'AgentHandshake', 'CodeExecution', 'DataRetrieval'].map((type, i) => (
                    <div
                      key={type}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: i === 0 ? 'rgba(0,200,83,0.15)' : 'rgba(0,112,243,0.12)' }}
                      >
                        {i === 0 ? (
                          <CheckCircle size={11} style={{ color: 'var(--verified)' }} />
                        ) : (
                          <Clock size={11} style={{ color: 'var(--accent)' }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{type}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                          EIP-712 signed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
