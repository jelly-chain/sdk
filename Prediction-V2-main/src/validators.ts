import type { SDKConfig, PredictionInput } from './types.js';

export class Validators {
  static validateSDKConfig(config: SDKConfig): void {
    if (!config || typeof config !== 'object') {
      throw new Error('SDK config must be a non-null object');
    }
    if (!Array.isArray(config.chains) || config.chains.length === 0) {
      throw new Error('config.chains must be a non-empty array');
    }
    for (const chain of config.chains) {
      if (typeof chain !== 'string' || chain.trim() === '') {
        throw new Error(`Invalid chain identifier: ${String(chain)}`);
      }
    }
  }

  static validatePredictionInput(input: PredictionInput): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Prediction input must be a non-null object');
    }
    if (input.keyword !== undefined && typeof input.keyword !== 'string') {
      throw new Error('input.keyword must be a string');
    }
    if (input.token !== undefined && typeof input.token !== 'string') {
      throw new Error('input.token must be a string');
    }
    if (input.confidence !== undefined) {
      const c = (input as Record<string, unknown>)['confidence'];
      if (typeof c !== 'number' || c < 0 || c > 1) {
        throw new Error('input.confidence must be a number between 0 and 1');
      }
    }
  }

  static isNonEmpty(value: unknown): boolean {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    return value !== null && value !== undefined;
  }

  static isValidConfidence(value: number): boolean {
    return typeof value === 'number' && value >= 0 && value <= 1;
  }

  static isValidRiskScore(value: number): boolean {
    return typeof value === 'number' && value >= 0 && value <= 1;
  }
}
