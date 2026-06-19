import React, { useEffect, useState } from 'react';
import { Bot, Play, CheckCircle2, AlertTriangle, Clock, List, FileCode, CheckSquare, FastForward, Activity } from 'lucide-react';
import { 
  AIAgent, 
  AITask, 
  AIExport, 
  AIReview,
  AIWorkspaceStats 
} from '../core/AIWorkspace/types';

interface AIWorkspacePageProps {
  agents: AIAgent[];
  tasks: AITask[];
  exports: AIExport[];
  reviews: AIReview[];
  stats: AIWorkspaceStats;
  onTriggerEvents: () => void;
  addLog: (msg: string) => void;
}

export function AIWorkspacePage({ 
  agents, tasks, exports: exportList, reviews, stats, onTriggerEvents, addLog 
}: AIWorkspacePageProps) {

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Bot className="text-primary w-6 h-6" />
            <h3 className="text-xl font-semibold text-slate-100">AI Workspace Orchestrator</h3>
          </div>
          <button 
            onClick={() => {
              onTriggerEvents();
              addLog('[INFO] Triggered AI mock events');
            }}
            className="bg-primary/10 border border-primary text-primary hover:bg-primary/20 flex items-center gap-2.5 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
          >
            <Play className="w-4 h-4" /> Trigger Mock Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm mb-2 font-medium">Completed Tasks</h4>
            <div className="text-3xl font-bold text-slate-100">{stats.completedTasks}</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm mb-2 font-medium">Success Rate</h4>
            <div className="text-3xl font-bold text-emerald-400">{stats.successRate}%</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm mb-2 font-medium">Avg Review Time</h4>
            <div className="text-3xl font-bold text-slate-100">{Math.round(stats.averageReviewTimeMs / 60000)}m</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <Activity className="text-primary w-5 h-5" />
          <h3 className="text-lg font-semibold text-slate-100">Agent Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Current Task</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {agents.map(a => (
                <tr key={a.id} className="hover:bg-slate-800/20">
                  <td className="px-4 py-3 font-semibold text-slate-200">{a.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      a.status === 'WORKING' ? 'bg-primary/10 text-primary border-primary/20' : 
                      a.status === 'IDLE' ? 'bg-slate-800 text-slate-300 border-slate-700' : 
                      'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{a.specialization}</td>
                  <td className="px-4 py-3 text-slate-500">{a.currentTask || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <List className="text-primary w-5 h-5" />
            <h3 className="text-lg font-semibold text-slate-100">Task Queue</h3>
          </div>
          <div className="space-y-4">
            {tasks.map(t => (
              <div key={t.id} className="bg-slate-950 p-4 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-200 mb-1">{t.name}</div>
                  <div className="text-xs text-slate-500 font-mono">Assigned: {t.assignedAgent || 'None'}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded border uppercase ${
                    t.priority === 'CRITICAL' ? 'border-red-400/30 text-red-400 bg-red-400/10' :
                    t.priority === 'HIGH' ? 'border-amber-400/30 text-amber-400 bg-amber-400/10' :
                    'border-slate-700 text-slate-400 bg-slate-800'
                  }`}>
                    {t.priority}
                  </span>
                  <span className="text-xs text-slate-400">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <FileCode className="text-primary w-5 h-5" />
            <h3 className="text-lg font-semibold text-slate-100">Export & Review Queue</h3>
          </div>
          <div className="space-y-4">
            {exportList.map(e => {
              const review = reviews.find(r => r.exportId === e.id);
              return (
                <div key={e.id} className="bg-slate-950 p-4 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-200 mb-1">{e.name}</div>
                    <div className="text-xs text-slate-500 font-mono">From: {e.agentId}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">Val: {e.validationStatus}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border uppercase ${
                      e.reviewStatus === 'APPROVED' ? 'border-emerald-400/30 text-emerald-400 bg-emerald-400/10' :
                      e.reviewStatus === 'REJECTED' ? 'border-red-400/30 text-red-400 bg-red-400/10' :
                      'border-amber-400/30 text-amber-400 bg-amber-400/10'
                    }`}>
                      {e.reviewStatus}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
