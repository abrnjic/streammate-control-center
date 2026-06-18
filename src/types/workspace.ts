export interface WorkspaceConfig {
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

export interface Project {
  id: string;
  name: string;
  type: string;
  repoPath: string;
  githubUrl: string;
  devBranch: string;
  status: string;
}

export const DEFAULT_WORKSPACE: WorkspaceConfig = {
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

export const DEFAULT_PROJECTS: Project[] = [
  { id: "1", name: "StreamMate Enterprise", type: "Next.js", repoPath: "", githubUrl: "", devBranch: "main", status: "Active" },
  { id: "2", name: "StreamMate Control Center", type: "React", repoPath: "", githubUrl: "", devBranch: "main", status: "Active" }
];
