type CircuitState = 'closed' | 'open' | 'half-open';

export class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failures = 0;
  private lastFailureTime = 0;
  private failureThreshold: number;
  private recoveryMs: number;

  constructor(options: { failureThreshold?: number; recoveryMs?: number } = {}) {
    this.failureThreshold = options.failureThreshold ?? 5;
    this.recoveryMs = options.recoveryMs ?? 30_000;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.maybeRecover();
    if (this.state === 'open') throw new Error('Circuit breaker is OPEN — refusing execution');

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private maybeRecover(): void {
    if (this.state === 'open' && Date.now() - this.lastFailureTime >= this.recoveryMs) {
      this.state = 'half-open';
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.failureThreshold) this.state = 'open';
  }

  getState(): CircuitState {
    return this.state;
  }
}
