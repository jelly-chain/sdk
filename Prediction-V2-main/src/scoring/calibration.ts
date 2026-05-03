import { clamp } from '../utils/math.js';

export class Calibration {
  private bias: number;
  private scale: number;

  constructor(bias = 0, scale = 1) {
    this.bias = bias;
    this.scale = scale;
  }

  calibrate(rawScore: number): number {
    return clamp(rawScore * this.scale + this.bias, 0, 1);
  }

  calibrateMany(scores: number[]): number[] {
    return scores.map((s) => this.calibrate(s));
  }

  updateFromHistory(predicted: number[], actual: number[]): void {
    if (predicted.length !== actual.length || predicted.length === 0) return;
    const meanPred = predicted.reduce((a, b) => a + b, 0) / predicted.length;
    const meanActual = actual.reduce((a, b) => a + b, 0) / actual.length;
    this.bias = meanActual - meanPred;
  }
}
