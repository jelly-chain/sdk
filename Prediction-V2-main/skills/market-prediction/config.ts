import type { SDKConfig } from '../../src/types.js';

export interface SkillConfig {
  defaults: {
    chains: string[];
    enableRiskAssessment: boolean;
    enableMetrics: boolean;
    enableCache: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    confidenceThreshold: number;
    riskTolerance: 'low' | 'medium' | 'high';
  };
}

export class SkillConfig {
  defaults: SkillConfig['defaults'] = {
    chains: ['bsc', 'ethereum'],
    enableRiskAssessment: true,
    enableMetrics: true,
    enableCache: true,
    logLevel: 'info',
    confidenceThreshold: 0.6,
    riskTolerance: 'medium',
  };

  constructor(overrides?: Partial<SkillConfig['defaults']>) {
    this.defaults = { ...this.defaults, ...overrides };
  }

  toSDKConfig(): SDKConfig {
    return {
      chains: this.defaults.chains,
      enableRiskAssessment: this.defaults.enableRiskAssessment,
      enableMetrics: this.defaults.enableMetrics,
      enableCache: this.defaults.enableCache,
      logLevel: this.defaults.logLevel,
      riskOptions: { tolerance: this.defaults.riskTolerance, confidenceThreshold: this.defaults.confidenceThreshold },
    };
  }
}
