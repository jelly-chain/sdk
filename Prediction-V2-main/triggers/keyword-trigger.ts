import { ALL_DEFAULT_KEYWORDS } from '../constants/keywords.js';
import { normalizeKeyword, containsAny } from '../utils/strings.js';

export class KeywordTrigger {
  private keywords: string[];

  constructor(keywords: string[] = ALL_DEFAULT_KEYWORDS) {
    this.keywords = keywords.map(normalizeKeyword);
  }

  evaluate(text: string): boolean {
    return containsAny(text, this.keywords);
  }

  getMatchedKeywords(text: string): string[] {
    const normalized = text.toLowerCase();
    return this.keywords.filter((kw) => normalized.includes(kw));
  }

  addKeyword(keyword: string): void {
    this.keywords.push(normalizeKeyword(keyword));
  }

  removeKeyword(keyword: string): void {
    const normalized = normalizeKeyword(keyword);
    this.keywords = this.keywords.filter((k) => k !== normalized);
  }

  setKeywords(keywords: string[]): void {
    this.keywords = keywords.map(normalizeKeyword);
  }
}
