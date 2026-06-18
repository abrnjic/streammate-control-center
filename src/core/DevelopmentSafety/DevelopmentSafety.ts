import { LoggerEngine } from '../LoggerEngine/LoggerEngine';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';
import { WorkspaceScanner } from '../WorkspaceScanner/WorkspaceScanner';
import { WorkspaceEngine } from '../WorkspaceEngine/WorkspaceEngine';
import { ConfigEngine } from '../ConfigEngine/ConfigEngine';
import { SafetyCheckResult, SafetyStatus } from './types';

export class DevelopmentSafety {
  private logger: LoggerEngine;
  private eventBus: EventBus;
  private workspaceScanner: WorkspaceScanner;
  private workspaceEngine: WorkspaceEngine;
  private configEngine: ConfigEngine;
  private latestResult: SafetyCheckResult = {
    status: 'Healthy',
    warningsCount: 0,
    errorsCount: 0,
    duplicates: [],
    gitWarnings: [],
    exportIssues: [],
    workspaceIssues: []
  };

  constructor(
    logger: LoggerEngine,
    eventBus: EventBus,
    workspaceScanner: WorkspaceScanner,
    workspaceEngine: WorkspaceEngine,
    configEngine: ConfigEngine
  ) {
    this.logger = logger;
    this.eventBus = eventBus;
    this.workspaceScanner = workspaceScanner;
    this.workspaceEngine = workspaceEngine;
    this.configEngine = configEngine;
  }

  public getStatus(): SafetyCheckResult {
    return this.latestResult;
  }

  public async runSafetyCheck(): Promise<SafetyCheckResult> {
    const workspace = this.workspaceEngine.getWorkspace();
    const workspaceId = workspace ? workspace.metadata.name : 'Unknown';

    this.logger.info(`Starting Development Safety Check for workspace: ${workspaceId}`);
    
    this.eventBus.emit({
      type: EventType.SafetyCheckStarted,
      timestamp: Date.now(),
      payload: { workspaceId }
    });

    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const duplicates = this.mockDuplicateDetector();
    const gitWarnings = this.mockGitSafety();
    const exportIssues = this.mockExportValidator();
    const workspaceIssues = this.mockWorkspaceValidator();

    const warningsCount = duplicates.length + gitWarnings.length + workspaceIssues.length;
    const errorsCount = exportIssues.length;

    let status: SafetyStatus = 'Healthy';
    if (errorsCount > 0) status = 'Errors';
    else if (warningsCount > 0) status = 'Warnings';

    this.latestResult = {
      status,
      warningsCount,
      errorsCount,
      duplicates,
      gitWarnings,
      exportIssues,
      workspaceIssues
    };

    this.eventBus.emit({
      type: EventType.SafetyCheckFinished,
      timestamp: Date.now(),
      payload: { workspaceId, status, warningsCount, errorsCount }
    });

    if (status === 'Healthy') {
      this.logger.success(`Development Safety Check finished successfully.`);
    } else if (status === 'Warnings') {
      this.logger.warning(`Development Safety Check finished with ${warningsCount} warnings.`);
    } else {
      this.logger.error(`Development Safety Check failed with ${errorsCount} errors and ${warningsCount} warnings.`);
    }

    return this.latestResult;
  }

  private mockDuplicateDetector(): string[] {
    const findings: string[] = [];
    
    // In a real implementation this would check:
    // * 2.*
    // *.copy
    // *.bak
    // *.tmp
    
    findings.forEach(f => {
      this.logger.warning(`Duplicate found: ${f}`);
      this.eventBus.emit({
        type: EventType.DuplicateFound,
        timestamp: Date.now(),
        payload: { filePath: f }
      });
    });
    return findings;
  }

  private mockGitSafety(): string[] {
    const findings: string[] = [];
    
    // In a real implementation this would check node_modules, dist, build, coverage, .env, debug.keystore, .DS_Store
    
    findings.forEach(f => {
      this.logger.warning(`Git Safety Warning: ${f}`);
      this.eventBus.emit({
        type: EventType.GitWarning,
        timestamp: Date.now(),
        payload: { item: f }
      });
    });
    return findings;
  }

  private mockExportValidator(): string[] {
    const issues: string[] = [];
    
    // In a real implementation this would check AI Export for package.json, src, tsconfig, vite.config, tailwind.config
    
    issues.forEach(i => {
      this.logger.error(`Export Validation Error: ${i}`);
      this.eventBus.emit({
        type: EventType.InvalidExport,
        timestamp: Date.now(),
        payload: { reason: i }
      });
    });
    return issues;
  }

  private mockWorkspaceValidator(): string[] {
    const issues: string[] = [];
    const ws = this.workspaceEngine.getWorkspace();
    
    if (!ws) {
      issues.push('Workspace not configured at all.');
    } else {
      let foldersCount = 0;
      if (ws.folders.some(f => f.type === 'root' && f.path)) foldersCount++;
      if (ws.folders.some(f => f.type === 'aiExport' && f.path)) foldersCount++;
      
      if (foldersCount < 2) {
         issues.push('AI Export Folder or Root Folder not configured.');
      }
      
      if (!ws.projects || ws.projects.length === 0) {
         issues.push('No projects found in the workspace.');
      }
    }

    issues.forEach(i => {
      this.logger.warning(`Workspace Validation Warning: ${i}`);
      this.eventBus.emit({
        type: EventType.WorkspaceWarning,
        timestamp: Date.now(),
        payload: { issue: i }
      });
    });
    
    return issues;
  }
}
