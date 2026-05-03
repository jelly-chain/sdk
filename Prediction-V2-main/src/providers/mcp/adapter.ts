import type { MCPTokenData } from './client.js';
import type { MarketSignalModel } from '../../models/market-signal.js';
import { createMarketSignal } from '../../models/market-signal.js';

export class MCPAdapter {
  toMarketSignal(token: MCPTokenData): MarketSignalModel {
    const direction = 'neutral';
    return createMarketSignal({
      source: 'mcp',
      direction,
      strength: 0.5,
      confidence: 0.5,
      chain: token.chain as never,
      token: token.symbol,
      raw: token,
    });
  }
}
