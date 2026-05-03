export interface LlamaFiConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  cacheTtlMs?: number;
}

export interface LlamaFiBridgeStats {
  bridge: string;
  volumeUSD: number;
  txCount: number;
  chains: string[];
}

export interface LlamaFiYieldPool {
  pool: string;
  project: string;
  chain: string;
  apy: number;
  tvlUsd: number;
}
