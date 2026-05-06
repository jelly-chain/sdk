import { AgentSportsContext } from '../types.js';

export interface ClaudeToolResponse {
  type: 'tool_result';
  tool_use_id: string;
  content: string;
}

export interface FormattedContext {
  summary: string;
  confidence: string;
  sport: string;
  league: string;
  teams: string[];
  riskFlags: string[];
  narrativeTags: string[];
  dataQuality: string;
  disclaimer: string;
}

export class ClaudeFormat {
  format(ctx: AgentSportsContext): FormattedContext {
    const pct = (ctx.signals.confidence * 100).toFixed(0);
    const tier = ctx.signals.confidence >= 0.75 ? 'high' : ctx.signals.confidence >= 0.5 ? 'medium' : 'low';

    return {
      summary: ctx.explanation,
      confidence: `${pct}% (${tier} confidence)`,
      sport: ctx.sport,
      league: ctx.league,
      teams: ctx.entities.teams,
      riskFlags: ctx.signals.riskFlags,
      narrativeTags: ctx.signals.narrativeTags,
      dataQuality: ctx.evidence.standings?.length ? 'live data available' : 'limited data — use with caution',
      disclaimer: 'This output is for informational purposes only and does not constitute betting advice.',
    };
  }

  toToolResult(toolUseId: string, ctx: AgentSportsContext): ClaudeToolResponse {
    return {
      type: 'tool_result',
      tool_use_id: toolUseId,
      content: JSON.stringify(this.format(ctx)),
    };
  }

  hasContradictions(ctx: AgentSportsContext): boolean {
    return ctx.signals.riskFlags.length > 2 && ctx.signals.confidence > 0.8;
  }
}
