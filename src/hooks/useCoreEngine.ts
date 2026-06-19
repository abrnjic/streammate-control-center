import { useState, useEffect, useRef } from 'react';
import { EventBus, LoggerEngine, WorkspaceEngine, WorkspaceScanner, ConfigEngine, DevelopmentSafety, ProjectInspector, AIWorkspace } from '../core';
import { EventType, SystemEvent } from '../core/EventBus/types';
import { ScannerStatus } from '../core/WorkspaceScanner/types';
import { SafetyCheckResult } from '../core/DevelopmentSafety/types';
import { ProjectHealthSummary, InspectedProject } from '../core/ProjectInspector/types';
import { WorkspaceData, WorkspaceProject, WorkspaceFolder } from '../core/WorkspaceEngine/types';

export function useCoreEngine(addLog: (msg: string) => void) {
  const engineRef = useRef<{
    eventBus: EventBus;
    logger: LoggerEngine;
    workspaceEngine: WorkspaceEngine;
    workspaceScanner: WorkspaceScanner;
    configEngine: ConfigEngine;
    developmentSafety: DevelopmentSafety;
    projectInspector: ProjectInspector;
    aiWorkspace: AIWorkspace;
  } | null>(null);

  const [scannerStatus, setScannerStatus] = useState<ScannerStatus>({
    isScanning: false,
    lastScanFinishedAt: null,
    error: null
  });

  const [safetyStatus, setSafetyStatus] = useState<SafetyCheckResult>({
    status: 'Healthy',
    warningsCount: 0,
    errorsCount: 0,
    duplicates: [],
    gitWarnings: [],
    exportIssues: [],
    workspaceIssues: []
  });

  const [projectHealthSummary, setProjectHealthSummary] = useState<ProjectHealthSummary>({
    totalProjects: 0,
    healthy: 0,
    warnings: 0,
    errors: 0,
    lastInspection: null
  });

  const [inspectedProjects, setInspectedProjects] = useState<InspectedProject[]>([]);
  const [isProjectInspectionRunning, setIsProjectInspectionRunning] = useState(false);

  const [isSafetyCheckRunning, setIsSafetyCheckRunning] = useState(false);

  const [projectsCount, setProjectsCount] = useState(0);

  if (!engineRef.current) {
    const eventBus = new EventBus();
    const logger = new LoggerEngine();
    const configEngine = new ConfigEngine(eventBus);
    const workspaceEngine = new WorkspaceEngine(eventBus);
    const workspaceScanner = new WorkspaceScanner(logger, workspaceEngine, eventBus);
    const developmentSafety = new DevelopmentSafety(logger, eventBus, workspaceScanner, workspaceEngine, configEngine);
    const projectInspector = new ProjectInspector(logger, eventBus, workspaceEngine);
    const aiWorkspace = new AIWorkspace(logger, eventBus);
    
    engineRef.current = { eventBus, logger, workspaceEngine, workspaceScanner, configEngine, developmentSafety, projectInspector, aiWorkspace };
  }

  const { eventBus, logger, workspaceEngine, workspaceScanner, developmentSafety, projectInspector, aiWorkspace } = engineRef.current;

  useEffect(() => {
    const unsubLog = logger.subscribe((entry) => {
      // Forward core logs to UI
      const prefix = entry.level === 'INFO' ? 'INFO' :
                     entry.level === 'WARNING' ? 'WARN' :
                     entry.level === 'ERROR' ? 'ERROR' : 'SYSTEM';
      addLog(`[${prefix}] ${entry.message}`);
    });

    const unsubStart = eventBus.on(EventType.WorkspaceScanStarted, () => {
      setScannerStatus(workspaceScanner.getStatus());
    });
    
    const unsubFinish = eventBus.on(EventType.WorkspaceScanFinished, (e) => {
      setScannerStatus(workspaceScanner.getStatus());
      if (e.type === EventType.WorkspaceScanFinished) {
        setProjectsCount(e.payload.projectCount);
      }
    });

    const unsubSafetyStart = eventBus.on(EventType.SafetyCheckStarted, () => {
      setIsSafetyCheckRunning(true);
    });

    const unsubSafetyFinish = eventBus.on(EventType.SafetyCheckFinished, () => {
      setIsSafetyCheckRunning(false);
      setSafetyStatus(developmentSafety.getStatus());
    });

    const unsubProjectInspectionStart = eventBus.on(EventType.ProjectInspectionStarted, () => {
      setIsProjectInspectionRunning(true);
    });

    const unsubProjectInspectionFinish = eventBus.on(EventType.ProjectInspectionFinished, () => {
      setIsProjectInspectionRunning(false);
      setProjectHealthSummary(projectInspector.getSummary());
      setInspectedProjects(projectInspector.getInspectedProjects());
    });

    return () => {
      unsubLog();
      unsubStart();
      unsubFinish();
      unsubSafetyStart();
      unsubSafetyFinish();
      unsubProjectInspectionStart();
      unsubProjectInspectionFinish();
    };
  }, [eventBus, logger, workspaceScanner, projectInspector, developmentSafety, addLog]);

  return {
    workspaceScanner,
    workspaceEngine,
    developmentSafety,
    projectInspector,
    aiWorkspace,
    scannerStatus,
    projectsCount,
    safetyStatus,
    isSafetyCheckRunning,
    projectHealthSummary,
    inspectedProjects,
    isProjectInspectionRunning
  };
}
