import React from 'react';
import styles from './TagItem.module.scss';

import { Trash2 } from 'lucide-react';

import Skeleton from '@/components/ui/Skeleton';

import PrimaryButton from '@/components/ui/PrimaryButton';
import axios from 'axios';
import { ITag } from '@/models/tag';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';

interface TagProps {
  tag: ITag;
}

const TagItem = ({ tag }: TagProps) => {
  const { mutate } = useSWRConfig();

  const deleteTag = async () => {
    const response = await axios.delete('/api/tags/' + tag._id?.toString());
    return response.data;
  };

  const deleteTagHandler = async () => {
    try {
      await deleteTag();
      mutate('/api/tags');
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className={styles.tag}>
      <div>
        <h2>{tag.tagName}</h2>
      </div>
      <div>
        <PrimaryButton className={styles.delete} onClick={deleteTagHandler}>
          <Trash2 />
        </PrimaryButton>
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
