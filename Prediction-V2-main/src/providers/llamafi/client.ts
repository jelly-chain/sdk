import { Logger } from '../../logger.js';

export interface LlamaFiProtocol {
  name: string;
  tvl: number;
  change_1d?: number;
  change_7d?: number;
  chains: string[];
  category?: string;
}

export class LlamaFiClient {
  private baseUrl: string;
  private apiKey?: string;
  private logger = new Logger({ prefix: 'LlamaFi' });

  constructor(baseUrl = 'https://api.llama.fi', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async getProtocols(): Promise<LlamaFiProtocol[]> {
    this.logger.debug('Fetching protocols from LlamaFi');
    return [];
  }

  async getProtocol(slug: string): Promise<LlamaFiProtocol | null> {
    this.logger.debug(`Fetching protocol: ${slug}`);
    return null;
  }

  async getTVL(protocol: string): Promise<number> {
    this.logger.debug(`Fetching TVL for: ${protocol}`);
    return 0;
  }

  async getChainTVL(chain: string): Promise<number> {
    this.logger.debug(`Fetching chain TVL: ${chain}`);
    return 0;
  }
}
