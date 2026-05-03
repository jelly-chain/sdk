import { sleepWithBackoff } from './backoff.js';

export interface RetryPolicyOptions {
  maxAttempts?: number;
  baseMs?: number;
  maxMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

export class RetryPolicy {
  private maxAttempts: number;
  private options: RetryPolicyOptions;

  constructor(options: RetryPolicyOptions = {}) {
    this.maxAttempts = options.maxAttempts ?? 3;
    this.options = options;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        const shouldRetry = this.options.shouldRetry?.(err, attempt) ?? true;
        if (!shouldRetry || attempt === this.maxAttempts - 1) throw err;
        await sleepWithBackoff(attempt, this.options);
      }
    }
    throw lastError;
  }
}
