import { AgentRuntime } from './agent-runtime.js';
import { MarketPlatform } from '../types.js';

export type ToolName =
  | 'resolve_sports_question'
  | 'get_match_context'
  | 'get_league_table'
  | 'explain_sports_prediction';

export interface ToolDefinition {
  name: ToolName;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, { type: string; description?: string; enum?: string[] }>;
    required?: string[];
  };
}

export interface ToolCall {
  name: ToolName;
  parameters: Record<string, unknown>;
}

export interface ToolResult {
  tool: ToolName;
  success: boolean;
  data: unknown;
  error?: string;
}

/** Adapts the SDK as Claude/Jelly agent tools. */
export class ToolAdapter {
  constructor(private readonly runtime: AgentRuntime) {}

  async execute(call: ToolCall): Promise<ToolResult> {
    try {
      let data: unknown;

      switch (call.name) {
        case 'resolve_sports_question':
          data = await this.runtime.getSportsContext({
            question: String(call.parameters['question'] ?? ''),
            platform: (call.parameters['platform'] as MarketPlatform | undefined) ?? 'POLYMARKET',
          });
          break;
        case 'get_match_context':
          data = await this.runtime.getMatchContext({
            fixtureId: String(call.parameters['fixtureId'] ?? ''),
            platform: call.parameters['platform'] as MarketPlatform | undefined,
          });
          break;
        case 'get_league_table':
          data = await this.runtime.getLeagueContext({
            league: String(call.parameters['league'] ?? 'premier-league'),
            season: call.parameters['season'] ? String(call.parameters['season']) : undefined,
          });
          break;
        case 'explain_sports_prediction':
          data = await this.runtime.buildClaudeToolResponse({
            question: String(call.parameters['question'] ?? ''),
            platform: 'POLYMARKET',
          });
          break;
        default:
          throw new Error(`Unknown tool: ${call.name}`);
      }

      return { tool: call.name, success: true, data };
    } catch (error) {
      return {
        tool: call.name,
        success: false,
        data: null,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  getToolDefinitions(): ToolDefinition[] {
    return [
      {
        name: 'resolve_sports_question' as const,
        description: 'Parse any sports prediction market question and return structured context including confidence, evidence, and signals',
        input_schema: {
          type: 'object' as const,
          properties: {
            question: { type: 'string', description: 'The market question to resolve (e.g. "Will the Lakers beat the Celtics?")' },
            platform: { type: 'string', description: 'Prediction market platform', enum: ['POLYMARKET', 'KALSHI'] },
          },
          required: ['question'],
        },
      },
      {
        name: 'get_match_context' as const,
        description: 'Get full context for a specific match including form, matchup analysis, narratives, and key risk flags',
        input_schema: {
          type: 'object' as const,
          properties: {
            fixtureId: { type: 'string', description: 'Normalized fixture ID' },
            platform: { type: 'string', enum: ['POLYMARKET', 'KALSHI'] },
          },
          required: ['fixtureId'],
        },
      },
      {
        name: 'get_league_table' as const,
        description: 'Get current league standings table with title race, playoff bubble, and relegation zone context',
        input_schema: {
          type: 'object' as const,
          properties: {
            league: { type: 'string', description: 'League ID (e.g. "premier-league", "nba", "nfl")' },
            season: { type: 'string', description: 'Season (e.g. "2025/2026")' },
          },
          required: ['league'],
        },
      },
      {
        name: 'explain_sports_prediction' as const,
        description: 'Get a full explanation with confidence score, key factors, counter-factors, and model disclaimer for a sports prediction question',
        input_schema: {
          type: 'object' as const,
          properties: {
            question: { type: 'string', description: 'The prediction question to explain' },
          },
          required: ['question'],
        },
      },
    ];
  }
}
