import { Player } from '../types.js';
import type { SportsNamespace } from '../sdk.js';

export interface InjurySummary {
  teamId: string;
  unavailablePlayers: Player[];
  impactScore: number;
  keyAbsences: string[];
  riskFlags: string[];
}

export class InjuryImpact {
  constructor(private readonly sports: SportsNamespace) {}

  async summary(teamId: string): Promise<InjurySummary> {
    const unavailable = await this.sports.players.unavailable(teamId);
    const all = await this.sports.players.byTeam(teamId);

    const ratio = all.length > 0 ? unavailable.length / all.length : 0;
    const impactScore = Math.min(1, ratio * 2);

    const riskFlags: string[] = [];
    if (ratio > 0.3) riskFlags.push('high-injury-count');
    if (ratio > 0.15) riskFlags.push('injury-concern');

    return {
      teamId,
      unavailablePlayers: unavailable,
      impactScore,
      keyAbsences: unavailable.filter((p) => p.injuryNote).map((p) => p.name),
      riskFlags,
    };
  }

  classify(summary: InjurySummary): 'severe' | 'moderate' | 'mild' | 'none' {
    if (summary.impactScore >= 0.6) return 'severe';
    if (summary.impactScore >= 0.3) return 'moderate';
    if (summary.impactScore > 0) return 'mild';
    return 'none';
  }
}
