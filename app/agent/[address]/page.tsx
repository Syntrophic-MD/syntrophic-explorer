import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Activity,
  ExternalLink,
  Copy,
  AlertTriangle,
  Coins,
  Network,
  Star,
  Globe,
  Zap,
  FileCheck,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard, TrustBadge, AgentAvatar } from '@/components/ui'
import { truncateAddress, getRepLevel, formatDate } from '@/lib/utils'
import { fetchAgent, agentInitials, chainName, type AgentDetail } from '@/lib/api'

// This page is fully server-rendered (RSC) — no client-side state needed
export const dynamic = 'force-dynamic'

export default async function AgentPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = await params
  // address param is the URL-encoded agent_id, e.g. "8453:0x...registry...:1380"
  const agentId = decodeURIComponent(address)

  let agent: AgentDetail
  try {
    agent = await fetchAgent(agentId)
  } catch {
    notFound()
  }

  const level = getRepLevel(agent.total_score)
  const initials = agentInitials(agent.name)

  // Derive the contract/registry address from agent_id
  // Format: "{chainId}:{contractAddress}:{tokenId}"
  const parts = agent.agent_id.split(':')
  const registryAddress = parts[1] ?? agent.contract_address
  const tokenId = parts[2] ?? agent.token_id

  const parseStatus = agent.parse_status
  const services = agent.services ?? {}
  const serviceEntries = Object.entries(services).filter(([, v]) => v && (v as { endpoint: string }).endpoint)

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
              {/* Avatar */}
              <div className="flex-shrink-0">
                {agent.image_url ? (
                  <div
                    className="relative w-[72px] h-[72px] rounded-full overflow-hidden border-2"
                    style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  >
                    <Image src={agent.image_url} alt={agent.name} fill className="object-cover" unoptimized />
                  </div>
                ) : (
                  <AgentAvatar name={initials} address={agent.owner_address} size={72} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {agent.name}
                  </h1>
                  {agent.is_verified && (
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
                  {agent.x402_supported && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(0,112,243,0.12)',
                        border: '1px solid rgba(0,112,243,0.25)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Zap size={12} />
                      x402
                    </div>
                  )}
                  {agent.is_testnet && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(255,160,0,0.1)',
                        border: '1px solid rgba(255,160,0,0.25)',
                        color: '#ffa000',
                      }}
                    >
                      Testnet
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <code
                    className="address-mono text-sm px-2 py-1 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted-foreground)' }}
                  >
                    {truncateAddress(agent.owner_address, 8)}
                  </code>
                  <CopyButton text={agent.owner_address} />
                  <a
                    href={`https://basescan.org/address/${agent.owner_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md transition-colors hover:bg-white/[0.06]"
                    style={{ color: 'var(--muted-foreground)' }}
                    aria-label="View on block explorer"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                {agent.description && (
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--muted-foreground)' }}>
                    {agent.description}
                  </p>
                )}

                {/* Protocols */}
                {agent.supported_protocols.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {agent.supported_protocols.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(0,112,243,0.1)',
                          border: '1px solid rgba(0,112,243,0.2)',
                          color: 'var(--accent)',
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Owner username */}
                {agent.owner_username && (
                  <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                    Published by <span className="text-foreground font-medium">@{agent.owner_username}</span>
                  </p>
                )}
              </div>

              {/* Trust score */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <TrustBadge score={Math.round(agent.total_score)} size="lg" />
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: level.color }}>
                    {level.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Trust Tier</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Star,
                label: 'Reputation Score',
                value: `${Math.round(agent.total_score)}/100`,
                color: level.color,
              },
              {
                icon: Activity,
                label: 'Health Score',
                value: agent.health_score !== null ? `${Math.round(agent.health_score)}/100` : 'N/A',
                color: agent.health_score !== null && agent.health_score > 50 ? 'var(--verified)' : '#ffa000',
              },
              {
                icon: Coins,
                label: 'Total Feedbacks',
                value: agent.total_feedbacks.toLocaleString(),
                color: 'var(--accent)',
              },
              {
                icon: Network,
                label: 'Network',
                value: chainName(agent.chain_id),
                color: 'var(--foreground)',
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <GlassCard key={stat.label} className="p-5" hover>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={14} style={{ color: stat.color }} />
                    <span
                      className="text-xs font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
                    >
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
            {/* Left col */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Services / Endpoints */}
              {serviceEntries.length > 0 && (
                <GlassCard className="p-6 flex flex-col gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      Live Endpoints
                    </p>
                    <h3 className="font-semibold text-foreground">Agent Services</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {serviceEntries.map(([protocol, svc]) => {
                      const service = svc as { endpoint: string; version?: string }
                      return (
                        <div
                          key={protocol}
                          className="flex items-start justify-between gap-4 p-3 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase"
                                style={{
                                  background: 'rgba(0,112,243,0.15)',
                                  border: '1px solid rgba(0,112,243,0.25)',
                                  color: 'var(--accent)',
                                }}
                              >
                                {protocol}
                              </span>
                              {service.version && (
                                <span className="text-[11px]" style={{ color: 'var(--muted-foreground)' }}>
                                  v{service.version}
                                </span>
                              )}
                            </div>
                            <p
                              className="address-mono text-xs truncate"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              {service.endpoint}
                            </p>
                          </div>
                          <a
                            href={service.endpoint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-1.5 rounded transition-colors hover:bg-white/[0.06]"
                            style={{ color: 'var(--muted-foreground)' }}
                            aria-label={`Open ${protocol} endpoint`}
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </GlassCard>
              )}

              {/* Parse / Validation status */}
              {parseStatus && (
                <GlassCard className="p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                        Validation
                      </p>
                      <h3 className="font-semibold text-foreground">Parse Status</h3>
                    </div>
                    <ParseStatusBadge status={parseStatus.status} />
                  </div>

                  {parseStatus.errors.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#ff5252', opacity: 0.8 }}>
                        Errors
                      </p>
                      {parseStatus.errors.map((e, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-lg text-xs"
                          style={{ background: 'rgba(255,82,82,0.05)', border: '1px solid rgba(255,82,82,0.15)' }}
                        >
                          <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#ff5252' }} />
                          <span style={{ color: 'var(--muted-foreground)' }}>
                            <span className="font-mono text-[10px] mr-1" style={{ color: '#ff5252' }}>[{e.code}]</span>
                            {e.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {parseStatus.warnings.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#ffa000', opacity: 0.8 }}>
                        Warnings
                      </p>
                      {parseStatus.warnings.slice(0, 3).map((w, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-lg text-xs"
                          style={{ background: 'rgba(255,160,0,0.05)', border: '1px solid rgba(255,160,0,0.15)' }}
                        >
                          <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#ffa000' }} />
                          <span style={{ color: 'var(--muted-foreground)' }}>
                            <span className="font-mono text-[10px] mr-1" style={{ color: '#ffa000' }}>[{w.code}]</span>
                            {w.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {parseStatus.last_parsed_at && (
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      Last parsed {formatDate(parseStatus.last_parsed_at)}
                    </p>
                  )}
                </GlassCard>
              )}

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
                    { label: 'Agent ID', value: agent.agent_id, mono: true, copy: true },
                    { label: 'Token ID', value: tokenId, mono: false },
                    { label: 'ERC-8004 Registry', value: registryAddress, mono: true, copy: true },
                    { label: 'Network', value: `${chainName(agent.chain_id)} (Chain ID: ${agent.chain_id})`, mono: false },
                    { label: 'Owner Address', value: agent.owner_address, mono: true, copy: true },
                    { label: 'Registered', value: formatDate(agent.created_at), mono: false },
                    { label: 'Updated', value: formatDate(agent.updated_at), mono: false },
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
                      >
                        {row.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={row.mono ? 'address-mono text-xs' : 'text-sm font-medium text-foreground'}
                          style={row.mono ? { color: 'var(--muted-foreground)' } : {}}
                        >
                          {row.mono ? truncateAddress(row.value, 8) : row.value}
                        </span>
                        {row.copy && <CopyButton text={row.value} />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust models */}
                {agent.supported_trust_models && agent.supported_trust_models.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      Supported Trust Models
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.supported_trust_models.map((tm) => (
                        <span
                          key={tm}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'var(--muted-foreground)',
                          }}
                        >
                          {tm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* On-chain links */}
                {agent.created_tx_hash && (
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: 'rgba(0,112,243,0.06)', border: '1px solid rgba(0,112,243,0.15)' }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                      Creation Transaction
                    </p>
                    <div className="flex items-center gap-2">
                      <code
                        className="address-mono text-xs flex-1 truncate"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {truncateAddress(agent.created_tx_hash, 10)}
                      </code>
                      <a
                        href={`https://basescan.org/tx/${agent.created_tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-1.5 rounded transition-colors hover:bg-white/[0.06]"
                        style={{ color: 'var(--muted-foreground)' }}
                        aria-label="View transaction on explorer"
                      >
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                )}
              </GlassCard>
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-6">
              {/* Feedback summary */}
              <GlassCard className="p-6 flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                    Community
                  </p>
                  <h3 className="font-semibold text-foreground">Reputation {'&'} Feedback</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Total Feedbacks', value: agent.total_feedbacks.toLocaleString(), color: 'var(--accent)' },
                    { label: 'Average Score', value: agent.average_score > 0 ? `${Math.round(agent.average_score)}/100` : 'N/A', color: level.color },
                    { label: 'Stars', value: agent.star_count.toLocaleString(), color: '#ffa000' },
                    { label: 'Reputation', value: `${Math.round(agent.total_score)}/100`, color: level.color },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center p-3 rounded-lg gap-1"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-lg font-bold stat-number" style={{ color: item.color }}>
                        {item.value}
                      </span>
                      <span className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {agent.total_feedbacks === 0 && (
                  <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
                    No feedback submitted yet
                  </p>
                )}
              </GlassCard>

              {/* Quick links */}
              <GlassCard className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                    Verification Tools
                  </p>
                  <h3 className="font-semibold text-foreground">Resources</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.8004scan.io/agents/${agent.agent_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-white/[0.04]"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe size={14} style={{ color: 'var(--accent)' }} />
                      <span className="text-sm text-foreground">View on 8004scan</span>
                    </div>
                    <ExternalLink size={12} style={{ color: 'var(--muted-foreground)' }} />
                  </a>
                  {agent.is_endpoint_verified && agent.endpoint_verified_domain && (
                    <a
                      href={`https://${agent.endpoint_verified_domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-white/[0.04]"
                      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-center gap-2.5">
                        <Shield size={14} style={{ color: 'var(--verified)' }} />
                        <span className="text-sm text-foreground">Verified Domain</span>
                      </div>
                      <ExternalLink size={12} style={{ color: 'var(--muted-foreground)' }} />
                    </a>
                  )}
                  <a
                    href={`https://eips.ethereum.org/EIPS/eip-8004`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-white/[0.04]"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileCheck size={14} style={{ color: 'var(--muted-foreground)' }} />
                      <span className="text-sm text-foreground">ERC-8004 Spec</span>
                    </div>
                    <ExternalLink size={12} style={{ color: 'var(--muted-foreground)' }} />
                  </a>
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

// ─── Client component: copy button ───────────────────────────────────────────
// Inline so we keep the page as RSC

function CopyButton({ text }: { text: string }) {
  return (
    <button
      className="p-1 rounded transition-colors hover:bg-white/[0.06]"
      style={{ color: 'var(--muted-foreground)' }}
      aria-label="Copy"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text) } catch {}
      }}
    >
      <Copy size={11} />
    </button>
  )
}

// ─── Parse status badge ───────────────────────────────────────────────────────

function ParseStatusBadge({ status }: { status: 'ok' | 'warning' | 'error' }) {
  const map = {
    ok: { label: 'OK', bg: 'rgba(0,200,83,0.1)', border: 'rgba(0,200,83,0.25)', color: 'var(--verified)' },
    warning: { label: 'Warning', bg: 'rgba(255,160,0,0.1)', border: 'rgba(255,160,0,0.25)', color: '#ffa000' },
    error: { label: 'Error', bg: 'rgba(255,82,82,0.1)', border: 'rgba(255,82,82,0.25)', color: '#ff5252' },
  }
  const s = map[status]
  return (
    <div
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {s.label}
    </div>
  )
}
