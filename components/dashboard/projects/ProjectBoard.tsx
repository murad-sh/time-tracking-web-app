import React from 'react';
import styles from './ProjectBoard.module.scss';

import AddProject from './AddProject';
import ProjectList from './ProjectList';

const ProjectBoard = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div>
          <h1>Projects</h1>
          <p>Create and manage projects.</p>
        </div>
        <div>
          <AddProject />
        </div>
      </div>
      <div>
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectBoard;
