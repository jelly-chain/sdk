export interface TVLShockResult {
  isShock: boolean;
  changePercent: number;
  threshold: number;
  direction: 'up' | 'down';
  severity: 'low' | 'medium' | 'high';
}

export class TVLShockDetector {
  private threshold: number;

  constructor(threshold = 10) {
    this.threshold = threshold;
  }

  detect(previousTVL: number, currentTVL: number): TVLShockResult {
    if (previousTVL === 0) return { isShock: false, changePercent: 0, threshold: this.threshold, direction: 'up', severity: 'low' };
    const changePercent = ((currentTVL - previousTVL) / previousTVL) * 100;
    const isShock = Math.abs(changePercent) >= this.threshold;
    const severity = Math.abs(changePercent) >= 30 ? 'high' : Math.abs(changePercent) >= 15 ? 'medium' : 'low';
    return { isShock, changePercent, threshold: this.threshold, direction: changePercent >= 0 ? 'up' : 'down', severity };
  }
}
