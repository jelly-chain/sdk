import { MarketData } from '../types';
import { Logger } from '../logger';

export class TrendDetector {
  private logger = Logger.getInstance();
  
  detectTrend(dataPoints: MarketData[]): 'uptrend' | 'downtrend' | 'sideways' {
    if (dataPoints.length < 2) return 'sideways';
    
    const start = dataPoints[0].price;
    const end = dataPoints[dataPoints.length - 1].price;
    const change = ((end - start) / start) * 100;
    
    if (change > 5) return 'uptrend';
    if (change < -5) return 'downtrend';
    return 'sideways';
  }
  
  calculateMovingAverage(dataPoints: MarketData[], period: number): number[] {
    const averages: number[] = [];
    for (let i = period - 1; i < dataPoints.length; i++) {
      const sum = dataPoints.slice(i - period + 1, i + 1)
        .reduce((acc, data) => acc + data.price, 0);
      averages.push(sum / period);
    }
    return averages;
  }
}
