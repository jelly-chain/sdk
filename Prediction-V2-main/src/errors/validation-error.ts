import { SDKError } from './base-error.js';

export class ValidationError extends SDKError {
  public readonly field?: string;

  constructor(message: string, field?: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', context);
    this.field = field;
  }
}
