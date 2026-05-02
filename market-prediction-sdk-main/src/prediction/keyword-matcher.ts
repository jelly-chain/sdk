import { HIGH_IMPACT_KEYWORDS } from '../constants';
import { Logger } from '../logger';

export class KeywordMatcher {
  private logger = Logger.getInstance();
  
  matchKeywords(text: string): string[] {
    const matchedKeywords: string[] = [];
    const lowerText = text.toLowerCase();
    
    HIGH_IMPACT_KEYWORDS.forEach(keyword => {
      if (lowerText.includes(keyword.toLowerCase())) {
        matchedKeywords.push(keyword);
      }
    });
    
    return matchedKeywords;
  }
  
  calculateKeywordScore(text: string): number {
    const matched = this.matchKeywords(text);
    return matched.length / HIGH_IMPACT_KEYWORDS.length;
  }
}
