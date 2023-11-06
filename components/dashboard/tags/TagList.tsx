import React from 'react';
import useSWR from 'swr';
import { ITag } from '@/models/tag';
import TagItem from './TagItem';

import styles from './TagList.module.scss';

const TagList = () => {
  // TODO : add axios
  // TODO : Add proper error handling
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.json().toString());
    }
    return res.json();
  };

  const { data, error, isLoading } = useSWR('/api/tags', fetcher);

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
        {data.tags.map((tag: ITag) => (
          <li className={styles.item} key={tag._id?.toString()}>
            <TagItem tag={tag}></TagItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
