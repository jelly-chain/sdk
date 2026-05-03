import { SDKError } from './base-error.js';

export class ProviderError extends SDKError {
  public readonly provider: string;
  public readonly statusCode?: number;

  constructor(message: string, provider: string, statusCode?: number, context?: Record<string, unknown>) {
    super(message, 'PROVIDER_ERROR', context);
    this.provider = provider;
    this.statusCode = statusCode;
  }
}
