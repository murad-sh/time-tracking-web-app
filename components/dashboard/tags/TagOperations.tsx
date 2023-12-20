import React, { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import AlertDialog from '@/components/ui/AlertDialog';
import Modal from '@/components/ui/Modal';
import TagForm from './TagForm';
import { MoreVertical } from 'lucide-react';
import { useTags } from '@/hooks/use-api-hooks';
import { deleteTag } from '@/lib/utils/services';
import { toast } from 'sonner';
import styles from '../SharedStyles.module.scss';

const TagOperations = ({ tag }: { tag: string }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { mutate } = useTags();

  const deleteTagHandler = async () => {
    try {
      await deleteTag(tag);
      mutate();
      toast.success('Tag deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Button className={styles.operation} aria-label="Operations">
          <MoreVertical />
        </Dropdown.Button>
        <Dropdown.Menu sideOffset={5} align="end">
          <Dropdown.MenuItem
            className={styles.edit}
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </Dropdown.MenuItem>
          <Dropdown.Separator className={styles.separator} />
          <Dropdown.MenuItem
            className={styles.delete}
            onClick={() => setShowDeleteAlert(true)}
          >
            Delete
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>
      <AlertDialog open={showDeleteAlert} setOpen={setShowDeleteAlert}>
        <AlertDialog.Content
          title="Are you sure you want to delete this tag?"
          description="This action can&#39;t be undone."
          action="Delete tag"
          onAction={deleteTagHandler}
        />
      </AlertDialog>
      <Modal open={showEditModal} onOpenChange={setShowEditModal}>
        <Modal.Content title="Edit tag" className={styles.modal}>
          <TagForm
            operationType="edit"
            initialTag={tag}
            afterSave={() => setShowEditModal(false)}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TagOperations;
