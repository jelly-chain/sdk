import { KalshiMarket } from './types.js';
import { Sport, League, SportMarketType } from '../../types.js';

export interface MappedKalshiMarket {
  ticker: string;
  title: string;
  sport: Sport;
  league: League;
  marketType: SportMarketType;
  yesMidPrice: number;
  volume: number;
  closesAt: string;
  status: string;
}

export class KalshiMapper {
  map(market: KalshiMarket): MappedKalshiMarket {
    const title = market.title.toLowerCase();
    return {
      ticker: market.ticker,
      title: market.title,
      sport: this.detectSport(title),
      league: this.detectLeague(title),
      marketType: this.detectMarketType(title),
      yesMidPrice: (market.yes_bid + market.yes_ask) / 2 / 100,
      volume: market.volume,
      closesAt: market.close_time,
      status: market.status,
    };
  }

  private detectSport(title: string): Sport {
    if (title.includes('nba')) return 'basketball';
    if (title.includes('nfl') || title.includes('super bowl')) return 'american-football';
    if (title.includes('mlb')) return 'baseball';
    if (title.includes('nhl')) return 'ice-hockey';
    if (title.includes('tennis') || title.includes('wimbledon')) return 'tennis';
    return 'football';
  }

  private detectLeague(title: string): League {
    if (title.includes('nba')) return 'nba';
    if (title.includes('nfl')) return 'nfl';
    if (title.includes('mlb')) return 'mlb';
    if (title.includes('nhl')) return 'nhl';
    return 'premier-league';
  }

  private detectMarketType(title: string): SportMarketType {
    if (title.includes('champion') || title.includes('win it all')) return 'CHAMPIONSHIP_WINNER';
    if (title.includes('series')) return 'SERIES_WINNER';
    if (title.includes('mvp')) return 'MVP';
    return 'MATCH_WINNER';
  }
}
