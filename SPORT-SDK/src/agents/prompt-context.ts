import { AgentSportsContext, Sport, League } from '../types.js';

export class PromptContext {
  buildSystemSection(sport: Sport, league: League): string {
    return `You are a sports prediction intelligence assistant with access to live ${sport} data from the ${league} via sports-jelly-sdk. Use the available tools to answer prediction questions with evidence-backed context. Always communicate confidence levels and risk flags. Never present predictions as certainties.`;
  }

  buildEvidenceSummary(ctx: AgentSportsContext): string {
    const lines: string[] = [
      `**Market Question:** ${ctx.question}`,
      `**Sport / League:** ${ctx.sport} / ${ctx.league}`,
      `**Platform:** ${ctx.marketPlatform}`,
      `**Teams:** ${ctx.entities.teams.join(' vs ')}`,
      `**Confidence:** ${(ctx.signals.confidence * 100).toFixed(0)}%`,
    ];

    if (ctx.signals.riskFlags.length > 0) {
      lines.push(`**Risk Flags:** ${ctx.signals.riskFlags.join(', ')}`);
    }

    if (ctx.signals.narrativeTags.length > 0) {
      lines.push(`**Narrative Tags:** ${ctx.signals.narrativeTags.join(', ')}`);
    }

    if (ctx.evidence.standings && ctx.evidence.standings.length > 0) {
      lines.push(`**Standings Available:** ${ctx.evidence.standings.length} teams`);
    }

    lines.push(`**Explanation:** ${ctx.explanation}`);

    return lines.join('\n');
  }
}
