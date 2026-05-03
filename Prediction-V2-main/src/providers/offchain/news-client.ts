import { Logger } from '../../logger.js';

export interface NewsArticle {
  title: string;
  url: string;
  publishedAt: string;
  sentiment?: number;
  relevance?: number;
  source: string;
}

export class NewsClient {
  private apiKey?: string;
  private logger = new Logger({ prefix: 'NewsClient' });

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async fetchArticles(query: string, limit = 20): Promise<NewsArticle[]> {
    this.logger.debug(`Fetching news for query: ${query}`);
    return [];
  }

  async fetchCryptoNews(token: string): Promise<NewsArticle[]> {
    return this.fetchArticles(`crypto ${token}`);
  }
}
