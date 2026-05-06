import { PolymarketMarket, PolymarketSearchResult } from './types.js';

export interface PolymarketConfig {
  enabled?: boolean;
}

export class PolymarketClient {
  private readonly baseUrl = 'https://clob.polymarket.com';
  readonly enabled: boolean;

  constructor(config: PolymarketConfig = {}) {
    this.enabled = config.enabled !== false;
  }

  async search(query: string): Promise<PolymarketMarket[]> {
    const res = await fetch(
      `${this.baseUrl}/markets?keyword=${encodeURIComponent(query)}&closed=false&limit=20`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as PolymarketSearchResult;
    return data.markets ?? [];
  }

  async market(conditionId: string): Promise<PolymarketMarket | null> {
    const res = await fetch(`${this.baseUrl}/markets/${conditionId}`);
    if (!res.ok) return null;
    return res.json() as Promise<PolymarketMarket>;
  }

  async find(query: string): Promise<PolymarketMarket | null> {
    const markets = await this.search(query);
    return markets[0] ?? null;
  }

  extractProbability(market: PolymarketMarket): number {
    try {
      const prices = JSON.parse(market.outcomePrices) as number[];
      return prices[0] ?? 0.5;
    } catch {
      return market.lastTradePrice ?? 0.5;
    }
  }
}
