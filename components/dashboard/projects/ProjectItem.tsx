import React from 'react';
import Link from 'next/link';
import Skeleton from '@/components/ui/Skeleton';
import ProjectOperations from './ProjectOperations';
import styles from './ProjectItem.module.scss';
import { IProject } from '@/models/project';
import { formatDate } from '@/lib/utils/date';

interface ProjectProps {
  project: IProject;
}

const ProjectItem = ({ project }: ProjectProps) => {
  return (
    <div className={styles.tag}>
      <div className={styles.content}>
        <div>
          <Link href={`/dashboard/projects/${project._id}`}>
            {project.projectTitle}
          </Link>
        </div>
        <div>
          <p>{formatDate(project.createdAt!.toString())}</p>
        </div>
      </div>
      <ProjectOperations project={project} />
    </div>
  );
};

export default ProjectItem;

ProjectItem.Skeleton = function ProjectItemSkeleton() {
  return (
    <div className={styles.divider}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.container}>
          <Skeleton className={styles.skeleton__title} />
          <Skeleton className={styles.skeleton__date} />
        </div>
      ))}
    </div>
  );
};
