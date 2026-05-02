import axios from 'axios';
import { MarketData, Event } from '../types';
import { Logger } from '../logger';

export class CustomAPIClient {
  private baseUrl: string;
  private logger = Logger.getInstance();
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async fetchMarketData(symbol: string): Promise<MarketData> {
    const response = await axios.get(`${this.baseUrl}/markets/${symbol}`);
    return response.data;
  }
  
  async fetchCustomEvent(eventType: string): Promise<Event[]> {
    const response = await axios.get(`${this.baseUrl}/events/${eventType}`);
    return response.data.events || [];
  }
}
