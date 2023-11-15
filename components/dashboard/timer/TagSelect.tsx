import React, { useState } from 'react';
import Select from '@/components/ui/Select';
import { useTags } from '@/hooks/use-api-hooks';
import { Tag } from 'lucide-react';

interface TagSelectProps {
  tag: string;
  setTag: (tag: string) => void;
}

const TagSelect = ({ tag, setTag }: TagSelectProps) => {
  const [open, setOpen] = useState(false);
  const { tags } = useTags();

  return (
    <Select
      value={tag}
      onValueChange={setTag}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Button asChild>
        <button>
          {tag ? (
            tag
          ) : (
            <span>
              <Tag />
              Add tag
            </span>
          )}
        </button>
      </Select.Button>
      <Select.Content position="popper" sideOffset={5}>
        <button
          onClick={() => {
            setTag('');
            setOpen(false);
          }}
        >
          No tags
        </button>
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
