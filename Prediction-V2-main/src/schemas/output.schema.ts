export const OUTPUT_SCHEMA = {
  type: 'object',
  required: ['signal', 'confidence', 'riskScore', 'factors', 'explanations', 'metadata', 'timestamp'],
  properties: {
    signal: { type: 'string', enum: ['bullish', 'bearish', 'neutral'] },
    confidence: { type: 'number', minimum: 0, maximum: 1 },
    riskScore: { type: 'number', minimum: 0, maximum: 1 },
    factors: { type: 'array', items: { type: 'string' } },
    explanations: { type: 'array', items: { type: 'string' } },
    metadata: { type: 'object' },
    timestamp: { type: 'string', format: 'date-time' },
  },
} as const;

export function validateOutput(output: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (typeof output !== 'object' || output === null) {
    errors.push('Output must be a non-null object');
    return { valid: false, errors };
  }
  const o = output as Record<string, unknown>;
  if (!['bullish', 'bearish', 'neutral'].includes(o['signal'] as string)) {
    errors.push('output.signal must be one of: bullish, bearish, neutral');
  }
  if (typeof o['confidence'] !== 'number' || (o['confidence'] as number) < 0 || (o['confidence'] as number) > 1) {
    errors.push('output.confidence must be a number between 0 and 1');
  }
  return { valid: errors.length === 0, errors };
}
