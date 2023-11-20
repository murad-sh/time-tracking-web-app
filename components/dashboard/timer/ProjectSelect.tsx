import React from 'react';
import Select from '@/components/ui/Select';
import { useProjects } from '@/hooks/use-api-hooks';
import { FileTextIcon } from 'lucide-react';
import { IProject } from '@/models/project';

import styles from './ItemSelect.module.scss';

interface ProjectSelectProps {
  projectId: string;
  setProjectId: (projectId: string) => void;
}

const ProjectSelect = ({ projectId, setProjectId }: ProjectSelectProps) => {
  const { projects } = useProjects();

  const selectProject = (selectedProject: string) => {
    setProjectId(selectedProject.trim());
  };

  const getSelectedProject = (projectId: string) =>
    projects.find((project: IProject) => project._id!.toString() === projectId)!
      .projectTitle;

  return (
    <Select value={projectId} onValueChange={selectProject}>
      <Select.Button asChild>
        <button className={styles.tagButton}>
          <FileTextIcon />
          {projectId ? getSelectedProject(projectId) : 'Select Project'}
        </button>
      </Select.Button>
      <Select.Content position="popper" sideOffset={5}>
        {projects && projects.length === 0 ? (
          <Select.Label>No projects</Select.Label>
        ) : (
          <Select.Label>Choose project</Select.Label>
        )}
        {projectId && (
          <>
            <Select.Item value=" ">No Project</Select.Item>
            <Select.Separator className={styles.separator} />
          </>
        )}
        {projects &&
          projects.map((project: IProject) => (
            <Select.Item
              key={project._id!.toString()}
              value={project._id!.toString()}
            >
              {project.projectTitle}
            </Select.Item>
          ))}
      </Select.Content>
    </Select>
  );
};

export default ProjectSelect;
