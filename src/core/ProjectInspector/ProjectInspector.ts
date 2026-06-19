import { LoggerEngine } from '../LoggerEngine/LoggerEngine';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';
import { WorkspaceEngine } from '../WorkspaceEngine/WorkspaceEngine';
import { InspectedProject, ProjectHealthSummary, ProjectHealthStatus } from './types';

export class ProjectInspector {
  private logger: LoggerEngine;
  private eventBus: EventBus;
  private workspaceEngine: WorkspaceEngine;
  private inspectedProjects: Map<string, InspectedProject> = new Map();
  private lastInspection: number | null = null;

  constructor(logger: LoggerEngine, eventBus: EventBus, workspaceEngine: WorkspaceEngine) {
    this.logger = logger;
    this.eventBus = eventBus;
    this.workspaceEngine = workspaceEngine;
  }

  public getSummary(): ProjectHealthSummary {
    let healthy = 0;
    let warnings = 0;
    let errors = 0;

    Array.from(this.inspectedProjects.values()).forEach(p => {
      if (p.health === 'HEALTHY') healthy++;
      if (p.health === 'WARNING') warnings++;
      if (p.health === 'ERROR') errors++;
    });

    return {
      totalProjects: this.inspectedProjects.size,
      healthy,
      warnings,
      errors,
      lastInspection: this.lastInspection
    };
  }

  public getInspectedProjects(): InspectedProject[] {
    return Array.from(this.inspectedProjects.values());
  }

  public async inspectProjects(): Promise<ProjectHealthSummary> {
    const workspace = this.workspaceEngine.getWorkspace();
    const workspaceId = workspace ? workspace.metadata.name : 'Unknown';

    this.logger.info(`Starting Project Inspection in workspace: ${workspaceId}`);
    
    this.eventBus.emit({
      type: EventType.ProjectInspectionStarted,
      timestamp: Date.now(),
      payload: { workspaceId }
    });

    // Mock an inspection that takes some time
    await new Promise(resolve => setTimeout(resolve, 800));

    this.inspectedProjects.clear();
    const mockProjects: InspectedProject[] = [
      { id: '1', name: 'StreamMate Enterprise', type: 'Core Platform', health: 'HEALTHY', location: '/workspace/streammate-enterprise', lastChecked: Date.now(), notes: ['Core platform running optimally.'] },
      { id: '2', name: 'StreamMate Control Center', type: 'Internal Tool', health: 'HEALTHY', location: '/workspace/streammate-control-center', lastChecked: Date.now(), notes: ['Control Center is online.'] },
      { id: '3', name: 'Portal', type: 'Frontend App', health: 'HEALTHY', location: '/workspace/streammate-portal', lastChecked: Date.now(), notes: ['Vite build successful.'] },
      { id: '4', name: 'Backend', type: 'API Service', health: 'WARNING', location: '/workspace/streammate-backend', lastChecked: Date.now(), notes: ['High memory usage detected.'] },
      { id: '5', name: 'Android', type: 'Mobile App', health: 'ERROR', location: '/workspace/streammate-android', lastChecked: Date.now(), notes: ['Gradle build failed.'] },
      { id: '6', name: 'AI Exports', type: 'Data Transfer', health: 'HEALTHY', location: '/workspace/ai-exports', lastChecked: Date.now(), notes: ['Export directory verified.'] },
      { id: '7', name: 'Backups', type: 'Storage Engine', health: 'UNKNOWN', location: '/workspace/backups', lastChecked: Date.now(), notes: ['No backups scanned yet.'] },
    ];

    mockProjects.forEach(p => {
      this.inspectedProjects.set(p.id, p);
      this.eventBus.emit({
        type: EventType.ProjectHealthUpdated,
        timestamp: Date.now(),
        payload: { projectId: p.id, health: p.health }
      });
      if (p.health === 'WARNING' || p.health === 'ERROR') {
        const warningNotes = p.notes.join(' ');
        this.logger.warning(`Project Issue Found [${p.name}]: ${warningNotes}`);
        this.eventBus.emit({
          type: EventType.ProjectWarningFound,
          timestamp: Date.now(),
          payload: { projectId: p.id, warning: warningNotes }
        });
      }
    });

    this.lastInspection = Date.now();
    const summary = this.getSummary();

    this.eventBus.emit({
      type: EventType.ProjectInspectionFinished,
      timestamp: Date.now(),
      payload: { 
        workspaceId, 
        totalProjects: summary.totalProjects,
        healthy: summary.healthy,
        warnings: summary.warnings,
        errors: summary.errors
      }
    });

    this.logger.success(`Project Inspection complete. Analyzed ${summary.totalProjects} projects.`);
    return summary;
  }
}
