import type { LlamaFiProtocol } from './client.js';
import type { MarketSignalModel } from '../../models/market-signal.js';
import { createMarketSignal } from '../../models/market-signal.js';

export class LlamaFiAdapter {
  toMarketSignal(protocol: LlamaFiProtocol, chain: string): MarketSignalModel {
    const change = protocol.change_1d ?? 0;
    const direction = change > 2 ? 'bullish' : change < -2 ? 'bearish' : 'neutral';
    const strength = Math.min(1, Math.abs(change) / 20);
    return createMarketSignal({
      source: 'llamafi',
      direction,
      strength,
      confidence: 0.55 + strength * 0.25,
      chain: chain as never,
      token: protocol.name,
      raw: protocol,
    });
  }

  toMarketSignals(protocols: LlamaFiProtocol[], chain: string): MarketSignalModel[] {
    return protocols.map((p) => this.toMarketSignal(p, chain));
  }
}
