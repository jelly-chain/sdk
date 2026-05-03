import { stdDev } from '../utils/math.js';

export interface VolumeSpikeResult {
  isAnomaly: boolean;
  currentVolume: number;
  baselineVolume: number;
  ratio: number;
  severity: 'low' | 'medium' | 'high';
}

export class VolumeSpikeDetector {
  private multiplierThreshold: number;
  private history: number[] = [];

  constructor(multiplierThreshold = 2.5) {
    this.multiplierThreshold = multiplierThreshold;
  }

  addSample(volume: number): void {
    this.history.push(volume);
    if (this.history.length > 100) this.history.shift();
  }

  detect(currentVolume: number): VolumeSpikeResult {
    if (this.history.length < 5) {
      return { isAnomaly: false, currentVolume, baselineVolume: currentVolume, ratio: 1, severity: 'low' };
    }
    const baseline = this.history.reduce((a, b) => a + b, 0) / this.history.length;
    const ratio = baseline > 0 ? currentVolume / baseline : 1;
    const isAnomaly = ratio >= this.multiplierThreshold;
    const severity = ratio >= 5 ? 'high' : ratio >= 3 ? 'medium' : 'low';
    return { isAnomaly, currentVolume, baselineVolume: baseline, ratio, severity };
  }
}
