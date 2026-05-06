import type { SportsNamespace } from '../sdk.js';

export interface SchedulePressureReport {
  teamId: string;
  restDays: number | null;
  shortTurnaround: boolean;
  travelFlag: boolean;
  pressureLevel: 'high' | 'medium' | 'low' | 'none';
  riskFlags: string[];
}

export class SchedulePressure {
  constructor(private readonly sports: SportsNamespace) {}

  async evaluate(teamId: string, fixtureId?: string): Promise<SchedulePressureReport> {
    const recent = await this.sports.fixtures.recentResults(teamId, 1);
    const lastMatch = recent[0];

    let restDays: number | null = null;
    if (lastMatch) {
      const lastDate = new Date(lastMatch.kickoffUtc);
      const now = new Date();
      restDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    const shortTurnaround = restDays !== null && restDays < 4;
    const riskFlags: string[] = [];
    if (shortTurnaround) riskFlags.push('short-turnaround');

    const pressureLevel: SchedulePressureReport['pressureLevel'] =
      shortTurnaround ? 'high'
      : restDays !== null && restDays < 6 ? 'medium'
      : 'low';

    return {
      teamId,
      restDays,
      shortTurnaround,
      travelFlag: false,
      pressureLevel,
      riskFlags,
    };
  }
}
