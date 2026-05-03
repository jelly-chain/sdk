import type { EventPayloadModel } from '../models/event-payload.js';

export class EventNormalizer {
  normalize(raw: Record<string, unknown>, type: string, source: string): Omit<EventPayloadModel, 'id' | 'timestamp' | 'processed'> {
    return {
      type,
      chain: (raw['chain'] as string) ?? 'unknown',
      contractAddress: raw['contractAddress'] as string | undefined,
      blockNumber: raw['blockNumber'] as number | undefined,
      txHash: raw['txHash'] as string | undefined,
      data: raw,
      source,
    };
  }

  normalizeMany(raws: Record<string, unknown>[], type: string, source: string): ReturnType<EventNormalizer['normalize']>[] {
    return raws.map((r) => this.normalize(r, type, source));
  }
}
