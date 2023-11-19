import React from 'react';
import TagList from './TagList';
import AddItem from '../AddItem';
import styles from './TagBoard.module.scss';

const TagBoard = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div>
          <h1>Tags</h1>
          <p>Create and manage tags.</p>
        </div>
        <div>
          <AddItem itemType="tag" />
        </div>
      </div>
      <div>
        <TagList />
      </div>
    </div>
  );
};

export default TagBoard;
