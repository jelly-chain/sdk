import type { SkillConfig } from '../config.js';

export const CONSERVATIVE_PRESET: Partial<SkillConfig['defaults']> = {
  chains: ['ethereum', 'bsc'],
  enableRiskAssessment: true,
  enableMetrics: true,
  enableCache: true,
  logLevel: 'info',
  confidenceThreshold: 0.75,
  riskTolerance: 'low',
};
