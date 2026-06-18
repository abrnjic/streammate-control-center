import { useLocalStorage } from '../hooks/useLocalStorage';
import { WorkspaceConfig, Project, DEFAULT_WORKSPACE, DEFAULT_PROJECTS } from '../types/workspace';

export function useWorkspaceStore() {
  const [workspace, setWorkspace] = useLocalStorage<WorkspaceConfig>('sm_workspace', DEFAULT_WORKSPACE);
  const [projects, setProjects] = useLocalStorage<Project[]>('sm_projects', DEFAULT_PROJECTS);
  const [existingFolders, setExistingFolders] = useLocalStorage<string[]>('sm_folders', []);

  return {
    workspace,
    setWorkspace,
    projects,
    setProjects,
    existingFolders,
    setExistingFolders
  };
}
