import { MarketPrediction, Indicator } from '../types';
import { Logger } from '../logger';

export class SignalGenerator {
  private logger = Logger.getInstance();
  
  generateSignals(prediction: MarketPrediction): string[] {
    const signals: string[] = [];
    
    if (prediction.predictionType === 'bullish') {
      signals.push('BUY', 'LONG');
    } else if (prediction.predictionType === 'bearish') {
      signals.push('SELL', 'SHORT');
    }
    
    // Add indicator-based signals
    prediction.indicators.forEach(indicator => {
      if (indicator.signal === 'buy' && indicator.strength > 0.7) {
        signals.push('STRONG_BUY');
      } else if (indicator.signal === 'sell' && indicator.strength > 0.7) {
        signals.push('STRONG_SELL');
      }
    });
    
    return signals;
  }
  
  calculateSignalStrength(prediction: MarketPrediction): number {
    let strength = 0;
    
    if (prediction.predictionType === 'bullish') strength += 0.5;
    else if (prediction.predictionType === 'bearish') strength -= 0.5;
    
    if (prediction.confidence > 0.8) strength += 0.3;
    else if (prediction.confidence > 0.6) strength += 0.1;
    
    return Math.max(-1, Math.min(1, strength));
  }
}
