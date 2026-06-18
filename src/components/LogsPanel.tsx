import React, { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface LogsPanelProps {
  logs: string[];
}

export function LogsPanel({ logs }: LogsPanelProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="h-48 border-t border-slate-800 bg-slate-950 p-4 shrink-0 flex flex-col font-mono text-xs">
      <div className="flex items-center gap-2 text-slate-400 mb-3 pb-2 border-b border-slate-800/50">
        <Terminal className="w-4 h-4" />
        <span className="font-semibold tracking-wider">SYSTEM LOGS</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2">
        {logs.map((log, i) => (
          <div key={i} className="text-slate-300">
            <span className="text-primary font-bold">{'>'}</span> {log}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}
