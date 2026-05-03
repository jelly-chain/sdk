export type SignalDirection = 'bullish' | 'bearish' | 'neutral';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w';
export type ChainId = 'ethereum' | 'bsc' | 'base' | 'polygon' | string;

export interface SDKConfig {
  chains: ChainId[];
  enableRiskAssessment?: boolean;
  enableMetrics?: boolean;
  enableCache?: boolean;
  enableTelemetry?: boolean;
  enableAudit?: boolean;
  enableReplay?: boolean;
  cacheOptions?: CacheOptions;
  riskOptions?: RiskOptions;
  providers?: ProviderConfig[];
  plugins?: string[];
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export interface CacheOptions {
  ttlMs?: number;
  maxEntries?: number;
  adapter?: 'memory' | 'redis' | 'file';
  redisUrl?: string;
}

export interface RiskOptions {
  maxRiskScore?: number;
  confidenceThreshold?: number;
  tolerance?: 'low' | 'medium' | 'high';
}

export interface ProviderConfig {
  name: string;
  type: 'llamafi' | 'mcp' | 'onchain' | 'offchain' | string;
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

export interface PredictionInput {
  keyword?: string;
  token?: string;
  chain?: ChainId;
  timeframe?: Timeframe;
  context?: Record<string, unknown>;
  triggers?: string[];
  strategies?: string[];
}

export interface PredictionOutput {
  signal: SignalDirection;
  confidence: number;
  riskScore: number;
  factors: string[];
  explanations: string[];
  metadata: PredictionMetadata;
  timestamp: string;
}

export interface PredictionMetadata {
  chain: ChainId;
  sourceCount: number;
  cached: boolean;
  strategy: string;
  triggeredBy: string;
  latencyMs?: number;
  predictionId?: string;
}

export interface MarketSignal {
  id: string;
  source: string;
  direction: SignalDirection;
  strength: number;
  confidence: number;
  chain: ChainId;
  token?: string;
  timestamp: string;
  raw?: unknown;
}

export interface EventPayload {
  id: string;
  type: string;
  chain: ChainId;
  data: Record<string, unknown>;
  timestamp: string;
  source: string;
}

export interface RiskProfile {
  score: number;
  level: RiskLevel;
  factors: string[];
  volatility?: number;
  liquidityRisk?: number;
  sentimentRisk?: number;
}
