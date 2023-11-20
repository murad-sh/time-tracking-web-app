import React from 'react';
import Select from '@/components/ui/Select';
import { useTags } from '@/hooks/use-api-hooks';
import { TagIcon } from 'lucide-react';

import styles from './ItemSelect.module.scss';

interface TagSelectProps {
  tag: string;
  setTag: (tag: string) => void;
}

const TagSelect = ({ tag, setTag }: TagSelectProps) => {
  const { tags } = useTags();

  const selectTag = (selectedTag: string) => {
    setTag(selectedTag.trim());
  };

  return (
    <Select value={tag} onValueChange={selectTag}>
      <Select.Button asChild>
        <button className={styles.tagButton}>
          <TagIcon />
          {tag || 'Select Tag'}
        </button>
      </Select.Button>
      <Select.Content position="popper" sideOffset={5}>
        {tags && tags.length === 0 ? (
          <Select.Label>No tags</Select.Label>
        ) : (
          <Select.Label>Choose tag</Select.Label>
        )}
        {tag && (
          <>
            <Select.Item value=" ">No Tag</Select.Item>
            <Select.Separator className={styles.separator} />
          </>
        )}
        {tags &&
          tags.map((tagItem: string) => (
            <Select.Item key={tagItem} value={tagItem}>
              {tagItem}
            </Select.Item>
          ))}
      </Select.Content>
    </Select>
  );
};

export default TagSelect;
