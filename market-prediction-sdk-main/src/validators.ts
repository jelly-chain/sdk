import { PredictionConfig } from './types';

export class Validators {
  static validateConfig(config: PredictionConfig): boolean {
    if (!config.dataSources || config.dataSources.length === 0) {
      throw new Error('At least one data source is required');
    }
    
    if (!config.keywords || config.keywords.length === 0) {
      throw new Error('At least one keyword is required');
    }
    
    if (config.confidenceThreshold < 0 || config.confidenceThreshold > 1) {
      throw new Error('Confidence threshold must be between 0 and 1');
    }
    
    return true;
  }
  
  static validateSymbol(symbol: string): boolean {
    return typeof symbol === 'string' && symbol.length > 0;
  }
  
  static validateMarketData(data: any): boolean {
    return data && typeof data.price === 'number' && data.price > 0;
  }
}
