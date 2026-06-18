export interface WorkspaceMetadata {
  name: string;
  description: string;
  version: string;
}

export interface WorkspaceFolder {
  path: string;
  type: 'root' | 'aiExport' | 'backups' | 'logs' | 'tools';
}

export interface WorkspaceProject {
  id: string;
  name: string;
  path: string;
  type: string;
}

export interface WorkspaceData {
  metadata: WorkspaceMetadata;
  folders: WorkspaceFolder[];
  projects: WorkspaceProject[];
}
