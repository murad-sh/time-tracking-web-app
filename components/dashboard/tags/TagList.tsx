import React from 'react';
import useSWR from 'swr';
import { ITag } from '@/models/tag';
import TagItem from './TagItem';

const TagList = () => {
  const { data, error, isLoading } = useSWR('/api/tags', (url) =>
    fetch(url).then((res) => res.json())
  );

  // !TEMP
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <ul>
        {data.tags.map((tag: ITag) => (
          <li key={tag._id?.toString()}>
            <TagItem tagName={tag.tagName}></TagItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
