// ─── 8004scan.io API client ───────────────────────────────────────────────────
// Base URL: https://www.8004scan.io/api/v1
// Docs:     https://www.8004scan.io/developers

export const API_BASE = 'https://www.8004scan.io/api/v1'

// Internal proxy base — used by client-side fetchers to avoid CORS
const PROXY_BASE = '/api/agents'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Agent8004 {
  id: string
  agent_id: string          // e.g. "8453:0x8004...registry...:1380"
  token_id: string
  chain_id: number
  chain_type: string
  contract_address: string
  is_testnet: boolean
  owner_address: string
  owner_ens: string | null
  owner_username: string | null
  owner_avatar_url: string | null
  owner_publisher_tier: string | null
  owner_certified_name: string | null
  name: string
  description: string | null
  image_url: string | null
  is_verified: boolean
  star_count: number
  supported_protocols: string[]
  x402_supported: boolean
  total_score: number        // 0–100 reputation score
  rank: number | null
  health_score: number | null
  total_feedbacks: number
  average_score: number      // 0–100 average feedback score
  cross_chain_versions: null | unknown
  created_at: string
  updated_at: string
}

export interface AgentDetail extends Agent8004 {
  agent_type: string | null
  tags: string[]
  categories: string[]
  services: {
    a2a?: { endpoint: string; version: string; skills: string[] }
    web?: { endpoint: string }
    mcp?: { endpoint: string }
    oasf?: { endpoint: string }
    email?: { endpoint: string }
  } | null
  scores: null | Record<string, number>
  cross_chain_links: string[]
  created_block_number: number | null
  created_tx_hash: string | null
  is_endpoint_verified: boolean
  endpoint_verified_at: string | null
  endpoint_verified_domain: string | null
  endpoint_verification_error: string | null
  endpoint_last_checked_at: string | null
  is_active: boolean
  supported_trust_models: string[]
  health_status: string | null
  health_checked_at: string | null
  total_validations: number
  successful_validations: number
  parse_status: {
    status: 'ok' | 'warning' | 'error'
    errors: { code: string; field: string; message: string }[]
    warnings: { code: string; field: string; message: string }[]
    last_parsed_at: string | null
  } | null
}

export interface AgentsResponse {
  items: Agent8004[]
  total: number
  limit: number
  offset: number
}

export type SortBy = 'total_score' | 'star_count' | 'total_feedbacks' | 'average_score' | 'created_at'
export type SortOrder = 'asc' | 'desc'

export interface AgentsQuery {
  page?: number
  page_size?: number
  search?: string
  sort_by?: SortBy
  sort_order?: SortOrder
  is_testnet?: boolean
  chain_id?: number
  is_verified?: boolean
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function fetchAgents(query: AgentsQuery = {}): Promise<AgentsResponse> {
  const {
    page = 1,
    page_size = 20,
    search,
    sort_by = 'total_score',
    sort_order = 'desc',
    is_testnet = false,
    chain_id,
    is_verified,
  } = query

  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('page_size', String(page_size))
  params.set('sort_by', sort_by)
  params.set('sort_order', sort_order)
  params.set('is_testnet', String(is_testnet))
  if (search) params.set('search', search)
  if (chain_id !== undefined) params.set('chain_id', String(chain_id))
  if (is_verified !== undefined) params.set('is_verified', String(is_verified))

  const res = await fetch(`${PROXY_BASE}?${params.toString()}`)
  if (!res.ok) throw new Error(`Failed to fetch agents: ${res.status}`)
  return res.json()
}

export async function fetchAgent(agentId: string): Promise<AgentDetail> {
  const res = await fetch(`${PROXY_BASE}/${encodeURIComponent(agentId)}`)
  if (!res.ok) throw new Error(`Failed to fetch agent ${agentId}: ${res.status}`)
  return res.json()
}

// ─── SWR key helpers ──────────────────────────────────────────────────────────

export function agentsKey(query: AgentsQuery) {
  return ['/api/v1/agents', query] as const
}

export function agentKey(agentId: string) {
  return `/api/v1/agents/${agentId}`
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Derive a display-friendly chain name from chain_id */
export function chainName(chainId: number): string {
  const names: Record<number, string> = {
    1: 'Ethereum',
    8453: 'Base',
    42161: 'Arbitrum',
    10: 'Optimism',
    137: 'Polygon',
    56: 'BNB Chain',
    42220: 'Celo',
    97: 'BNB Testnet',
    84532: 'Base Sepolia',
  }
  return names[chainId] ?? `Chain ${chainId}`
}

/** Return avatar initials from agent name */
export function agentInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}
