import { MatchEvent, Fixture } from '../types.js';

export interface ReplayFrame {
  minute: number;
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
  homeTeamId: string;
  awayTeamId: string;
}

export class ReplayEngine {
  buildFrames(fixture: Fixture, events: MatchEvent[]): ReplayFrame[] {
    const sorted = [...events].sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0));
    const maxMinute = Math.max(...sorted.map((e) => e.minute ?? 0), 90);
    const frames: ReplayFrame[] = [];

    let homeScore = 0;
    let awayScore = 0;
    let eventIdx = 0;

    for (let minute = 0; minute <= maxMinute; minute++) {
      const frameEvents: MatchEvent[] = [];
      while (eventIdx < sorted.length && (sorted[eventIdx]?.minute ?? 0) <= minute) {
        const event = sorted[eventIdx];
        if (event) {
          frameEvents.push(event);
          if (event.type === 'goal' && event.teamId === fixture.homeTeamId) homeScore++;
          else if (event.type === 'goal' && event.teamId === fixture.awayTeamId) awayScore++;
          else if (event.type === 'own_goal') {
            if (event.teamId === fixture.homeTeamId) awayScore++;
            else homeScore++;
          }
        }
        eventIdx++;
      }
      frames.push({ minute, homeScore, awayScore, events: frameEvents, homeTeamId: fixture.homeTeamId, awayTeamId: fixture.awayTeamId });
    }

    return frames;
  }

  getFrameAt(frames: ReplayFrame[], minute: number): ReplayFrame | undefined {
    return frames.find((f) => f.minute === minute) ?? frames[frames.length - 1];
  }
}
