import React from 'react';
import useSWR from 'swr';
import { ITag } from '@/models/tag';
import TagItem from './TagItem';
import { useTags } from '@/hooks/useApiHooks';

import styles from './TagList.module.scss';

const TagList = () => {
  // TODO : Add proper error ui
  // const { data, error, isLoading } = useSWR('/api/tags');
  const { tags, isLoading, error } = useTags();

  if (error) return <div>failed to load</div>;
  if (isLoading)
    return (
      <div>
        <TagItem.Skeleton />
      </div>
    );

  return (
    <div>
      <ul className={styles.list}>
        {tags.map((tag: ITag) => (
          <li className={styles.item} key={tag._id?.toString()}>
            <TagItem tag={tag}></TagItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
