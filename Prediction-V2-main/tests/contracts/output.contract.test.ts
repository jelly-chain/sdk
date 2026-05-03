import { describe, it, expect } from 'vitest';
import { WMarketPredictor } from '../../src/predictor.js';
import { validateOutput } from '../../src/schemas/output.schema.js';

describe('Output contract', () => {
  it('should produce output that passes schema validation', async () => {
    const predictor = new WMarketPredictor({ chains: ['bsc'] });
    const output = await predictor.predict({ keyword: 'bridge inflow' });
    const { valid, errors } = validateOutput(output);
    expect(errors).toEqual([]);
    expect(valid).toBe(true);
  });

  it('should always include required fields', async () => {
    const predictor = new WMarketPredictor({ chains: ['bsc'] });
    const output = await predictor.predict({});
    expect(output).toHaveProperty('signal');
    expect(output).toHaveProperty('confidence');
    expect(output).toHaveProperty('riskScore');
    expect(output).toHaveProperty('factors');
    expect(output).toHaveProperty('explanations');
    expect(output).toHaveProperty('metadata');
    expect(output).toHaveProperty('timestamp');
  });
});
