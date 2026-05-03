import type { PredictionInput } from '../../src/types.js';

export function validateSkillInput(input: PredictionInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!input.keyword && !input.token) {
    errors.push('Either keyword or token must be provided');
  }
  if (input.chain && typeof input.chain !== 'string') {
    errors.push('chain must be a string');
  }
  return { valid: errors.length === 0, errors };
}

export function sanitizeInput(input: PredictionInput): PredictionInput {
  return {
    ...input,
    keyword: input.keyword?.trim(),
    token: input.token?.trim().toUpperCase(),
    chain: input.chain ?? 'bsc',
  };
}
