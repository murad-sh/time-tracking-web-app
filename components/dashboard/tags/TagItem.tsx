import React from 'react';
import styles from './TagItem.module.scss';

interface TagProps {
  tagName: string;
}

const TagItem = ({ tagName }: TagProps) => {
  return (
    <div className={styles.tag}>
      <h2>{tagName}</h2>
    </div>
  );
};

export default TagItem;
