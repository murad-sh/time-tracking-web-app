import React from 'react';
import styles from './SharedStyles.module.scss';
import { TagIcon, FileTextIcon } from 'lucide-react';
import AddItem from './AddItem';

type EmptyPlaceholderType = 'tag' | 'project';

const EmptyPlaceholder = ({ type }: { type: EmptyPlaceholderType }) => {
  const buttonText = `Create new ${type}`;
  return (
    <div className={styles['empty-list']}>
      <span>{type === 'tag' ? <TagIcon /> : <FileTextIcon />}</span>
      <h3>No {type}s created</h3>
      <p>It looks like you haven&#39;t created any {type}s yet.</p>
      <div className={styles.action}>
        <AddItem itemType={type} btnText={buttonText} />
      </div>
    </div>
  );
};

export default EmptyPlaceholder;
