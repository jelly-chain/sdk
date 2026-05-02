import { MarketPredictor } from '../../src/predictor';
import { ConfigManager } from '../../src/config';
import { Logger } from '../../src/logger';

export async function initializeMarketPredictionSkill(config: any) {
  const logger = Logger.getInstance();
  logger.info('Initializing Market Prediction Skill', config);
  
  const predictor = new MarketPredictor({
    dataSources: config.dataSources || ['llama-fi', 'bnb-chain-mcp'],
    keywords: config.keywords || ['TVL surge', 'protocol launch', 'bridge activity']
  });
  
  return predictor;
}
