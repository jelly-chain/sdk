import type { PredictionOutput } from '../types.js';

export interface FormattedResponse {
  summary: string;
  details: string;
  raw: PredictionOutput;
}

export class ResponseFormatter {
  format(output: PredictionOutput): FormattedResponse {
    const emoji = output.signal === 'bullish' ? '🟢' : output.signal === 'bearish' ? '🔴' : '⚪';
    const confidence = `${(output.confidence * 100).toFixed(0)}%`;
    const risk = `${(output.riskScore * 100).toFixed(0)}%`;

    const summary = `${emoji} ${output.signal.toUpperCase()} — Confidence: ${confidence}, Risk: ${risk}`;
    const details = [
      `Signal: ${output.signal}`,
      `Confidence: ${confidence}`,
      `Risk Score: ${risk}`,
      `Factors: ${output.factors.join(', ')}`,
      `Explanation: ${output.explanations.join(' | ')}`,
      `Strategy: ${output.metadata.strategy}`,
      `Chain: ${output.metadata.chain}`,
    ].join('\n');

    return { summary, details, raw: output };
  }

  formatMarkdown(output: PredictionOutput): string {
    const { summary, details } = this.format(output);
    return `## Market Prediction\n\n**${summary}**\n\n\`\`\`\n${details}\n\`\`\``;
  }
}
