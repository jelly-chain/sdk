import { SportMarketType, MarketPlatform, Sport, League } from '../../types.js';
import { NormalizedMarket } from '../../normalizers/market-normalizer.js';

export class MarketCommon {
  compareAcrossPlatforms(
    polymarketProb: number | undefined,
    kalshiProb: number | undefined,
  ): { divergence: number; direction: 'poly-higher' | 'kalshi-higher' | 'aligned' } {
    if (polymarketProb === undefined || kalshiProb === undefined) {
      return { divergence: 0, direction: 'aligned' };
    }
    const divergence = Math.abs(polymarketProb - kalshiProb);
    const direction =
      polymarketProb > kalshiProb ? 'poly-higher'
      : kalshiProb > polymarketProb ? 'kalshi-higher'
      : 'aligned';
    return { divergence, direction };
  }

  isArbitrageOpportunity(polyProb: number, kalshiProb: number, threshold = 0.03): boolean {
    return Math.abs(polyProb - kalshiProb) > threshold;
  }

  filterBySport(markets: NormalizedMarket[], sport: Sport): NormalizedMarket[] {
    return markets.filter((m) => m.sport === sport);
  }

  filterByLeague(markets: NormalizedMarket[], league: League): NormalizedMarket[] {
    return markets.filter((m) => m.league === league);
  }

  filterByType(markets: NormalizedMarket[], type: SportMarketType): NormalizedMarket[] {
    return markets.filter((m) => m.marketType === type);
  }

  filterByPlatform(markets: NormalizedMarket[], platform: MarketPlatform): NormalizedMarket[] {
    return markets.filter((m) => m.platform === platform);
  }
}
