import axios from 'axios';
import { Event } from '../types';
import { Logger } from '../logger';

export class AvalancheClient {
  private baseUrl = 'https://api.avax.network/ext/bc/C/rpc';
  private logger = Logger.getInstance();
  
  async getTransactionCount(address: string): Promise<number> {
    const response = await axios.post(this.baseUrl, {
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [address, 'latest'],
      id: 1
    });
    return response.data.result;
  }
}
