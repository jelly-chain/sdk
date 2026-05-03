import type { SDKConfig, ChainId } from './types.js';

export class ConfigManager {
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.validate(config);
    this.config = { ...config };
  }

  private validate(config: SDKConfig): void {
    if (!config.chains || config.chains.length === 0) {
      throw new Error('At least one chain must be specified in SDKConfig');
    }
  }

  get<K extends keyof SDKConfig>(key: K): SDKConfig[K] {
    return this.config[key];
  }

  getAll(): Readonly<SDKConfig> {
    return Object.freeze({ ...this.config });
  }

  update(partial: Partial<SDKConfig>): void {
    this.config = { ...this.config, ...partial };
    this.validate(this.config);
  }

  getChains(): ChainId[] {
    return this.config.chains;
  }

  isEnabled(flag: keyof Pick<SDKConfig, 'enableRiskAssessment' | 'enableMetrics' | 'enableCache' | 'enableTelemetry' | 'enableAudit' | 'enableReplay'>): boolean {
    return this.config[flag] === true;
  }
}
