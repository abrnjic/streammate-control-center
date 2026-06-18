import React from 'react';
import { Briefcase, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { WorkspaceConfig } from '../types/workspace';

interface WorkspacePageProps {
  workspace: WorkspaceConfig;
  setWorkspace: (ws: WorkspaceConfig) => void;
  existingFolders: string[];
  setExistingFolders: (folders: string[]) => void;
  addLog: (msg: string) => void;
}

export function WorkspacePage({ workspace, setWorkspace, existingFolders, setExistingFolders, addLog }: WorkspacePageProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Briefcase className="text-primary w-6 h-6" />
          <h3 className="text-xl font-semibold text-slate-100">Workspace Configuration</h3>
        </div>
        <div className="text-xs font-mono text-slate-500">JSON STORAGE ACTIVE</div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingField label="Workspace Name" name="name" value={workspace.name || ''} onChange={handleChange} />
          <SettingField label="GitHub Username" name="githubUsername" value={workspace.githubUsername || ''} onChange={handleChange} />
          <SettingField label="Default Branch" name="defaultBranch" value={workspace.defaultBranch || ''} onChange={handleChange} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Workspace Description</label>
          <textarea
            name="description"
            value={workspace.description || ''}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
          />
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Directory Mapping</h4>
          <ValidatedFolderField label="Workspace Root Folder" name="rootFolder" value={workspace.rootFolder || ''} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="AI Export Folder" name="aiExportFolder" value={workspace.aiExportFolder || ''} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="Backups Folder" name="backupsFolder" value={workspace.backupsFolder || ''} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="Logs Folder" name="logsFolder" value={workspace.logsFolder || ''} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="Tools Folder" name="toolsFolder" value={workspace.toolsFolder || ''} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
        </div>
      </div>
    </div>
  );
}

function SettingField({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: any) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm"
      />
    </div>
  );
}

function ValidatedFolderField({ label, name, value, onChange, existingFolders, setExistingFolders, addLog }: any) {
  const isConfigured = value && value.trim() !== "";
  const exists = isConfigured && existingFolders.includes(value);

  const handleCreate = () => {
    addLog(`[SYSTEM] Synthesizing folder creation for: ${value}`);
    setTimeout(() => {
      setExistingFolders([...existingFolders, value]);
      addLog(`[SUCCESS] Validated folder created successfully`);
    }, 600);
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <label className="text-sm font-medium text-slate-400">{label}</label>
        {isConfigured && !exists && (
          <span className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> Missing
          </span>
        )}
        {isConfigured && exists && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Validated
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="/path/to/folder"
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm"
        />
        {isConfigured && !exists && (
          <button onClick={handleCreate} className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-amber-500/30 shrink-0">
            Create Dir
          </button>
        )}
      </div>
    </div>
  );
}
