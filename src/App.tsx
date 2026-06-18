import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, Settings as SettingsIcon, Terminal, Github, Server, Smartphone, Database, Globe, Play, Workflow } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Control Center Initialized',
    '[INFO] StreamMate Developer Tools Ready',
  ]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex h-screen bg-[#030c18] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-10 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <Workflow className="text-primary w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide">StreamMate</h1>
            <p className="text-[10px] text-slate-400 font-mono">CONTROL CENTER</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
            <LayoutGrid className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'}`}>
            <SettingsIcon className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>
        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SYSTEM ONLINE
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 flex items-center px-8 bg-slate-900/50 backdrop-blur-md shrink-0">
          <h2 className="text-xl font-semibold capitalize tracking-wide">{activeTab}</h2>
          <div className="ml-auto text-sm text-slate-400 font-mono bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700/50">LOCAL DEV ENV</div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
          {activeTab === 'dashboard' ? <Dashboard addLog={addLog} /> : <Settings addLog={addLog} />}
        </div>

        {/* Logs Panel */}
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
      </main>
    </div>
  );
}

function Dashboard({ addLog }: { addLog: (msg: string) => void }) {
  const cards = [
    { id: '1', title: 'GitHub Repository', icon: <Github className="w-5 h-5" />, status: 'Synced', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: '2', title: 'Google AI Studio Export', icon: <Workflow className="w-5 h-5" />, status: 'Ready', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: '3', title: 'Portal', icon: <Globe className="w-5 h-5" />, status: 'Dev Mode', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: '4', title: 'Backend', icon: <Server className="w-5 h-5" />, status: 'Dev Mode', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: '5', title: 'Android', icon: <Smartphone className="w-5 h-5" />, status: 'Source', color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { id: '6', title: 'Docker', icon: <Workflow className="w-5 h-5" />, status: 'Offline', color: 'text-slate-400', bg: 'bg-slate-400/10' },
    { id: '7', title: 'PostgreSQL', icon: <Database className="w-5 h-5" />, status: 'PGLite', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { id: '8', title: 'Production Server', icon: <Server className="w-5 h-5" />, status: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-400/10' },
  ];

  const handleAction = (action: string) => {
    addLog(`[ACTION] Executing safely... ${action}`);
    setTimeout(() => addLog(`[SUCCESS] ${action} placeholder finished. No actual processes were modified.`), 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(c => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all hover:shadow-lg hover:shadow-slate-900/50 group flex flex-col justify-between">
            <div className="flex items-start justify-between mb-5">
              <div className={`p-3 rounded-lg ${c.bg} ${c.color} group-hover:scale-110 transition-transform`}>
                {c.icon}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border ${c.bg} ${c.color} border-current/20`}>
                {c.status}
              </span>
            </div>
            <h3 className="font-semibold text-slate-200 mt-2">{c.title}</h3>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
        <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-5 flex items-center gap-2">
          <Play className="w-4 h-4" /> Workflow Actions
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

function Settings({ addLog }: { addLog: (msg: string) => void }) {
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
    <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
        <SettingsIcon className="text-primary w-6 h-6" />
        <h3 className="text-xl font-semibold text-slate-100">Environment Setup</h3>
      </div>

      <div className="space-y-6">
        <SettingField label="Local Repository Path" name="localRepo" value={settings.localRepo} onChange={handleChange} />
        <SettingField label="Google AI Studio Exports Path" name="aiExport" value={settings.aiExport} onChange={handleChange} />
        <SettingField label="Production Server IP" name="prodIp" value={settings.prodIp} onChange={handleChange} />
        <SettingField label="Production Repo Path" name="prodRepo" value={settings.prodRepo} onChange={handleChange} />
      </div>
      <div className="mt-8 pt-6 flex justify-end">
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)]" onClick={handleSave}>
          Save Configuration
        </button>
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
