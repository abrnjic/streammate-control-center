export type ProjectHealthStatus = 'HEALTHY' | 'WARNING' | 'ERROR' | 'UNKNOWN';

export interface InspectedProject {
  id: string;
  name: string;
  type: string;
  health: ProjectHealthStatus;
  location: string;
  lastChecked: number | null;
  notes: string[];
}

export interface ProjectHealthSummary {
  totalProjects: number;
  healthy: number;
  warnings: number;
  errors: number;
  lastInspection: number | null;
}
