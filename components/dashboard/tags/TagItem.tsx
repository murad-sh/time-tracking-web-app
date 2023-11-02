import React from 'react';

interface TagProps {
  tagName: string;
}

const TagItem = ({ tagName }: TagProps) => {
  return (
    <div>
      <h2>{tagName}</h2>
    </div>
  );
};

export default TagItem;
