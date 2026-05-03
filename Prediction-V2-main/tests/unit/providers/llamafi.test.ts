import { describe, it, expect } from 'vitest';
import { LlamaFiClient } from '../../../src/providers/llamafi/client.js';
import { LlamaFiAdapter } from '../../../src/providers/llamafi/adapter.js';
import { validateProtocol } from '../../../src/providers/llamafi/validators.js';

describe('LlamaFiClient', () => {
  it('should instantiate with default params', () => {
    const client = new LlamaFiClient();
    expect(client).toBeDefined();
  });

  it('should return empty array from getProtocols stub', async () => {
    const client = new LlamaFiClient();
    const protocols = await client.getProtocols();
    expect(Array.isArray(protocols)).toBe(true);
  });
});

describe('LlamaFiAdapter', () => {
  it('should convert protocol to market signal', () => {
    const adapter = new LlamaFiAdapter();
    const signal = adapter.toMarketSignal({ name: 'TestProtocol', tvl: 1_000_000, change_1d: 5, chains: ['bsc'] }, 'bsc');
    expect(signal.direction).toBe('bullish');
    expect(signal.source).toBe('llamafi');
  });
});

describe('validateProtocol', () => {
  it('should validate correct protocol shape', () => {
    expect(validateProtocol({ name: 'Test', tvl: 100, chains: ['bsc'] })).toBe(true);
  });

  it('should reject invalid shape', () => {
    expect(validateProtocol({ name: 'Test' })).toBe(false);
  });
});
