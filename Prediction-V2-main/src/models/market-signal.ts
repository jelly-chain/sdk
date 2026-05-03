import type { SignalDirection, ChainId } from '../types.js';

export interface MarketSignalModel {
  id: string;
  source: string;
  direction: SignalDirection;
  strength: number;
  confidence: number;
  chain: ChainId;
  token?: string;
  keyword?: string;
  eventType?: string;
  timestamp: string;
  raw?: unknown;
  tags?: string[];
}

export function createMarketSignal(
  partial: Omit<MarketSignalModel, 'id' | 'timestamp'>,
): MarketSignalModel {
  return {
    id: `sig_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    ...partial,
  };
}
