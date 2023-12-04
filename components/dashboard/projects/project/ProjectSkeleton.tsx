import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import styles from './ProjectSkeleton.module.scss';

const ProjectSkeleton = () => {
  return (
    <>
      <div className={styles.skeleton}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.total} />
      </div>
      <div className={styles.divider}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.container}>
            <Skeleton className={styles.skeleton__title} />
            <Skeleton className={styles.skeleton__duration} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectSkeleton;
