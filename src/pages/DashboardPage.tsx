import React from 'react';
import { Briefcase, FolderOpen, Bot, Github, Settings as SettingsIcon, Play, Workflow, Globe, Server, Activity, Clock, Database, RefreshCw } from 'lucide-react';
import { WorkspaceConfig, Project } from '../types/workspace';
import { StatusCard } from '../components/StatusCard';
import { ScannerStatus } from '../core/WorkspaceScanner/types';

interface DashboardProps {
  workspace: WorkspaceConfig;
  projects: Project[];
  scannerStatus: ScannerStatus;
  onScan: () => void;
  addLog: (msg: string) => void;
}

function ActionButton({ icon, label, onClick, variant = 'secondary', disabled = false }: { icon: any, label: string, onClick: () => void, variant?: 'primary'|'secondary', disabled?: boolean }) {
  const base = "flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm border disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-primary border-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]",
    secondary: "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-slate-200 shadow-sm"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      {React.cloneElement(icon, { className: "w-4 h-4" + (disabled && variant === 'primary' ? ' animate-spin' : '') })}
      {label}
    </button>
  );
}

export function DashboardPage({ workspace, projects, scannerStatus, onScan, addLog }: DashboardProps) {
  const configuredRepos = projects.filter(p => p.repoPath.trim() !== "").length;
  const configuredFolders = [
    workspace.rootFolder, workspace.aiExportFolder, workspace.backupsFolder, 
    workspace.logsFolder, workspace.toolsFolder
  ].filter(f => f && f.trim() !== "").length;
  
  // Configuration Status Logic
  let configStatus = "Healthy";
  let statusColor = "text-emerald-400 bg-emerald-400/10";
  if (!workspace.rootFolder || !workspace.aiExportFolder || configuredFolders < 5) {
    configStatus = "Degraded";
    statusColor = "text-amber-400 bg-amber-400/10";
  }

  const lastScanTime = scannerStatus.lastScanFinishedAt 
    ? new Date(scannerStatus.lastScanFinishedAt).toLocaleTimeString() 
    : 'Never';

  const cards = [
    { id: '1', title: 'Projects Found', value: projects.length.toString(), icon: <FolderOpen className="w-5 h-5" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: '2', title: 'Folders Mapped', value: `${configuredFolders} / 5`, icon: <Database className="w-5 h-5" />, color: configuredFolders === 5 ? 'text-emerald-400' : 'text-amber-400', bg: configuredFolders === 5 ? 'bg-emerald-400/10' : 'bg-amber-400/10' },
    { id: '3', title: 'Workspace Health', value: configStatus, icon: <Activity className="w-5 h-5" />, color: statusColor.split(' ')[0], bg: statusColor.split(' ')[1] },
    { id: '4', title: 'Last Scan', value: lastScanTime, icon: <Clock className="w-5 h-5" />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: '5', title: 'Scanner Status', value: scannerStatus.isScanning ? 'Scanning...' : 'Idle', icon: <Bot className="w-5 h-5" />, color: scannerStatus.isScanning ? 'text-primary' : 'text-slate-400', bg: scannerStatus.isScanning ? 'bg-primary/20' : 'bg-slate-400/10' }
  ];

  const handleAction = (action: string) => {
    addLog(`[ACTION] Executing safely... ${action}`);
    setTimeout(() => addLog(`[SUCCESS] ${action} placeholder finished. No actual processes were modified.`), 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map(c => (
          <StatusCard key={c.id} {...c} />
        ))}
      </div>

      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-xl shadow-xl shadow-black/20">
        <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-6 flex items-center gap-2">
          <Play className="w-4 h-4 text-primary" /> Workflow Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <ActionButton 
            icon={<RefreshCw />} 
            label={scannerStatus.isScanning ? "Scanning Workspace..." : "Run Workspace Scan"} 
            onClick={onScan} 
            variant="primary" 
            disabled={scannerStatus.isScanning}
          />
          <ActionButton icon={<Workflow />} label="Sync AI Export" onClick={() => handleAction('Sync AI Export')} />
          <ActionButton icon={<Github />} label="Open GitHub Desktop" onClick={() => handleAction('Open GitHub Desktop')} />
          <ActionButton icon={<Globe />} label="Build Portal" onClick={() => handleAction('Build Portal')} />
          <ActionButton icon={<Server />} label="Build Backend" onClick={() => handleAction('Build Backend')} />
        </div>
      </div>
    </div>
  );
}
