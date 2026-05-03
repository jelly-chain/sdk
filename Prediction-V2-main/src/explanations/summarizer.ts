import type { PredictionOutput } from '../types.js';

export class Summarizer {
  summarize(output: PredictionOutput): string {
    const pct = (n: number) => `${(n * 100).toFixed(0)}%`;
    return [
      `Signal: ${output.signal} (confidence ${pct(output.confidence)}, risk ${pct(output.riskScore)}).`,
      output.factors.length > 0 ? `Key factors: ${output.factors.join(', ')}.` : '',
      output.explanations[0] ?? '',
    ].filter(Boolean).join(' ');
  }

  summarizeMany(outputs: PredictionOutput[]): string[] {
    return outputs.map((o) => this.summarize(o));
  }

  toMarkdown(output: PredictionOutput): string {
    const lines = [
      `**Signal:** ${output.signal}`,
      `**Confidence:** ${(output.confidence * 100).toFixed(0)}%`,
      `**Risk:** ${(output.riskScore * 100).toFixed(0)}%`,
      `**Factors:** ${output.factors.join(', ')}`,
      `**Strategy:** ${output.metadata.strategy}`,
    ];
    return lines.join('\n');
  }
}
