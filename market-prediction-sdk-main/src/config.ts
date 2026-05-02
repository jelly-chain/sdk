import { PredictionConfig } from './types';

export class ConfigManager {
  private config: PredictionConfig;
  
  constructor(initialConfig: PredictionConfig) {
    this.validateConfig(initialConfig);
    this.config = initialConfig;
  }
  
  private validateConfig(config: PredictionConfig): void {
    if (!config.dataSources || config.dataSources.length === 0) {
      throw new Error('At least one data source is required');
    }
    
    if (!config.keywords || config.keywords.length === 0) {
      throw new Error('At least one keyword is required');
    }
  }
  
  getConfig(): PredictionConfig {
    return { ...this.config };
  }
  
  updateConfig(partialConfig: Partial<PredictionConfig>): void {
    this.config = { ...this.config, ...partialConfig };
    this.validateConfig(this.config);
  }
  
  get(key: keyof PredictionConfig): any {
    return this.config[key];
  }
}
