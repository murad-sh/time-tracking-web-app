import React from 'react';
import styles from './TagItem.module.scss';

import Skeleton from '@/components/ui/Skeleton';

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

// !TEMP
TagItem.Skeleton = function TagItemSkeleton() {
  return (
    <div className={styles.divider}>
      <div className={styles.container}>
        <Skeleton className={styles.skeleton} />
      </div>
      <div className={styles.container}>
        <Skeleton className={styles.skeleton} />
      </div>
      <div className={styles.container}>
        <Skeleton className={styles.skeleton} />
      </div>
      <div className={styles.container}>
        <Skeleton className={styles.skeleton} />
      </div>
      <div className={styles.container}>
        <Skeleton className={styles.skeleton} />
      </div>
    </div>
  );
};
