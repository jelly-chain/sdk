import axios from 'axios';
import { MarketData, Event } from '../types';
import { Logger } from '../logger';

export class LlamaFiClient {
  private baseUrl = 'https://api.llama.fi';
  private logger = Logger.getInstance();
  
  async getTVL(protocol: string): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/protocol/${protocol}`);
      return response.data.tvl || 0;
    } catch (error) {
      this.logger.error('Failed to fetch TVL from LlamaFi', error);
      throw error;
    }
  }
  
  async getProtocolData(protocol: string): Promise<any> {
    const response = await axios.get(`${this.baseUrl}/protocol/${protocol}`);
    return response.data;
  }
  
  async getChainTVL(chain: string): Promise<number> {
    const response = await axios.get(`${this.baseUrl}/chain/${chain}`);
    return response.data.tvl || 0;
  }
}
