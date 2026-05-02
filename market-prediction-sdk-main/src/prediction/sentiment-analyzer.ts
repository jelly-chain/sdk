import { SENTIMENT_KEYWORDS } from '../constants';
import { Logger } from '../logger';

export class SentimentAnalyzer {
  private logger = Logger.getInstance();
  
  analyzeSentiment(text: string): number {
    let score = 0;
    const lowerText = text.toLowerCase();
    
    for (const [keyword, sentimentValue] of Object.entries(SENTIMENT_KEYWORDS)) {
      if (lowerText.includes(keyword.toLowerCase())) {
        score += sentimentValue as number;
      }
    }
    
    return this.normalizeScore(score);
  }
  
  private normalizeScore(score: number): number {
    const maxScore = Object.keys(SENTIMENT_KEYWORDS).length;
    return Math.max(-1, Math.min(1, score / maxScore));
  }
}
