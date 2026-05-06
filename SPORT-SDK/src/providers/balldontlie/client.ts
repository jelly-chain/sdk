import { AbstractProvider } from '../base-provider.js';
import { BdlPaginatedResponse, BdlTeam, BdlPlayer, BdlGame } from './types.js';

export interface BallDontLieConfig {
  apiKey?: string;
  enabled?: boolean;
}

export class BallDontLieClient extends AbstractProvider {
  override readonly name = 'BallDontLie';
  override readonly enabled: boolean;
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.balldontlie.io/v1';

  constructor(config: BallDontLieConfig = {}) {
    super();
    this.apiKey = config.apiKey ?? process.env['BALLDONTLIE_API_KEY'] ?? '';
    this.enabled = !!(config.enabled !== false && this.apiKey);
  }

  private headers(): Record<string, string> {
    return { Authorization: this.apiKey };
  }

  async getTeams(): Promise<BdlPaginatedResponse<BdlTeam>> {
    return this.get<BdlPaginatedResponse<BdlTeam>>(`${this.baseUrl}/teams`, this.headers());
  }

  async getGames(params: { seasons?: number[]; team_ids?: number[]; dates?: string[] } = {}): Promise<BdlPaginatedResponse<BdlGame>> {
    const qs = new URLSearchParams();
    if (params.seasons) params.seasons.forEach((s) => qs.append('seasons[]', String(s)));
    if (params.team_ids) params.team_ids.forEach((id) => qs.append('team_ids[]', String(id)));
    if (params.dates) params.dates.forEach((d) => qs.append('dates[]', d));
    return this.get<BdlPaginatedResponse<BdlGame>>(`${this.baseUrl}/games?${qs.toString()}`, this.headers());
  }

  async getPlayers(search?: string): Promise<BdlPaginatedResponse<BdlPlayer>> {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.get<BdlPaginatedResponse<BdlPlayer>>(`${this.baseUrl}/players${qs}`, this.headers());
  }
}
