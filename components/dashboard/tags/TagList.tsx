import React from 'react';
import TagItem from './TagItem';
import { useTags } from '@/hooks/use-api-hooks';
import styles from './TagList.module.scss';

const TagList = () => {
  const { tags, isLoading, error } = useTags();

  // TODO : Add proper error ui
  if (error) return <div>failed to load</div>;

  if (isLoading)
    return (
      <div>
        <TagItem.Skeleton />
      </div>
    );

  // TODO : Add proper ui
  if (tags.length === 0) {
    return <p>No tags created yet</p>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {tags.map((tag: string) => (
          <li className={styles.item} key={tag}>
            <TagItem tag={tag}></TagItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
