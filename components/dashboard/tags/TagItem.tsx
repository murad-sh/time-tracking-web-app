import React from 'react';
import styles from './TagItem.module.scss';

import { TrashIcon } from '@radix-ui/react-icons';
import { Trash2 } from 'lucide-react';
import { Trash } from 'lucide-react';

import Skeleton from '@/components/ui/Skeleton';

import PrimaryButton from '@/components/ui/PrimaryButton';

interface TagProps {
  tagName: string;
}

const TagItem = ({ tagName }: TagProps) => {
  return (
    <div className={styles.tag}>
      <div>
        <h2>{tagName}</h2>
      </div>
      <div>
        <PrimaryButton className={styles.delete}>
          <Trash2 />
        </PrimaryButton>
        {/* <button className={styles.delete}>
          <TrashIcon />
        </button> */}
      </div>
    </div>
  );
};

export default TagItem;

// !TEMP
TagItem.Skeleton = function TagItemSkeleton() {
  // ([...Array(5).keys()].map(i =>
  // {return (<div key={i} className={styles.container}>
  //   <Skeleton key={i} className={styles.skeleton} />
  // </div>)});

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
