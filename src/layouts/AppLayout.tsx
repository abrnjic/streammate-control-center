import React, { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';
import { LogsPanel } from '../components/LogsPanel';

interface AppLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  logs: string[];
  children: ReactNode;
}

export function AppLayout({ activeTab, setActiveTab, logs, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-[#030c18] text-white overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 flex items-center px-8 bg-slate-900/50 backdrop-blur-md shrink-0">
          <h2 className="text-xl font-semibold capitalize tracking-wide">{activeTab.replace('-', ' ')}</h2>
          <div className="ml-auto text-sm text-slate-400 font-mono bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700/50">LOCAL DEV ENV</div>
        </header>
        
        <div className="flex-1 overflow-auto p-8 relative isolate">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
          {children}
        </div>

        {activeTab !== 'logs' && <LogsPanel logs={logs} />}
      </main>
    </div>
  );
}
