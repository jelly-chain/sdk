import { PredictionFeatures } from './feature-builder.js';

export interface ConfidenceResult {
  score: number;
  tier: 'very-high' | 'high' | 'medium' | 'low' | 'uncertain';
  factors: string[];
  uncertaintyNotes: string[];
}

export class ConfidenceEngine {
  score(features: PredictionFeatures): ConfidenceResult {
    const factors: string[] = [];
    const uncertaintyNotes: string[] = [];

    let base = 0.5;

    const formDelta = Math.abs(features.homeFormRating - features.awayFormRating);
    if (formDelta > 0.2) {
      base += formDelta * 0.2;
      factors.push(`form-differential: ${formDelta.toFixed(2)}`);
    }

    if (Math.abs(features.rankingDelta) > 0.15) {
      base += Math.abs(features.rankingDelta) * 0.1;
      factors.push(`ranking-advantage: ${(features.rankingDelta * 100).toFixed(0)} positions`);
    }

    const injuryDiff = features.awayInjuryImpact - features.homeInjuryImpact;
    if (Math.abs(injuryDiff) > 0.1) {
      base += injuryDiff * 0.1;
      factors.push('injury-impact-differential');
    }

    if (features.dataCompleteness < 0.5) {
      uncertaintyNotes.push('incomplete-data');
      base = Math.min(base, 0.65);
    }

    if (features.h2hEdge !== 0) {
      base += features.h2hEdge * 0.05;
      factors.push('h2h-history');
    }

    const finalScore = Math.max(0.1, Math.min(0.95, base));

    const tier: ConfidenceResult['tier'] =
      finalScore >= 0.8 ? 'very-high'
      : finalScore >= 0.65 ? 'high'
      : finalScore >= 0.5 ? 'medium'
      : finalScore >= 0.35 ? 'low'
      : 'uncertain';

    return { score: finalScore, tier, factors, uncertaintyNotes };
  }

  isReliable(result: ConfidenceResult): boolean {
    return result.tier !== 'uncertain' && result.uncertaintyNotes.length === 0;
  }
}
