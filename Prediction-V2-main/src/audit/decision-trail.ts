export interface DecisionFactor {
  name: string;
  value: number;
  weight: number;
  contribution: number;
  description: string;
}

export interface DecisionTrailEntry {
  predictionId: string;
  factors: DecisionFactor[];
  finalSignal: string;
  finalConfidence: number;
  timestamp: string;
}

export class DecisionTrail {
  private trails: DecisionTrailEntry[] = [];

  record(entry: Omit<DecisionTrailEntry, 'timestamp'>): void {
    this.trails.push({ ...entry, timestamp: new Date().toISOString() });
  }

  get(predictionId: string): DecisionTrailEntry | undefined {
    return this.trails.find((t) => t.predictionId === predictionId);
  }

  getAll(): DecisionTrailEntry[] {
    return [...this.trails];
  }

  getTopFactors(predictionId: string, n = 3): DecisionFactor[] {
    const trail = this.get(predictionId);
    if (!trail) return [];
    return [...trail.factors].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution)).slice(0, n);
  }
}
