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
  // The upstream /agents/{id} endpoint does not work — use the list endpoint
  // with search + chain_id to find the agent, then fetch its detail via UUID.
  // agentId format: "{chainId}:{registry}:{tokenId}"
  const parts = agentId.split(':')
  const chainId = parts[0]
  const tokenId = parts[2]

  if (!chainId || !tokenId) {
    throw new Error(`Invalid agentId format: ${agentId}`)
  }

  const listParams = new URLSearchParams({
    search: tokenId,
    chain_id: chainId,
    page: '1',
    page_size: '5',
  })
  const listUrl = `${API_BASE}/agents?${listParams.toString()}`
  const listRes = await fetch(listUrl, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  })
  if (!listRes.ok) {
    throw new Error(`Failed to search agents: ${listRes.status}`)
  }
  const listData: AgentsResponse = await listRes.json()

  // Find the exact match by agent_id
  const match = listData.items.find((a) => a.agent_id === agentId)
  if (!match) {
    throw new Error(`Agent not found: ${agentId}`)
  }

  // Fetch detail by UUID — if it fails, cast the list item as AgentDetail
  const detailUrl = `${API_BASE}/agents/${match.id}`
  const detailRes = await fetch(detailUrl, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  })
  if (detailRes.ok) {
    return detailRes.json()
  }

  // Fallback: return list item augmented with nullable detail fields
  return {
    ...match,
    agent_type: null,
    tags: [],
    categories: [],
    services: null,
    scores: null,
    cross_chain_links: [],
    created_block_number: null,
    created_tx_hash: null,
    is_endpoint_verified: false,
    endpoint_verified_at: null,
    endpoint_verified_domain: null,
    endpoint_verification_error: null,
    endpoint_last_checked_at: null,
    is_active: true,
    supported_trust_models: [],
    health_status: null,
    health_checked_at: null,
    total_validations: 0,
    successful_validations: 0,
    parse_status: null,
  }
}

// ─── SWR key helpers ──────────────────────────────────────────────────────────

export function agentsKey(query: AgentsQuery) {
  return ['/api/v1/agents', query] as const
}

export function agentKey(agentId: string) {
  return `/api/v1/agents/${agentId}`
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Registry contract address by chain_id */
export const REGISTRY_BY_CHAIN: Record<number, string> = {
  8453:    '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  1:       '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  42161:   '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  10:      '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  137:     '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  42220:   '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  56:      '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  84532:   '0x8004a169fb4a3325136eb29fa0ceb6d2e539a432',
  97:      '0x8004a818bfb912233c491871b3d84c89a494bd9e',
}

/** Map of URL slug → chain_id */
export const CHAIN_SLUG_TO_ID: Record<string, number> = {
  ethereum:        1,
  optimism:        10,
  bsc:             56,
  'bsc-testnet':   97,
  gnosis:          100,
  solana:          101,
  'solana-devnet': 103,
  polygon:         137,
  base:            8453,
  arbitrum:        42161,
  avalanche:       43114,
  celo:            42220,
  linea:           59144,
  scroll:          534352,
  zksync:          324,
  'base-sepolia':  84532,
  'op-sepolia':    11155420,
  sepolia:         11155111,
}

/** Map of chain_id → URL slug */
export const CHAIN_ID_TO_SLUG: Record<number, string> = Object.fromEntries(
  Object.entries(CHAIN_SLUG_TO_ID).map(([slug, id]) => [id, slug])
) as Record<number, string>

/** Derive a display-friendly chain name from chain_id */
export function chainName(chainId: number): string {
  const names: Record<number, string> = {
    1:        'Ethereum',
    10:       'Optimism',
    56:       'BSC',
    97:       'BSC Testnet',
    100:      'Gnosis',
    101:      'Solana',
    137:      'Polygon',
    8453:     'Base',
    42161:    'Arbitrum',
    43114:    'Avalanche',
    42220:    'Celo',
    59144:    'Linea',
    534352:   'Scroll',
    324:      'zkSync',
    84532:    'Base Sepolia',
    11155420: 'OP Sepolia',
    11155111: 'Sepolia',
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
