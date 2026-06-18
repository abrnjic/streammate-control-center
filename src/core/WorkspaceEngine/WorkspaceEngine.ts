import { WorkspaceData, WorkspaceProject, WorkspaceFolder, WorkspaceMetadata } from './types';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';

/**
 * Engine responsible for modeling workspace layout, components, and project lists.
 * Provides internal state management for the Control Center workspace ecosystem.
 */
export class WorkspaceEngine {
  private workspace: WorkspaceData | null = null;
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  /**
   * Initializes the engine with loaded workspace bounds.
   */
  public loadWorkspace(data: WorkspaceData): void {
    this.workspace = data;
    this.eventBus.emit({
      type: EventType.WorkspaceUpdated,
      timestamp: Date.now(),
      payload: { workspaceId: data.metadata.name }
    });
  }

  /**
   * Reaps current generic application bounds.
   */
  public getWorkspace(): WorkspaceData | null {
    return this.workspace;
  }

  /**
   * Append a target project bounding object to the workspace stack.
   */
  public addProject(project: WorkspaceProject): void {
    if (this.workspace) {
      this.workspace.projects.push(project);
      this.eventBus.emit({
        type: EventType.ProjectAdded,
        timestamp: Date.now(),
        payload: { projectId: project.id }
      });
    }
  }

  /**
   * Discards project logic associated with isolated id.
   */
  public removeProject(projectId: string): void {
    if (this.workspace) {
      this.workspace.projects = this.workspace.projects.filter(p => p.id !== projectId);
      this.eventBus.emit({
        type: EventType.ProjectRemoved,
        timestamp: Date.now(),
        payload: { projectId }
      });
    }
  }
}
