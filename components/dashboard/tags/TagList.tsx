import React from 'react';
import TagItem from './TagItem';
import { useTags } from '@/hooks/use-api-hooks';
import styles from '../SharedStyles.module.scss';

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
    return <h2>No Tags Added Yet.</h2>;
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
