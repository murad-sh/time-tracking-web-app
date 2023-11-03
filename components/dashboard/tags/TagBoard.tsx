import React from 'react';
import styles from './TagBoard.module.scss';

import AddTag from './AddTag';
import TagList from './TagList';

const TagBoard = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div>
          <h1>Tags</h1>
          <p>Create and manage tags.</p>
        </div>
        <div>
          <AddTag />
        </div>
      </div>
      <div>
        <TagList />
      </div>
    </div>
  );
};

export default TagBoard;
