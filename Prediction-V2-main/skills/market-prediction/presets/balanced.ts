import type { SkillConfig } from '../config.js';

export const BALANCED_PRESET: Partial<SkillConfig['defaults']> = {
  chains: ['ethereum', 'bsc', 'base', 'polygon'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: true,
  logLevel: 'info',
  confidenceThreshold: 0.6,
  riskTolerance: 'medium',
};
