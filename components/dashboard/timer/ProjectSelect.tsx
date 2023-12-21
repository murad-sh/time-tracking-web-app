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

  const selectBtnClass = `${styles.select} ${projectId && styles.active}`;

  const selectProject = (selectedProject: string) => {
    setProjectId(selectedProject.trim());
  };

  const getSelectedProject = (projectId: string) => {
    const project = projects.find(
      (project: IProject) => project._id?.toString() === projectId
    );

    return project ? project.projectTitle : setProjectId('');
  };

  return (
    <Select value={projectId} onValueChange={selectProject}>
      <Select.Button asChild>
        <button className={selectBtnClass} aria-label="Choose project">
          <FileTextIcon />
        </button>
      </Select.Button>
      <Select.Content position="popper" sideOffset={5}>
        {projects && projects.length === 0 ? (
          <Select.Label className={styles.label}>No projects</Select.Label>
        ) : (
          <Select.Label className={styles.label}>Choose project</Select.Label>
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
