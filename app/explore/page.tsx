'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, CheckCircle, ArrowUpDown, LayoutGrid, List, X } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { GlassCard, TrustBadge, AgentAvatar, StatCard } from '@/components/ui'
import { truncateAddress, getRepLevel, generateMockAgents, type Agent } from '@/lib/utils'

const allAgents = generateMockAgents(20)

type SortKey = 'reputation' | 'stake' | 'attestations' | 'recent'
type FilterKey = 'all' | 'verified' | 'staked' | 'elite'
type ViewMode = 'grid' | 'list'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'reputation', label: 'Reputation Score' },
  { value: 'stake', label: 'Stake Amount' },
  { value: 'attestations', label: 'Attestations' },
  { value: 'recent', label: 'Recently Active' },
]

const filterOptions: { value: FilterKey; label: string }[] = [
  { value: 'all', label: 'All Agents' },
  { value: 'verified', label: 'Verified' },
  { value: 'staked', label: 'Staked' },
  { value: 'elite', label: 'Elite (90+)' },
]

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('reputation')
  const [filter, setFilter] = useState<FilterKey>('all')
  const [view, setView] = useState<ViewMode>('grid')
  const [minStake, setMinStake] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let agents = [...allAgents]

    // Search
    if (search) {
      const q = search.toLowerCase()
      agents = agents.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.address.toLowerCase().includes(q) ||
          a.capabilities.some((c) => c.toLowerCase().includes(q))
      )
    }

    // Filter
    if (filter === 'verified') agents = agents.filter((a) => a.isVerified)
    if (filter === 'staked') agents = agents.filter((a) => a.isStaked)
    if (filter === 'elite') agents = agents.filter((a) => a.reputationScore >= 90)

    // Min stake
    if (minStake > 0) agents = agents.filter((a) => a.stakeAmount >= minStake)

    // Sort
    agents.sort((a, b) => {
      if (sort === 'reputation') return b.reputationScore - a.reputationScore
      if (sort === 'stake') return b.stakeAmount - a.stakeAmount
      if (sort === 'attestations') return b.attestationCount - a.attestationCount
      if (sort === 'recent') return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      return 0
    })

    return agents
  }, [search, sort, filter, minStake])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Page header */}
        <div className="relative overflow-hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="absolute inset-0 spotlight pointer-events-none" />
          <div className="orb orb-blue" style={{ width: 400, height: 300, top: -50, right: '10%', opacity: 0.25 }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                  ERC-8004 Registry
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Agent Explorer
                </h1>
                <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  {allAgents.length} agents registered on Base Sepolia
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="stat-number text-xl font-bold text-foreground">
                    {allAgents.filter((a) => a.isVerified).length}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Verified</p>
                </div>
                <div className="text-center">
                  <p className="stat-number text-xl font-bold" style={{ color: 'var(--accent)' }}>
                    {allAgents.filter((a) => a.isStaked).length}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Staked</p>
                </div>
                <div className="text-center">
                  <p className="stat-number text-xl font-bold" style={{ color: 'var(--verified)' }}>
                    {allAgents.filter((a) => a.reputationScore >= 90).length}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Elite</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--muted-foreground)' }} />
              <input
                type="text"
                placeholder="Search by name, address, or capability..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-glass w-full pl-9 pr-4 py-2.5 text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="input-glass px-3 py-2.5 text-sm pr-8 min-w-[160px] cursor-pointer"
              aria-label="Sort agents"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} style={{ background: '#050c1a' }}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              <SlidersHorizontal size={15} />
              Filters
              {(filter !== 'all' || minStake > 0) && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              )}
            </button>

            {/* View toggle */}
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <button
                onClick={() => setView('grid')}
                className="p-2.5 transition-colors"
                style={{
                  background: view === 'grid' ? 'rgba(0,112,243,0.2)' : 'transparent',
                  color: view === 'grid' ? 'var(--accent)' : 'var(--muted-foreground)',
                }}
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className="p-2.5 transition-colors"
                style={{
                  background: view === 'list' ? 'rgba(0,112,243,0.2)' : 'transparent',
                  color: view === 'list' ? 'var(--accent)' : 'var(--muted-foreground)',
                }}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <GlassCard className="mt-3 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Filter tabs */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                  Status
                </p>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: filter === f.value ? 'rgba(0,112,243,0.2)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${filter === f.value ? 'rgba(0,112,243,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: filter === f.value ? 'var(--accent)' : 'var(--muted-foreground)',
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-px h-12 hidden sm:block" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Min stake */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                  Min Stake (ETH)
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.1}
                    value={minStake}
                    onChange={(e) => setMinStake(parseFloat(e.target.value))}
                    className="w-32 accent-blue-500"
                  />
                  <span className="text-sm font-mono" style={{ color: 'var(--accent)' }}>
                    {minStake.toFixed(1)}
                  </span>
                </div>
              </div>

              {(filter !== 'all' || minStake > 0) && (
                <button
                  onClick={() => { setFilter('all'); setMinStake(0) }}
                  className="text-xs flex items-center gap-1 transition-colors sm:ml-auto"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <X size={12} /> Clear filters
                </button>
              )}
            </GlassCard>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Showing <span className="text-foreground font-medium">{filtered.length}</span> agents
              {search && <> matching <span className="text-foreground font-medium">&ldquo;{search}&rdquo;</span></>}
            </p>
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <ArrowUpDown size={12} />
              <span className="capitalize">{sort}</span>
            </div>
          </div>

          {/* Agent grid / list */}
          {filtered.length === 0 ? (
            <GlassCard className="p-16 flex flex-col items-center gap-3 text-center">
              <p className="text-lg font-semibold text-foreground">No agents found</p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Try adjusting your search or filters
              </p>
            </GlassCard>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {/* List header */}
              <div
                className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}
              >
                <div className="col-span-4">Agent</div>
                <div className="col-span-2 text-right">Score</div>
                <div className="col-span-2 text-right">Stake</div>
                <div className="col-span-2 text-right">Attestations</div>
                <div className="col-span-2 text-right">Status</div>
              </div>
              {filtered.map((agent) => (
                <AgentListRow key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function AgentCard({ agent }: { agent: Agent }) {
  const level = getRepLevel(agent.reputationScore)
  return (
    <Link href={`/agent/${agent.address}`}>
      <GlassCard className="p-5 flex flex-col gap-4 h-full transition-all duration-200 hover:-translate-y-1 cursor-pointer" hover>
        {/* Header */}
        <div className="flex items-start justify-between">
          <AgentAvatar name={agent.name} address={agent.address} size={44} />
          <TrustBadge score={agent.reputationScore} size="md" />
        </div>

        {/* Name and address */}
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-semibold text-foreground">{agent.name}</span>
            {agent.isVerified && (
              <CheckCircle size={13} style={{ color: 'var(--verified)' }} />
            )}
          </div>
          <p className="address-mono text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
            {truncateAddress(agent.address, 6)}
          </p>
        </div>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-1.5">
          {agent.capabilities.slice(0, 3).map((cap) => (
            <span
              key={cap}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--muted-foreground)',
              }}
            >
              {cap}
            </span>
          ))}
        </div>

        <div className="divider" />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="stat-number text-sm font-bold" style={{ color: level.color }}>
              {agent.reputationScore}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Score</p>
          </div>
          <div>
            <p className="stat-number text-sm font-bold" style={{ color: 'var(--accent)' }}>
              {agent.stakeAmount.toFixed(3)}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>ETH</p>
          </div>
          <div>
            <p className="stat-number text-sm font-bold text-foreground">
              {agent.attestationCount}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Attest.</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2">
          {agent.isVerified && <span className="badge-verified">Verified</span>}
          {agent.isStaked && <span className="badge-staked">Staked</span>}
        </div>
      </GlassCard>
    </Link>
  )
}

function AgentListRow({ agent }: { agent: Agent }) {
  const level = getRepLevel(agent.reputationScore)
  return (
    <Link href={`/agent/${agent.address}`}>
      <GlassCard className="px-4 py-3 transition-all duration-150 hover:border-white/[0.14] cursor-pointer">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Agent info */}
          <div className="col-span-12 sm:col-span-4 flex items-center gap-3">
            <AgentAvatar name={agent.name} address={agent.address} size={36} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-sm text-foreground">{agent.name}</span>
                {agent.isVerified && <CheckCircle size={12} style={{ color: 'var(--verified)' }} />}
              </div>
              <p className="address-mono text-[11px] truncate" style={{ color: 'var(--muted-foreground)' }}>
                {truncateAddress(agent.address, 6)}
              </p>
            </div>
          </div>
          {/* Score */}
          <div className="hidden sm:block col-span-2 text-right">
            <span className="stat-number text-sm font-bold" style={{ color: level.color }}>
              {agent.reputationScore}
            </span>
          </div>
          {/* Stake */}
          <div className="hidden sm:block col-span-2 text-right">
            <span className="stat-number text-sm font-medium" style={{ color: 'var(--accent)' }}>
              {agent.stakeAmount.toFixed(3)} ETH
            </span>
          </div>
          {/* Attestations */}
          <div className="hidden sm:block col-span-2 text-right">
            <span className="text-sm text-foreground">{agent.attestationCount}</span>
          </div>
          {/* Status */}
          <div className="hidden sm:flex col-span-2 justify-end gap-1.5">
            {agent.isVerified && <span className="badge-verified">Verified</span>}
            {agent.isStaked && <span className="badge-staked">Staked</span>}
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}
