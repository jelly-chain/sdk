export class ConfidenceExplainer {
  explain(confidence: number): string {
    const pct = `${(confidence * 100).toFixed(0)}%`;
    if (confidence >= 0.85) return `Confidence is very high (${pct}) — strong signal agreement across multiple sources.`;
    if (confidence >= 0.7) return `Confidence is high (${pct}) — most signals point in the same direction.`;
    if (confidence >= 0.55) return `Confidence is moderate (${pct}) — signals lean in one direction with some disagreement.`;
    if (confidence >= 0.4) return `Confidence is low (${pct}) — signals are mixed or limited in quality.`;
    return `Confidence is very low (${pct}) — insufficient or contradictory signals.`;
  }

  toOneLiner(confidence: number): string {
    return `Confidence: ${(confidence * 100).toFixed(0)}%`;
  }
}
