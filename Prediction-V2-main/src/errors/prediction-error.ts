import { SDKError } from './base-error.js';

export class PredictionError extends SDKError {
  public readonly stage?: string;

  constructor(message: string, stage?: string, context?: Record<string, unknown>) {
    super(message, 'PREDICTION_ERROR', context);
    this.stage = stage;
  }
}
