import { AgentSportsContext } from '../types.js';

export function isAgentSportsContext(val: unknown): val is AgentSportsContext {
  if (typeof val !== 'object' || val === null) return false;
  const ctx = val as Record<string, unknown>;
  const entities = ctx['entities'];
  const signals = ctx['signals'];
  const entRec = typeof entities === 'object' && entities !== null ? (entities as Record<string, unknown>) : null;
  const sigRec = typeof signals === 'object' && signals !== null ? (signals as Record<string, unknown>) : null;

  return (
    typeof ctx['question'] === 'string' &&
    typeof ctx['sport'] === 'string' &&
    typeof ctx['league'] === 'string' &&
    typeof ctx['marketPlatform'] === 'string' &&
    typeof ctx['marketType'] === 'string' &&
    entRec !== null && Array.isArray(entRec['teams']) &&
    sigRec !== null && typeof sigRec['confidence'] === 'number' &&
    typeof ctx['explanation'] === 'string' &&
    typeof ctx['generatedAt'] === 'string'
  );
}
