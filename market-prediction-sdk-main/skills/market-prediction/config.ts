export interface SkillConfig {
  dataSources?: string[];
  keywords?: string[];
  confidenceThreshold?: number;
  riskTolerance?: 'low' | 'medium' | 'high';
}

export class SkillConfigManager {
  private config: SkillConfig;
  
  constructor(initialConfig: SkillConfig = {}) {
    this.config = {
      dataSources: ['llama-fi', 'bnb-chain-mcp'],
      keywords: ['TVL surge', 'protocol launch', 'bridge activity', 'yield increase'],
      confidenceThreshold: 0.7,
      riskTolerance: 'medium',
      ...initialConfig
    };
  }
  
  getConfig(): SkillConfig {
    return { ...this.config };
  }
}
