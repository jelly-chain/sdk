import type { PredictionOutput } from '../types.js';

export class EmitPolicy {
  private blockedSignals: Set<string> = new Set();
  private requiredFactors: string[] = [];

  check(output: PredictionOutput): boolean {
    if (this.blockedSignals.has(output.signal)) return false;
    if (this.requiredFactors.length > 0) {
      const hasRequired = this.requiredFactors.every((f) => output.factors.includes(f));
      if (!hasRequired) return false;
    }
    return true;
  }

  blockSignal(signal: string): void {
    this.blockedSignals.add(signal);
  }

  unblockSignal(signal: string): void {
    this.blockedSignals.delete(signal);
  }

  requireFactor(factor: string): void {
    if (!this.requiredFactors.includes(factor)) this.requiredFactors.push(factor);
  }
}
