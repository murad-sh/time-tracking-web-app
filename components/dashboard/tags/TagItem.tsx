import React from 'react';
import styles from './TagItem.module.scss';
import { Trash2 } from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';
import PrimaryButton from '@/components/ui/PrimaryButton';
import axios from 'axios';
import { ITag } from '@/models/tag';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';
import AlertDialog from '@/components/ui/AlertDialog';

interface TagProps {
  tag: ITag;
}

const TagItem = ({ tag }: TagProps) => {
  const { mutate } = useSWRConfig();

  const deleteTag = async () => {
    const response = await axios.delete('/api/tags/' + tag._id?.toString());
    return response.data;
  };

  const deleteTagHandler = async () => {
    try {
      await deleteTag();
      mutate('/api/tags');
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className={styles.tag}>
      <div>
        <h2>{tag.tagName}</h2>
      </div>
      <div>
        <AlertDialog>
          <AlertDialog.Button asChild>
            <PrimaryButton className={styles.delete}>
              <Trash2 />
            </PrimaryButton>
          </AlertDialog.Button>
          <AlertDialog.Content
            title="Are you sure you want to delete this tag?"
            description="This action cannot be undone."
            action="Delete tag"
            onAction={deleteTagHandler}
          />
        </AlertDialog>
      </div>
    </div>
  );
};

export default TagItem;

TagItem.Skeleton = function TagItemSkeleton() {
  return (
    <div className={styles.divider}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.container}>
          <Skeleton className={styles.skeleton} />
        </div>
      ))}
    </div>
  );
};
