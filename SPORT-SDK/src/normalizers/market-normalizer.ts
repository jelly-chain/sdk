import { SportMarketType, MarketPlatform, Sport, League } from '../types.js';

export interface NormalizedMarket {
  id: string;
  platform: MarketPlatform;
  question: string;
  sport: Sport;
  league: League;
  marketType: SportMarketType;
  yesPrice?: number;
  noPrice?: number;
  volume?: number;
  closesAt?: string;
  resolved: boolean;
  outcome?: string;
}

export interface RawPolymarketMarket {
  id: string;
  question: string;
  outcomePrices: string;
  volume: number;
  endDateIso: string;
  resolved: boolean;
  resolutionPrice?: number;
}

export interface RawKalshiMarket {
  ticker: string;
  title: string;
  yes_bid: number;
  yes_ask: number;
  no_bid: number;
  no_ask: number;
  volume: number;
  close_time: string;
  result?: string;
}

export class MarketNormalizer {
  fromPolymarket(raw: RawPolymarketMarket, sport: Sport, league: League, marketType: SportMarketType): NormalizedMarket {
    let yesPrice: number | undefined;
    try {
      const prices = JSON.parse(raw.outcomePrices) as number[];
      yesPrice = prices[0];
    } catch {
      yesPrice = undefined;
    }

    return {
      id: raw.id,
      platform: 'POLYMARKET',
      question: raw.question,
      sport,
      league,
      marketType,
      yesPrice,
      noPrice: yesPrice !== undefined ? 1 - yesPrice : undefined,
      volume: raw.volume,
      closesAt: raw.endDateIso,
      resolved: raw.resolved,
      outcome: raw.resolutionPrice !== undefined ? String(raw.resolutionPrice) : undefined,
    };
  }

  fromKalshi(raw: RawKalshiMarket, sport: Sport, league: League, marketType: SportMarketType): NormalizedMarket {
    const yesMid = (raw.yes_bid + raw.yes_ask) / 2;
    return {
      id: raw.ticker,
      platform: 'KALSHI',
      question: raw.title,
      sport,
      league,
      marketType,
      yesPrice: yesMid / 100,
      noPrice: 1 - yesMid / 100,
      volume: raw.volume,
      closesAt: raw.close_time,
      resolved: !!raw.result,
      outcome: raw.result,
    };
  }
}
