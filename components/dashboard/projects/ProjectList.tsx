import React from 'react';
import ProjectItem from './ProjectItem';
import { useProjects } from '@/hooks/use-api-hooks';
import { IProject } from '@/models/project';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyPlaceholder from '../EmptyPlaceholder';
import styles from '../SharedStyles.module.scss';

const ProjectList = () => {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <ProjectItem.Skeleton />;
  if (error) return <ErrorMessage />;
  if (projects.length === 0) return <EmptyPlaceholder type="project" />;

  return (
    <div>
      <ul className={styles.list}>
        {projects.map((project: IProject) => (
          <li className={styles.item} key={project._id!.toString()}>
            <ProjectItem project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
