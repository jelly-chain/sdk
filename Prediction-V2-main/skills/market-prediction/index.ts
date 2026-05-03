import { WMarketPredictor } from '../../src/predictor.js';
import { SkillConfig } from './config.js';
import { SkillHandlers } from './handlers.js';

export function bootstrapSkill(overrides?: Partial<SkillConfig['defaults']>): SkillHandlers {
  const config = new SkillConfig(overrides);
  return new SkillHandlers(new WMarketPredictor(config.toSDKConfig()));
}

export { SkillConfig, SkillHandlers };
export * from './types.js';
