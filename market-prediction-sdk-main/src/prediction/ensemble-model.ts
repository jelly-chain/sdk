import { MarketPrediction } from '../types';
import { PricePredictor } from './price-predictor';
import { SignalGenerator } from './signal-generator';
import { RiskAssessor } from './risk-assessor';
import { Logger } from '../logger';

export class EnsembleModel {
  private pricePredictor = new PricePredictor();
  private signalGenerator = new SignalGenerator();
  private riskAssessor = new RiskAssessor();
  private logger = Logger.getInstance();
  
  generateEnsemblePrediction(data: any, keywordScore: number): MarketPrediction {
    // Generate predictions from multiple models
    const pricePrediction = this.pricePredictor.predictPrice(data, keywordScore);
    const signals = this.signalGenerator.generateSignals(pricePrediction);
    const riskLevel = this.riskAssessor.assessRisk(pricePrediction);
    
    // Ensemble logic - combine predictions
    const ensemblePrediction: MarketPrediction = {
      ...pricePrediction,
      signals,
      riskLevel,
      confidence: this.calculateEnsembleConfidence(pricePrediction, keywordScore)
    };
    
    return ensemblePrediction;
  }
  
  private calculateEnsembleConfidence(prediction: MarketPrediction, keywordScore: number): number {
    let confidence = prediction.confidence;
    
    // Boost confidence based on keyword score
    confidence += keywordScore * 0.1;
    
    // Apply risk penalty
    if (prediction.riskLevel === 'high') confidence *= 0.8;
    else if (prediction.riskLevel === 'medium') confidence *= 0.9;
    
    return Math.min(1, Math.max(0, confidence));
  }
}
