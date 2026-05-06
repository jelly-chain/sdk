import { PolymarketMarket } from './types.js';
import { Sport, League, SportMarketType } from '../../types.js';

export interface MappedPolymarketMarket {
  id: string;
  question: string;
  sport: Sport;
  league: League;
  marketType: SportMarketType;
  teams: string[];
  probability: number;
  volume: number;
  closesAt: string;
}

export class PolymarketMapper {
  map(market: PolymarketMarket): MappedPolymarketMarket {
    const question = market.question.toLowerCase();
    const sport = this.detectSport(question);
    const league = this.detectLeague(question);
    const marketType = this.detectMarketType(question);

    let probability: number;
    try {
      const prices = JSON.parse(market.outcomePrices) as number[];
      probability = prices[0] ?? 0.5;
    } catch {
      probability = market.lastTradePrice ?? 0.5;
    }

    return {
      id: market.id,
      question: market.question,
      sport,
      league,
      marketType,
      teams: [],
      probability,
      volume: market.volume,
      closesAt: market.endDate,
    };
  }

  private detectSport(question: string): Sport {
    if (question.includes('nba') || question.includes('basketball')) return 'basketball';
    if (question.includes('nfl') || question.includes('football') && question.includes('super bowl')) return 'american-football';
    if (question.includes('mlb') || question.includes('baseball')) return 'baseball';
    if (question.includes('nhl') || question.includes('hockey')) return 'ice-hockey';
    if (question.includes('tennis') || question.includes('wimbledon')) return 'tennis';
    if (question.includes('ufc') || question.includes('mma')) return 'mma';
    if (question.includes('f1') || question.includes('formula')) return 'formula1';
    return 'football';
  }

  private detectLeague(question: string): League {
    if (question.includes('nba')) return 'nba';
    if (question.includes('nfl')) return 'nfl';
    if (question.includes('mlb')) return 'mlb';
    if (question.includes('nhl')) return 'nhl';
    if (question.includes('wimbledon')) return 'wimbledon';
    if (question.includes('world cup') || question.includes('fifa')) return 'fifa-world-cup';
    if (question.includes('champions league')) return 'champions-league';
    if (question.includes('premier league')) return 'premier-league';
    return 'premier-league';
  }

  private detectMarketType(question: string): SportMarketType {
    if (question.includes('champion') || question.includes('win the title')) return 'CHAMPIONSHIP_WINNER';
    if (question.includes('series') || question.includes('round')) return 'SERIES_WINNER';
    if (question.includes('qualify') || question.includes('advance')) return 'QUALIFICATION';
    if (question.includes('mvp')) return 'MVP';
    return 'MATCH_WINNER';
  }
}
