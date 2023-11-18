import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import ProjectOperations from './ProjectOperations';
import styles from './ProjectItem.module.scss';
import { IProject } from '@/models/project';

interface ProjectProps {
  project: IProject;
}

const ProjectItem = ({ project }: ProjectProps) => {
  return (
    <div className={styles.tag}>
      <div>
        <h2>{project.projectTitle}</h2>
      </div>
      <ProjectOperations projectId={project._id!.toString()} />
    </div>
  );
};

export default ProjectItem;

ProjectItem.Skeleton = function ProjectItemSkeleton() {
  return (
    <div className={styles.divider}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.container}>
          <Skeleton className={styles.skeleton} />
        </div>
      ))}
    </div>
  );
};
