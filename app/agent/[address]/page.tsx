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
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard, TrustBadge, AgentAvatar } from '@/components/ui'
import { truncateAddress, getRepLevel, generateMockAgents, formatDate, seedRandom } from '@/lib/utils'

// Generate mock attestations for a given agent
function generateAttestations(agentAddress: string, count = 6) {
  const rng = seedRandom(parseInt(agentAddress.slice(2, 10), 16))
  const types = ['EmailVerification', 'CodeExecution', 'DataRetrieval', 'ContractCall', 'AgentHandshake', 'StakeConfirmation']
  return Array.from({ length: count }, (_, i) => ({
    id: `0x${Array.from({ length: 64 }, () => Math.floor(rng() * 16).toString(16)).join('')}`,
    type: types[Math.floor(rng() * types.length)],
    timestamp: new Date(Date.now() - rng() * 30 * 86400000).toISOString(),
    signer: `0x${Array.from({ length: 40 }, () => Math.floor(rng() * 16).toString(16)).join('')}`,
    verified: rng() > 0.2,
  }))
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
  const attestations = generateAttestations(agent.address)
  const repHistory = generateRepHistory(parseInt(agent.address.slice(2, 8), 16), agent.reputationScore)

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
                    href={`https://sepolia.basescan.org/address/${agent.address}`}
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
                label: 'Stake Amount',
                value: `${agent.stakeAmount.toFixed(4)} ETH`,
                color: 'var(--accent)',
              },
              {
                icon: FileCheck,
                label: 'Attestations',
                value: agent.attestationCount.toString(),
                color: 'var(--primary)',
              },
              {
                icon: AlertTriangle,
                label: 'Slash Count',
                value: agent.slashCount.toString(),
                color: agent.slashCount > 0 ? '#ffa000' : 'var(--verified)',
              },
              {
                icon: Network,
                label: 'Network',
                value: 'Base Sepolia',
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
            {/* Left: reputation history + identity */}
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
                      {agent.reputationScore}
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

              {/* Identity details */}
              <GlassCard className="p-6 flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                    ERC-8004 Identity
                  </p>
                  <h3 className="font-semibold text-foreground">On-chain Registration</h3>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Agent Address', value: agent.address, mono: true, copy: true },
                    { label: 'Operator Address', value: agent.operator, mono: true, copy: true },
                    { label: 'Registered', value: formatDate(agent.registeredAt), mono: false },
                    { label: 'Last Active', value: formatDate(agent.lastActive), mono: false },
                    { label: 'Network', value: `Base Sepolia (Chain ID: ${agent.networkId})`, mono: false },
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
              </GlassCard>
            </div>

            {/* Right: attestations + stake */}
            <div className="flex flex-col gap-6">
              {/* Stake info */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Shield size={16} style={{ color: 'var(--primary)' }} />
                  <h3 className="font-semibold text-foreground">Syntrophic Stake</h3>
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
                    { label: 'Min Required', value: '0.001 ETH', met: agent.stakeAmount >= 0.001 },
                    { label: 'Slash Risk', value: agent.slashCount > 0 ? 'Elevated' : 'Low', met: agent.slashCount === 0 },
                    { label: 'Bond Status', value: agent.isStaked ? 'Active' : 'Inactive', met: agent.isStaked },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{row.label}</span>
                      <span
                        className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: row.met ? 'var(--verified)' : '#ffa000' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: row.met ? 'var(--verified)' : '#ffa000' }}
                        />
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Recent attestations */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Attestations</h3>
                  <span className="badge-staked">{attestations.length}</span>
                </div>

                <div className="flex flex-col gap-2">
                  {attestations.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-start gap-3 p-3 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: att.verified ? 'rgba(0,200,83,0.15)' : 'rgba(255,160,0,0.15)',
                        }}
                      >
                        {att.verified ? (
                          <CheckCircle size={11} style={{ color: 'var(--verified)' }} />
                        ) : (
                          <Clock size={11} style={{ color: '#ffa000' }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{att.type}</p>
                        <p className="address-mono text-[10px] mt-0.5 truncate" style={{ color: 'var(--muted-foreground)' }}>
                          {truncateAddress(att.id, 6)}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                          {formatDate(att.timestamp)}
                        </p>
                      </div>
                      <a
                        href={`https://sepolia.basescan.org/tx/${att.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-1"
                        style={{ color: 'var(--muted-foreground)' }}
                        aria-label="View attestation on Basescan"
                      >
                        <ExternalLink size={11} />
                      </a>
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
