import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AlertDialog from '@/components/ui/AlertDialog';
import { MoreVertical } from 'lucide-react';
import { useTags } from '@/hooks/use-api-hooks';
import axios from 'axios';
import { toast } from 'sonner';

import styles from '../SharedStyles.module.scss';

const TagOperations = ({ tag }: { tag: string }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { mutate } = useTags();

  const deleteTag = async () => {
    const response = await axios.delete('/api/user/tags/' + tag);
    return response.data;
  };

  const deleteTagHandler = async () => {
    try {
      await deleteTag();
      mutate();
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Button className={styles.operation}>
          <MoreVertical />
        </Dropdown.Button>
        <Dropdown.Menu sideOffset={5} align="end">
          <Dropdown.MenuItem asChild>
            <button className={styles.edit}>Edit</button>
          </Dropdown.MenuItem>
          <Dropdown.Separator className={styles.separator} />
          <Dropdown.MenuItem asChild>
            <button
              className={styles.delete}
              onClick={() => setShowDeleteAlert(true)}
            >
              Delete
            </button>
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>
      <AlertDialog open={showDeleteAlert} setOpen={setShowDeleteAlert}>
        <AlertDialog.Content
          title="Are you sure you want to delete this tag?"
          description="This action cannot be undone."
          action="Delete tag"
          onAction={deleteTagHandler}
        />
      </AlertDialog>
    </>
  );
};

export default TagOperations;
