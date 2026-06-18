import React from 'react';
import { 
  LayoutGrid, Settings as SettingsIcon, Terminal, Github, 
  Briefcase, FolderOpen, Bot, Workflow
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'workspace', label: 'Workspace', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
    { id: 'ai-studio', label: 'AI Studio', icon: <Bot className="w-5 h-5" /> },
    { id: 'git', label: 'Git', icon: <Github className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'logs', label: 'Logs', icon: <Terminal className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-68 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shrink-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
          <Workflow className="text-primary w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-wide">StreamMate</h1>
          <p className="text-[10px] text-slate-400 font-mono">CONTROL CENTER</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-slate-400 hover:bg-slate-800/80 hover:text-white border border-transparent'}`}>
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM ONLINE
        </div>
      </div>
    </aside>
  );
}
