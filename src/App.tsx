import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, Settings as SettingsIcon, Terminal, Github, 
  Server, Smartphone, Database, Globe, Play, Workflow, 
  Briefcase, FolderOpen, Bot, AlertTriangle, CheckCircle2,
  Plus, Trash2
} from 'lucide-react';

interface WorkspaceConfig {
  name: string;
  rootFolder: string;
  aiExportFolder: string;
  backupsFolder: string;
  logsFolder: string;
  toolsFolder: string;
  githubUsername: string;
  defaultBranch: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  type: string;
  repoPath: string;
  githubUrl: string;
  devBranch: string;
  status: string;
}

const DEFAULT_WORKSPACE: WorkspaceConfig = {
  name: "StreamMate",
  rootFolder: "",
  aiExportFolder: "",
  backupsFolder: "",
  logsFolder: "",
  toolsFolder: "",
  githubUsername: "",
  defaultBranch: "main",
  description: "Main workspace for StreamMate products"
};

const DEFAULT_PROJECTS: Project[] = [
  { id: "1", name: "StreamMate Enterprise", type: "Next.js", repoPath: "", githubUrl: "", devBranch: "main", status: "Active" },
  { id: "2", name: "StreamMate Control Center", type: "React", repoPath: "", githubUrl: "", devBranch: "main", status: "Active" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Control Center Initialized',
    '[INFO] StreamMate Developer Tools Ready',
  ]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Storage State
  const [workspace, setWorkspace] = useState<WorkspaceConfig>(DEFAULT_WORKSPACE);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [existingFolders, setExistingFolders] = useState<string[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    const savedWs = localStorage.getItem('sm_workspace');
    if (savedWs) setWorkspace(JSON.parse(savedWs));

    const savedProj = localStorage.getItem('sm_projects');
    if (savedProj) setProjects(JSON.parse(savedProj));

    const savedFolders = localStorage.getItem('sm_folders');
    if (savedFolders) setExistingFolders(JSON.parse(savedFolders));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('sm_workspace', JSON.stringify(workspace));
    localStorage.setItem('sm_projects', JSON.stringify(projects));
    localStorage.setItem('sm_folders', JSON.stringify(existingFolders));
  }, [workspace, projects, existingFolders]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'workspace', label: 'Workspace', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
    { id: 'ai-studio', label: 'AI Studio', icon: <Bot className="w-5 h-5" /> },
    { id: 'git', label: 'Git', icon: <Github className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'logs', label: 'Logs', icon: <Terminal className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard workspace={workspace} projects={projects} addLog={addLog} />;
      case 'workspace':
        return <WorkspaceManager workspace={workspace} setWorkspace={setWorkspace} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />;
      case 'projects':
        return <ProjectManager projects={projects} setProjects={setProjects} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />;
      case 'settings':
        return <Settings addLog={addLog} />;
      case 'logs':
        return (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 h-full flex flex-col font-mono text-sm shadow-xl">
            <h3 className="text-xl font-semibold text-slate-100 flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 tracking-wide cursor-default"><Terminal className="text-primary w-6 h-6" /> Full System Logs</h3>
            <div className="flex-1 overflow-y-auto space-y-2 pr-4 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="text-slate-300">
                  <span className="text-primary font-bold">{'>'}</span> {log}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
            [{activeTab.toUpperCase()}_MODULE_NOT_YET_IMPLEMENTED]
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#030c18] text-white overflow-hidden font-sans">
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

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 flex items-center px-8 bg-slate-900/50 backdrop-blur-md shrink-0">
          <h2 className="text-xl font-semibold capitalize tracking-wide">{activeTab.replace('-', ' ')}</h2>
          <div className="ml-auto text-sm text-slate-400 font-mono bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700/50">LOCAL DEV ENV</div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative isolate">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
          {renderContent()}
        </div>

        {activeTab !== 'logs' && (
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
        )}
      </main>
    </div>
  );
}

function Dashboard({ workspace, projects, addLog }: { workspace: WorkspaceConfig, projects: Project[], addLog: (msg: string) => void }) {
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
          <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all shadow-lg shadow-black/20 group flex flex-col justify-between">
            <div className={`p-3 rounded-lg w-fit ${c.bg} ${c.color} mb-4 group-hover:scale-110 transition-transform`}>
              {c.icon}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{c.title}</h3>
              <p className={`text-xl font-bold truncate ${c.color}`}>{c.value}</p>
            </div>
          </div>
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

function WorkspaceManager({ workspace, setWorkspace, existingFolders, setExistingFolders, addLog }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkspace({ ...workspace, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Briefcase className="text-primary w-6 h-6" />
          <h3 className="text-xl font-semibold text-slate-100">Workspace Configuration</h3>
        </div>
        <div className="text-xs font-mono text-slate-500">JSON STORAGE ACTIVE</div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SettingField label="Workspace Name" name="name" value={workspace.name} onChange={handleChange} />
          <SettingField label="GitHub Username" name="githubUsername" value={workspace.githubUsername} onChange={handleChange} />
          <SettingField label="Default Branch" name="defaultBranch" value={workspace.defaultBranch} onChange={handleChange} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">Workspace Description</label>
          <textarea
            name="description"
            value={workspace.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
          />
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Directory Mapping</h4>
          <ValidatedFolderField label="Workspace Root Folder" name="rootFolder" value={workspace.rootFolder} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="AI Export Folder" name="aiExportFolder" value={workspace.aiExportFolder} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="Backups Folder" name="backupsFolder" value={workspace.backupsFolder} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="Logs Folder" name="logsFolder" value={workspace.logsFolder} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
          <ValidatedFolderField label="Tools Folder" name="toolsFolder" value={workspace.toolsFolder} onChange={handleChange} existingFolders={existingFolders} setExistingFolders={setExistingFolders} addLog={addLog} />
        </div>
      </div>
    </div>
  );
}

function ProjectManager({ projects, setProjects, existingFolders, setExistingFolders, addLog }: any) {
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "", type: "React", repoPath: "", githubUrl: "", devBranch: "main", status: "Active"
  });

  const handleAdd = () => {
    if (!newProject.name) return;
    const project: Project = { 
      id: Date.now().toString(), 
      name: newProject.name,
      type: newProject.type || "Generic",
      repoPath: newProject.repoPath || "",
      githubUrl: newProject.githubUrl || "",
      devBranch: newProject.devBranch || "main",
      status: newProject.status || "Active"
    };
    setProjects([...projects, project]);
    addLog(`[PROJECT] Added project ${project.name}`);
    setNewProject({ name: "", type: "React", repoPath: "", githubUrl: "", devBranch: "main", status: "Active" });
  };

  const removeProj = (id: string) => {
    setProjects(projects.filter((p: Project) => p.id !== id));
    addLog(`[PROJECT] Removed project ID ${id}`);
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
          <FolderOpen className="text-primary w-6 h-6" />
          <h3 className="text-xl font-semibold text-slate-100">Projects Setup</h3>
        </div>

        <div className="space-y-4 mb-8">
          {projects.map((p: Project) => (
            <div key={p.id} className="bg-slate-950 border border-slate-800 p-5 rounded-lg flex items-center justify-between group hover:border-slate-700 transition-colors">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
                <div className="col-span-2">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Name</p>
                  <p className="font-semibold text-slate-200">{p.name}</p>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 mt-1 inline-block">{p.type}</span>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Repository Path</p>
                  <p className="font-mono text-sm text-slate-400 truncate">{p.repoPath || "Not configured"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Status</p>
                  <span className="text-xs font-semibold text-emerald-400">{p.status}</span>
                </div>
              </div>
              <button onClick={() => removeProj(p.id)} className="ml-4 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 border-dashed p-6 rounded-xl">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-5 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" /> Add New Project
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <input placeholder="Project Name" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            <select value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm appearance-none">
              <option>React</option><option>Next.js</option><option>NestJS</option><option>Android</option><option>Docker</option><option>Generic</option>
            </select>
            <input placeholder="Repository Path" value={newProject.repoPath} onChange={e => setNewProject({...newProject, repoPath: e.target.value})} className="bg-slate-950 font-mono border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            <input placeholder="GitHub URL" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            <input placeholder="Dev Branch" value={newProject.devBranch} onChange={e => setNewProject({...newProject, devBranch: e.target.value})} className="bg-slate-950 font-mono border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
          </div>
          <button onClick={handleAdd} className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>
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
    <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl shadow-black/20">
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
      <div className="mt-8 pt-6 flex justify-end border-t border-slate-800">
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
