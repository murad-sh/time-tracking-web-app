import React, { useState } from 'react';
import Select from '@/components/ui/Select';
import { useTags } from '@/hooks/use-api-hooks';
import { TagIcon } from 'lucide-react';

interface TagSelectProps {
  tag: string;
  setTag: (tag: string) => void;
}

const TagSelect = ({ tag, setTag }: TagSelectProps) => {
  const [open, setOpen] = useState(false);
  const { tags } = useTags();

  const resetSelectedTag = () => {
    setTag('');
    setOpen(false);
  };

  const changeTag = (tag: string) => {
    if (tag === '__NO_TAG__') {
      resetSelectedTag();
      return;
    }
    setTag(tag);
  };

  return (
    <Select
      value={tag}
      onValueChange={changeTag}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Button asChild>
        <button>
          {tag || (
            <span>
              <TagIcon />
              Add Tag
            </span>
          )}
        </button>
      </Select.Button>
      <Select.Content position="popper" sideOffset={5}>
        {tag && <Select.Item value="__NO_TAG__">No tags</Select.Item>}
        {tags &&
          tags.map((tag: string) => (
            <Select.Item key={tag} value={tag}>
              {tag}
            </Select.Item>
          ))}
      </Select.Content>
    </Select>
  );
};

export default TagSelect;
