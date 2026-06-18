export enum EventType {
  WorkspaceUpdated = 'WorkspaceUpdated',
  ConfigurationSaved = 'ConfigurationSaved',
  ProjectAdded = 'ProjectAdded',
  ProjectRemoved = 'ProjectRemoved',
  PluginRegistered = 'PluginRegistered',
  PluginLoaded = 'PluginLoaded',
  PluginDisabled = 'PluginDisabled',
  WorkspaceScanStarted = 'WORKSPACE_SCAN_STARTED',
  WorkspaceScanFinished = 'WORKSPACE_SCAN_FINISHED',
  ProjectFound = 'PROJECT_FOUND',
  ProjectUpdated = 'PROJECT_UPDATED',
  WorkspaceRefreshed = 'WORKSPACE_REFRESHED',
  SafetyCheckStarted = 'SAFETY_CHECK_STARTED',
  SafetyCheckFinished = 'SAFETY_CHECK_FINISHED',
  DuplicateFound = 'DUPLICATE_FOUND',
  InvalidExport = 'INVALID_EXPORT',
  GitWarning = 'GIT_WARNING',
  WorkspaceWarning = 'WORKSPACE_WARNING',
}

export interface BaseEvent {
  type: EventType;
  timestamp: number;
}

export interface WorkspaceUpdatedEvent extends BaseEvent {
  type: EventType.WorkspaceUpdated;
  payload: { workspaceId?: string };
}

export interface ConfigurationSavedEvent extends BaseEvent {
  type: EventType.ConfigurationSaved;
  payload: { version: number };
}

export interface ProjectAddedEvent extends BaseEvent {
  type: EventType.ProjectAdded;
  payload: { projectId: string };
}

export interface ProjectRemovedEvent extends BaseEvent {
  type: EventType.ProjectRemoved;
  payload: { projectId: string };
}

export interface PluginRegisteredEvent extends BaseEvent {
  type: EventType.PluginRegistered;
  payload: { pluginId: string };
}

export interface PluginLoadedEvent extends BaseEvent {
  type: EventType.PluginLoaded;
  payload: { pluginId: string };
}

export interface PluginDisabledEvent extends BaseEvent {
  type: EventType.PluginDisabled;
  payload: { pluginId: string };
}

export interface WorkspaceScanStartedEvent extends BaseEvent {
  type: EventType.WorkspaceScanStarted;
  payload: { workspaceId: string };
}

export interface WorkspaceScanFinishedEvent extends BaseEvent {
  type: EventType.WorkspaceScanFinished;
  payload: { workspaceId: string, projectCount: number };
}

export interface ProjectFoundEvent extends BaseEvent {
  type: EventType.ProjectFound;
  payload: { projectId: string, name: string };
}

export interface ProjectUpdatedEvent extends BaseEvent {
  type: EventType.ProjectUpdated;
  payload: { projectId: string, changes: string[] };
}

export interface WorkspaceRefreshedEvent extends BaseEvent {
  type: EventType.WorkspaceRefreshed;
  payload: { workspaceId: string };
}

export interface SafetyCheckStartedEvent extends BaseEvent {
  type: EventType.SafetyCheckStarted;
  payload: { workspaceId: string };
}

export interface SafetyCheckFinishedEvent extends BaseEvent {
  type: EventType.SafetyCheckFinished;
  payload: { workspaceId: string, status: 'Healthy' | 'Warnings' | 'Errors', warningsCount: number, errorsCount: number };
}

export interface DuplicateFoundEvent extends BaseEvent {
  type: EventType.DuplicateFound;
  payload: { filePath: string };
}

export interface InvalidExportEvent extends BaseEvent {
  type: EventType.InvalidExport;
  payload: { reason: string };
}

export interface GitWarningEvent extends BaseEvent {
  type: EventType.GitWarning;
  payload: { item: string };
}

export interface WorkspaceWarningEvent extends BaseEvent {
  type: EventType.WorkspaceWarning;
  payload: { issue: string };
}

/**
 * Union type for all supported events in the system.
 */
export type SystemEvent = 
  | WorkspaceUpdatedEvent 
  | ConfigurationSavedEvent 
  | ProjectAddedEvent 
  | ProjectRemovedEvent 
  | PluginRegisteredEvent 
  | PluginLoadedEvent 
  | PluginDisabledEvent
  | WorkspaceScanStartedEvent
  | WorkspaceScanFinishedEvent
  | ProjectFoundEvent
  | ProjectUpdatedEvent
  | WorkspaceRefreshedEvent
  | SafetyCheckStartedEvent
  | SafetyCheckFinishedEvent
  | DuplicateFoundEvent
  | InvalidExportEvent
  | GitWarningEvent
  | WorkspaceWarningEvent;

export type EventHandler<T extends SystemEvent> = (event: T) => void;
