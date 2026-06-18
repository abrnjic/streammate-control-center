import { useState, useEffect, useRef } from 'react';
import { EventBus, LoggerEngine, WorkspaceEngine, WorkspaceScanner, ConfigEngine, DevelopmentSafety } from '../core';
import { EventType, SystemEvent } from '../core/EventBus/types';
import { ScannerStatus } from '../core/WorkspaceScanner/types';
import { SafetyCheckResult } from '../core/DevelopmentSafety/types';
import { WorkspaceData, WorkspaceProject, WorkspaceFolder } from '../core/WorkspaceEngine/types';

export function useCoreEngine(addLog: (msg: string) => void) {
  const engineRef = useRef<{
    eventBus: EventBus;
    logger: LoggerEngine;
    workspaceEngine: WorkspaceEngine;
    workspaceScanner: WorkspaceScanner;
    configEngine: ConfigEngine;
    developmentSafety: DevelopmentSafety;
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

  const [isSafetyCheckRunning, setIsSafetyCheckRunning] = useState(false);

  const [projectsCount, setProjectsCount] = useState(0);

  if (!engineRef.current) {
    const eventBus = new EventBus();
    const logger = new LoggerEngine();
    const configEngine = new ConfigEngine(eventBus);
    const workspaceEngine = new WorkspaceEngine(eventBus);
    const workspaceScanner = new WorkspaceScanner(logger, workspaceEngine, eventBus);
    const developmentSafety = new DevelopmentSafety(logger, eventBus, workspaceScanner, workspaceEngine, configEngine);
    
    engineRef.current = { eventBus, logger, workspaceEngine, workspaceScanner, configEngine, developmentSafety };
  }

  const { eventBus, logger, workspaceEngine, workspaceScanner, developmentSafety } = engineRef.current;

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

    return () => {
      unsubLog();
      unsubStart();
      unsubFinish();
      unsubSafetyStart();
      unsubSafetyFinish();
    };
  }, [eventBus, logger, workspaceScanner, addLog]);

  return {
    workspaceScanner,
    workspaceEngine,
    developmentSafety,
    scannerStatus,
    projectsCount,
    safetyStatus,
    isSafetyCheckRunning
  };
}
