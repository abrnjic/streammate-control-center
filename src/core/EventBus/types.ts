export enum EventType {
  WorkspaceUpdated = 'WorkspaceUpdated',
  ConfigurationSaved = 'ConfigurationSaved',
  ProjectAdded = 'ProjectAdded',
  ProjectRemoved = 'ProjectRemoved',
  PluginRegistered = 'PluginRegistered',
  PluginLoaded = 'PluginLoaded',
  PluginDisabled = 'PluginDisabled',
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
  | PluginDisabledEvent;

export type EventHandler<T extends SystemEvent> = (event: T) => void;
