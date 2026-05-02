import { SkillConfig } from './config';

export class SkillValidators {
  static validateConfig(config: SkillConfig): boolean {
    if (config.confidenceThreshold !== undefined && 
        (config.confidenceThreshold < 0 || config.confidenceThreshold > 1)) {
      throw new Error('Confidence threshold must be between 0 and 1');
    }
    
    if (config.riskTolerance && !['low', 'medium', 'high'].includes(config.riskTolerance)) {
      throw new Error('Invalid risk tolerance');
    }
    
    return true;
  }
}
