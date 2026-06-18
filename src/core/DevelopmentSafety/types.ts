export type SafetyStatus = 'Healthy' | 'Warnings' | 'Errors';

export interface SafetyCheckResult {
  status: SafetyStatus;
  warningsCount: number;
  errorsCount: number;
  duplicates: string[];
  gitWarnings: string[];
  exportIssues: string[];
  workspaceIssues: string[];
}
