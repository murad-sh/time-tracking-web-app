import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import TagOperations from './TagOperations';
import styles from './TagItem.module.scss';

interface TagProps {
  tag: string;
}

const TagItem = ({ tag }: TagProps) => {
  return (
    <div className={styles.tag}>
      <div>
        <h2>{tag}</h2>
      </div>
      <TagOperations tag={tag} />
    </div>
  );
};

export default TagItem;

TagItem.Skeleton = function TagItemSkeleton() {
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
