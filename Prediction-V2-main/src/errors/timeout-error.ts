import { SDKError } from './base-error.js';

export class TimeoutError extends SDKError {
  public readonly operation: string;
  public readonly limitMs: number;

  constructor(operation: string, limitMs: number, context?: Record<string, unknown>) {
    super(`Operation "${operation}" timed out after ${limitMs}ms`, 'TIMEOUT_ERROR', context);
    this.operation = operation;
    this.limitMs = limitMs;
  }
}
