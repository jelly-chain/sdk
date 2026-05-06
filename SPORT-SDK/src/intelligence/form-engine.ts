import { FormRecord, League } from '../types.js';
import type { SportsNamespace } from '../sdk.js';

export class FormEngine {
  constructor(private readonly sports: SportsNamespace) {}

  async team(teamId: string, league: League, window = 5): Promise<FormRecord> {
    const results = await this.sports.results.forTeam(teamId, window);
    const formResults: Array<'W' | 'D' | 'L'> = results.map((r) => {
      if (r.winner === teamId) return 'W';
      if (r.winner === 'draw') return 'D';
      return 'L';
    });

    const pointsFor = results.reduce(
      (s, r) => s + (r.homeTeamId === teamId ? r.homeScore : r.awayScore),
      0,
    );
    const pointsAgainst = results.reduce(
      (s, r) => s + (r.homeTeamId === teamId ? r.awayScore : r.homeScore),
      0,
    );

    const wins = formResults.filter((r) => r === 'W').length;
    const draws = formResults.filter((r) => r === 'D').length;
    const formRating = results.length > 0 ? (wins + draws * 0.5) / results.length : 0.5;

    return {
      teamId,
      league,
      window,
      results: formResults,
      pointsFor,
      pointsAgainst,
      formRating,
    };
  }

  classify(record: FormRecord): 'excellent' | 'good' | 'average' | 'poor' {
    if (record.formRating >= 0.75) return 'excellent';
    if (record.formRating >= 0.55) return 'good';
    if (record.formRating >= 0.35) return 'average';
    return 'poor';
  }
}
