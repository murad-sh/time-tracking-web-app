import React from 'react';
import TagItem from './TagItem';
import { useTags } from '@/hooks/use-api-hooks';
import ErrorMessage from '@/components/ui/ErrorMessage';
import styles from '../SharedStyles.module.scss';
import EmptyPlaceholder from '../EmptyPlaceholder';

const TagList = () => {
  const { tags, isLoading, error } = useTags();

  if (isLoading) return <TagItem.Skeleton />;
  if (error) return <ErrorMessage />;
  if (tags.length === 0) return <EmptyPlaceholder type="tag" />;

  return (
    <ul className={styles.list}>
      {tags.map((tag: string) => (
        <li className={styles.item} key={tag}>
          <TagItem tag={tag} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
