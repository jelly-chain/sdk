export interface AgentResponseEnvelope {
  tool: string;
  version: string;
  result: Record<string, unknown>;
}

export function isAgentResponseEnvelope(val: unknown): val is AgentResponseEnvelope {
  if (typeof val !== 'object' || val === null) return false;
  const r = val as Record<string, unknown>;
  return (
    typeof r['tool'] === 'string' &&
    typeof r['version'] === 'string' &&
    typeof r['result'] === 'object' && r['result'] !== null
  );
}
