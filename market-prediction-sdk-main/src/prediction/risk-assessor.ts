import { MarketPrediction } from '../types';
import { Logger } from '../logger';

export class RiskAssessor {
  private logger = Logger.getInstance();
  
  assessRisk(prediction: MarketPrediction): 'low' | 'medium' | 'high' {
    let riskScore = 0;
    
    // Higher price prediction increases risk
    if (prediction.price > 1000) riskScore += 2;
    else if (prediction.price > 100) riskScore += 1;
    
    // Lower confidence increases risk
    if (prediction.confidence < 0.6) riskScore += 2;
    else if (prediction.confidence < 0.8) riskScore += 1;
    
    // Volatility based risk (simplified)
    riskScore += this.calculateVolatilityRisk(prediction);
    
    if (riskScore >= 4) return 'high';
    if (riskScore >= 2) return 'medium';
    return 'low';
  }
  
  private calculateVolatilityRisk(prediction: MarketPrediction): number {
    // Placeholder for volatility risk calculation
    return 1;
  }
}
