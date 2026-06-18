import React from 'react';
import { Briefcase, FolderOpen, Bot, Github, Settings as SettingsIcon, Play, Workflow, Globe, Server } from 'lucide-react';
import { WorkspaceConfig, Project } from '../types/workspace';
import { StatusCard } from '../components/StatusCard';

interface DashboardProps {
  workspace: WorkspaceConfig;
  projects: Project[];
  addLog: (msg: string) => void;
}

function ActionButton({ icon, label, onClick, variant = 'secondary' }: { icon: any, label: string, onClick: () => void, variant?: 'primary'|'secondary' }) {
  const base = "flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm border";
  const variants = {
    primary: "bg-primary border-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]",
    secondary: "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-slate-600 text-slate-200 shadow-sm"
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {React.cloneElement(icon, { className: "w-4 h-4" })}
      {label}
    </button>
  );
}

export function DashboardPage({ workspace, projects, addLog }: DashboardProps) {
  const configuredRepos = projects.filter(p => p.repoPath.trim() !== "").length;
  
  // Configuration Status Logic
  let configStatus = "Ready";
  let statusColor = "text-emerald-400 bg-emerald-400/10";
  if (!workspace.rootFolder || !workspace.aiExportFolder) {
    configStatus = "Incomplete";
    statusColor = "text-amber-400 bg-amber-400/10";
  }

  const cards = [
    { id: '1', title: 'Current Workspace', value: workspace.name || 'Unnamed', icon: <Briefcase className="w-5 h-5" />, color: 'text-primary', bg: 'bg-primary/10' },
    { id: '2', title: 'Number of Projects', value: projects.length.toString(), icon: <FolderOpen className="w-5 h-5" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: '3', title: 'AI Export Folder', value: workspace.aiExportFolder ? 'Configured' : 'Missing', icon: <Bot className="w-5 h-5" />, color: workspace.aiExportFolder ? 'text-emerald-400' : 'text-amber-400', bg: workspace.aiExportFolder ? 'bg-emerald-400/10' : 'bg-amber-400/10' },
    { id: '4', title: 'Configured Repos', value: `${configuredRepos} / ${projects.length}`, icon: <Github className="w-5 h-5" />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: '5', title: 'Configuration Status', value: configStatus, icon: <SettingsIcon className="w-5 h-5" />, color: statusColor.split(' ')[0], bg: statusColor.split(' ')[1] }
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
          <ActionButton icon={<Workflow />} label="Sync AI Export" onClick={() => handleAction('Sync AI Export')} variant="primary" />
          <ActionButton icon={<Github />} label="Open GitHub Desktop" onClick={() => handleAction('Open GitHub Desktop')} />
          <ActionButton icon={<Globe />} label="Build Portal" onClick={() => handleAction('Build Portal')} />
          <ActionButton icon={<Server />} label="Build Backend" onClick={() => handleAction('Build Backend')} />
          <ActionButton icon={<Server />} label="Check Server" onClick={() => handleAction('Check Server')} />
          <ActionButton icon={<Workflow />} label="Check Docker" onClick={() => handleAction('Check Docker')} />
        </div>
      </div>
    </div>
  );
}
