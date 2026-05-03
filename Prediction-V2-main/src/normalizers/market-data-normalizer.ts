import type { MarketSignalModel } from '../models/market-signal.js';
import type { ChainId } from '../types.js';

export interface RawMarketData {
  price?: number;
  volume?: number;
  marketCap?: number;
  change24h?: number;
  symbol?: string;
  [key: string]: unknown;
}

export class MarketDataNormalizer {
  normalize(raw: RawMarketData, chain: ChainId, source: string): Partial<MarketSignalModel> {
    const change = raw.change24h ?? 0;
    const direction = change > 1 ? 'bullish' : change < -1 ? 'bearish' : 'neutral';
    const strength = Math.min(1, Math.abs(change) / 10);
    return {
      source,
      direction,
      strength,
      confidence: 0.5 + strength * 0.3,
      chain,
      token: raw.symbol,
      raw,
    };
  }
}
