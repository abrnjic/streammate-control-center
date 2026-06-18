export enum PluginStatus {
  UNREGISTERED = 'UNREGISTERED',
  REGISTERED = 'REGISTERED',
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  ERROR = 'ERROR'
}

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
}

export interface PluginDefinition {
  metadata: PluginMetadata;
  dependencies: string[];
  status: PluginStatus;
}
