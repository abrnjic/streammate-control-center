export type AIAgentStatus = 'IDLE' | 'WORKING' | 'OFFLINE';
export type AITaskPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'CRITICAL';
export type AITaskStatus = 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type AIExportValidationStatus = 'PENDING' | 'PASSED' | 'FAILED';
export type AIReviewStatus = 'PENDING' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED';

export interface AIAgent {
  id: string;
  name: string;
  status: AIAgentStatus;
  specialization: string;
  currentTask: string | null;
  lastActivity: number | null;
}

export interface AITask {
  id: string;
  name: string;
  assignedAgent: string | null;
  priority: AITaskPriority;
  status: AITaskStatus;
  createdAt: number;
}

export interface AIExport {
  id: string;
  name: string;
  agentId: string;
  validationStatus: AIExportValidationStatus;
  reviewStatus: AIReviewStatus;
  receivedAt: number;
}

export interface AIReview {
  id: string;
  exportId: string;
  exportName: string;
  status: AIReviewStatus;
  assignedTo: string;
  startedAt: number | null;
}

export interface AIWorkspaceStats {
  completedTasks: number;
  successRate: number; // percentage 0-100
  averageReviewTimeMs: number;
}
