import { MarketPredictor } from '../../src/predictor';
import { SkillConfigManager } from './config';

export class SkillHandlers {
  private predictor: MarketPredictor;
  private configManager: SkillConfigManager;
  
  constructor() {
    this.configManager = new SkillConfigManager();
    this.predictor = new MarketPredictor(this.configManager.getConfig());
  }
  
  async handlePredictMarket(symbol: string) {
    return this.predictor.predictMarket(symbol);
  }
  
  async handleUpdateConfig(newConfig: any) {
    this.configManager = new SkillConfigManager({ ...this.configManager.getConfig(), ...newConfig });
    this.predictor = new MarketPredictor(this.configManager.getConfig());
  }
}
