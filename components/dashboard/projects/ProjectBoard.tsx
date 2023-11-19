import React from 'react';
import AddItem from '../AddItem';
import ProjectList from './ProjectList';
import styles from './ProjectBoard.module.scss';

const ProjectBoard = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div>
          <h1>Projects</h1>
          <p>Create and manage projects.</p>
        </div>
        <div>
          <AddItem itemType="project" />
        </div>
      </div>
      <div>
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectBoard;
