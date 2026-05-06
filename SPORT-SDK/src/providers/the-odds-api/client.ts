import { AbstractProvider } from '../base-provider.js';
import { OddsApiSport, OddsApiEvent } from './types.js';

export interface TheOddsApiConfig {
  apiKey?: string;
  enabled?: boolean;
}

export class TheOddsApiClient extends AbstractProvider {
  override readonly name = 'TheOddsAPI';
  override readonly enabled: boolean;
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.the-odds-api.com/v4';

  constructor(config: TheOddsApiConfig = {}) {
    super();
    this.apiKey = config.apiKey ?? process.env['ODDS_API_KEY'] ?? '';
    this.enabled = !!(config.enabled !== false && this.apiKey);
  }

  async getSports(): Promise<OddsApiSport[]> {
    return this.get<OddsApiSport[]>(`${this.baseUrl}/sports/?apiKey=${this.apiKey}`);
  }

  async getOdds(
    sport: string,
    regions = 'us',
    markets = 'h2h',
  ): Promise<OddsApiEvent[]> {
    return this.get<OddsApiEvent[]>(
      `${this.baseUrl}/sports/${sport}/odds/?apiKey=${this.apiKey}&regions=${regions}&markets=${markets}&oddsFormat=decimal`,
    );
  }

  async getScores(sport: string, daysFrom = 3): Promise<OddsApiEvent[]> {
    return this.get<OddsApiEvent[]>(
      `${this.baseUrl}/sports/${sport}/scores/?apiKey=${this.apiKey}&daysFrom=${daysFrom}`,
    );
  }
}
