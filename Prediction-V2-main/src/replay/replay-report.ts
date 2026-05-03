export interface ReplayReport {
  snapshotId?: string;
  startedAt: string;
  completedAt: string;
  totalEvents: number;
  processedEvents: number;
  erroredEvents: number;
  durationMs: number;
  errorRate: number;
  summary: string;
}

export function buildReplayReport(
  result: { processed: number; errors: number; durationMs: number },
  total: number,
  snapshotId?: string,
): ReplayReport {
  const startedAt = new Date(Date.now() - result.durationMs).toISOString();
  const completedAt = new Date().toISOString();
  const errorRate = total > 0 ? result.errors / total : 0;
  return {
    snapshotId,
    startedAt,
    completedAt,
    totalEvents: total,
    processedEvents: result.processed,
    erroredEvents: result.errors,
    durationMs: result.durationMs,
    errorRate,
    summary: `Replayed ${result.processed}/${total} events in ${result.durationMs}ms. Error rate: ${(errorRate * 100).toFixed(1)}%`,
  };
}
