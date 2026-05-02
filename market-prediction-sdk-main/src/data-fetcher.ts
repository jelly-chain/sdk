import axios from 'axios';
import { MarketData, Event } from './types';
import { Logger } from './logger';
import { LlamaFiClient } from './data-sources/llama-fi';
import { BNBChainMCP } from './data-sources/bnb-chain-mcp';
import { EthereumClient } from './data-sources/ethereum';
import { PolygonClient } from './data-sources/polygon';
import { ArbitrumClient } from './data-sources/arbitrum';
import { OptimismClient } from './data-sources/optimism';
import { AvalancheClient } from './data-sources/avalanche';
import { CustomAPIClient } from './data-sources/custom-api';

export class DataFetcher {
  private clients: any[] = [];
  private logger = Logger.getInstance();
  
  constructor(dataSources: string[]) {
    dataSources.forEach(source => {
      switch(source) {
        case 'llama-fi':
          this.clients.push(new LlamaFiClient());
          break;
        case 'bnb-chain-mcp':
          this.clients.push(new BNBChainMCP());
          break;
        case 'ethereum':
          this.clients.push(new EthereumClient());
          break;
        case 'polygon':
          this.clients.push(new PolygonClient());
          break;
        case 'arbitrum':
          this.clients.push(new ArbitrumClient());
          break;
        case 'optimism':
          this.clients.push(new OptimismClient());
          break;
        case 'avalanche':
          this.clients.push(new AvalancheClient());
          break;
        default:
          this.clients.push(new CustomAPIClient(source));
      }
    });
  }
  
  async fetchMarketData(symbol: string): Promise<MarketData> {
    for (const client of this.clients) {
      try {
        const data = await client.fetchMarketData(symbol);
        if (data) return data;
      } catch (error) {
        this.logger.warn(`Failed to fetch from client`, error);
      }
    }
    
    throw new Error('No data source available');
  }
  
  async fetchEvents(eventType: string): Promise<Event[]> {
    let allEvents: Event[] = [];
    
    for (const client of this.clients) {
      const events = await client.fetchEvents(eventType);
      allEvents = [...allEvents, ...events];
    }
    
    return allEvents;
  }
}
