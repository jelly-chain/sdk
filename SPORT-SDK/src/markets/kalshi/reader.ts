import { KalshiClient } from './client.js';
import { KalshiMapper, MappedKalshiMarket } from './mapper.js';
import { KalshiMarket } from './types.js';
import { MemoryCache } from '../../cache/memory-cache.js';
import { Sport, League, SportMarketType } from '../../types.js';

export interface KalshiSnapshot {
  market: MappedKalshiMarket;
  yesMidPrice: number;
  noMidPrice: number;
  spread: number;
  volume: number;
  openInterest: number;
  fetchedAt: string;
}

export interface KalshiPriceBand {
  yesBid: number;
  yesAsk: number;
  yesMid: number;
  noBid: number;
  noAsk: number;
  noMid: number;
  spread: number;
  impliedProbability: number;
}

/** Read-only Kalshi market reader — snapshots, price bands, and sport filtering. */
export class KalshiReader {
  private readonly mapper = new KalshiMapper();

  constructor(
    private readonly client: KalshiClient,
    private readonly cache: MemoryCache,
  ) {}

  /** Fetch a live snapshot for a specific market by ticker. */
  async snapshot(ticker: string): Promise<KalshiSnapshot | null> {
    const cacheKey = `kalshi:snapshot:${ticker}`;
    const cached = this.cache.get<KalshiSnapshot>(cacheKey);
    if (cached) return cached;

    const raw = await this.client.getMarket(ticker);
    if (!raw) return null;

    const snapshot = this.buildSnapshot(raw);
    this.cache.set(cacheKey, snapshot);
    return snapshot;
  }

  /** Fetch all sports markets and return snapshots. */
  async sportMarkets(): Promise<KalshiSnapshot[]> {
    const cacheKey = 'kalshi:sports:all';
    const cached = this.cache.get<KalshiSnapshot[]>(cacheKey);
    if (cached) return cached;

    const all = await this.client.getMarkets({ status: 'open' });
    const sports = this.client.findSportsMarkets(all);
    const snapshots = sports.map((m) => this.buildSnapshot(m));
    this.cache.set(cacheKey, snapshots);
    return snapshots;
  }

  /** Get price band (bid/ask/mid/spread/implied probability) for a market. */
  priceBand(market: KalshiMarket): KalshiPriceBand {
    const yesBid = market.yes_bid / 100;
    const yesAsk = market.yes_ask / 100;
    const noBid = market.no_bid / 100;
    const noAsk = market.no_ask / 100;
    const yesMid = (yesBid + yesAsk) / 2;
    const noMid = (noBid + noAsk) / 2;
    return {
      yesBid, yesAsk, yesMid,
      noBid, noAsk, noMid,
      spread: yesAsk - yesBid,
      impliedProbability: yesMid,
    };
  }

  /** Filter snapshots by sport. */
  filterBySport(snapshots: KalshiSnapshot[], sport: Sport): KalshiSnapshot[] {
    return snapshots.filter((s) => s.market.sport === sport);
  }

  /** Filter snapshots by league. */
  filterByLeague(snapshots: KalshiSnapshot[], league: League): KalshiSnapshot[] {
    return snapshots.filter((s) => s.market.league === league);
  }

  /** Filter snapshots by market type. */
  filterByType(snapshots: KalshiSnapshot[], type: SportMarketType): KalshiSnapshot[] {
    return snapshots.filter((s) => s.market.marketType === type);
  }

  /** Return top N markets by volume. */
  topByVolume(snapshots: KalshiSnapshot[], n = 10): KalshiSnapshot[] {
    return [...snapshots].sort((a, b) => b.volume - a.volume).slice(0, n);
  }

  /** Detect arbitrage between Polymarket and Kalshi implied probabilities. */
  detectArbitrage(
    kalshiProb: number,
    polymarketProb: number,
    threshold = 0.03,
  ): { isArbitrage: boolean; divergence: number; direction: string } {
    const divergence = Math.abs(kalshiProb - polymarketProb);
    return {
      isArbitrage: divergence > threshold,
      divergence,
      direction: kalshiProb > polymarketProb ? 'kalshi-higher' : 'poly-higher',
    };
  }

  private buildSnapshot(raw: KalshiMarket): KalshiSnapshot {
    const mapped = this.mapper.map(raw);
    const yesMid = this.client.extractMidPrice(raw);
    return {
      market: mapped,
      yesMidPrice: yesMid,
      noMidPrice: 1 - yesMid,
      spread: (raw.yes_ask - raw.yes_bid) / 100,
      volume: raw.volume,
      openInterest: raw.open_interest,
      fetchedAt: new Date().toISOString(),
    };
  }
}
