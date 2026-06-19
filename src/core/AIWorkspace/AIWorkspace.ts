import { LoggerEngine } from '../LoggerEngine/LoggerEngine';
import { EventBus } from '../EventBus/EventBus';
import { EventType } from '../EventBus/types';
import { 
  AIAgent, AITask, AIExport, AIReview, AIWorkspaceStats 
} from './types';

export class AIWorkspace {
  private logger: LoggerEngine;
  private eventBus: EventBus;

  constructor(logger: LoggerEngine, eventBus: EventBus) {
    this.logger = logger;
    this.eventBus = eventBus;
  }

  // Define some mock data explicitly
  public getAgents(): AIAgent[] {
    return [
      { id: '1', name: 'Google AI Studio', status: 'WORKING', specialization: 'Code Generation', currentTask: 'Implement Feature X', lastActivity: Date.now() - 5000 },
      { id: '2', name: 'ChatGPT', status: 'IDLE', specialization: 'Refactoring', currentTask: null, lastActivity: Date.now() - 15000 },
      { id: '3', name: 'Claude', status: 'IDLE', specialization: 'Documentation', currentTask: null, lastActivity: Date.now() - 3600000 },
      { id: '4', name: 'Gemini', status: 'WORKING', specialization: 'Architecture', currentTask: 'Design Database Schema', lastActivity: Date.now() - 1000 },
      { id: '5', name: 'QA Agent', status: 'OFFLINE', specialization: 'Testing', currentTask: null, lastActivity: Date.now() - 86400000 },
    ];
  }

  public getTasks(): AITask[] {
    return [
      { id: 't1', name: 'Implement Feature X', assignedAgent: 'Google AI Studio', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: Date.now() - 10000 },
      { id: 't2', name: 'Design Database Schema', assignedAgent: 'Gemini', priority: 'NORMAL', status: 'IN_PROGRESS', createdAt: Date.now() - 15000 },
      { id: 't3', name: 'Write Tests for Y', assignedAgent: null, priority: 'LOW', status: 'QUEUED', createdAt: Date.now() - 60000 },
      { id: 't4', name: 'Fix Bug Z', assignedAgent: 'ChatGPT', priority: 'CRITICAL', status: 'COMPLETED', createdAt: Date.now() - 120000 },
    ];
  }

  public getExports(): AIExport[] {
    return [
      { id: 'e1', name: 'Sprint 3.1 AI Export', agentId: 'Google AI Studio', validationStatus: 'PASSED', reviewStatus: 'APPROVED', receivedAt: Date.now() - 86400000 },
      { id: 'e2', name: 'Auth Module Component', agentId: 'ChatGPT', validationStatus: 'PENDING', reviewStatus: 'PENDING', receivedAt: Date.now() - 3600000 },
      { id: 'e3', name: 'Database Schema v2', agentId: 'Gemini', validationStatus: 'FAILED', reviewStatus: 'REJECTED', receivedAt: Date.now() - 7200000 },
    ];
  }

  public getReviews(): AIReview[] {
    return [
      { id: 'r1', exportId: 'e2', exportName: 'Auth Module Component', status: 'PENDING', assignedTo: 'Human Reviewer', startedAt: null },
      { id: 'r2', exportId: 'e1', exportName: 'Sprint 3.1 AI Export', status: 'APPROVED', assignedTo: 'Human Reviewer', startedAt: Date.now() - 80000000 },
    ];
  }

  public getStats(): AIWorkspaceStats {
    return {
      completedTasks: 142,
      successRate: 94.5,
      averageReviewTimeMs: 45 * 60 * 1000, // 45 minutes
    };
  }

  public triggerMockEvents() {
    this.logger.info('Triggering AI Workspace mock events...');

    this.logger.info('[EVENT] AI_AGENT_REGISTERED: New Model v2');
    this.eventBus.emit({
      type: EventType.AIAgentRegistered,
      timestamp: Date.now(),
      payload: { agentName: 'New Model v2', specialization: 'General Purpose' }
    });

    this.logger.info('[EVENT] AI_TASK_CREATED: t99');
    this.eventBus.emit({
      type: EventType.AITaskCreated,
      timestamp: Date.now(),
      payload: { taskId: 't99', taskName: 'Analyze logs' }
    });

    this.logger.info('[EVENT] AI_TASK_ASSIGNED: t99 -> Claude');
    this.eventBus.emit({
      type: EventType.AITaskAssigned,
      timestamp: Date.now(),
      payload: { taskId: 't99', agentName: 'Claude' }
    });

    this.logger.info('[EVENT] AI_EXPORT_RECEIVED: New Analysis Export');
    this.eventBus.emit({
      type: EventType.AIExportReceived,
      timestamp: Date.now(),
      payload: { exportName: 'New Analysis Export' }
    });

    this.logger.info('[EVENT] AI_REVIEW_STARTED: r99');
    this.eventBus.emit({
      type: EventType.AIReviewStarted,
      timestamp: Date.now(),
      payload: { reviewId: 'r99', exportName: 'New Analysis Export' }
    });

    this.logger.success('AI Workspace mock events triggered.');
  }
}
