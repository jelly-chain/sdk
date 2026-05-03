import type { MarketSignalModel } from '../models/market-signal.js';
import { fingerprintObject } from '../utils/hashes.js';

export class SignalDeduper {
  private seen: Set<string> = new Set();
  private windowMs: number;
  private timestamps: Map<string, number> = new Map();

  constructor(windowMs = 300_000) {
    this.windowMs = windowMs;
  }

  isDuplicate(signal: MarketSignalModel): boolean {
    this.evictExpired();
    const fp = fingerprintObject({ source: signal.source, direction: signal.direction, chain: signal.chain, token: signal.token });
    return this.seen.has(fp);
  }

  mark(signal: MarketSignalModel): void {
    const fp = fingerprintObject({ source: signal.source, direction: signal.direction, chain: signal.chain, token: signal.token });
    this.seen.add(fp);
    this.timestamps.set(fp, Date.now());
  }

  filter(signals: MarketSignalModel[]): MarketSignalModel[] {
    return signals.filter((s) => {
      if (this.isDuplicate(s)) return false;
      this.mark(s);
      return true;
    });
  }

  private evictExpired(): void {
    const cutoff = Date.now() - this.windowMs;
    for (const [fp, ts] of this.timestamps) {
      if (ts < cutoff) {
        this.seen.delete(fp);
        this.timestamps.delete(fp);
      }
    }
  }
}
