import type { SportsNamespace } from '../sdk.js';

export interface SquadStrengthReport {
  teamId: string;
  availabilityRatio: number;
  depthScore: number;
  overallRating: number;
  tier: 'elite' | 'strong' | 'average' | 'weak';
}

export class SquadStrength {
  constructor(private readonly sports: SportsNamespace) {}

  async evaluate(teamId: string): Promise<SquadStrengthReport> {
    const [all, available, team] = await Promise.all([
      this.sports.players.byTeam(teamId),
      this.sports.players.available(teamId),
      this.sports.teams.byId(teamId).catch(() => null),
    ]);

    const availabilityRatio = all.length > 0 ? available.length / all.length : 1;
    const rankingScore = team?.ranking ? Math.max(0, 1 - team.ranking / 200) : 0.5;
    const depthScore = Math.min(1, all.length / 25);
    const overallRating = availabilityRatio * 0.4 + rankingScore * 0.4 + depthScore * 0.2;

    const tier: SquadStrengthReport['tier'] =
      overallRating >= 0.75 ? 'elite'
      : overallRating >= 0.55 ? 'strong'
      : overallRating >= 0.35 ? 'average'
      : 'weak';

    return { teamId, availabilityRatio, depthScore, overallRating, tier };
  }
}
