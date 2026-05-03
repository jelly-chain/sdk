import type { PredictionOutput } from '../types.js';

export type OutputSink = (output: PredictionOutput) => Promise<void>;

export class OutputRouter {
  private sinks: OutputSink[] = [];

  addSink(sink: OutputSink): void {
    this.sinks.push(sink);
  }

  removeSink(sink: OutputSink): void {
    this.sinks = this.sinks.filter((s) => s !== sink);
  }

  async emit(output: PredictionOutput): Promise<void> {
    await Promise.all(this.sinks.map((s) => s(output)));
  }

  sinkCount(): number {
    return this.sinks.length;
  }
}
