import { Fixture } from '../../types.js';
import { OddsApiEvent } from './types.js';

export interface NormalizedOddsEvent {
  fixtureId: string;
  homeTeam: string;
  awayTeam: string;
  sport: string;
  commenceTime: string;
  bookmakerCount: number;
  markets: Record<string, { home: number; away: number; draw?: number }>;
}

export class TheOddsApiAdapter {
  toNormalizedEvent(raw: OddsApiEvent): NormalizedOddsEvent {
    const markets: Record<string, { home: number; away: number; draw?: number }> = {};

    for (const bk of raw.bookmakers) {
      for (const market of bk.markets) {
        const home = market.outcomes.find((o) => o.name === raw.home_team)?.price ?? 0;
        const away = market.outcomes.find((o) => o.name === raw.away_team)?.price ?? 0;
        const draw = market.outcomes.find((o) => o.name === 'Draw')?.price;
        markets[market.key] = { home, away, draw };
      }
    }

    return {
      fixtureId: raw.id,
      homeTeam: raw.home_team,
      awayTeam: raw.away_team,
      sport: raw.sport_key,
      commenceTime: raw.commence_time,
      bookmakerCount: raw.bookmakers.length,
      markets,
    };
  }

  impliedProbabilities(event: NormalizedOddsEvent): { home: number; away: number; draw?: number } {
    const h2h = event.markets['h2h'];
    if (!h2h) return { home: 0.33, away: 0.33, draw: 0.33 };
    const home = h2h.home > 0 ? 1 / h2h.home : 0;
    const away = h2h.away > 0 ? 1 / h2h.away : 0;
    const draw = h2h.draw && h2h.draw > 0 ? 1 / h2h.draw : undefined;
    const total = home + away + (draw ?? 0);
    return {
      home: total > 0 ? home / total : 0.5,
      away: total > 0 ? away / total : 0.5,
      draw: draw && total > 0 ? draw / total : undefined,
    };
  }
}
