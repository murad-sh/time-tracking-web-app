import React from 'react';
import ProjectItem from './ProjectItem';
import { useProjects } from '@/hooks/use-api-hooks';
import { IProject } from '@/models/project';
import styles from '../SharedStyles.module.scss';

const ProjectList = () => {
  const { projects, isLoading, error } = useProjects();

  // TODO : Add proper error ui
  if (error) return <div>failed to load</div>;

  if (isLoading)
    return (
      <div>
        <ProjectItem.Skeleton />
      </div>
    );

  // TODO : Add proper ui
  if (projects.length === 0) {
    return <h2>No Projects Added Yet.</h2>;
  }

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
