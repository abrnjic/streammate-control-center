import { useState, useEffect, useRef } from 'react';
import { EventBus, LoggerEngine, WorkspaceEngine, WorkspaceScanner } from '../core';
import { EventType, SystemEvent } from '../core/EventBus/types';
import { ScannerStatus } from '../core/WorkspaceScanner/types';
import { WorkspaceData, WorkspaceProject, WorkspaceFolder } from '../core/WorkspaceEngine/types';

export function useCoreEngine(addLog: (msg: string) => void) {
  const engineRef = useRef<{
    eventBus: EventBus;
    logger: LoggerEngine;
    workspaceEngine: WorkspaceEngine;
    workspaceScanner: WorkspaceScanner;
  } | null>(null);

  const [scannerStatus, setScannerStatus] = useState<ScannerStatus>({
    isScanning: false,
    lastScanFinishedAt: null,
    error: null
  });

  const [projectsCount, setProjectsCount] = useState(0);

  if (!engineRef.current) {
    const eventBus = new EventBus();
    const logger = new LoggerEngine();
    const workspaceEngine = new WorkspaceEngine(eventBus);
    const workspaceScanner = new WorkspaceScanner(logger, workspaceEngine, eventBus);
    
    engineRef.current = { eventBus, logger, workspaceEngine, workspaceScanner };
  }

  const { eventBus, logger, workspaceEngine, workspaceScanner } = engineRef.current;

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

    return () => {
      unsubLog();
      unsubStart();
      unsubFinish();
    };
  }, [eventBus, logger, workspaceScanner, addLog]);

  return {
    workspaceScanner,
    workspaceEngine,
    scannerStatus,
    projectsCount
  };
}
