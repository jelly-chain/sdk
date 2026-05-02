import { MarketPredictorConfig } from './types';
import { ConfigManager } from './config';
import { DataFetcher } from './data-fetcher';
import { KeywordMatcher } from './prediction/keyword-matcher';
import { SentimentAnalyzer } from './prediction/sentiment-analyzer';
import { EnsembleModel } from './prediction/ensemble-model';
import { RiskAssessor } from './prediction/risk-assessor';
import { SignalGenerator } from './prediction/signal-generator';
import { Logger } from './logger';
import { Validators } from './validators';
import { CacheManager } from './cache';
import { MetricsCollector } from './metrics';
import { EventBus } from './events';

export class MarketPredictor {
  private configManager: ConfigManager;
  private dataFetcher: DataFetcher;
  private keywordMatcher: KeywordMatcher;
  private sentimentAnalyzer: SentimentAnalyzer;
  private ensembleModel: EnsembleModel;
  private riskAssessor: RiskAssessor;
  private signalGenerator: SignalGenerator;
  private logger: Logger;
  private cache: CacheManager;
  private metrics: MetricsCollector;
  private eventBus: EventBus;
  
  constructor(config: MarketPredictorConfig) {
    Validators.validateConfig(config);
    
    this.configManager = new ConfigManager(config);
    this.dataFetcher = new DataFetcher(config.dataSources);
    this.keywordMatcher = new KeywordMatcher();
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.ensembleModel = new EnsembleModel();
    this.riskAssessor = new RiskAssessor();
    this.signalGenerator = new SignalGenerator();
    this.logger = Logger.getInstance();
    this.cache = new CacheManager();
    this.metrics = new MetricsCollector();
    this.eventBus = new EventBus();
  }
  
  async predictMarket(symbol: string): Promise<any> {
    this.logger.info('Predicting market', { symbol });
    
    // Check cache first
    const cacheKey = `prediction_${symbol}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.logger.info('Using cached prediction', symbol);
      return cached;
    }
    
    // Fetch market data
    const marketData = await this.dataFetcher.fetchMarketData(symbol);
    
    // Analyze keywords and sentiment
    const keywordScore = this.keywordMatcher.calculateKeywordScore(JSON.stringify(marketData));
    const sentimentScore = this.sentimentAnalyzer.analyzeSentiment(JSON.stringify(marketData));
    
    // Generate ensemble prediction
    const prediction = this.ensembleModel.generateEnsemblePrediction(marketData, keywordScore);
    
    // Assess risk and generate signals
    prediction.riskLevel = this.riskAssessor.assessRisk(prediction);
    prediction.signals = this.signalGenerator.generateSignals(prediction);
    prediction.confidence = this.ensembleModel.calculateEnsembleConfidence(prediction, keywordScore);
    
    // Cache result
    this.cache.set(cacheKey, prediction);
    
    // Record metrics
    this.metrics.record('prediction_latency', Date.now());
    this.metrics.record('prediction_confidence', prediction.confidence);
    
    this.logger.info('Prediction complete', { symbol, predictionType: prediction.predictionType });
    
    return prediction;
  }
  
  async updateConfig(newConfig: any): Promise<void> {
    this.configManager.updateConfig(newConfig);
    this.dataFetcher = new DataFetcher(this.configManager.getConfig().dataSources);
  }
}
