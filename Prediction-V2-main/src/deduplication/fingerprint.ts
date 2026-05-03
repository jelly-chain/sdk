import { simpleHash, fingerprintObject } from '../utils/hashes.js';
import type { EventPayload, MarketSignal } from '../types.js';

export function fingerprintEvent(event: EventPayload): string {
  return simpleHash(`${event.type}:${event.chain}:${event.id}`);
}

export function fingerprintSignal(signal: MarketSignal): string {
  return fingerprintObject({
    source: signal.source,
    direction: signal.direction,
    chain: signal.chain,
    token: signal.token,
  });
}

export function fingerprintText(text: string): string {
  return simpleHash(text.toLowerCase().replace(/\s+/g, ' ').trim());
}
