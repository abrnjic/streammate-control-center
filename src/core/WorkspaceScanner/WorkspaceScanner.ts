import { LoggerEngine } from '../LoggerEngine/LoggerEngine';
import { WorkspaceEngine } from '../WorkspaceEngine/WorkspaceEngine';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';
import { ScanOptions, ScannerStatus } from './types';
import { WorkspaceProject, WorkspaceFolder } from '../WorkspaceEngine/types';

export class WorkspaceScanner {
  private logger: LoggerEngine;
  private workspaceEngine: WorkspaceEngine;
  private eventBus: EventBus;
  private status: ScannerStatus = {
    isScanning: false,
    lastScanFinishedAt: null,
    error: null
  };

  constructor(logger: LoggerEngine, workspaceEngine: WorkspaceEngine, eventBus: EventBus) {
    this.logger = logger;
    this.workspaceEngine = workspaceEngine;
    this.eventBus = eventBus;
  }

  public async scanWorkspace(options?: ScanOptions): Promise<void> {
    if (this.status.isScanning) {
      this.logger.warning('Scan already in progress.');
      return;
    }

    const workspace = this.workspaceEngine.getWorkspace();
    if (!workspace) {
      this.logger.error('No workspace loaded to scan.');
      return;
    }

    this.status.isScanning = true;
    this.status.error = null;
    
    this.eventBus.emit({
      type: EventType.WorkspaceScanStarted,
      timestamp: Date.now(),
      payload: { workspaceId: workspace.metadata.name }
    });
    
    this.logger.info(`Starting mock workspace scan for: ${workspace.metadata.name}...`);

    // Simulate scan delay (browser-safe, no fs/child_process)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Fire mock events
    this.eventBus.emit({
      type: EventType.ProjectFound,
      timestamp: Date.now(),
      payload: { projectId: 'mock-1', name: 'Mock Project 1' }
    });

    this.status.isScanning = false;
    this.status.lastScanFinishedAt = Date.now();
    
    const projects = this.workspaceEngine.getWorkspace()?.projects || [];
    
    this.eventBus.emit({
      type: EventType.WorkspaceScanFinished,
      timestamp: Date.now(),
      payload: { workspaceId: workspace.metadata.name, projectCount: projects.length }
    });

    this.logger.success('Workspace scan finished successfully.');
  }

  public async refresh(): Promise<void> {
    this.logger.info('Refreshing workspace data...');
    const workspace = this.workspaceEngine.getWorkspace();
    if (workspace) {
      this.eventBus.emit({
        type: EventType.WorkspaceRefreshed,
        timestamp: Date.now(),
        payload: { workspaceId: workspace.metadata.name }
      });
      this.logger.success('Workspace refreshed.');
    } else {
       this.logger.warning('No workspace to refresh.');
    }
  }

  public getProjects(): WorkspaceProject[] {
    const ws = this.workspaceEngine.getWorkspace();
    return ws ? ws.projects : [];
  }

  public getFolders(): WorkspaceFolder[] {
    const ws = this.workspaceEngine.getWorkspace();
    return ws ? ws.folders : [];
  }

  public getProjectById(id: string): WorkspaceProject | undefined {
    return this.getProjects().find(p => p.id === id);
  }
  
  public getStatus(): ScannerStatus {
    return { ...this.status };
  }
}
