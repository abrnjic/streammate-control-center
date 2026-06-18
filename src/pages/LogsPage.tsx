import React from 'react';
import { Terminal } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

interface LogsPageProps {
  logs: string[];
}

export function LogsPage({ logs }: LogsPageProps) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 h-full flex flex-col font-mono text-sm shadow-xl">
      <SectionHeader title="Full System Logs" icon={<Terminal />} />
      <div className="flex-1 overflow-y-auto space-y-2 pr-4 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className="text-slate-300">
            <span className="text-primary font-bold">{'>'}</span> {log}
          </div>
        ))}
      </div>
    </div>
  );
}
