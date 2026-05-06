import { MatchEvent } from '../types.js';

export interface TimelineEntry {
  minute: number;
  description: string;
  type: MatchEvent['type'];
  teamId: string;
  playerId?: string;
}

export class TimelineBuilder {
  build(events: MatchEvent[]): TimelineEntry[] {
    return events
      .filter((e) => e.minute !== undefined)
      .sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0))
      .map((e) => ({
        minute: e.minute ?? 0,
        description: this.describe(e),
        type: e.type,
        teamId: e.teamId,
        playerId: e.playerId,
      }));
  }

  private describe(event: MatchEvent): string {
    const min = event.minute ? `${event.minute}'` : '';
    switch (event.type) {
      case 'goal': return `${min} GOAL! ${event.playerId ?? 'Unknown player'} scores`;
      case 'own_goal': return `${min} OWN GOAL by ${event.playerId ?? 'Unknown'}`;
      case 'red_card': return `${min} RED CARD — ${event.playerId ?? 'Unknown'}`;
      case 'yellow_card': return `${min} Yellow card — ${event.playerId ?? 'Unknown'}`;
      case 'substitution': return `${min} Substitution`;
      case 'penalty': return `${min} Penalty scored`;
      default: return `${min} ${event.type} — ${event.detail ?? ''}`;
    }
  }

  toMarkdown(entries: TimelineEntry[]): string {
    return entries.map((e) => `- **${e.minute}'** ${e.description}`).join('\n');
  }
}
