import { PolymarketClient } from './client.js';
import { PolymarketMapper, MappedPolymarketMarket } from './mapper.js';
import { PolymarketMarket } from './types.js';
import { MemoryCache } from '../../cache/memory-cache.js';
import { Sport, League, SportMarketType } from '../../types.js';

export interface PolymarketSnapshot {
  market: MappedPolymarketMarket;
  impliedProbability: number;
  volume24h: number;
  spread: number;
  fetchedAt: string;
}

export interface PolymarketPriceBand {
  bestBid: number;
  bestAsk: number;
  mid: number;
  spread: number;
  impliedProbability: number;
}

/** Read-only Polymarket market reader — snapshots, price bands, and sport filtering. */
export class PolymarketReader {
  private readonly mapper = new PolymarketMapper();

  constructor(
    private readonly client: PolymarketClient,
    private readonly cache: MemoryCache,
  ) {}

  /** Fetch a live price snapshot for a specific market by conditionId. */
  async snapshot(conditionId: string): Promise<PolymarketSnapshot | null> {
    const cacheKey = `poly:snapshot:${conditionId}`;
    const cached = this.cache.get<PolymarketSnapshot>(cacheKey);
    if (cached) return cached;

    const raw = await this.client.market(conditionId);
    if (!raw) return null;

    const snapshot = this.buildSnapshot(raw);
    this.cache.set(cacheKey, snapshot);
    return snapshot;
  }

  /** Search markets and return price snapshots for all results. */
  async search(query: string): Promise<PolymarketSnapshot[]> {
    const cacheKey = `poly:search:${query}`;
    const cached = this.cache.get<PolymarketSnapshot[]>(cacheKey);
    if (cached) return cached;

    const markets = await this.client.search(query);
    const snapshots = markets.map((m) => this.buildSnapshot(m));
    this.cache.set(cacheKey, snapshots);
    return snapshots;
  }

  /** Find the best-matching market for a natural language question. */
  async findForQuestion(question: string): Promise<PolymarketSnapshot | null> {
    const market = await this.client.find(question);
    if (!market) return null;
    return this.buildSnapshot(market);
  }

  /** Get price band (bid/ask/mid/spread/implied probability) for a market. */
  priceBand(market: PolymarketMarket): PolymarketPriceBand {
    const bestBid = market.bestBid ?? 0;
    const bestAsk = market.bestAsk ?? 1;
    const mid = (bestBid + bestAsk) / 2;
    const impliedProbability = this.client.extractProbability(market);
    return { bestBid, bestAsk, mid, spread: bestAsk - bestBid, impliedProbability };
  }

  /** Filter a list of snapshots by sport. */
  filterBySport(snapshots: PolymarketSnapshot[], sport: Sport): PolymarketSnapshot[] {
    return snapshots.filter((s) => s.market.sport === sport);
  }

  /** Filter a list of snapshots by league. */
  filterByLeague(snapshots: PolymarketSnapshot[], league: League): PolymarketSnapshot[] {
    return snapshots.filter((s) => s.market.league === league);
  }

  /** Filter a list of snapshots by market type. */
  filterByType(snapshots: PolymarketSnapshot[], type: SportMarketType): PolymarketSnapshot[] {
    return snapshots.filter((s) => s.market.marketType === type);
  }

  /** Return top N markets by 24h volume. */
  topByVolume(snapshots: PolymarketSnapshot[], n = 10): PolymarketSnapshot[] {
    return [...snapshots].sort((a, b) => b.volume24h - a.volume24h).slice(0, n);
  }

  private buildSnapshot(raw: PolymarketMarket): PolymarketSnapshot {
    const mapped = this.mapper.map(raw);
    const impliedProbability = this.client.extractProbability(raw);
    return {
      market: mapped,
      impliedProbability,
      volume24h: raw.volume24hr ?? 0,
      spread: raw.spread ?? 0,
      fetchedAt: new Date().toISOString(),
    };
  }
}
