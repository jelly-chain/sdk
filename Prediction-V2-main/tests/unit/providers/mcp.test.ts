import { describe, it, expect } from 'vitest';
import { MCPClient } from '../../../src/providers/mcp/client.js';
import { MCPAdapter } from '../../../src/providers/mcp/adapter.js';
import { validateTokenData } from '../../../src/providers/mcp/validators.js';

describe('MCPClient', () => {
  it('should instantiate with default params', () => {
    const client = new MCPClient();
    expect(client).toBeDefined();
  });

  it('should return null from getTokenData stub', async () => {
    const client = new MCPClient();
    const data = await client.getTokenData('0x1234');
    expect(data).toBeNull();
  });
});

describe('MCPAdapter', () => {
  it('should convert token data to market signal', () => {
    const adapter = new MCPAdapter();
    const signal = adapter.toMarketSignal({ address: '0x1', symbol: 'WBNB', price: 300, volume24h: 1_000_000, liquidity: 5_000_000, chain: 'bsc' });
    expect(signal.source).toBe('mcp');
    expect(signal.chain).toBe('bsc');
  });
});

describe('validateTokenData', () => {
  it('should validate correct token shape', () => {
    expect(validateTokenData({ address: '0x1', symbol: 'BNB', price: 300, volume24h: 1e6, liquidity: 5e6, chain: 'bsc' })).toBe(true);
  });

  it('should reject invalid shape', () => {
    expect(validateTokenData({ symbol: 'BNB' })).toBe(false);
  });
});
