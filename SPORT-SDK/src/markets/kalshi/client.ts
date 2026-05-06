import { KalshiMarket, KalshiMarketsResponse } from './types.js';

export interface KalshiConfig {
  enabled?: boolean;
  keyId?: string;
  privateKey?: string;
}

export class KalshiClient {
  private readonly baseUrl = 'https://trading-api.kalshi.com/trade-api/v2';
  readonly enabled: boolean;
  private readonly keyId: string;

  constructor(config: KalshiConfig = {}) {
    this.enabled = config.enabled !== false;
    this.keyId = config.keyId ?? process.env['KALSHI_KEY_ID'] ?? '';
  }

  async getMarkets(params: { category?: string; status?: string; limit?: number } = {}): Promise<KalshiMarket[]> {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    );
    const res = await fetch(`${this.baseUrl}/markets?${qs}`);
    if (!res.ok) return [];
    const data = (await res.json()) as KalshiMarketsResponse;
    return data.markets ?? [];
  }

  async getMarket(ticker: string): Promise<KalshiMarket | null> {
    const res = await fetch(`${this.baseUrl}/markets/${ticker}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { market: KalshiMarket };
    return data.market ?? null;
  }

  extractMidPrice(market: KalshiMarket): number {
    return (market.yes_bid + market.yes_ask) / 2 / 100;
  }

  findSportsMarkets(markets: KalshiMarket[]): KalshiMarket[] {
    const sportsCategories = ['sports', 'nba', 'nfl', 'mlb', 'nhl', 'soccer', 'tennis'];
    return markets.filter((m) =>
      sportsCategories.some((cat) => m.category?.toLowerCase().includes(cat) || m.tags.some((t) => t.toLowerCase().includes(cat))),
    );
  }
}
