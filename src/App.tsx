import React, { useState, useEffect } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { useWorkspaceStore } from './store/workspaceStore';
import { DashboardPage } from './pages/DashboardPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SettingsPage } from './pages/SettingsPage';
import { LogsPage } from './pages/LogsPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { GitPage } from './pages/GitPage';
import { useCoreEngine } from './hooks/useCoreEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Control Center Initialized',
    '[INFO] StreamMate Developer Tools Ready',
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  const {
    workspace,
    setWorkspace,
    projects,
    setProjects,
    existingFolders,
    setExistingFolders
  } = useWorkspaceStore();

  const { workspaceScanner, workspaceEngine, scannerStatus } = useCoreEngine(addLog);

  // Sync workspace store to engine
  useEffect(() => {
    workspaceEngine.loadWorkspace({
      metadata: { name: workspace.name, description: workspace.description, version: '1.0' },
      folders: [],
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        path: p.repoPath,
        type: p.type
      }))
    });
  }, [workspace, projects, workspaceEngine]);

  const handleScan = () => {
    workspaceScanner.scanWorkspace();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage 
          workspace={workspace} 
          projects={projects} 
          scannerStatus={scannerStatus} 
          onScan={handleScan} 
          addLog={addLog} 
        />;
      case 'workspace':
        return <WorkspacePage 
          workspace={workspace} 
          setWorkspace={setWorkspace} 
          projects={projects}
          existingFolders={existingFolders} 
          setExistingFolders={setExistingFolders} 
          addLog={addLog} 
        />;
      case 'projects':
        return <ProjectsPage projects={projects} setProjects={setProjects} addLog={addLog} />;
      case 'ai-studio':
        return <AIStudioPage />;
      case 'git':
        return <GitPage />;
      case 'settings':
        return <SettingsPage addLog={addLog} />;
      case 'logs':
        return <LogsPage logs={logs} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
            [{activeTab.toUpperCase()}_MODULE_NOT_YET_IMPLEMENTED]
          </div>
        );
    }
  };

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab} logs={logs}>
      {renderContent()}
    </AppLayout>
  );
}
