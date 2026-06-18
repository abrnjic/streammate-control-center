import React, { useState } from 'react';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import { Project } from '../types/workspace';

interface ProjectsPageProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addLog: (msg: string) => void;
}

export function ProjectsPage({ projects, setProjects, addLog }: ProjectsPageProps) {
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            <input placeholder="Project Name" value={newProject.name || ''} onChange={e => setNewProject({...newProject, name: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            <select value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm appearance-none">
              <option>React</option><option>Next.js</option><option>NestJS</option><option>Android</option><option>Docker</option><option>Generic</option>
            </select>
            <input placeholder="Repository Path" value={newProject.repoPath || ''} onChange={e => setNewProject({...newProject, repoPath: e.target.value})} className="bg-slate-950 font-mono border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            <input placeholder="GitHub URL" value={newProject.githubUrl || ''} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
            <input placeholder="Dev Branch" value={newProject.devBranch || ''} onChange={e => setNewProject({...newProject, devBranch: e.target.value})} className="bg-slate-950 font-mono border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm" />
          </div>
          <button onClick={handleAdd} className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>
    </div>
  );
}
