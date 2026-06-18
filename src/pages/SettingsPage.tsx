import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';

interface SettingsProps {
  addLog: (msg: string) => void;
}

export function SettingsPage({ addLog }: SettingsProps) {
  const [settings, setSettings] = useState({
    localRepo: '/Users/dev/streammate-v4-next',
    aiExport: '/Users/dev/Downloads/ai-studio-exports',
    prodIp: '192.168.1.100',
    prodRepo: '/var/www/streammate'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    addLog("[SETTINGS] Saving configuration...");
    setTimeout(() => addLog("[SUCCESS] Settings saved to local storage."), 400);
  };

  return (
    <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader title="Environment Setup" icon={<SettingsIcon />} />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Local Repository Path</label>
          <input type="text" name="localRepo" value={settings.localRepo} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Google AI Studio Exports Path</label>
          <input type="text" name="aiExport" value={settings.aiExport} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Production Server IP</label>
          <input type="text" name="prodIp" value={settings.prodIp} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Production Repo Path</label>
          <input type="text" name="prodRepo" value={settings.prodRepo} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono text-sm" />
        </div>
      </div>
      <div className="mt-8 pt-6 flex justify-end border-t border-slate-800">
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]" onClick={handleSave}>
          Save Configuration
        </button>
      </div>
    </div>
  );
}
